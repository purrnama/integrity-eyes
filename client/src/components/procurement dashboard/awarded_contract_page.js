import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../navigation/sidebar';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Header from '../navigation/header.js';
import { useLocation } from 'react-router-dom';

const CurrentAwardedContractPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear.toString());
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedCategory, setSelectedCategory,] = useState('');
    const [selectedMinistry, setSelectedMinistry,] = useState('');
    const [regions, setRegion] = useState([]);
    const [categories, setCategory] = useState([]);
    const [ministries, setMinistry] = useState([]);
    const [tenders, setTenders] = useState([]);
    const [filteredTenders, setFilteredTenders] = useState([]);
    const [availableYears, setAvailableYears] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    var searchData;
    var send_ministry;
    if (params.get('searchData') === 'None') {
        searchData = '';
    } else {
        searchData = params.get('searchData');
    }

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const tendersPerPage = 20;

    useEffect(() => {
        if (searchData) {
            setSearchQuery(searchData);
        }
        if(params.get('ministry') === 'None') {
            send_ministry = '';
        } else {
            send_ministry = params.get('ministry');
            setSelectedMinistry(send_ministry);
        }
        fetchTendersData();
        fetchAvailableYears();
        fetchRegion();
        fetchCategory();
        fetchMinistry();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [selectedYear, selectedRegion,selectedCategory,selectedMinistry, tenders, searchQuery]); // Added selectedRegion to dependencies

    const applyFilters = () => {
        let filtered = tenders.filter(tender => {
            const closingDateYear = new Date(tender['Result Display Day']).getFullYear();
            const isYearMatch = closingDateYear === parseInt(selectedYear);
            const isRegionMatch = selectedRegion ? tender['Region'] === selectedRegion : true; // Filter by region if selected
            const isCategoryMatch = selectedCategory ? tender['Acquisition Category'] === selectedCategory : true;
            const isMinistryMatch = selectedMinistry ? tender['Ministry/ Agencies'] === selectedMinistry : true;
            return isYearMatch && isRegionMatch && isCategoryMatch && isMinistryMatch; // Return true only if both conditions are met
        });

        if (searchQuery) {
            filtered = filtered.filter(tender =>
                (tender['Tender ID'] && tender['Tender ID'].toLowerCase().includes(searchQuery.toLowerCase())) ||
                (tender['Project Name'] && tender['Project Name'].toLowerCase().includes(searchQuery.toLowerCase())) ||
                (tender['Successful Tender'] && tender['Successful Tender'].toLowerCase().includes(searchQuery.toLowerCase())) ||
                (tender['Ministry/ Agencies'] && tender['Ministry/ Agencies'].toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        setFilteredTenders(filtered);
    };

    const fetchTendersData = async () => {
        try {
            const response = await axios.get('/get_awarded_contract');
            setTenders(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchAvailableYears = async () => {
        try {
            const response = await axios.get('/get_awarded_contract_year');
            setAvailableYears(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchRegion = async () => {
        try {
            const response = await axios.get('/get_awarded_contract_region');
            setRegion(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchCategory = async () => {
        try {
            const response = await axios.get('/get_awarded_contract_category');
            setCategory(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchMinistry = async () => {
        try {
            const response = await axios.get('/get_awarded_contract_ministry');
            setMinistry(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
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
                <Header title={"Awarded Contracts Page"} />
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
                                    onChange={handleSearchChange}
                                />
                            </div>
                            <div className="flex items-center mr-4">
                                <label className="mr-2 text-sm">Year</label>
                                <select
                                    className="border rounded px-4 py-1 text-sm focus:outline-none focus:ring w-full"
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                >
                                    {availableYears.map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-center mr-4">
                                <label className="mr-2 text-sm">Region</label>
                                <select
                                    className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring w-full"
                                    value={selectedRegion}
                                    onChange={(e) => setSelectedRegion(e.target.value)}
                                >
                                    <option value="">All</option>
                                    {regions.map((region) => (
                                        <option key={region} value={region}>
                                            {region}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-center mr-4 w-[300px]">
                                <label className="mr-2 text-sm">Category</label>
                                <select
                                    className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring w-full"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    <option value="">All</option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-center mr-4 w-[300px]">
                                <label className="mr-2 text-sm">Ministry</label>
                                <select
                                    className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring w-full"
                                    value={selectedMinistry}
                                    onChange={(e) => setSelectedMinistry(e.target.value)}
                                >
                                    <option value="">All</option>
                                    {ministries.map((ministry) => (
                                        <option key={ministry} value={ministry}>
                                            {ministry}
                                        </option>
                                    ))}
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
                                    <th className="px-4 py-2">Acquisition Category</th>
                                    <th className="px-4 py-2">Ministry / Agencies</th>
                                    <th className="px-4 py-2">Successful Tender</th>
                                    <th className="px-4 py-2">Region</th>
                                    <th className="px-4 py-2">Result Display Day</th>
                                    <th className="px-4 py-2">Agreement Price Accepted (RM)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentTenders.length > 0 ? (
                                    currentTenders.map((tender, index) => (
                                        <tr key={index}>
                                            <td className="border text-sm px-4 py-2 truncate max-w-xs" title={tender['Tender ID']}>{tender['Tender ID']}</td>
                                            <td className="border text-sm px-4 py-2 truncate max-w-xs" title={tender['Project Name']}>{tender['Project Name']}</td>
                                            <td className="border text-sm px-4 py-2 truncate max-w-xxs" title={tender['Acquisition Category']}>{tender['Acquisition Category']}</td>
                                            <td className="border text-sm px-4 py-2 truncate max-w-xs" title={tender['Ministry/ Agencies']}>{tender['Ministry/ Agencies']}</td>
                                            <td className="border text-sm px-4 py-2 truncate max-w-xxs" title={tender['Successful Tender']}>{tender['Successful Tender']}</td>
                                            <td className="border text-sm px-4 py-2 truncate max-w-xs" title={tender['Region']}>{tender['Region']}</td>
                                            <td className="border text-sm px-4 py-2 truncate max-w-xs" title={tender['Result Display Day']}>{tender['Result Display Day']}</td>
                                            <td className="border text-sm px-4 py-2 truncate max-w-xs" title={tender['Agreement Price Accepted (RM)']}>{tender['Agreement Price Accepted (RM)']}</td>
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
                                color="primary"
                                variant="outlined"
                            />
                        </Stack>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrentAwardedContractPage;
