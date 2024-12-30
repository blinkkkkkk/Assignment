const express = require('express');
const router = express.Router();
const taskRoute = require('./task.route');

router.use("/tasks", taskRoute);
router.get('/health-check', (req, res) => {
    res.status(200).json({
        status: 'ok',
    });
});

module.exports = router;