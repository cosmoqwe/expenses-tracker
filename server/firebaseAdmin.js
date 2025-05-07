const admin = require('firebase-admin');

const serviceAccount = require('./key/expensetracker-49c66-firebase-adminsdk-fbsvc-7011671d61.json'); // Проверьте путь к файлу

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
