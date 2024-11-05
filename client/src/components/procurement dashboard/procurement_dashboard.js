import React, { useState } from "react";
import Sidebar from "../navigation/sidebar";
import AwardedContractBarChart from "./awarded_contract_barchart";
import TotalAwardedContracts from "./total_awarded_contracts";
import ContractsRegion from "./region_with_most_contract";
import MinistryWithMostContracts from "./ministry_with_most_contracts";
import TotalAdvertisementTenders from "./total_current_tenders";
import CurrentTendersTable from "./current_tender_table.js";
import {
  ArrowsPointingOutIcon,
  MegaphoneIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Heatmap from "./heatmap.js";
import Header from "../navigation/header.js";

const ProcurementDashboard = () => {
  // Get the current month and year
  const currentDate = new Date();
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
  const currentYear = currentDate.getFullYear();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  // Month options
  const months = [
    { value: "", label: "Select Month" },
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  // Year options (for example, from 2020 to the current year)
  const years = Array.from(
    { length: currentYear - 2019 },
    (_, i) => currentYear - i
  );

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Sidebar */}
      <Sidebar onSidebarToggle={setIsSidebarOpen} />
      {/* Main Dashboard Content */}
      <div
        className={`p-6 bg-gray-100 min-h-screen w-full transition-all duration-300 ${
          isSidebarOpen ? "lg:ml-64" : "lg:ml-20"
        }`}
      >
        <Header title={"Procurement Transparency Dashboard"} />
        {/* Filters Section */}
        <div className="mb-4 flex gap-4">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className=" font-bold font-lato px-4 py-2 bg-white border border-white rounded-lg transition-all duration-200"
          >
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className=" font-bold font-lato px-4 py-2 bg-white border border-white rounded-lg transition-all duration-200"
          >
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 gap-6 mb-5 font-roboto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <MegaphoneIcon className="h-6 w-6 text-gray-600 mr-3" />
              <h3 className="text-lg font-semibold">Dashboard Remark</h3>
            </div>
            <h4 className="ml-4 font-semibold">Sources</h4>
            <ol className="list-decimal text-md pl-9 list-outside">
              <li>
                MyProcurement Malaysian Ministry of Finance portal{" "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://myprocurement.treasury.gov.my"
                >
                  https://myprocurement.treasury.gov.my
                </a>
              </li>
              <li>
                CIDB Construction Industry Development Board:{" "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.cidb.gov.my"
                >
                  https://www.cidb.gov.my
                </a>
              </li>
              <li>
                JKR Jabatan Kerja Raya Malaysia-Public Works Department of
                Malaysia:{" "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.jkr.gov.my"
                >
                  https://www.jkr.gov.my
                </a>
              </li>
              <li>
                Eperolehan-Malaysian electronic procurement system{" "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://home.eprolehan.gov.my"
                >
                  https://home.eprolehan.gov.my
                </a>
              </li>
              <li>
                Dashboard source code{" "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://github.com/purrnama/integrity-eyes"
                >
                  https://github.com/purrnama/integrity-eyes
                </a>
              </li>
            </ol>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 font-roboto">
          <TotalAdvertisementTenders
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
          />
          <TotalAwardedContracts
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
          />
          <ContractsRegion
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
          />
          <MinistryWithMostContracts
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-5 font-roboto">
          <AwardedContractBarChart
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
          />
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Regions & Sectors</h2>
            </div>
            <Heatmap />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Current Tenders</h2>
            <div className="flex items-center">
              <Link to="/current_tender_page">
                <div className="flex items-center">
                  <ArrowsPointingOutIcon className="h-6 w-6 text-gray-600 ml-3" />
                </div>
              </Link>
            </div>
          </div>
          <CurrentTendersTable
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
          />
        </div>
      </div>
    </div>
  );
};

export default ProcurementDashboard;
