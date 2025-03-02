"use client";

import AppTheme from "@/theme/AppTheme";
import { BarChart } from "@mui/x-charts";

export default function TopCompaniesChart({
  title,
  tooltip,
}: {
  title: string;
  tooltip: string;
}) {
  return (
    <div className="flex flex-col flex-1 h-full grow p-4 border border-zinc-300 dark:border-zinc-700 rounded-lg">
      <h2 className="font-medium">{title}</h2>
      <AppTheme>
        <BarChart
          borderRadius={4}
          colors={["darkorange"]}
          xAxis={[
            {
              scaleType: "band",
              //@ts-expect-error skip type check
              categoryGapRatio: 0.5,
              data: [
                "KOSAS SDN. BHD.",
                "PERDANA SDN. BHD.",
                "MUTIARA SDN. BHD.",
                "AUSTIN SDN. BHD.",
                "JAYA SDN. BHD.",
              ],
            },
          ]}
          series={[{ id: "tenders", label: tooltip, data: [4, 3, 2, 1, 1] }]}
          height={300}
          margin={{ left: 24, right: 24, top: 32, bottom: 32 }}
          grid={{ horizontal: true }}
          slotProps={{ legend: { hidden: true } }}
        />
      </AppTheme>
    </div>
  );
}
