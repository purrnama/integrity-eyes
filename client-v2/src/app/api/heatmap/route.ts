import * as fs from "fs";
import csv from "csv-parser";
import * as path from "path";
import {
  Contract,
  ContractHeader,
  stateMapping,
  TenderStateAgency,
} from "@/lib/interfaces";

export async function GET() {
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

  const result: TenderStateAgency[] = [];

  df.map((data) => {
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
