const express = require('express');
const Task = require('../models/Task');

const router = express.Router();

// GET all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);

    res.status(500).json({
      message: 'Failed to fetch tasks'
    });
  }
});


// POST - Add a task
router.post('/', async (req, res) => {
  try {
    const { title, status } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({
        message: 'Task title is required'
      });
    }

    const newTask = new Task({
      title: title.trim(),
      status: status || 'Pending'
    });

    const savedTask = await newTask.save();

    res.status(201).json(savedTask);

  } catch (error) {
    console.error('Error adding task:', error);

    res.status(500).json({
      message: 'Failed to add task'
    });
  }
});


// PUT - Update a task
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedTask) {
      return res.status(404).json({
        message: 'Task not found'
      });
    }

    res.json(updatedTask);

  } catch (error) {
    console.error('Error updating task:', error);

    res.status(500).json({
      message: 'Failed to update task'
    });
  }
});


// DELETE - Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({
        message: 'Task not found'
      });
    }

    res.json({
      message: 'Task deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting task:', error);

    res.status(500).json({
      message: 'Failed to delete task'
    });
  }
});


module.exports = router;