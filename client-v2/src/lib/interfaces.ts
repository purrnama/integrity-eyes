export const states = [
  "johor",
  "kedah",
  "kelantan",
  "melaka",
  "negeri sembilan",
  "pahang",
  "pulau pinang",
  "perak",
  "perlis",
  "sabah",
  "sarawak",
  "selangor",
  "terengganu",
  "kuala lumpur",
];

export type stateType =
  | "johor"
  | "kedah"
  | "kelantan"
  | "melaka"
  | "negeri sembilan"
  | "pahang"
  | "pulau pinang"
  | "perak"
  | "perlis"
  | "sabah"
  | "sarawak"
  | "selangor"
  | "terengganu"
  | "kuala lumpur"
  | "Unknown";

export const TenderHeader = [
  "tenderId",
  "tenderTitle",
  "tenderNumber",
  "acquisitionCategory",
  "ministryAgency",
  "invitationDate",
  "invitationClosingDate",
  "departmentIndicativePrice",
];

export interface TenderData {
  tenderId: number;
  tenderTitle: string;
  tenderNumber: string;
  acquisitionCategory: string;
  ministryAgency: string;
  invitationDate: string;
  invitationClosingDate: string;
  departmentIndicativePrice: string;
}

export const ContractHeader = [
  "contractId",
  "tenderName",
  "tenderNumber",
  "acquisitionCategory",
  "ministryAgency",
  "winningTenderer",
  "agreedAcceptedPrice",
  "winningTendererAddress",
  "pbmResultDate",
  "sstDate",
  "resultDisplayDate",
  "location",
  "latitude",
  "longitude",
];

export interface ContractData {
  contractId: number;
  tenderName: string;
  tenderNumber: string;
  acquisitionCategory: string;
  ministryAgency: string;
  winningTenderer: string;
  agreedAcceptedPrice: number;
  winningTendererAddress: string;
  pbmResultDate: string;
  sstDate: string;
  resultDisplayDate: string;
  location: string;
  latitude: number;
  longitude: number;
  state?: stateType;
}

export interface stateCount {
  johor?: number;
  kedah?: number;
  kelantan?: number;
  melaka?: number;
  "negeri sembilan"?: number;
  pahang?: number;
  "pulau pinang"?: number;
  perak?: number;
  perlis?: number;
  sabah?: number;
  sarawak?: number;
  selangor?: number;
  terengganu?: number;
  "kuala lumpur"?: number;
  Unknown?: number;
}

export interface TopState {
  state: stateType;
  count: number;
}
