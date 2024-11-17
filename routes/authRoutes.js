const express= require('express')
const {authenticateToken} = require('../utlis/authMiddleware')
const { registerUser, loginUser, getProfile } = require('../controllers/authController');

const router = express.Router()

// creating routes

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', authenticateToken,getProfile) //without login cant access this route
module.exports=router;


