import React, { useState, useEffect } from 'react';
import Projectlogo from '../assets/Logo.png';
import { HomeIcon, CircleStackIcon, EyeIcon, ChartBarSquareIcon, FlagIcon, CheckCircleIcon, QuestionMarkCircleIcon, QueueListIcon } from '@heroicons/react/24/outline';
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ onSidebarToggle }) => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();  // Get current location
    const [activeMenu, setActiveMenu] = useState('');  // Set active menu state
    useEffect(() => {
        document.title = 'Integrity Eyes'; // Set the page title
    }, []); 
    useEffect(() => {
        // Set activeMenu based on the current path
        switch (location.pathname) {
            case '/main_dashboard':
                setActiveMenu('Main Dashboard');
                break;
            case '/':
                setActiveMenu('Procurement Transparency');
                break;
            case '/risk_management':
                setActiveMenu('Risk Management');
                break;
            case '/project_performance':
                setActiveMenu('Project Performance');
                break;
            case '/risks_red_flags':
                setActiveMenu('Risks & Red Flags');
                break;
            case '/stakeholder_feedback':
                setActiveMenu('Stakeholder Feedback');
                break;
            default:
                setActiveMenu('');
        }
    }, [location.pathname]);  // Update activeMenu whenever the path changes

    const handleMouseEnter = () => {
        setIsOpen(true);
        onSidebarToggle(true);
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
        onSidebarToggle(false);
    };

    const handleMenuClick = (menu) => {
        setActiveMenu(menu); // Update active menu state on click
    };

    return (
        <div
            className={`${isOpen ? 'w-64' : 'w-20'} h-full bg-white shadow-md fixed transition-all duration-300`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="flex items-center justify-center h-24 border-b">
                <img src={Projectlogo} alt="Logo" className={`${isOpen ? 'h-20 w-20' : 'h-12 w-12'} transition-all duration-300`} />
            </div>
            <ul className="mt-2 font-lato">
                <Link to='/main_dashboard'>
                    <li
                        onClick={() => handleMenuClick('Main Dashboard')}
                        className={`py-4 px-4 my-2 hover:bg-gray-200 cursor-pointer flex items-center ${isOpen ? '' : 'justify-center'} ${activeMenu === 'Main Dashboard' ? 'bg-orange-100' : ''}`}
                    >
                        <HomeIcon className={`h-6 w-6 text-gray-600 mr-2 ${!isOpen ? 'h-7 w-7' : ''}`} />
                        {isOpen && <span className="text-tblue">Main Dashboard</span>}
                    </li>
                </Link>
                <Link to='/'>
                    <li
                        onClick={() => handleMenuClick('Procurement Transparency')}
                        className={`py-4 px-4 my-2 hover:bg-orange-200 cursor-pointer flex items-center ${isOpen ? '' : 'justify-center'} ${activeMenu === 'Procurement Transparency' ? 'bg-orange-100' : ''}`}
                    >
                        <CircleStackIcon className={`h-6 w-6 text-gray-600 mr-2 ${!isOpen ? 'h-7 w-7' : ''}`} />
                        {isOpen && <span className="text-tblue">Procurement Transparency</span>}
                    </li>
                </Link>
                <Link to='/risk_management'>
                    <li
                        onClick={() => handleMenuClick('Risk Management')}
                        className={`py-4 px-4 my-2 hover:bg-gray-200 cursor-pointer flex items-center ${isOpen ? '' : 'justify-center'} ${activeMenu === 'Risk Management' ? 'bg-orange-100' : ''}`}
                    >
                        <EyeIcon className={`h-6 w-6 text-gray-600 mr-2 ${!isOpen ? 'h-7 w-7' : ''}`} />
                        {isOpen && <span className="text-tblue">Risk Management</span>}
                    </li>
                </Link>
                <Link to='/project_performance'>
                    <li
                        onClick={() => handleMenuClick('Project Performance')}
                        className={`py-4 px-4 my-2 hover:bg-gray-200 cursor-pointer flex items-center ${isOpen ? '' : 'justify-center'} ${activeMenu === 'Project Performance' ? 'bg-orange-100' : ''}`}
                    >
                        <ChartBarSquareIcon className={`h-6 w-6 text-gray-600 mr-2 ${!isOpen ? 'h-7 w-7' : ''}`} />
                        {isOpen && <span className="text-tblue">Project Performance</span>}
                    </li>
                </Link>
                <Link to='/risks_red_flags'>
                    <li
                        onClick={() => handleMenuClick('Risks & Red Flags')}
                        className={`py-4 px-4 my-2 hover:bg-gray-200 cursor-pointer flex items-center ${isOpen ? '' : 'justify-center'} ${activeMenu === 'Risks & Red Flags' ? 'bg-orange-100' : ''}`}
                    >
                        <FlagIcon className={`h-6 w-6 text-gray-600 mr-2 ${!isOpen ? 'h-7 w-7' : ''}`} />
                        {isOpen && <span className="text-tblue">Risks & Red Flags</span>}
                    </li>
                </Link>
                <Link to='/stakeholder_feedback'>
                    <li
                        onClick={() => handleMenuClick('Stakeholder Feedback')}
                        className={`py-4 px-4 my-2 hover:bg-gray-200 cursor-pointer flex items-center ${isOpen ? '' : 'justify-center'} ${activeMenu === 'Stakeholder Feedback' ? 'bg-orange-100' : ''}`}
                    >
                        <CheckCircleIcon className={`h-6 w-6 text-gray-600 mr-2 ${!isOpen ? 'h-7 w-7' : ''}`} />
                        {isOpen && <span className="text-tblue">Stakeholder Feedback</span>}
                    </li>
                </Link>
            </ul>
            <div className="absolute bottom-0 w-full py-4 px-4">
                <div className="flex items-center justify-between">
                    <QueueListIcon className="h-6 w-6 text-gray-600 mr-2" />
                    {isOpen && <span className="text-gray-600">Settings</span>}
                    <QuestionMarkCircleIcon className="h-6 w-6 text-gray-600 mr-2" />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
