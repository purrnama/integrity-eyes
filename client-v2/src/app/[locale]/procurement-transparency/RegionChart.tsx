"use client";

import { useEffect, useState } from "react";
import Heatmap from "./Heatmap";
import HeatmapFilter from "./HeatmapFilter";
import { StateHeatmapValues } from "@/lib/interfaces";

export default function RegionChart({ title }: { title: string }) {
  const [values, setValues] = useState<StateHeatmapValues>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/heatmap");
      const data: StateHeatmapValues = await res.json();
      setValues(data);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col flex-1 h-full grow p-4 border border-zinc-300 dark:border-zinc-700 rounded-lg space-y-4">
      <div className="flex flex-row justify-between">
        <h2 className="font-medium">{title}</h2>
        <HeatmapFilter />
      </div>
      {values && <Heatmap states={values} />}
    </div>
  );
}
