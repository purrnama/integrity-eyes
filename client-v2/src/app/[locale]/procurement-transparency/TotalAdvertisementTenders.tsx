"use client";

import { useEffect, useState } from "react";
import StatCard from "./StatCard";
import { CurrentTender } from "@/lib/interfaces";
import { useSearchParams } from "next/navigation";

export default function TotalAdvertisementTenders({
  title,
  interval,
}: {
  title: string;
  interval: string;
}) {
  const searchParams = useSearchParams();
  const month = searchParams.get("month");
  const year = searchParams.get("year");
  const [tenderCount, setTenderCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "/api/current-tender?month=" + (month ?? "") + "&year=" + (year ?? "")
      );
      const data: CurrentTender = await res.json();
      setTenderCount(data.count);
    };
    fetchData();
  }, [month, year]);

  return (
    <StatCard
      title={title}
      value={tenderCount.toString()}
      interval={interval}
      percentage="+30%"
      trend="up"
      data={[34, 58, 25, 18, 52, 39, 26, 96, 19, 76]}
    />
  );
}
