const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    id:{type: String, required: true,default: uuidv4()},
    name: { type: String, required: true },
    description: { type: String },
    catFact:{ type: String },
    status:{ type: String, default: 'pending'},
    createAt:{type: Date, default: Date.now},
});

module.exports = mongoose.model('tasks', taskSchema);