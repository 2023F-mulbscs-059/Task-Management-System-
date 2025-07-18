import React from 'react';

const TaskList = ({ tasks, onTaskUpdated, onTaskDeleted }) => {
  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const task = tasks.find(t => t.id === taskId);
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...task,
          status: newStatus
        }),
      });

      if (response.ok) {
        const updatedTask = await response.json();
        onTaskUpdated(updatedTask);
      } else {
        console.error('Failed to update task');
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onTaskDeleted(taskId);
      } else {
        console.error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending':
        return 'status-pending';
      case 'in-progress':
        return 'status-in-progress';
      case 'completed':
        return 'status-completed';
      default:
        return 'status-pending';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (tasks.length === 0) {
    return (
      <div className="tasks-section">
        <h2>Your Tasks</h2>
        <div className="no-tasks">
          No tasks yet. Add your first task above!
        </div>
      </div>
    );
  }

  return (
    <div className="tasks-section">
      <h2>Your Tasks ({tasks.length})</h2>
      {tasks.map(task => (
        <div key={task.id} className="task-item">
          <h3>{task.name}</h3>
          {task.description && <p>{task.description}</p>}
          
          <div className={`task-status ${getStatusClass(task.status)}`}>
            {task.status.replace('-', ' ')}
          </div>
          
          <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9rem' }}>
            Created: {formatDate(task.created_at)}
          </p>
          
          <div className="task-actions">
            <select
              value={task.status}
              onChange={(e) => handleStatusChange(task.id, e.target.value)}
              style={{
                padding: '0.5rem',
                borderRadius: '4px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                fontSize: '0.9rem'
              }}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            
            <button
              onClick={() => handleDelete(task.id)}
              className="btn btn-danger"
              style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;