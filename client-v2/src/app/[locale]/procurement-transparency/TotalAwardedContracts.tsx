"use client";

import { useEffect, useState } from "react";
import StatCard from "./StatCard";
import { Contracts } from "@/lib/interfaces";
import { useSearchParams } from "next/navigation";

export default function TotalAwardedContracts({
  title,
  interval,
}: {
  title: string;
  interval: string;
}) {
  const searchParams = useSearchParams();
  const month = searchParams.get("month");
  const year = searchParams.get("year");
  const [contractCount, setContractCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "/api/total-awarded-contracts?month=" +
          (month ?? "") +
          "&year=" +
          (year ?? "")
      );
      const data: Contracts = await res.json();
      const count = data.contracts.length;
      setContractCount(count);
    };
    fetchData();
  }, [month, year]);

  return (
    <StatCard
      title={title}
      value={contractCount.toString()}
      interval={interval}
      percentage="+30%"
      trend="up"
      data={[14, 46, 54, 40, 11, 15, 31, 15, 86, 85]}
    />
  );
}
