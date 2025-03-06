"use client";

import { malaysiaGeoJSON } from "@/lib/MalaysiaGeoJSON";
import { Layer, Point } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useTranslations } from "next-intl";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";

export default function Heatmap() {
  const intl = useTranslations("heatmap");
  const mapStyle = {
    color: "black",
    fillColor: "orange",
    fillOpacity: 0.7,
    weight: 1,
    fontFamily: "Inter",
  };
  // @ts-expect-error skip feature type check
  const onEachState = (state, layer: Layer) => {
    const name = state.properties.shapeName;
    layer.bindTooltip(`<b>${name}</b><br/>${intl("Projects")}:`, {
      sticky: true,
      offset: new Point(10, 0),
    });
  };
  return (
    Boolean(window !== undefined) && (
      <MapContainer
        center={[4.63, 108.25]}
        zoom={5}
        className="h-[300px] rounded-md"
      >
        <TileLayer
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
          url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
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
