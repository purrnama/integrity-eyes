import * as fs from "fs";
import csv from "csv-parser";
import * as path from "path";
import { ContractData, ContractHeader, ElementCount } from "@/lib/interfaces";

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

  const tenderers: ElementCount = {};

  df.map((data) => {
    const tender = data.winningTenderer;
    tenderers[tender] = (tenderers[tender] || 0) + 1;
  });

  return Response.json(tenderers);
}
