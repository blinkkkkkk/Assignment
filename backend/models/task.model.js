const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    catFact: { type: String },
    status: { type: String, default: 'pending' },
    createAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('tasks', taskSchema);