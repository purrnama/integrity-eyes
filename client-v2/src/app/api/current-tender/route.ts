import * as fs from "fs";
import csv from "csv-parser";
import * as path from "path";
import { TenderData, TenderHeader, Tenders } from "@/lib/interfaces";

export async function GET() {
  const df: TenderData[] = [];

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

  const tenders: Tenders = { tenders: df };

  return Response.json(tenders);
}
