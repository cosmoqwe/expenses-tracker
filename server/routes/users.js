const express = require('express');
const router = express.Router();
const pool = require('../Database');

// GET /api/users/:id — получить пользователя по UID
router.get('/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const [rows] = await pool.query(
            'SELECT * FROM users WHERE user_id = ?',
            [userId]
        );

        if (rows.length > 0) {
            res.status(200).json(rows[0]); // пользователь найден
        } else {
            res.status(404).json({ error: 'Пользователь не найден' });
        }
    } catch (err) {
        console.error('Ошибка при поиске пользователя:', err);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

module.exports = router;
