import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // useEffect(() => {
    //     // Если пользователь уже аутентифицирован, сразу перенаправим его на страницу входа
    //     const unsubscribe = auth.onAuthStateChanged((user) => {
    //         if (user) {
    //             // Проверим, есть ли уже пользователь в базе данных
    //             checkUserInDatabase(user);
    //         }
    //     });
    //     return unsubscribe;
    // }, []);

    // const checkUserInDatabase = async (user) => {
    //     try {
    //         const response = await axios.get(`http://localhost:1488/api/users/${user.uid}`);
    //         // Если пользователь существует, ничего не делаем
    //         if (response.data) {
    //             console.log('Пользователь уже есть в базе данных');
    //         } else {
    //             // Если пользователя нет в базе, добавляем его
    //             await axios.post('http://localhost:1488/api/users', {
    //                 user_id: user.uid,
    //                 email: user.email,  // Здесь можно передать дополнительные данные
    //             });
    //             console.log('Пользователь добавлен в базу данных');
    //         }
    //     } catch (error) {
    //         console.error('Ошибка при добавлении пользователя в базу данных:', error);
    //     }
    // };

    const handleRegister = async (e) => {
        e.preventDefault(); // ← добавь это!

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('User registered:', user.uid);

            await axios.post('http://localhost:1488/api/register', {
                uid: user.uid,
                email: user.email,
            });

            navigate('/expenses');
        } catch (error) {
            console.error('Ошибка регистрации:', error.message);
            alert(error.message);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center mb-6">Zarejestruj się</h2>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <form onSubmit={handleRegister} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                        type="password"
                        placeholder="Hasło"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
                    >
                        Zarejestruj się
                    </button>
                </form>
                <p className="text-center text-sm text-gray-500 mt-4">
                    Masz już konto? <a href="/login" className="text-green-600 hover:underline">Zaloguj się</a>
                </p>
            </div>
        </div>
    );
};

export default Register;
