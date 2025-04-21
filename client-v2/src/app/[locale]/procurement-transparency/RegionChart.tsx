"use client";

import { useEffect, useState } from "react";
import Heatmap from "./Heatmap";
import HeatmapFilter from "./HeatmapFilter";
import { TenderStateAgency } from "@/lib/interfaces";

export default function RegionChart({ title }: { title: string }) {
  const [tenders, setTenders] = useState<TenderStateAgency[]>();
  const [agencies, setAgencies] = useState<string[]>([]);
  const [filterAgency, setFilterAgency] = useState<string>();
  const [filteredTenders, setFilteredTenders] = useState<TenderStateAgency[]>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/heatmap");
      const data: TenderStateAgency[] = await res.json();
      setTenders(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (tenders) {
      const agencies = tenders
        .map((tender) => tender.agency)
        .filter(
          (agency, index, self) => index === self.findIndex((i) => i === agency)
        )
        .sort();
      agencies.unshift("None");
      setAgencies(agencies);
    }
  }, [tenders]);

  useEffect(() => {
    if (!filterAgency || filterAgency == "None") {
      setFilteredTenders(tenders);
    } else {
      const filtered = tenders?.filter(
        (tender) => tender.agency == filterAgency
      );
      setFilteredTenders(filtered);
    }
  }, [tenders, filterAgency]);

  const handleFilterOnValueChange = (value: unknown) => {
    setFilterAgency(value as string);
  };

  return (
    <div className="flex flex-col flex-1 h-full grow p-4 border border-zinc-300 dark:border-zinc-700 rounded-lg space-y-4">
      <div className="flex flex-row justify-between">
        <h2 className="font-medium">{title}</h2>
        <HeatmapFilter
          agencies={agencies}
          onValueChange={handleFilterOnValueChange}
        />
      </div>
      {filteredTenders && <Heatmap tenders={filteredTenders} />}
    </div>
  );
}
