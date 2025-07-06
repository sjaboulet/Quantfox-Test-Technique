import React, { useEffect, useState } from 'react';
import { Trash2, Loader2, Plus } from 'lucide-react';

const API_BASE = 'http://localhost:8000';

const STATUS_COLORS = {
  TODO: '#facc15',
  IN_PROGRESS: '#3b82f6',
  DONE: '#22c55e',
};

export default function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [creating, setCreating] = useState(false);

  const headers = { 'Content-Type': 'application/json' };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/tasks`, { headers });
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async () => {
    if (!newTaskTitle.trim()) return;

    try {
      setCreating(true);
      const res = await fetch(`${API_BASE}/tasks`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ title: newTaskTitle, description: newTaskDescription }),
      });

      const newTask = await res.json();
      setTasks([newTask, ...tasks]);
      setNewTaskTitle('');
      setNewTaskDescription('');
    } catch (err) {
      console.error('Error creating task:', err);
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await fetch(`${API_BASE}/tasks/${id}`, {
        method: 'DELETE',
        headers,
      });
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await fetch(`${API_BASE}/tasks/${id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ status: newStatus }),
      });

      setTasks(tasks.map(t => (t.id === id ? { ...t, status: newStatus } : t)));
    } catch (err) {
      console.error('Error updating task status:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #533483 75%, #7209b7 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
      fontFamily: 'system-ui, sans-serif',
      color: 'white'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '500px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '20px',
        backdropFilter: 'blur(20px)',
        padding: '30px',
        border: '1px solid rgba(255,255,255,0.2)',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)'
      }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Your Tasks</h1>

        <div style={{ marginBottom: '15px' }}>
          <input
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Task title..."
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '10px',
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.1)',
              color: 'white',
              fontSize: '16px',
              marginBottom: '10px',
            }}
            onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
          />
          <textarea
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            placeholder="Task description (optional)..."
            rows={3}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '10px',
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.1)',
              color: 'white',
              fontSize: '14px',
              resize: 'vertical',
            }}
          />
        </div>

        <button
          onClick={handleAddTask}
          disabled={creating}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
            border: 'none',
            borderRadius: '10px',
            padding: '12px',
            cursor: 'pointer',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '16px',
            marginBottom: '20px',
          }}
        >
          {creating ? <Loader2 className="animate-spin" size={20} /> : '➕ Add Task'}
        </button>

        {loading ? (
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Loader2 className="animate-spin" size={24} />
          </div>
        ) : tasks.length === 0 ? (
          <p style={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center' }}>No tasks yet</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {tasks.map((task) => {
              const isDone = task.status === 'DONE';
              return (
                <li key={task.id} style={{
                  padding: '12px',
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '10px',
                  marginBottom: '10px',
                  background: isDone ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        margin: 0,
                        textDecoration: isDone ? 'line-through' : 'none',
                        color: isDone ? 'rgba(255,255,255,0.6)' : 'white',
                        fontWeight: 'bold',
                        fontSize: '18px',
                      }}>
                        {task.title}
                      </h3>
                      {task.description && (
                        <p style={{
                          marginTop: '4px',
                          color: isDone ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.8)',
                          fontSize: '14px',
                          whiteSpace: 'pre-wrap',
                        }}>
                          {task.description}
                        </p>
                      )}
                    </div>

                    <select
                      value={task.status}
                      onChange={(e) => handleStatusChange(task.id, e.target.value)}
                      style={{
                        marginLeft: '10px',
                        padding: '6px 10px',
                        borderRadius: '8px',
                        border: 'none',
                        backgroundColor: STATUS_COLORS[task.status] + '88',
                        color: 'white',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        minWidth: '110px',
                        appearance: 'none',
                      }}
                      title="Change task status"
                    >
                      <option value="TODO" style={{ color: STATUS_COLORS.TODO }}>To Do</option>
                      <option value="IN_PROGRESS" style={{ color: STATUS_COLORS.IN_PROGRESS }}>In Progress</option>
                      <option value="DONE" style={{ color: STATUS_COLORS.DONE }}>Done</option>
                    </select>

                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#ef4444',
                        cursor: 'pointer',
                        marginLeft: '10px'
                      }}
                      title="Delete task"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
