import * as fs from "fs";
import csv from "csv-parser";
import * as path from "path";
import {
  Contract,
  ContractHeader,
  ElementCount,
  StateHeatmapValues,
} from "@/lib/interfaces";

const stateMapping: { [key: string]: string } = {
  melaka: "Melaka",
  "kuala lumpur": "Kuala Lumpur",
  sabah: "Sabah",
  pahang: "Pahang",
  ipoh: "Perak",
  johor: "Johor",
  terengganu: "Terengganu",
  "pulau pinang": "Penang",
  kelantan: "Kelantan",
  kedah: "Kedah",
  perak: "Perak",
  kuching: "Sarawak",
  sarawak: "Sarawak",
  "petaling jaya": "Selangor",
  selangor: "Selangor",
  "shah alam": "Selangor",
  perlis: "Perlis",
  "negeri sembilan": "Negeri Sembilan",
  "kota kinabalu": "Sabah",
  penang: "Penang",
  putrajaya: "Putrajaya",
  labuan: "Labuan",
};

export async function GET() {
  const df: Contract[] = [];

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

  const s: ElementCount = {};
  let totalMapped = 0;

  df.map((data) => {
    const location = data.location ? data.location.toLowerCase() : "unknown";
    for (const [key, state] of Object.entries(stateMapping)) {
      if (location.indexOf(key) >= 0) {
        s[state] = (s[state] || 0) + 1;
        totalMapped++;
        continue;
      }
    }
  });

  const result: StateHeatmapValues = {};

  for (const [state, count] of Object.entries(s)) {
    if (state !== "Unknown") {
      result[state] = { count: 0, colormap: 0 };
      result[state].count = count;
      result[state].colormap = Math.floor((count / totalMapped) * 100);
    }
  }

  return Response.json(result);
}
