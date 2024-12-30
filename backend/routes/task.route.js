const express = require('express');
const { getTasks, addTask, updateTask  } = require('../controllers/task.controller');
const router = express.Router();
router.post('/addTask', addTask); // Add a new task
router.get('/', getTasks); // Fetch all tasks
router.patch('/:id', updateTask); // Update a task's status

module.exports = router;
