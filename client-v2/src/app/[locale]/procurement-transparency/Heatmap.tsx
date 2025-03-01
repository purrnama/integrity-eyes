"use client";

import { malaysiaGeoJSON } from "@/lib/MalaysiaGeoJSON";
import { Layer, Point } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";

export default function Heatmap() {
  const mapStyle = {
    color: "black",
    fillColor: "orange",
    fillOpacity: 0.7,
    weight: 1,
  };
  // @ts-expect-error skip feature type check
  const onEachState = (state, layer: Layer) => {
    const name = state.properties.shapeName;
    layer.bindTooltip(`<b>${name}</b><br/>Projects:`, {
      sticky: true,
      offset: new Point(10, 0),
    });
  };
  return (
    Boolean(window !== undefined) && (
      <MapContainer
        center={[5.63, 108.25]}
        zoom={5}
        className="h-[300px] rounded-md"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
          <GeoJSON
            // @ts-expect-error skip string type check
            data={malaysiaGeoJSON.features}
            style={mapStyle}
            onEachFeature={onEachState}
          />
        }
      </MapContainer>
    )
  );
}
