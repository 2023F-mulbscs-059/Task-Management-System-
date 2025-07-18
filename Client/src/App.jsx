import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tasks from API
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/tasks');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      console.error('API error:', err);
      setError(`Failed to fetch tasks: ${err.message}`);
      
      // Fallback to test data if API fails
      setTasks([
        { id: 1, name: "Test Task 1", description: "This is a test task", status: "pending", created_at: new Date().toISOString() },
        { id: 2, name: "Test Task 2", description: "Another test task", status: "in-progress", created_at: new Date().toISOString() }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskAdded = (newTask) => {
    setTasks(prevTasks => [newTask, ...prevTasks]);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  const handleTaskDeleted = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const getTaskStats = () => {
    const pending = tasks.filter(task => task.status === 'pending').length;
    const inProgress = tasks.filter(task => task.status === 'in-progress').length;
    const completed = tasks.filter(task => task.status === 'completed').length;
    return { pending, inProgress, completed };
  };

  const stats = getTaskStats();

  return (
    <div className="container">
      <div className="header">
        <h1>Task Management System</h1>
        <p>Organize your tasks efficiently</p>
        {tasks.length > 0 && (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '2rem', 
            marginTop: '1rem',
            color: 'rgba(255, 255, 255, 0.8)'
          }}>
            <span>📋 Pending: {stats.pending}</span>
            <span>🔄 In Progress: {stats.inProgress}</span>
            <span>✅ Completed: {stats.completed}</span>
          </div>
        )}
      </div>

      {error && (
        <div className="error">
          <strong>Error:</strong> {error}
          <br />
          <small>Showing test data as fallback. Please check if the backend server is running on port 8800.</small>
        </div>
      )}

      <TaskForm onTaskAdded={handleTaskAdded} />

      {loading ? (
        <div className="loading">Loading tasks...</div>
      ) : (
        <TaskList 
          tasks={tasks} 
          onTaskUpdated={handleTaskUpdated}
          onTaskDeleted={handleTaskDeleted}
        />
      )}
    </div>
  );
}

export default App;