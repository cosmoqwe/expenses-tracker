import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../firebase/firebase';
import { getIdToken } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';

const ExpenseForm = () => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [notification, setNotification] = useState('');
    const [notificationType, setNotificationType] = useState('');
    const [userId, setUserId] = useState(null);

    // Получаем UID пользователя из Firebase
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid); // Уникальный ID от Firebase
            } else {
                setUserId(null);
            }
        });

        return () => unsubscribe(); // Очистка слушателя
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userId) {
            setNotification('Musisz być zalogowany!');
            setNotificationType('error');
            return;
        }

        if (!description || !amount || !category) {
            setNotification('Wypełnij wszystkie pola!');
            setNotificationType('error');
            return;
        }

        try {
            const user = auth.currentUser;
            const token = await getIdToken(user);

            await axios.post('http://localhost:1488/api/expenses',
                {
                    category,
                    description,
                    amount: parseFloat(amount), // 👈 убедись, что это число
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setNotification('Wydatki zostały dodane!');
            setNotificationType('success');
            setDescription('');
            setAmount('');
            setCategory('');
            setTimeout(() => setNotification(''), 3000);
        } catch (error) {
            console.error('Błąd przy dodawaniu wydatków:', error.response?.data || error.message);
            setNotification('Coś poszło nie tak. Sprawdź konsolę.');
            setNotificationType('error');
            setTimeout(() => setNotification(''), 3000);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Dodać nowe wydatki</h2>

            {notification && (
                <div
                    className={`fixed top-4 right-4 p-4 rounded-md shadow-lg transition duration-300 
                    ${notificationType === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}
                >
                    {notification}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Kategoria</label>
                    <input
                        type="text"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Np. Jedzenie, Transport"
                        className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Opis</label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Opis wydatku"
                        className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Suma</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Suma wydatku"
                        className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600"
                >
                    Dodać wydatki
                </button>
            </form>
        </div>
    );
};

export default ExpenseForm;
