const express = require('express');
const router = express.Router();
const pool = require('../Database');

// POST /api/register
router.post('/register', async (req, res) => {
    const { uid, email } = req.body;

    if (!uid || !email) {
        return res.status(400).json({ error: 'UID и email обязательны' });
    }

    try {
        await pool.query(
            'INSERT INTO users (user_id, login, hash) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE login = login',
            [uid, email, 'firebase_auth']
        );

        res.status(200).json({ message: 'Пользователь добавлен в БД' });
    } catch (err) {
        console.error('Ошибка при добавлении пользователя:', err);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

module.exports = router;
