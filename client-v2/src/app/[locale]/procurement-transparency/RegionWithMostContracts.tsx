"use client";

import { useEffect, useState } from "react";
import StatCard from "./StatCard";
import { TopState } from "@/lib/interfaces";

export default function RegionWithMostContracts({
  title,
  interval,
}: {
  title: string;
  interval: string;
}) {
  const [topState, setTopState] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/top-state");
      const data: TopState = await res.json();
      setTopState(data.state.charAt(0).toUpperCase() + data.state.slice(1));
    };
    fetchData();
  });
  return (
    <StatCard
      title={title}
      value={topState}
      interval={interval}
      percentage="+30%"
      trend="down"
      data={[97, 45, 19, 84, 90, 98, 73, 44, 96, 34]}
    />
  );
}
