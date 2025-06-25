import React from 'react';
import TaskManager from '../components/TaskManager';

const Tasks = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Task Manager
      </h1>
      <TaskManager />
    </div>
  );
};

export default Tasks; 