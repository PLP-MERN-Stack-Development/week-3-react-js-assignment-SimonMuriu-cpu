import React, { useState, useEffect } from 'react';
import { Button } from './ui/Button';
import useLocalStorage from '../hooks/UseLocalStorage';

const FILTERS = {
  all: task => true,
  active: task => !task.completed,
  completed: task => task.completed,
};

/**
 * Custom hook for managing tasks with localStorage persistence
 */
const useLocalStorageTasks = () => {
  // Initialize state from localStorage or with empty array
  const [tasks, setTasks] = useLocalStorage('tasks', []);

  // Update localStorage when tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const addTask = (text) => {
    if (text.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text,
          completed: false,
          createdAt: new Date().toISOString(),
        },
      ]);
    }
  };

  // Toggle task completion status
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return { tasks, addTask, toggleTask, deleteTask };
};

/**
 * TaskManager component for managing tasks
 */
const TaskManager = () => {
  const { tasks, addTask, toggleTask, deleteTask } = useLocalStorageTasks();
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');

  // Filter tasks based on selected filter
  const filteredTasks = tasks.filter(FILTERS[filter]);

  return (
    <div className="max-w-md mx-auto p-4 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Task Manager</h2>
      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 px-2 py-1 border rounded"
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add a new task..."
          onKeyDown={e => e.key === "Enter" && addTask(input)}
        />
        <Button onClick={() => addTask(input)} variant="primary">Add</Button>
      </div>
      <div className="flex gap-2 mb-4">
        <Button variant={filter === 'all' ? 'primary' : 'secondary'} onClick={() => setFilter('all')}>All</Button>
        <Button variant={filter === 'active' ? 'primary' : 'secondary'} onClick={() => setFilter('active')}>Active</Button>
        <Button variant={filter === 'completed' ? 'primary' : 'secondary'} onClick={() => setFilter('completed')}>Completed</Button>
      </div>
      <ul className="space-y-2">
        {filteredTasks.length === 0 && <li className="text-gray-500">No tasks</li>}
        {filteredTasks.map(task => (
          <li key={task.id} className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-700 rounded">
            <span
              className={`flex-1 cursor-pointer ${task.completed ? 'line-through text-gray-400' : ''}`}
              onClick={() => toggleTask(task.id)}
            >
              {task.text}
            </span>
            <Button variant="danger" className="ml-2" onClick={() => deleteTask(task.id)}>
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager; 