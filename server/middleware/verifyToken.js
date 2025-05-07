const admin = require('../firebaseAdmin'); // Firebase Admin SDK

const verifyToken = async (req, res, next) => {
    const token = req.headers['authorization']; // Получаем заголовок

    if (!token) {
        return res.status(403).json({ error: 'No token provided' });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token.replace('Bearer ', '')); // Убираем "Bearer " из токена
        req.user = decodedToken; // Добавляем информацию о пользователе в req.user
        next(); // Передаем управление дальше
    } catch (err) {
        console.error('Token verification failed:', err);
        res.status(401).json({ error: 'Unauthorized' }); // Возвращаем 401, если токен недействителен
    }
};

module.exports = verifyToken;
