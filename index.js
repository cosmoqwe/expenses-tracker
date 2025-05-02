// index.js
const express    = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const expensesRouter = require('./routes/expenses');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/expenses', expensesRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});
