const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

const tasks = [];
// Enable CORS

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
app.put('/api/tasks/update/:id', (req, res) => {
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
<<<<<<< Updated upstream
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
=======
// delete a task

app.delete('/api/tasks/task/:id', (req, res) => {
    const taskId = req.params.id;

    const index = tasks.findIndex(task => task.id === taskId);

    const deletedTask = tasks.splice(index, 1)[0];
    return res.status(200);
    
  });
 
>>>>>>> Stashed changes
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});