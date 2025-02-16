import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/tasks');
        setTasks(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTasks();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/tasks', { title: newTask });
      setTasks([...tasks, res.data.task]);
      setNewTask('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="task-manager">
      <h2>Task Manager</h2>
      <form onSubmit={addTask}>
        <input 
          type="text" 
          placeholder="Add a new task" 
          value={newTask} 
          onChange={e => setNewTask(e.target.value)} 
          required 
        />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.title || task.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;
