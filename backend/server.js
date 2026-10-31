
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const taskRoutes = require('./routes/taskRoutes');

const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  await mongoose.connect(MONGO_URI);
}

// Ensure database connection before handling requests
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('MongoDB connection error:', error);
    res.status(500).json({
      message: 'Database connection failed'
    });
  }
});

// Home route
app.get('/', (req, res) => {
  res.json({
    message: 'Task Management API is running'
  });
});

// Task routes
app.use('/api/tasks', taskRoutes);

// Local development
if (!process.env.VERCEL) {
  connectDB()
    .then(() => {
      console.log('MongoDB Atlas connected successfully');

      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.error('MongoDB connection error:', error);
    });
}

// Export Express application for Vercel
module.exports = app;
