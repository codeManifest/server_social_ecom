const jwt = require('jsonwebtoken');
const SECRET_KEY = '20754f6120f90e8dfcf3fdcff853359f0aa1ed390073a8344654234ad58d39fd';
const cors = require('cors');
const express=require('express');
const app = express()

// Middleware to authenticate JWT
app.use(cors());

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token.' });
  }
};

module.exports = { authenticateToken };