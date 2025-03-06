"use client";

import CustomNumberField from "@/components/CustomNumberField";
import { ElementCount } from "@/lib/interfaces";
import AppTheme from "@/theme/AppTheme";
import { BarChart } from "@mui/x-charts";
import { useEffect, useState } from "react";

export default function TopCompaniesChart({
  title,
  tooltip,
  topTitle,
}: {
  title: string;
  tooltip: string;
  topTitle: string;
}) {
  const [elements, setElements] = useState<ElementCount>({});
  const [tenders, setTenders] = useState<string[]>([]);
  const [count, setCount] = useState<number[]>([]);
  const [bars, setBars] = useState<number>(5);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/top-companies");
      const data: ElementCount = await res.json();
      setElements(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const sorted = Object.entries(elements).sort(([, a], [, b]) => b - a);
    const sliced = sorted.slice(0, bars);
    setTenders(sliced.map((tender) => tender[0]));
    setCount(sliced.map((tender) => tender[1]));
  }, [bars, elements]);

  return (
    <div className="flex flex-col flex-1 h-full grow p-4 border border-zinc-300 dark:border-zinc-700 rounded-lg">
      <div className="flex flex-row justify-between items-start">
        <h2 className="font-medium">{title}</h2>
        <div className="flex flex-row items-center space-x-2">
          <p className="text-sm font-medium">{topTitle}</p>
          <CustomNumberField
            min={0}
            max={10}
            onValueChanged={(value) => {
              setBars(value ?? 5);
            }}
          />
        </div>
      </div>
      <AppTheme>
        <BarChart
          borderRadius={4}
          colors={["darkorange"]}
          xAxis={[
            {
              scaleType: "band",
              //@ts-expect-error skip type check
              categoryGapRatio: 0.5,
              data: tenders.slice(0, bars),
            },
          ]}
          series={[{ id: "tenders", label: tooltip, data: count }]}
          height={300}
          margin={{ left: 32, right: 32, top: 32, bottom: 32 }}
          grid={{ horizontal: true }}
          slotProps={{ legend: { hidden: true } }}
        />
      </AppTheme>
    </div>
  );
}
