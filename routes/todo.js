const express = require('express'), router = express.Router();
const Task = require('../models/task.js');

router.get('/', async (req,res)=>{
    try {
        const pendingTasks = await Task.find({status:"todo"});
        const inProgressTasks = await Task.find({status:"inprogress"});
        const completedTasks = await Task.find({status:"completed"});
        res.render('index',{pendingTasks, inProgressTasks, completedTasks});
    } catch (error) {
        
    }
});

router.post('/addTask', async (req,res)=>{
    const name = req.body.taskName;
    const start = req.body.beginning;
    const end = req.body.ending;
    const newTask = new Task({
        name:name,
        start:start,
        end:end,
        status:'todo'
    });
    await newTask.save();
    res.redirect('/');
});
router.post('/todo', async (req,res)=>{
    const id  = req.body.taskId;
    const task = await Task.findById(id);
    task.status = 'inprogress';
    await task.save();
    res.redirect('/');
});
router.post('/inprogress', async (req,res)=>{
    const id = req.body.taskId;
    const task = await Task.findById(id);
    task.status = 'completed';
    task.finishedAt = Date.now();
    await task.save();
    res.redirect('/');
});

router.post('/delete', async (req,res)=>{
    const id = req.body.taskId;
    const task = await  Task.findByIdAndDelete(id);
    res.redirect('/');
})

module.exports = router;