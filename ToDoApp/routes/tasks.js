const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const TASKS_FILE = path.join(__dirname, "../tasks.json");


const readTasks = () => {
    try {
        return JSON.parse(fs.readFileSync(TASKS_FILE, "utf8")) || [];
    } catch (err) {
        return [];
    }
};


const writeTasks = (tasks) => {
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
};


router.get("/tasks", (req, res) => {
    const tasks = readTasks();
    res.render("tasks", { tasks });
});


router.get("/task", (req, res) => {
    const tasks = readTasks();
    const task = tasks.find((t) => t.id === Number(req.query.id));
    if (task) {
        res.json(task);
    } else {
        res.status(404).json({ message: "Task not found" });
    }
});


router.post("/add-task", (req, res) => {
    const tasks = readTasks();
    const newTask = {
        id: Date.now(), 
        name: req.body.name, 
        description: req.body.description || "", 
    };
    tasks.push(newTask);
    writeTasks(tasks);
    res.redirect("/");
});

module.exports = router;
