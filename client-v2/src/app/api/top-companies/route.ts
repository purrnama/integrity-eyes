import * as fs from "fs";
import csv from "csv-parser";
import * as path from "path";
import { Contract, ContractHeader, ElementCount } from "@/lib/interfaces";
import { NextRequest } from "next/server";
import dayjs from "dayjs";

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
      .on("error", (error) => {
        console.log(error);
      })
      .pipe(csv(ContractHeader))
      .on("data", (data) => df.push(data))
      .on("end", () => {
        resolve(df);
      })
      .on("error", (err) => {
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

  const tenderers: ElementCount = {};

  df_filtered.map((data) => {
    const tender = data.winningTenderer;
    tenderers[tender] = (tenderers[tender] || 0) + 1;
  });

  return Response.json(tenderers);
}
