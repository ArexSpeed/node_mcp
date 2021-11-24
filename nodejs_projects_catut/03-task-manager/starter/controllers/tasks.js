const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
})

/* without wrapper and diff response (just for view)
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});

    //diff response
    res.status(200).json({ tasks })
    //res.status(200).json({ tasks, amount: tasks.length })
    //res.status(200).json({ status: 'success', data: { tasks, nbHits: tasks.length } })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}
*/

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body)
  res.status(201).json({ task })
})

const getTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });
    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskID}`})
    }
    res.status(200).json({ task })
})

const deleteTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskID}`})
    }
    // diffrent ways to response:
    res.status(200).json({ task })
    //res.status(200).send
    //res.status(200).json({ task: null, status: 'success' })
});

//For Patch (patch can change only some values which are updated, not all)
const updateTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true, 
      runValidators: true
    });
    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskID}`})
    }
    res.status(200).json({ task })
})

//For put (if not fill all properties, that which are not will be removed) -> main diffrenence overwrite: true
const editTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true, 
      runValidators: true,
      overwrite: true
    });
    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskID}`})
    }
    res.status(200).json({ task })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  editTask
}