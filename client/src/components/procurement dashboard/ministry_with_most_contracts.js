import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const MinistryWithMostContracts = ({ selectedMonth, selectedYear }) => {
  const [ministryData, setMinistryData] = useState({ ministry: '', count: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/top-ministry?month=${selectedMonth}&year=${selectedYear}`);
      const data = await response.json();
      setMinistryData(data);
    };

    if (selectedMonth && selectedYear) {
      fetchData().catch(error => console.error('Error fetching data:', error));
    }
  }, [selectedMonth, selectedYear]);

  return (
    <Link
      to={`/current_awarded_contract_page?ministry=${encodeURIComponent(ministryData.ministry)}`}
    >
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold">Ministry with Most Contracts</h3>
        <div className="flex items-center mt-4">
          <p className="text-2xl font-bold mr-20">{ministryData.count}</p>
          <p className="text-xs text-gray-600 -ml-14">{ministryData.ministry}</p>
        </div>
      </div>
    </Link>
  );
};

export default MinistryWithMostContracts;
