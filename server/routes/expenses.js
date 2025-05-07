const express = require('express');
const admin = require('../firebaseAdmin'); // Firebase Admin SDK
const Expense = require('../models/Expense'); // Модель расходов
const verifyToken = require('../middleware/verifyToken'); // Middleware для верификации токенов

const router = express.Router();

// Создание расхода
router.post('/', verifyToken, async (req, res) => {
    try {
        const { category, description, amount } = req.body;
        const userId = req.user.uid; // Получаем uid пользователя из токена

        // Создаём новый расход с привязкой к user_id
        const exp = new Expense({
            user_id: userId,
            category,
            description,
            amount
        });

        const saved = await exp.save(); // Сохраняем расход
        res.status(201).json(saved); // Отправляем сохранённый расход
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Получение расходов для текущего пользователя
router.get('/', verifyToken, async (req, res) => {
    try {
        const userId = req.user.uid; // Получаем uid пользователя из токена

        // Получаем все расходы для текущего пользователя
        const expenses = await Expense.findAllByUserId(userId);
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Получение конкретного расхода по ID
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const userId = req.user.uid; // Получаем uid пользователя из токена
        const exp = await Expense.findById(req.params.id);

        // Проверяем, что расход принадлежит текущему пользователю
        if (exp.user_id !== userId) {
            return res.status(403).json({ error: 'Access denied' });
        }

        if (!exp) {
            return res.status(404).json({ error: 'Not found' });
        }

        res.json(exp);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Удаление расхода
// Удаление расхода
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const userId = req.user.uid; // Получаем uid пользователя из токена
        const exp = await Expense.findById(req.params.id);

        // Проверяем, что расход принадлежит текущему пользователю
        if (exp.user_id !== userId) {
            return res.status(403).json({ error: 'Access denied' }); // Если расход не принадлежит пользователю
        }

        // Удаляем расход
        await Expense.deleteById(req.params.id);
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
