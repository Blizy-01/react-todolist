import './App.css';
import { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleEditChange = (event) => {
    setEditText(event.target.value);
  };

  const addTask = () => {
    if (newTask.trim() === '') return;
    
    const task = {
      id: Date.now(),
      text: newTask,
      completed: false
    };
    setTasks([...tasks, task]);
    setNewTask('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  };

  const handleEditKeyPress = (event) => {
    if (event.key === 'Enter') {
      updateTask();
    }
  };

  const deleteTask = (id) => {
    const newTaskList = tasks.filter((task) => task.id !== id);
    setTasks(newTaskList);
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const updateTask = () => {
    if (editText.trim() === '') return;
    
    const updatedTasks = tasks.map(task => 
      task.id === editingId ? { ...task, text: editText } : task
    );
    
    setTasks(updatedTasks);
    setEditingId(null);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const toggleComplete = (id) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <h1>My ToDo List</h1>
      <div className="add-task">
        <input 
          value={newTask}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter new task"
        />
        <button onClick={addTask}>Add</button>
      </div>
      <div className="list">
        {tasks.map((task) => (
          <div key={task.id} className="task-item">
            {editingId === task.id ? (
              <div className="edit-mode">
                <input 
                  value={editText}
                  onChange={handleEditChange}
                  onKeyPress={handleEditKeyPress}
                />
                <button onClick={updateTask}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </div>
            ) : (
              <div className="view-mode">
                <div className="task-content">
                  <input 
                    type="checkbox" 
                    checked={task.completed}
                    onChange={() => toggleComplete(task.id)}
                    className="task-checkbox"
                  />
                  <h3 className={task.completed ? "completed" : ""}>
                    {task.text}
                  </h3>
                </div>
                <div className="task-buttons">
                  <button onClick={() => startEditing(task.id, task.text)}>Edit</button>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
