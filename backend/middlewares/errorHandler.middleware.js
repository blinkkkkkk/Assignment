// Custom error handler middleware
function errorHandler(err, req, res, next) {
    console.error(err.stack); 
    if (err.name === 'ValidationError') {
        return res.status(400).json({ error: 'Validation Error', message: err.message });
    }

    if (err.name === 'CastError') {
        return res.status(400).json({ error: 'Invalid ID format', message: err.message });
    }

    if (err.name === 'MongoError') {
        return res.status(500).json({ error: 'Database Error', message: err.message });
    }

    if (err.message === 'Task not found' || err.message === 'No tasks found' || err.message === 'Name and description are required' || err.message === 'Task ID is required' || err.message === 'Task status is required') {
        return res.status(404).json({ error: 'Not Found', message: err.message });
    }

    if (err.message === 'Cat fact API request timed out') {
        return res.status(503).json({
            error: 'Service Unavailable',
            message: 'Cat Facts API is not responding',
        });
    }

    return res.status(500).json({ error: 'Internal Server Error', message: 'An unexpected error occurred' });
}

module.exports = errorHandler;