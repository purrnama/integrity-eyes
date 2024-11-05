import React, { useEffect, useState } from "react";
import { UserIcon } from "@heroicons/react/24/outline";

const CurrentTendersTable = ({ selectedMonth, selectedYear }) => {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTenders = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/current-tenders?month=${selectedMonth}&year=${selectedYear}`,
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Fetched Tenders:", data); // Debugging: Check fetched data
        setTenders(data);
      } catch (error) {
        console.error("Error fetching tenders:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if month and year are defined
    if (selectedMonth && selectedYear) {
      fetchTenders();
    }
  }, [selectedMonth, selectedYear]); // Re-fetch when selectedMonth or selectedYear changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="overflow-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2">Tender ID</th>
            <th className="px-4 py-2">Project Name</th>
            <th className="px-4 py-2">Closing Date</th>
            <th className="px-4 py-2">Eligibility Criteria</th>
            <th className="px-4 py-2">Region</th>
            <th className="px-4 py-2">Contracting Agency</th>
            <th className="px-4 py-2">Contact Person</th>
          </tr>
        </thead>
        <tbody>
          {tenders.length > 0 ? (
            tenders.map((tender, index) => (
              <tr key={index}>
                <td
                  className="border text-sm px-4 py-2 truncate max-w-xs"
                  title={tender["Tender ID"]}
                >
                  {tender["Tender ID"]}
                </td>
                <td
                  className="border text-sm px-4 py-2 truncate max-w-xs"
                  title={tender["Project Name"]}
                >
                  {tender["Project Name"]}
                </td>
                <td
                  className="border text-sm px-4 py-2 truncate max-w-xs"
                  title={tender["Closing Date"]}
                >
                  {tender["Closing Date"]}
                </td>
                <td
                  className="border text-sm px-4 py-2 truncate max-w-xs"
                  title={tender["Eligibility Criteria"]}
                >
                  -
                </td>
                <td
                  className="border text-sm px-4 py-2 truncate max-w-xs"
                  title={tender["Region"]}
                >
                  -
                </td>
                <td
                  className="border text-sm px-4 py-2 truncate max-w-xs"
                  title={tender["Contracting Agency"]}
                >
                  {tender["Contracting Agency"]}
                </td>
                <td className="border text-sm px-4 py-2 truncate max-w-xs">
                  <div className="flex items-center">
                    <UserIcon className="h-6 w-6 text-gray-600 mr-2" />
                    <span className="truncate" title={tender["Contact Person"]}>
                      -
                    </span>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-4">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CurrentTendersTable;
