import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (currentUser) {
            setUserEmail(currentUser.email);
        }
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                window.location.href = '/login';
            })
            .catch((error) => {
                console.error('Ошибка при выходе:', error);
            });
    };

    return (
        <nav className="bg-blue-600 p-4">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <div className="text-white text-2xl font-bold">
                    <Link to="/">Money Tracker</Link>
                </div>

                <div className="space-x-4 hidden md:flex">
                    <Link to="/expenses/form" className="text-white hover:text-blue-200">
                        Dodaj wydatek
                    </Link>
                    <Link to="/expenses/list" className="text-white hover:text-blue-200">
                        Lista wydatków
                    </Link>
                </div>

                <div className="relative">
                    <button onClick={toggleMenu} className="text-white flex items-center space-x-2">
                        <span>{userEmail || 'Guest'}</span>
                        <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                fillRule="evenodd"
                                d="M5.23 7.47a.75.75 0 011.06 0L10 10.44l3.71-2.97a.75.75 0 111.02 1.1l-4.25 3.4a.75.75 0 01-1.02 0l-4.25-3.4a.75.75 0 010-1.1z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>

                    {isOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-100"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
