"use client";

import { useEffect, useState } from "react";
import StatCard from "./StatCard";
import { ContractData } from "@/lib/interfaces";

export default function TotalAwardedContracts({
  title,
  interval,
}: {
  title: string;
  interval: string;
}) {
  const [contractCount, setContractCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/total-awarded-contracts");
      const data: { contractData: ContractData[] } = await res.json();
      const count = data.contractData.length;
      setContractCount(count);
    };
    fetchData();
  });
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
