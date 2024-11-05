import React, { useEffect, useState, useRef  } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom'; // Import useHistory for navigation

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AwardedContractBarChart = ({ selectedMonth, selectedYear }) => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Awarded Contracts',
                data: [],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 2,
            },
        ],
    });
    const [minRange, setMinRange] = useState(1);
    const [maxRange, setMaxRange] = useState(5);
    const navigate = useNavigate();
    const chartRef = useRef(null);

    const generateColors = (minRange, maxRange) => {
        let colors = [
            'rgba(255, 0, 0, 0.8)',
            'rgba(255, 69, 0, 0.7)',
            'rgba(255, 165, 0, 0.6)',
            'rgba(255, 215, 0, 0.5)',
            'rgba(255, 255, 0, 0.4)'
        ];

        let borderColors = [
            'rgba(255, 0, 0, 1)',
            'rgba(255, 69, 0, 1)',
            'rgba(255, 165, 0, 1)',
            'rgba(255, 215, 0, 1)',
            'rgba(255, 255, 0, 1)'
        ];

        if (maxRange <= 6) {
            colors = colors.map(color => color.replace(/0\.\d+/g, '0.3'));
            borderColors = borderColors.map(color => color.replace(/1/g, '0.5'));
        }

        return { colors, borderColors };
    };

    const fetchData = async (minRange, maxRange, selectedMonth, selectedYear) => {
        try {
            const response = await fetch(`/top-companies?minRange=${minRange}&maxRange=${maxRange}&month=${selectedMonth}&year=${selectedYear}`);
            const data = await response.json();

            const { colors, borderColors } = generateColors(minRange, maxRange);

            setChartData({
                labels: data.companies,
                datasets: [
                    {
                        label: 'Awarded Contracts',
                        data: data.counts,
                        backgroundColor: colors,
                        borderColor: borderColors,
                        borderWidth: 2,
                    },
                ],
            });

            // Save prices for tooltip display
            setPrices(data.sum_price);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const [prices, setPrices] = useState([]); // State to store prices

    useEffect(() => {
        if (selectedMonth && selectedYear) {
            fetchData(minRange, maxRange, selectedMonth, selectedYear);
        }
    }, [minRange, maxRange, selectedMonth, selectedYear]);

    const handleRangeChange = () => {
        fetchData(minRange, maxRange, selectedMonth, selectedYear);
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: `Top Companies with Most Awarded Contracts`,
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        const count = tooltipItem.raw;
                        const price = prices[tooltipItem.dataIndex];
                        return [`Count: ${count}`, `Price: RM ${price.toLocaleString()}`]; // Return both count and price
                    },
                },
            },
        },
    };

    // Handle chart click to redirect to the current awarded contract page
    const handleBarClick = (event) => {
        const elements = chartRef.current.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);
        
        if (elements.length > 0) {
            const index = elements[0].index; // Get the index of the clicked bar
            const companyName = chartData.labels[index]; // Get the company name from labels
            navigate(`/current_awarded_contract_page?searchData=${companyName}`); // Navigate with company name
        }
    };
    
    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 font-roboto">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Awarded Contract</h2>
                <div className="ml-4 flex items-center space-x-2">
                    <label htmlFor="minRange" className="text-sm font-medium text-gray-700">
                        Top:
                    </label>
                    <input
                        type="number"
                        id="minRange"
                        name="minRange"
                        min="1"
                        max="40"
                        value={minRange}
                        onChange={(e) => setMinRange(e.target.value)}
                        className="w-16 border border-gray-300 rounded-md px-2"
                    />
                    <label htmlFor="maxRange" className="text-sm font-medium text-gray-700">
                        -
                    </label>
                    <input
                        type="number"
                        id="maxRange"
                        name="maxRange"
                        min="1"
                        max="20"
                        value={maxRange}
                        onChange={(e) => setMaxRange(e.target.value)}
                        className="w-16 border border-gray-300 rounded-md px-2"
                    />
                    <button onClick={handleRangeChange} className="font-bold font-lato text-sm ml-4 px-3 py-1 text-tblue bg-white border border-gray-300 rounded-lg shadow-md hover:text-blue-700 transition-all duration-200">
                        Apply
                    </button>
                </div>
            </div>
            <div className="h-64 w-full mt-4">
                <div style={{ height: '280px', width: '100%' }}>
                    <Bar ref={chartRef} data={chartData} options={options} onClick={handleBarClick} /> {/* Add onClick handler here */}
                </div>
            </div>
        </div>
    );
};

export default AwardedContractBarChart;
