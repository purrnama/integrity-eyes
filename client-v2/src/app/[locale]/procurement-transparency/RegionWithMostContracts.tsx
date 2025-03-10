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
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/top-state");
      const data: TopState = await res.json();
      setTopState(data.state.toUpperCase());
      setCount(data.count);
    };
    fetchData();
  });
  return (
    <StatCard
      title={title}
      subtitle={topState}
      value={count.toString()}
      interval={interval}
    />
  );
}
