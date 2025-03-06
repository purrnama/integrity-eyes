import * as fs from "fs";
import csv from "csv-parser";
import * as path from "path";
import { ContractData, ContractHeader, Contracts } from "@/lib/interfaces";

export async function GET() {
  const df: ContractData[] = [];

  const filePath = path.join(
    process.cwd(),
    "/src/lib/output_with_location.csv",
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

  const contracts: Contracts = { contracts: df };

  return Response.json(contracts);
}
