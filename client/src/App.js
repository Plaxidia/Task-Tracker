
//import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const API_URL = 'http://localhost:5002/api/tasks';
function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);
  const fetchTasks = async () => {
    try {
        const response = await axios.get(API_URL);
        console.log('Server response:', response);
        setTasks(response.data);
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
};
  const addTask = async () => {
    if (newTask.trim() !== '') {
      const response = await axios.post(API_URL, { name: newTask, id: Math.floor(Math.random() * 100) + 1  });
      setTasks([...tasks, response.data]);
      setNewTask('');
    }
  };
  const deleteTask = async (taskId) => {
    console.log('deleting')
      await axios.delete(`${API_URL}/task/`+taskId);
     
  };
  return (
    <div>
      <h1>Task Tracker</h1>
      <div>
        <input
          type="text"
          placeholder="Add Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul>
      {tasks.map((task) => (
        <li key={task.id}>
        {task.name} {/* Assuming the task object has a "name" property */}
        <button className='delete-btn' onClick={() =>{
          deleteTask( task.id)
          fetchTasks()
        }}>
          Delete
        </button>
      </li>

      ))}
      </ul>
    </div>
  );
}

export default App;
