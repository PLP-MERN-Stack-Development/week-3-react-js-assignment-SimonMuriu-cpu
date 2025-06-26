import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const Home = () => {
  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to Task Manager
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Organize your tasks efficiently and boost your productivity
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Easy Task Management
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Create, organize, and track your tasks with our intuitive interface.
          </p>
          <Button variant="primary">Get Started</Button>
        </Card>

        <Card>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Smart Organization
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Filter and sort your tasks to focus on what matters most.
          </p>
          <Button variant="secondary">Learn More</Button>
        </Card>

        <Card>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Dark Mode Support
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Work comfortably in any lighting condition with our dark mode feature.
          </p>
          <Button variant="primary">Try Dark Mode</Button>
        </Card>
      </section>
    </div>
  );
};

export default Home; 