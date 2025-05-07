import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase.js'; // Импортируем конфигурацию Firebase

const ProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                // Если пользователя нет, перенаправляем на страницу логина
                navigate('/login');
            } else {
                // Если пользователь есть, продолжаем показывать содержимое
                setLoading(false);
            }
        });

        // Очистка подписки при размонтировании компонента
        return () => unsubscribe();
    }, [navigate]);

    if (loading) {
        return <div>Loading...</div>;

    }

    return children; // Показываем контент, если пользователь авторизован
};

export default ProtectedRoute;
