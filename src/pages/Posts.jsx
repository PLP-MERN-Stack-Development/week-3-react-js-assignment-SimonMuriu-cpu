import React from 'react';
import PostList from '../components/PostList';

const Posts = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Posts from JSONPlaceholder
      </h1>
      <PostList />
    </div>
  );
};

export default Posts; 