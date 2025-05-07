import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const ExpenseList = () => {
    const [expenses, setExpenses] = useState([]);
    const [filteredExpenses, setFilteredExpenses] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState('');
    const [userId, setUserId] = useState(null);  // Состояние для userId, которое мы получаем из Firebase

    useEffect(() => {
        // Следим за состоянием авторизации
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid); // Получаем UID авторизованного пользователя
            } else {
                setUserId(null);
                setExpenses([]);
                setFilteredExpenses([]);
            }
        });

        return () => unsubscribe();  // Очистка подписки
    }, []);

    useEffect(() => {
        // Если userId есть, загружаем расходы
        if (userId) {
            const fetchExpenses = async () => {
                try {
                    const token = await auth.currentUser.getIdToken(); // Получаем токен для текущего пользователя
                    const response = await axios.get('http://localhost:1488/api/expenses', {
                        headers: {
                            Authorization: `Bearer ${token}`, // Отправляем токен с запросом
                        }
                    });
                    setExpenses(response.data);  // Сохраняем все расходы
                    setFilteredExpenses(response.data);  // По умолчанию показываем все расходы
                } catch (error) {
                    console.error('Błąd podczas pobierania wydatków:', error.response?.data || error.message);
                }
            };

            fetchExpenses();
        }
    }, [userId]);  // Запросы выполняются только при изменении userId

    const handleDelete = async (id) => {
        try {
            const token = await auth.currentUser.getIdToken(); // Получаем токен пользователя
            await axios.delete(`http://localhost:1488/api/expenses/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Отправляем токен в заголовке
                },
            });

            setExpenses(prev => prev.filter(exp => exp.id !== id)); // Удаляем расход из списка
            setFilteredExpenses(prev => prev.filter(exp => exp.id !== id)); // Из фильтрованных расходов тоже удаляем
        } catch (error) {
            console.error('Błąd podczas usuwania wydatku:', error.response?.data || error.message);
        }
    };

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setCategoryFilter(value);

        if (value === '') {
            setFilteredExpenses(expenses);  // Если фильтр пустой, показываем все расходы
        } else {
            setFilteredExpenses(
                expenses.filter(exp =>
                    exp.category.toLowerCase().includes(value.toLowerCase())  // Фильтруем по категории
                )
            );
        }
    };

    const calculateTotal = () => {
        return filteredExpenses.reduce((total, exp) => total + parseFloat(exp.amount), 0).toFixed(2);
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Lista wydatków</h2>

            <div className="mb-4">
                <label htmlFor="categoryFilter" className="block text-sm font-medium text-gray-700">
                    Filtruj po kategorii
                </label>
                <input
                    type="text"
                    id="categoryFilter"
                    value={categoryFilter}
                    onChange={handleCategoryChange}
                    placeholder="Wpisz kategorię"
                    className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm"
                />
            </div>

            <div className="mb-4">
                <h3 className="text-lg font-semibold">Łączna kwota: {calculateTotal()} zł</h3>
            </div>

            <ul className="space-y-4">
                {filteredExpenses.length === 0 ? (
                    <li className="text-gray-500">Brak wydatków</li>
                ) : (
                    filteredExpenses.map((exp) => (
                        <li key={exp.id} className="p-4 bg-white shadow-md rounded-lg flex justify-between items-center">
                            <div>
                                <strong className="text-lg">{exp.description}</strong>
                                <p className="text-gray-500">{exp.amount}zł</p>
                                <p className="text-gray-400 text-sm">{exp.category}</p>
                            </div>
                            <button
                                onClick={() => handleDelete(exp.id)}
                                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                            >
                                Usuń
                            </button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default ExpenseList;
