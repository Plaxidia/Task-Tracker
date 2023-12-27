
//import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';
function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);
  const fetchTasks = async () => {
    const response = await axios.get(API_URL);
    setTasks(response.data);
  };
  const addTask = async () => {
    if (newTask.trim() !== '') {
      const response = await axios.post(API_URL, { name: newTask });
      setTasks([...tasks, response.data]);
      setNewTask('');
    }
  };
  const deleteTask = async (taskId) => {
    const response = await axios.delete(`${API_URL}/${taskId}`);
    setTasks(tasks.filter(task => task.id !== response.data.id));
  };
  

}

export default App;