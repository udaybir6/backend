const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const TASKS_FILE = path.join(__dirname, 'tasks.json');


const loadTasks = () => {
    try {
        const data = fs.readFileSync(TASKS_FILE, 'utf8');
        return JSON.parse(data) || [];
    } catch (err) {
        return [];
    }
};


const saveTasks = (tasks) => {
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
};


app.get('/', (req, res) => {
    const tasks = loadTasks();
    res.render('index', { tasks });
});


app.post('/add-task', (req, res) => {
    let tasks = loadTasks();
    const newTask = {
        id: Date.now(),
        name: req.body.task,
        completed: false
    };
    tasks.push(newTask);
    saveTasks(tasks);
    res.redirect('/');
});


app.post('/delete-task', (req, res) => {
    let tasks = loadTasks();
    tasks = tasks.filter(task => task.id != req.body.id);
    saveTasks(tasks);
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
