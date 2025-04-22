"use client";

import { useEffect, useState } from "react";
import StatCard from "./StatCard";
import { TopMinistry } from "@/lib/interfaces";
import { useSearchParams } from "next/navigation";

export default function MinistryWithMostContracts({
  title,
  interval,
}: {
  title: string;
  interval: string;
}) {
  const searchParams = useSearchParams();
  const month = searchParams.get("month");
  const year = searchParams.get("year");
  const [topMinistry, setTopMinistry] = useState<string>("");
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "/api/top-ministry?month=" + (month ?? "") + "&year=" + (year ?? "")
      );
      const data: TopMinistry = await res.json();
      setTopMinistry(data.ministry);
      setCount(data.count);
    };
    fetchData();
  }, [month, year]);

  return (
    <StatCard
      title={title}
      subtitle={topMinistry}
      value={count.toString()}
      interval={interval}
    />
  );
}
