"use client";

import { TenderDataGrid } from "@/lib/interfaces";
import AppTheme from "@/theme/AppTheme";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const columns: GridColDef[] = [
  { field: "id", headerName: "Num.", width: 90 },
  {
    field: "tenderId",
    headerName: "Tender ID",
    width: 200,
  },
  { field: "projectName", headerName: "Project Name", width: 400 },
  { field: "closingDate", headerName: "Closing Date", width: 150 },
  {
    field: "eligibilityCriteria",
    headerName: "Eligibility Criteria",
    width: 200,
  },
  { field: "region", headerName: "Region", width: 150 },
  { field: "contractingAgency", headerName: "Contracting Agency", width: 300 },
  {
    field: "departmentIndicativePrice",
    headerName: "Department Indicative Price",
    width: 300,
  },
  { field: "contactPerson", headerName: "Contact Person", width: 300 },
];

export default function CurrentTendersDataGrid({ title }: { title: string }) {
  const searchParams = useSearchParams();
  const month = searchParams.get("month");
  const year = searchParams.get("year");
  const [tenderDataGrid, setTenderDataGrid] = useState<TenderDataGrid>({
    tenders: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "/api/current-tenders?month=" + (month ?? "") + "&year=" + (year ?? "")
      );
      const data: TenderDataGrid = await res.json();
      setTenderDataGrid(data);
    };
    fetchData();
  }, [month, year]);

  return (
    <div className="flex flex-col space-y-4 w-full h-full min-h-[400px] grow p-4 border border-zinc-300 dark:border-zinc-700 rounded-lg">
      <h2 className="font-medium">{title}</h2>
      <AppTheme>
        <DataGrid
          rows={tenderDataGrid.tenders}
          columns={columns}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          pageSizeOptions={[10]}
          disableRowSelectionOnClick
        />
      </AppTheme>
    </div>
  );
}
