import * as fs from "fs";
import csv from "csv-parser";
import * as path from "path";
import { CurrentTender, Tender, TenderHeader } from "@/lib/interfaces";
import { NextRequest } from "next/server";
import dayjs from "dayjs";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const month = searchParams.get("month");
  const year = searchParams.get("year");
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
  let df_filtered: Tender[] = [];
  if (month && year) {
    df_filtered = df.filter((tender) => {
      const date = dayjs(tender.invitationDate, "DD/MM/YYYY");
      return date.month() === Number(month) && date.year() === Number(year);
    });
  } else {
    df_filtered = df;
  }

  const currentTender: CurrentTender = { count: df_filtered.length };

  return Response.json(currentTender);
}
