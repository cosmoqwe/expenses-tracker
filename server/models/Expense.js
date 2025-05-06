// models/Expense.js
const db = require('../Database');

class Expense {
    constructor({ expense_id, user_id, category, description, amount, updated_at }) {
        this.id          = expense_id;
        this.user_id     = user_id;
        this.category    = category;
        this.description = description || '';
        this.amount      = amount;
        this.updated_at  = updated_at;
    }

    async save()
    {
        const sql = `INSERT INTO expenses (user_id, category, description, amount) VALUES (?, ?, ?, ?)`;
        const params = [ this.user_id, this.category, this.description, this.amount ];
        const [result] = await db.execute(sql, params);
        this.id = result.insertId;
        return this;
    }

    static async findAllByUserId(userId)
    {
        const sql = `SELECT * FROM expenses WHERE user_id = ? ORDER BY updated_at DESC`;
        const [rows] = await db.execute(sql, [userId]);
        return rows.map(r => new Expense(r));
    }


    async update()
    {
        const sql = `UPDATE expenses SET category = ?, description = ?, amount = ? WHERE expense_id = ?`;
        const params = [ this.category, this.description, this.amount, this.id ];
        await db.execute(sql, params);
        return this;
    }

    static async deleteById(id) {
        const sql = `DELETE FROM expenses WHERE expense_id = ?`;
        await db.execute(sql, [id]);
        return true;
    }
}

module.exports = Expense;
