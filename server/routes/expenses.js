// routes/expenses.js
const express = require('express');
const router  = express.Router();
const Expense = require('../models/Expense');

router.post('/', async (req, res) => {
    try {
        const exp = new Expense(req.body);
        const saved = await exp.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/user/:user_id', async (req, res) => {
    try {
        const list = await Expense.findAllByUserId(req.params.user_id);
        res.json(list);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const exp = await Expense.findById(req.params.id);
        if (!exp) return res.status(404).json({ error: 'Not found' });
        res.json(exp);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Expense.deleteById(req.params.id);
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
