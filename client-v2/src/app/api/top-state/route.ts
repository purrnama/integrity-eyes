import * as fs from "fs";
import csv from "csv-parser";
import * as path from "path";
import {
  ContractData,
  ContractHeader,
  ElementCount,
  states,
  stateType,
  TopState,
} from "@/lib/interfaces";

function extractStateFromAddress(address: string) {
  address.toLowerCase();
  for (const state in states) {
    if (address.indexOf(state) >= 0) {
      return states[state];
    }
  }
  return "Unknown";
}

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
  df.map((data) => {
    data.state = extractStateFromAddress(
      data.winningTendererAddress,
    ) as stateType;
  });

  const filteredDf = df.filter((data) => data.state !== "Unknown");

  const s: ElementCount = {};
  let sCount = 0;
  let res = "Unknown";

  filteredDf.map((data) => {
    const state: stateType = data.state ? data.state : "Unknown";
    s[state] = (s[state] || 0) + 1;
    if (s[state] > sCount) {
      sCount = s[state];
      res = state;
    }
  });

  const result: TopState = { state: res as stateType, count: sCount };

  return Response.json(result);
}
