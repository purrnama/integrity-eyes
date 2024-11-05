import pandas as pd
import geopandas as gpd
import folium
import branca
import requests
import json

def create_heatmap():
    # Load your dataset with project data
    data = pd.read_csv(r"output_with_location.csv")

    # GeoJSON file for Malaysian regions
    geojson_url = "https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/MYS/ADM1/geoBoundaries-MYS-ADM1_simplified.geojson"
    geo_data = requests.get(geojson_url).json()

    # Convert the GeoJSON data to a GeoDataFrame
    malaysia_states = gpd.GeoDataFrame.from_features(geo_data['features'], crs="EPSG:4326")

    # Create a mapping dictionary to convert BM names to state names in GeoJSON
    location_to_state = {
        "melaka": "Melaka", "kuala lumpur": "Kuala Lumpur", "sabah": "Sabah", "pahang": "Pahang",
        "ipoh": "Perak", "johor": "Johor", "terengganu": "Terengganu", "pulau pinang": "Penang",
        "kelantan": "Kelantan", "kedah": "Kedah", "perak": "Perak", "kuching": "Sarawak",
        "sarawak": "Sarawak", "petaling jaya": "Selangor", "selangor": "Selangor", "shah alam": "Selangor",
        "perlis": "Perlis", "negeri sembilan": "Negeri Sembilan", "kota kinabalu": "Sabah",
        "penang": "Penang", "putrajaya": "Putrajaya", "labuan": "Labuan",
    }

    # Map the 'Location' column to the corresponding state names
    data['state'] = data['Location'].str.lower().map(location_to_state)

    # Check for any unmapped locations
    unmapped_locations = data[data['state'].isnull()]['Location'].unique()
    if len(unmapped_locations) > 0:
        print("Unmapped Locations: ", unmapped_locations)

    # Get the unique agencies for the dropdown
    agencies = ['All'] + sorted(data['KEMENTERIAN / AGENSI'].unique().tolist())

    # Aggregate the project count by agency and state
    aggregated_data = data.groupby(['KEMENTERIAN / AGENSI', 'state'])['BIL.'].count().reset_index(name='project_count')

    # Initial aggregation (default to 'All' agencies)
    initial_aggregated_data = data.groupby('state')['BIL.'].count().reset_index(name='project_count')

    # Merge the state project counts with the GeoDataFrame
    malaysia_states = malaysia_states.merge(initial_aggregated_data, left_on='shapeName', right_on='state', how='left')

    # Fill missing project counts with 0
    malaysia_states['project_count'] = malaysia_states['project_count'].fillna(0)

    # Create a colormap for the project counts
    colormap = branca.colormap.LinearColormap(
        vmin=0,
        vmax=malaysia_states['project_count'].max(),
        colors=["#ffeda0", "#feb24c", "#fd8d3c", "#f03b20", "#bd0026"],
        caption="Number of Projects by State",
    )

    # Create a Folium map centered on Malaysia
    m = folium.Map(location=(4.2105, 101.9758), zoom_start=6, tiles="cartodbpositron")

    # Add the choropleth layer to the map
    choropleth = folium.GeoJson(
        malaysia_states,
        name="States",
        style_function=lambda feature: {
            'fillColor': colormap(feature['properties']['project_count']),
            'color': 'black',
            'weight': 1,
            'fillOpacity': 0.6,
        },
        highlight_function=lambda feature: {
            'fillColor': '#ffffcc',
            'color': 'black',
            'weight': 2,
            'fillOpacity': 0.9,
        },
        tooltip=folium.GeoJsonTooltip(
            fields=['shapeName', 'project_count'],
            aliases=['State', 'Number of Projects'],
            localize=True
        )
    ).add_to(m)

    # Add the colormap legend to the map
    colormap.add_to(m)

    def inject_agency_dropdown_and_filtering(html_content, agencies, aggregated_data, geo_data, colormap):
        dropdown_options = '\n'.join([f'<option value="{agency}">{agency}</option>' for agency in agencies])
        
        filter_html = f'''
        <div id="filter-control" style="
            position: absolute;
            top: 80px;
            right: 10px;
            z-index: 1000;
            background: white;
            padding: 10px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
            <select id="agencyDropdown" style="width: 200px; margin-right: 10px;">
                {dropdown_options}
            </select>
            <button id="applyFilter" style="
                padding: 5px 10px;
                background-color: #4CAF50;
                color: white;
                border: none;
                cursor: pointer;">
                Apply Filter
            </button>
            <div id="currentFilter" style="margin-top: 5px;">Filter: All</div>
        </div>
        '''

        filter_script = f'''
        <script>
        var map;
        var choroplethLayer;
        var allData = {json.dumps(aggregated_data.to_dict(orient='records'))};
        var colormap = {colormap.to_step(6).to_json()};
        var originalGeoJsonData = {json.dumps(geo_data)};

        function getColor(count) {{
            return count > 1000 ? '#800026' :
                count > 500  ? '#BD0026' :
                count > 200  ? '#E31A1C' :
                count > 100  ? '#FC4E2A' :
                count > 50   ? '#FD8D3C' :
                count > 20   ? '#FEB24C' :
                count > 10   ? '#FED976' :
                                '#FFEDA0';
        }}

        function filterDataByAgency() {{
            var selectedAgency = document.getElementById('agencyDropdown').value;
            console.log("Selected Agency:", selectedAgency);
            
            var projectCountsByState = {{}};
            allData.forEach(function(d) {{
                if (selectedAgency === 'All' || d['KEMENTERIAN / AGENSI'] === selectedAgency) {{
                    if (!projectCountsByState[d.state]) {{
                        projectCountsByState[d.state] = 0;
                    }}
                    projectCountsByState[d.state] += d.project_count;
                }}
            }});
            
            console.log("Project counts by state:", projectCountsByState);

            // Remove the existing layer
            map.removeLayer(choroplethLayer);

            // Create a new layer with updated styles and tooltips
            choroplethLayer = L.geoJson(originalGeoJsonData, {{
                style: function(feature) {{
                    var state = feature.properties.shapeName;
                    var count = projectCountsByState[state] || 0;
                    return {{
                        fillColor: count > 0 ? getColor(count) : 'transparent',
                        fillOpacity: count > 0 ? 0.6 : 0,
                        weight: 1,
                        color: 'black'
                    }};
                }},
                onEachFeature: function(feature, layer) {{
                    var state = feature.properties.shapeName;
                    var count = projectCountsByState[state] || 0;
                    var tooltipContent = "<strong>" + state + "</strong><br>Projects: " + count;
                    layer.bindTooltip(tooltipContent, {{sticky: true}});
                }}
            }}).addTo(map);

            document.getElementById('currentFilter').textContent = 'Filter: ' + selectedAgency;
            console.log("Filter applied:", selectedAgency);
        }}

        function initializeCustomMap() {{
            console.log("Initializing custom map features");
            var mapDiv = document.querySelector('.folium-map');
            if (!mapDiv) {{
                console.error("Folium map div not found");
                return;
            }}
            var mapId = mapDiv.id;
            map = window[mapId];
            
            if (!map) {{
                console.error("Folium map object not found");
                return;
            }}

            // Find the choropleth layer
            map.eachLayer(function(layer) {{
                if (layer.feature) {{
                    choroplethLayer = layer;
                    return;
                }}
            }});

            if (!choroplethLayer) {{
                console.error("Choropleth layer not found");
                return;
            }}

            console.log("Choropleth layer:", choroplethLayer);

            document.getElementById('applyFilter').addEventListener('click', filterDataByAgency);
            filterDataByAgency();  // Initial call to set up the map
        }}

        window.addEventListener('load', initializeCustomMap);
        </script>
        '''

        # Insert the filter HTML and script
        html_content = html_content.replace('</body>', f'{filter_html}{filter_script}</body>')

        return html_content

    # Get the map HTML
    map_html = m.get_root().render()

    # Inject JavaScript and dropdown menu
    map_html_with_filtering = inject_agency_dropdown_and_filtering(
        map_html, 
        agencies, 
        aggregated_data,
        geo_data,
        colormap
    )

    # Save the map to an HTML file with filtering capabilities
    with open(r'heatmap.html', 'w', encoding='utf-8') as f:
        f.write(map_html_with_filtering)

    print("Filtered map created and saved as 'heatmap.html'.")