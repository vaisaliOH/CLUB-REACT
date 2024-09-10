import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskText, setEditingTaskText] = useState('');
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  const addTask = () => {
    if (newTask.trim() === '') {
      alert('Please enter a task.');
      return;
    }
    const newTaskObj = {
      id: Date.now(),
      text: newTask,
      completed: false
    };

    setTasks([...tasks, newTaskObj]);
    setNewTask('');
  };
  const toggleCompleteTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const startEditing = (task) => {
    setEditingTaskId(task.id);
    setEditingTaskText(task.text);
  };

  const saveEdit = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === editingTaskId ? { ...task, text: editingTaskText } : task
    );
    setTasks(updatedTasks);
    setEditingTaskId(null);
    setEditingTaskText('');
  };


  return (
    <div>
      <h1> My Tasks 📝</h1>
    <div className="app-container">
      <h2>TO-DO LIST:</h2>
      <div className="task-input">
        <input
          type="text"
          placeholder="Write down your tasks"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            {editingTaskId === task.id ? (
              <>
                <input
                  type="text"
                  value={editingTaskText}
                  onChange={(e) => setEditingTaskText(e.target.value)}
                />
                <button onClick={saveEdit}>Save</button>
              </>
            ) : (
              <>
                <span onClick={() => toggleCompleteTask(task.id)}>
                  {task.text}
                </span>
                <div className="task-actions">
                  <button onClick={() => startEditing(task)}>Edit task</button>
                  <button onClick={() => deleteTask(task.id)}>Delete task</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}

export default App;