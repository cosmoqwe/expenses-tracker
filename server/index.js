const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.APP_PORT || 3000;

// Подключаем маршруты
const usersRouter = require('./routes/users');
const authRoutes = require('./routes/auth');
const expensesRouter = require('./routes/expenses');

app.use(cors());
app.use(bodyParser.json());
app.use('/api', authRoutes);
app.use('/api/expenses', expensesRouter);
app.use('/api/users', usersRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});
