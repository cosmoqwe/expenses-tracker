// src/pages/Home.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <Navbar />

            {/* Контент страницы */}
            <div className="flex flex-col justify-center items-center h-[calc(100vh-64px)] bg-gray-200 text-center py-8">
                <h1 className="text-5xl font-bold text-gray-800 mb-6">
                    Welcome to the Expense Tracker
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                    Easily track your expenses and stay on top of your finances.
                </p>
                <div className="flex space-x-6">
                    <Link
                        to="/login"
                        className="text-white px-6 py-3 bg-blue-500 hover:bg-blue-700 rounded-lg shadow-lg"
                    >
                        Login
                    </Link>
                    <Link
                        to="/register"
                        className="text-white px-6 py-3 bg-green-500 hover:bg-green-700 rounded-lg shadow-lg"
                    >
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
