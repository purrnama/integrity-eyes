import React, { useEffect, useState } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

const TotalAwardedContracts = ({ selectedMonth, selectedYear }) => {
  const [currentMonthCount, setCurrentMonthCount] = useState(0);
  const [percentage_difference, setDifference] = useState(0);
  const [status, setStatus] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `/total-awarded-contracts?month=${selectedMonth}&year=${selectedYear}`,
      );
      const data = await response.json();
      setCurrentMonthCount(data.count);
      setDifference(data.percentage_difference);
      setStatus(data.status);
    };
    if (selectedMonth && selectedYear) {
      fetchData().catch((error) =>
        console.error("Error fetching data:", error),
      );
    }
  }, [selectedMonth, selectedYear]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">Total Awarded Contracts</h3>
      <div className="flex items-center mt-4">
        <p className="text-2xl font-bold mr-20">{currentMonthCount}</p>
        {status === "positive" ? (
          <>
            <ChevronUpIcon className="h-3 w-3 text-orange-600 mr-2 -ml-12" />
            <p className="text-sm text-gray-600">
              +{percentage_difference}% since last month
            </p>
          </>
        ) : status === "negative" ? (
          <>
            <ChevronDownIcon className="h-3 w-3 text-red-600 mr-2 -ml-12" />
            <p className="text-sm text-gray-600">
              {percentage_difference}% since last month
            </p>
          </>
        ) : (
          <p className="text-sm text-gray-600">No change since last month</p>
        )}
      </div>
    </div>
  );
};

export default TotalAwardedContracts;
