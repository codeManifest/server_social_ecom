const jwt = require('jsonwebtoken')
const SECRET_KEY = '20754f6120f90e8dfcf3fdcff853359f0aa1ed390073a8344654234ad58d39fd'


const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = { authenticateToken };