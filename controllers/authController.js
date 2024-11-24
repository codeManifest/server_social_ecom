const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Secret Key for JWT
const SECRET_KEY = '20754f6120f90e8dfcf3fdcff853359f0aa1ed390073a8344654234ad58d39fd';

// Register User
const registerUser = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = new User({ username, password, role });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ username: user.username, id: user._id }, SECRET_KEY, {
      expiresIn: '1h',
    });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

// Complete profile (Update profile)

const completeprofile = async (req, res) => {
  const { name, address } = req.body;
  
  // Check if both name and address are provided
  if (!name || !address) {
    return res.status(400).json({ message: 'Name and address are required to update the profile' });
  }

  try {
    // Find the user by ID from the token
    const user = await User.findById(req.user.id); // req.user.id should be available if authenticateToken middleware is working correctly
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's profile
    user.name = name;
    user.address = address;

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
};

// Get Profile (Protected Route)
const getProfile = async (req, res) => {
  

  try {
    // Find the user by ID using the information from the JWT token
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the complete user profile as a JSON response
    res.status(200).json({
      message: 'Profile fetched successfully',
      profile: {
        username: user.username,
        name: user.name,
        address: user.address,
        // Add other fields if needed
        // Add any other fields that are relevant for the profile
        
      }

      

    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }



  
}

// Get artist (Protected Route)
const getArtist = (req, res) => {
  res.json({ message: `Hello ${req.user.username}`, body: req.user.username });
};

module.exports = { registerUser, loginUser, getProfile, getArtist, completeprofile };