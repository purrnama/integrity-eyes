import * as fs from "fs";
import csv from "csv-parser";
import * as path from "path";
import {
  Contract,
  ContractHeader,
  stateMapping,
  TenderStateAgency,
} from "@/lib/interfaces";
import dayjs from "dayjs";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const month = searchParams.get("month");
  const year = searchParams.get("year");
  const df: Contract[] = [];

  const filePath = path.join(
    process.cwd(),
    "/src/lib/output_with_location.csv"
  );

  await new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv(ContractHeader))
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
  let df_filtered: Contract[] = [];
  if (month && year) {
    df_filtered = df.filter((contract) => {
      const date = dayjs(contract.resultDisplayDate, "DD/MM/YYYY");
      return date.month() == Number(month) && date.year() == Number(year);
    });
  } else {
    df_filtered = df;
  }

  const result: TenderStateAgency[] = [];

  df_filtered.map((data) => {
    const location = data.location ? data.location.toLowerCase() : "unknown";
    const tender: TenderStateAgency = { name: "", state: "", agency: "" };
    for (const [key, state] of Object.entries(stateMapping)) {
      if (location.indexOf(key) >= 0) {
        tender.state = state;
        tender.name = data.tenderName;
        tender.agency = data.ministryAgency;
        result.push(tender);
        continue;
      }
    }
  });
  return Response.json(result);
}
