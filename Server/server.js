const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

const tasks = [];

app.use(cors());
app.use(bodyParser.json());

// Get all tasks
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// Add a new task
app.post('/api/tasks', (req, res) => {
    const newTask = req.body;
    tasks.push(newTask);
    res.json(newTask);
});

// Update a task
app.put('/api/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const updatedTask = req.body;
    const index = tasks.findIndex(task => task.id === taskId);

    if (index !== -1) {
        tasks[index] = updatedTask;
        res.json(updatedTask);
    } else {
        res.status(404).json({ error: 'Task not found' });
    }
});
// Delete a task
app.delete('/api/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const index = tasks.findIndex((task) => task.id === taskId);

    if (index !== -1) {
        const deletedTask = tasks.splice(index, 1)[0];
        res.json(deletedTask);
    } else {
        res.status(404).json({ error: 'Task not found' });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});