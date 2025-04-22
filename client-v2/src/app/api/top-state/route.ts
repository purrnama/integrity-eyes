import * as fs from "fs";
import csv from "csv-parser";
import * as path from "path";
import {
  Contract,
  ContractHeader,
  ElementCount,
  states,
  stateType,
  TopState,
} from "@/lib/interfaces";
import { NextRequest } from "next/server";
import dayjs from "dayjs";

function extractStateFromAddress(address: string) {
  address.toLowerCase();
  for (const state in states) {
    if (address.indexOf(state) >= 0) {
      return states[state];
    }
  }
  return "Unknown";
}

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
  let df_filtered_date: Contract[] = [];
  if (month && year) {
    df_filtered_date = df.filter((contract) => {
      const date = dayjs(contract.resultDisplayDate, "DD/MM/YYYY");
      return date.month() == Number(month) && date.year() == Number(year);
    });
  } else {
    df_filtered_date = df;
  }
  df_filtered_date.map((data) => {
    data.state = extractStateFromAddress(
      data.winningTendererAddress
    ) as stateType;
  });

  const df_filtered_unknown = df_filtered_date.filter(
    (data) => data.state !== "Unknown"
  );

  const s: ElementCount = {};
  let sCount = 0;
  let res = "Unknown";

  df_filtered_unknown.map((data) => {
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
