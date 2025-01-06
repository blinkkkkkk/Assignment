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
        let tasks = await taskModel.aggregate([
            {
                $project: {
                    id: '$_id',
                    name: 1,
                    description: 1,
                    catFact: 1,
                    status: 1,
                    createAt: 1,
                    _id: 0
                }
            }
        ]);
        console.log(tasks)
        if (!tasks.length) {
            return next(new Error('No tasks found'));
        } else {
            res.status(200).json(tasks);
        }

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
    if (!status) {
        return next(new Error('Task status is required'));
    }

    try {
        let updatedTask = await taskModel.findOneAndUpdate(
            { _id: id },
            { status: status },
            { new: true }
        );

        if (!updatedTask) {
            return next(new Error('Task not found'));
        }


        let taskWithId = await taskModel.aggregate([
            { $match: { _id: updatedTask._id } },
            {
                $project: {
                    id: '$_id',
                    name: 1,
                    description: 1,
                    catFact: 1,
                    status: 1,
                    createAt: 1,
                    _id: 0
                }
            }
        ]);

        res.status(200).json(taskWithId[0]);
    } catch (error) {
        next(error);
    }
}


async function deleteTask(req, res, next) {
    const { id } = req.params;

    if (!id) {
        return next(new Error('Task ID is required'));
    }

    try {
        const deletedTask = await taskModel.findOneAndDelete({ _id: id });

        if (!deletedTask) {
            return next(new Error('Task not found'));
        }

        const taskWithId = await taskModel.aggregate([
            { $match: { _id: deletedTask._id } },
            {
                $project: {
                    id: '$_id',
                    name: 1,
                    description: 1,
                    catFact: 1,
                    status: 1,
                    createAt: 1,
                    _id: 0
                }
            }
        ]);

        res.status(200).json(taskWithId[0]);
    } catch (error) {
        next(error);
    }
}


module.exports = {
    addTask,
    getTasks,
    updateTask,
    deleteTask
}
