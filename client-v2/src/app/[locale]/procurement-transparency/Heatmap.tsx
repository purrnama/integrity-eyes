"use client";

import { ElementCount, TenderStateAgency } from "@/lib/interfaces";
import { malaysiaGeoJSON } from "@/lib/MalaysiaGeoJSON";
import createColormap from "colormap";
import { Point } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";

const heatmapColors = createColormap<"hex">({
  colormap: "hot",
  format: "hex",
  nshades: 100,
  alpha: 0.7,
}).reverse();

export default function Heatmap({ tenders }: { tenders: TenderStateAgency[] }) {
  const [stateCount, setStateCount] = useState<ElementCount>({});
  const [totalCount, setTotalCount] = useState<number>(1);
  const intl = useTranslations("heatmap");

  const mapStyle = {
    color: "black",
    fillOpacity: 0.7,
    weight: 1,
    fontFamily: "Inter",
  };

  useEffect(() => {
    const s: ElementCount = {};
    let total = 0;
    tenders.map((tender) => {
      const state = tender.state;
      s[state] = (s[state] || 0) + 1;
      total++;
    });
    setStateCount(s);
    setTotalCount(total);
  }, [tenders]);

  // @ts-expect-error skip feature type check
  const onEachState = (state, layer) => {
    const name = state.properties.shapeName;
    let count = 0;
    let colormap = 0;
    if (stateCount[name] !== undefined) {
      count = stateCount[name];
      colormap = Math.floor((count / totalCount) * 100 * 2);
    }
    layer.options.fillColor = heatmapColors[colormap];
    layer.bindTooltip(`<b>${name}</b><br/>${intl("Projects")}: ${count}`, {
      sticky: true,
      offset: new Point(10, 0),
      className: "font-sans",
    });
  };
  return (
    Boolean(window !== undefined) && (
      <MapContainer
        key={JSON.stringify(tenders)}
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
