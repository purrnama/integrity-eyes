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

export interface Tender {
  tenderId: number;
  tenderTitle: string;
  tenderNumber: string;
  acquisitionCategory: string;
  ministryAgency: string;
  invitationDate: string;
  invitationClosingDate: string;
  departmentIndicativePrice: string;
}

export interface TenderData {
  id: number;
  tenderId: string;
  projectName: string;
  closingDate: string;
  eligibilityCriteria: string;
  region: string;
  contractingAgency: string;
  departmentIndicativePrice: string;
  contactPerson: string;
}

export interface TenderDataGrid {
  tenders: TenderData[];
}

export interface Tenders {
  tenders: Tender[];
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

export interface Contract {
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

export interface Contracts {
  contracts: Contract[];
}

export interface ElementCount {
  [key: string]: number;
}

export interface TopState {
  state: stateType;
  count: number;
}
export interface TopMinistry {
  ministry: string;
  count: number;
}

export interface CurrentTender {
  count: number;
}
