const { getRandomCatFact } = require('../utils/catFacts');
const taskModel = require('../models/task.model');

async function addTask(req, res, next) {
    const { name, description } = req.body;
    if (!name || !description) {
        return next(new Error('Name and description are required'));
    }

    try {
        const catFact = await getRandomCatFact();
        const newTask = await taskModel.create({
            name,
            description,
            catFact: catFact,
        });

        const taskWithoutId = newTask.toObject();
        delete taskWithoutId._id;
        delete taskWithoutId.__v;

        res.status(201).json(taskWithoutId);
    } catch (error) {
        next(error); 
    }
}

async function getTasks(req, res, next) {
    try {
        let tasks = await taskModel.find({}).select('-_id -__v');
        if (!tasks.length) {
            return next(new Error('No tasks found'));
        }
        res.status(200).json(tasks);
    } catch (error) {
        next(error); 
    }
}

async function updateTask(req, res, next) {
    const { id } = req.params;
    const { status } = req.body;
    if (!id) {
        return next(new Error('Task ID is required'));
    }
    if(!status){
        return next(new Error('Task status is required'));
    }
    try {
        let updatedTask = await taskModel.findOneAndUpdate(
            { id: id },
            { status: status },
            { new: true }
        ).select('-_id -__v');

        if (!updatedTask) {
            return next(new Error('Task not found'));
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        next(error); 
    }
}

module.exports = {
    addTask,
    getTasks,
    updateTask
}
