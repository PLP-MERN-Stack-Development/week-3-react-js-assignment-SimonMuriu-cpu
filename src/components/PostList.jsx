import React, { useState, useEffect } from 'react';
import Card from './Card';
import Button from './Button';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedPosts = filteredPosts.slice(
    (page - 1) * postsPerPage,
    page * postsPerPage
  );

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-300">Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error: {error}</p>
        <Button
          variant="primary"
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search posts..."
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div className="grid gap-6">
        {paginatedPosts.map(post => (
          <Card key={post.id}>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              {post.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {post.body}
            </p>
          </Card>
        ))}
      </div>

      <div className="flex justify-center gap-2">
        <Button
          variant="secondary"
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <span className="px-4 py-2 text-gray-600 dark:text-gray-300">
          Page {page} of {Math.ceil(filteredPosts.length / postsPerPage)}
        </span>
        <Button
          variant="secondary"
          onClick={() => setPage(p => Math.min(Math.ceil(filteredPosts.length / postsPerPage), p + 1))}
          disabled={page === Math.ceil(filteredPosts.length / postsPerPage)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PostList; 