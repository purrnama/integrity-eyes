import React from "react";
import { Link } from "react-router-dom";

const Header = ({ title }) => {
    return (
        <div>
            <div className="flex items-center justify-between ">
                <h1 className="text-2xl font-bold font-lato">{title}</h1>
                <Link to='/login'>
                    <button className=" font-bold font-lato ml-4 px-4 py-2 text-tblue bg-white border border-white rounded-lg shadow-md hover:text-blue-700 transition-all duration-200">
                        Login
                    </button>
                </Link>
            </div>
            <div className='mb-4'>
                <span>Latest updated by: 30/8/2024</span>
            </div>
        </div>
    )
};

export default Header;
