const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = 5000;

// MongoDB URI
const MONGO_URI =
  'mongodb+srv://nabins9678:UU5d4NCdpIQapyIs@education.naznvfp.mongodb.net/?retryWrites=true&w=majority&appName=education';

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Middleware
app.use(bodyParser.json()); // Fix body-parser usage

// Routes
app.use('/api/auth', authRoutes);

// Base Route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API', data: 'hello world' });
});

// Start Server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
