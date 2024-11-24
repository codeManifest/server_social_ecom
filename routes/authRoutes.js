const express = require('express');
const { registerUser, loginUser, getProfile, getArtist, completeprofile } = require('../controllers/authController');
const { authenticateToken } = require('../utlis/authMiddleware');

const router = express.Router();

// Define Routes

// Register User
router.post('/register', registerUser);

// Login User
router.post('/login', loginUser);

// Complete Profile (Update Profile) - Use PUT method for updating
router.put('/completeprofile', authenticateToken, completeprofile); // Protected route

// Get Profile - Protected route
router.get('/profile', authenticateToken, getProfile);

// Get Artist - Protected route
router.get('/getArtist', authenticateToken, getArtist);

module.exports = router;