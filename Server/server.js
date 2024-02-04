const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 5000;

const tasks = [];
// Enable CORS

app.use(cors());
app.use(bodyParser.json());

// Get all tasks
//app.get('/api/tasks', (req, res) => {
//    res.json(tasks);
//});

// Get all tasks
app.get('/api/tasks', async (req, res) => {
    try {
        const response = await axios.get(API_URL);
        res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
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
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
// delete a task

app.delete('/api/tasks/task/:id', (req, res) => {
    const taskId = req.params.id;

    const index = tasks.findIndex(task => task.id === taskId);

    const deletedTask = tasks.splice(index, 1)[0];
    return res.status(200);
    
  });
 
>>>>>>> Stashed changes
>>>>>>> Stashed changes
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});