"use client";

import AppTheme from "@/theme/AppTheme";
import { SparkLineChart } from "@mui/x-charts";
import { areaElementClasses } from "@mui/x-charts/LineChart";

export type StatCardProps = {
  title: string;
  subtitle?: string;
  value: string;
  interval: string;
  percentage?: string;
  trend?: "up" | "down" | "neutral";
  data?: number[];
};

function AreaGradient({ color, id }: { color: string; id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity={0.3} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  );
}

const trendColors = {
  up: "darkorange",
  down: "orangered",
  neutral: "lightgray",
};

export default function StatCard({
  title,
  subtitle,
  value,
  interval,
  percentage,
  trend,
  data,
}: StatCardProps) {
  const chartColor = trendColors[trend ?? "neutral"];
  return (
    <div className="flex flex-col flex-1 space-y-1 h-full grow p-4 border border-zinc-300 dark:border-zinc-700 rounded-lg">
      <h2 className="font-medium">{title}</h2>
      <div className={"flex flex-col grow " + (data ? "justify-between" : "")}>
        <div className="flex flex-row justify-between">
          <h4 className="text-2xl font-bold">{value}</h4>
          {percentage && (
            <div className="flex items-center">
              <div
                className={
                  "flex items-center border rounded-full px-1 " +
                  (trend == "up"
                    ? "border-orange-400/50 bg-orange-400/5"
                    : trend == "down"
                    ? "border-orange-600/50 bg-orange-600/5"
                    : trend == "neutral"
                    ? "border-zinc-700/50 dark:bg-zinc-700/5"
                    : "")
                }
              >
                <span className="text-xs border-zinc-600/">{percentage}</span>
              </div>
            </div>
          )}
        </div>
        <p className="text-xs opacity-80">{interval}</p>
      </div>
      <p className="text-sm opacity-80">{subtitle ?? " "}</p>
      {data && (
        <div className="w-full">
          <AppTheme>
            <SparkLineChart
              colors={[chartColor]}
              height={50}
              data={data ?? []}
              showTooltip
              showHighlight
              area
              xAxis={{
                scaleType: "band",
              }}
              sx={{
                [`& .${areaElementClasses.root}`]: {
                  fill: `url(#area-gradient-${value})`,
                },
              }}
            >
              <AreaGradient color={chartColor} id={`area-gradient-${value}`} />
            </SparkLineChart>
          </AppTheme>
        </div>
      )}
    </div>
  );
}
