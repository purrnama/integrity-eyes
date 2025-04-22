"use client";

import { useEffect, useState } from "react";
import StatCard from "./StatCard";
import { TopState } from "@/lib/interfaces";
import { useSearchParams } from "next/navigation";

export default function RegionWithMostContracts({
  title,
  interval,
}: {
  title: string;
  interval: string;
}) {
  const searchParams = useSearchParams();
  const month = searchParams.get("month");
  const year = searchParams.get("year");
  const [topState, setTopState] = useState<string>("");
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "/api/top-state?month=" + (month ?? "") + "&year=" + (year ?? "")
      );
      const data: TopState = await res.json();
      setTopState(data.state.toUpperCase());
      setCount(data.count);
    };
    fetchData();
  }, [month, year]);

  return (
    <StatCard
      title={title}
      subtitle={topState}
      value={count.toString()}
      interval={interval}
    />
  );
}
