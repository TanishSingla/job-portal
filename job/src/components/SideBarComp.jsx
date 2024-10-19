import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaMailBulk } from 'react-icons/fa';
import { BsFileEarmarkPostFill } from "react-icons/bs";
import { MdPerson3 } from "react-icons/md";

const SideBarComp = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Get the current location

    const [active, setActive] = useState(location.pathname); // Set the initial active state

    useEffect(() => {
        // Update active state when the location changes
        setActive(location.pathname);
    }, [location.pathname]);

    const handleNavigation = (url) => {
        navigate(url);
    };

    return (
        <div className="h-screen w-16 bg-white shadow-md flex flex-col items-center">
            <FaHome
                title="Home Page" // Tooltip text
                className={`text-2xl m-6 ${active === '/home' ? 'text-blue-600' : 'text-gray-600'}`}
                onClick={() => handleNavigation('/home')}
            />
            <FaMailBulk
                title="Pocket Page" // Tooltip text
                className={`text-2xl m-6 ${active === '/sendMail' ? 'text-blue-600' : 'text-gray-600'}`}
                onClick={() => handleNavigation('/sendMail')}
            />
            <BsFileEarmarkPostFill
                title="Posts Page" // Tooltip text
                className={`text-2xl m-6 ${active === '/createJobPost' ? 'text-blue-600' : 'text-gray-600'}`}
                onClick={() => handleNavigation('/createJobPost')}
            />
            <MdPerson3
                title="Computer Page" // Tooltip text
                className={`text-2xl m-6 ${active === '/jobPostedByMe' ? 'text-blue-600' : 'text-gray-600'}`}
                onClick={() => handleNavigation('/jobPostedByMe')}
            />
        </div>
    );
};

export default SideBarComp;
