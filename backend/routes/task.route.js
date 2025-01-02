const express = require('express');
const { getTasks, addTask, updateTask, deleteTask } = require('../controllers/task.controller');
const router = express.Router();
router.post('/addTask', addTask); // Add a new task
router.get('/', getTasks); // Fetch all tasks
router.patch('/:id', updateTask); // Update a task's status
router.delete('/:id', deleteTask); // Delete a task
module.exports = router;
