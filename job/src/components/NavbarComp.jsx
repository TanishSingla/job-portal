import React from 'react';
import { useUserStore } from '../store/useUserStore';
import { Navigate } from 'react-router-dom';

const NavbarComp = ({ userName }) => {
    const { logout } = useUserStore();
    const onLogout = (e) => {
        e.preventDefault();
        logout();
        <Navigate to={"/"} />
    }
    return (
        <nav className="relative flex justify-between items-center h-16 bg-white px-6 shadow-md z-100">
            {/* Left side: Logo */}
            <img src="/assets/logo.svg" alt="Logo" />

            {/* Right side: Contact and User Name */}
            <div className="flex items-center space-x-4">
                <button className="text-gray-600 hover:text-gray-800">Contact</button>

                {userName ? (
                    <div className="flex items-center space-x-2 border px-3 py-2 rounded-md">
                        <span className="text-gray-600">{userName}</span>
                        <span className="rounded-full bg-gray-300 h-6 w-6"></span>
                    </div>
                ) : null}

                {userName && (
                    <button
                        className="text-red-600 hover:text-red-800"
                        onClick={onLogout}
                    >
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
};

export default NavbarComp;
