"use client";

import { useEffect, useState } from "react";
import StatCard from "./StatCard";
import { TenderData } from "@/lib/interfaces";

export default function TotalAdvertisementTenders({
  title,
  interval,
}: {
  title: string;
  interval: string;
}) {
  const [tenderCount, setTenderCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/current-tender");
      const data: { tenderData: TenderData[] } = await res.json();
      const count = data.tenderData.length;
      setTenderCount(count);
    };
    fetchData();
  });
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
