"use client";

import AppTheme from "@/theme/AppTheme";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef<(typeof rows)[number]>[] = [
  {
    field: "id",
    headerName: "Tender ID",
    width: 90,
  },
  { field: "projectName", headerName: "Project Name", width: 300 },
  { field: "closingDate", headerName: "Closing Date", width: 150 },
  {
    field: "eligibilityCriteria",
    headerName: "Eligibility Criteria",
    width: 150,
  },
  { field: "region", headerName: "Region", width: 150 },
  { field: "contractingAgency", headerName: "Contracting Agency", width: 300 },
  { field: "contactPerson", headerName: "Contact Person", width: 300 },
];

const rows = [
  {
    id: "0",
    projectName:
      "PERKHIDMATAN MEMASANG DAN MENYELENGGARA JALUR GEMILANG PADA BANGUNAN-BANGUNAN SEPANJANG PERSIARAN PERDANA PRESINT 2 3 DAN 4 SEMPENA SAMBUTAN HARI KEBANGSAAN TAHUN 2024 DI WILAYAH PERSEKUTUAN PUTRAJAYA",
    closingDate: "24/07/2024",
    eligibilityCriteria: "",
    region: "Kuala Lumpur",
    contractingAgency: "PERDANA SDN. BHD.",
    contactPerson: "AHMAD BIN ALI",
  },
];

export default function CurrentTendersDataGrid({ title }: { title: string }) {
  return (
    <div className="flex flex-col space-y-4 w-full h-full min-h-[400px] grow p-4 border border-zinc-300 dark:border-zinc-700 rounded-lg">
      <h2 className="font-medium">{title}</h2>
      <AppTheme>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          pageSizeOptions={[10]}
          disableRowSelectionOnClick
        />
      </AppTheme>
    </div>
  );
}
