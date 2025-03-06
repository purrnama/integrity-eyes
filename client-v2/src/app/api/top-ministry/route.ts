import * as fs from "fs";
import csv from "csv-parser";
import * as path from "path";
import { ContractData, ContractHeader, elementCount } from "@/lib/interfaces";

export async function GET() {
  const df: ContractData[] = [];

  const filePath = path.join(
    process.cwd(),
    "/src/lib/output_with_location.csv",
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

  const m: elementCount = {};
  let mCount = 0;
  let res = "";

  df.map((data) => {
    const ministry = data.ministryAgency;
    m[ministry] = (m[ministry] || 0) + 1;
    if (m[ministry] > mCount) {
      mCount = m[ministry];
      res = ministry;
    }
  });

  const result = { ministry: res, count: mCount };

  return Response.json(result);
}
