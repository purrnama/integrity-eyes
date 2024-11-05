import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../navigation/sidebar';
import { UserIcon } from '@heroicons/react/24/outline';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Header from '../navigation/header.js';

const CurrentTenderPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear.toString());
    const [tenders, setTenders] = useState([]);
    const [filteredTenders, setFilteredTenders] = useState([]);
    const [availableYears, setAvailableYears] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const tendersPerPage = 20;

    useEffect(() => {
        fetchTendersData();
        fetchAvailableYears();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [selectedYear, tenders, searchQuery]);

    const applyFilters = () => {
        let filtered = tenders.filter(tender => {
            const closingDateYear = new Date(tender['Closing Date']).getFullYear();
            return closingDateYear === parseInt(selectedYear);
        });

        if (searchQuery) {
            filtered = filtered.filter(tender =>
                tender['Tender ID'].toLowerCase().includes(searchQuery.toLowerCase()) ||
                tender['Project Name'].toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredTenders(filtered);
    };

    const fetchTendersData = async () => {
        axios.get('/get_tender_advertisement')
            .then(response => {
                setTenders(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const fetchAvailableYears = async () => {
        axios.get('/get_tender_advertisement_year')
            .then(response => {
                setAvailableYears(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    // Pagination logic
    const indexOfLastTender = currentPage * tendersPerPage;
    const indexOfFirstTender = indexOfLastTender - tendersPerPage;
    const currentTenders = filteredTenders.slice(indexOfFirstTender, indexOfLastTender);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div className="flex flex-col lg:flex-row">
            <Sidebar onSidebarToggle={setIsSidebarOpen} />
            <div className={`p-6 bg-gray-100 min-h-screen w-full transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
                <Header title={"Tender Advertisement Page"} />
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Current Tenders</h2>
                        <div className="flex items-center">
                            <div className="flex items-center mr-4 w-[400px]">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring w-full"
                                    value={searchQuery}
                                    onChange={handleSearchChange} // Handle search input change
                                />
                            </div>
                            <div className="flex items-center mr-4">
                                <label className="mr-2 text-sm">Year</label>
                                <select
                                    className="border rounded px-4 py-1 text-sm focus:outline-none focus:ring w-full"
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}  // Update the selected year state
                                >
                                    {availableYears.map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-center mr-4">
                                <label className="mr-2 text-sm">Region</label>
                                <select className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring w-full">
                                    <option value="">All</option>
                                    <option value="Johor">Johor</option>
                                    <option value="Selangor">Selangor</option>
                                    <option value="Penang">Penang</option>
                                </select>
                            </div>
                            <div className="flex items-center">
                                <label className="mr-2 text-sm">Contracting Agency</label>
                                <select className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring w-full">
                                    <option value="">All</option>
                                    <option value="Ministry of Housing and Local Government">Ministry of Housing and Local Government</option>
                                    <option value="Johor State Public Works Department">Johor State Public Works Department</option>
                                    {/* Add more options as needed */}
                                </select>
                            </div>
                        </div>
                    </div>
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
                                {currentTenders.length > 0 ? (
                                    currentTenders.map((tender, index) => (
                                        <tr key={index}>
                                            <td className="border text-sm px-4 py-2 truncate max-w-xs" title={tender['Tender ID']}>{tender['Tender ID']}</td>
                                            <td className="border text-sm px-4 py-2 truncate max-w-xs" title={tender['Project Name']}>{tender['Project Name']}</td>
                                            <td className="border text-sm px-4 py-2 truncate max-w-xs" title={tender['Closing Date']}>{tender['Closing Date']}</td>
                                            {/* <td className="border text-sm px-4 py-2 truncate max-w-xs" title={tender['Eligibility Criteria']}>{tender['Eligibility Criteria']}</td> */}
                                            <td className="border text-sm px-4 py-2 truncate max-w-xs" title={tender['Eligibility Criteria']}>-</td>
                                            {/* <td className="border text-sm px-4 py-2 truncate max-w-xs" title={tender['Region']}>{tender['Region']}</td> */}
                                            <td className="border text-sm px-4 py-2 truncate max-w-xs" title={tender['Region']}>-</td>
                                            <td className="border text-sm px-4 py-2 truncate max-w-xs" title={tender['Contracting Agency']}>{tender['Contracting Agency']}</td>
                                            <td className="border text-sm px-4 py-2 truncate max-w-xs">
                                                <div className="flex items-center">
                                                    <UserIcon className="h-6 w-6 text-gray-600 mr-2" />
                                                    {/* <span className="truncate" title={tender['Contact Person']}>{tender['Contact Person']}</span> */}
                                                    <span className="truncate" title={tender['Contact Person']}>-</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center py-4">No data available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-center mt-4">
                        <Stack spacing={2}>
                            <Pagination
                                count={Math.ceil(filteredTenders.length / tendersPerPage)}
                                page={currentPage}
                                onChange={handlePageChange}
                                showFirstButton
                                showLastButton
                            />
                        </Stack>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CurrentTenderPage;
