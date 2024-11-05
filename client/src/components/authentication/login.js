import React, {useState} from 'react';
import Sidebar from '../navigation/sidebar';


const LoginPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    return (
        <div className="flex flex-col lg:flex-row">
            <Sidebar onSidebarToggle={setIsSidebarOpen} />
            <div className={`p-6 bg-gray-100 min-h-screen w-full transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
                <div className="flex items-center justify-center min-h-screen bg-gray-100">
                    <h1 className="text-2xl font-bold font-lato">The function will be available soon</h1>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
