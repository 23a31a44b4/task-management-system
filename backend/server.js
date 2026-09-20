const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const taskRoutes = require('./routes/taskRoutes');

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());

const MONGO_URI = 'mongodb://127.0.0.1:27017/taskmanagement';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

app.get('/', (req, res) => {
  res.json({
    message: 'Task Management API is running'
  });
});

app.use('/api/tasks', taskRoutes);