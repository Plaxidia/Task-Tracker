
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const API_URL = 'http://localhost:5000/api/tasks';
function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const [ updatedTaskName,setUpdatedTaskName] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [taskIdToUpdate, setTaskIdToUpdate] = useState(null);



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

  const updateTask = async (taskId, updatedName) => {
    try {
      // Make a PUT request to update the task '/api/tasks/:id' ${API_URL}/task/`
      const response = await axios.put(`${API_URL}/${taskId}`, {name: updatedName,id:taskId
      });
      // Handle the response, e.g., show a success message
      console.log('Task updated:', response.data);
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error('Error updating task:', error);
    }
    
  };
  const handleTask = () => {
    if (isUpdating) {
      // Update task
      updateTask(taskIdToUpdate, updatedTaskName);
    }else {
        // Create task
        addTask(newTask);
      }
      // Clear input fields and reset update state
      setNewTask('');
      setUpdatedTaskName('');
      setIsUpdating(false);
      setTaskIdToUpdate(null);
  };   
  const deleteTask = async (taskId ,name) => {
    console.log('deleting')
      await axios.delete(`${API_URL}/${taskId}`, {name: tasks,id:taskId});
     
  };

  
  return (
    <div>
      <div className="Container">
        <h1>Task Tracker</h1>
          {/* Input field for creating or updating tasks */}
             <div  className="input-container">
                <input
                    type="text"
                      placeholder={isUpdating ? 'Update Task' : 'Add Task'}
                      value={isUpdating ? updatedTaskName : newTask}
                      onChange={e => (isUpdating ? setUpdatedTaskName(e.target.value) : setNewTask(e.target.value))}
                />
                      {/* Button to create or update tasks */}

                <button onClick={handleTask}>
                    {isUpdating ? 'Update' : 'Add'}
                </button>
             </div>

        <table>
            <thead>
              <tr>
                <th>
                  Task Name
                </th>
                <th className="Left-align">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              
                    
               
                {tasks.map(task => (
                  <tr key={task.id}>
                    
                    {/* Display the task name */}
                      <td>{task.name}</td>
                      <td className="Left-align_1">
                        {/* Buttons for update and delete */}
                          <button className="update-btn" onClick={() => {

                              setUpdatedTaskName(task.name);
                              setIsUpdating(true);
                              setTaskIdToUpdate(task.id);
                            }}>
                              Update
                          </button>

                          <button className="delete-btn" onClick={() => deleteTask(task.id)}>
                              Delete
                          </button>
                      </td>
                  </tr>
                ))}

               
              
            </tbody>
        
        </table>
     </div>
    </div>
  );
}
export default App;
