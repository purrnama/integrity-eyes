import * as fs from "fs";
import csv from "csv-parser";
import * as path from "path";
import {
  Tender,
  TenderData,
  TenderDataGrid,
  TenderHeader,
} from "@/lib/interfaces";

export async function GET() {
  const df: Tender[] = [];

  const filePath = path.join(process.cwd(), "/src/lib/merged_dataset.csv");

  await new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv(TenderHeader))
      .on("data", (data) => df.push(data))
      .on("end", () => {
        resolve(df);
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      });
  });

  df.shift();

  const tenderData: TenderData[] = [];
  df.map((tender) => {
    tenderData.push({
      id: tender.tenderId,
      tenderId: tender.tenderNumber,
      projectName: tender.tenderTitle,
      closingDate: tender.invitationClosingDate,
      eligibilityCriteria: tender.acquisitionCategory,
      region: "",
      contractingAgency: tender.ministryAgency,
      departmentIndicativePrice: tender.departmentIndicativePrice,
      contactPerson: "",
    });
  });

  const tenderDataTable: TenderDataGrid = { tenders: tenderData };
  return Response.json(tenderDataTable);
}
