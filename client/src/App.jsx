// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import ExpenseList from './pages/ExpenseList';
import ExpenseForm from './pages/ExpenseForm';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Публичные маршруты */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Защищённые маршруты */}
                <Route
                    path="/expenses/*"
                    element={
                        <ProtectedRoute>
                            <>
                                <Navbar /> {/* Показываем навбар */}
                                <Routes>
                                    <Route path="form" element={<ExpenseForm />} />
                                    <Route path="list" element={<ExpenseList />} />
                                    {/* Перенаправление по умолчанию */}
                                    <Route path="*" element={<Navigate to="form" />} />
                                </Routes>
                            </>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
