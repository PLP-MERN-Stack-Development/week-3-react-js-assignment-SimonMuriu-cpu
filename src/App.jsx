import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Posts from './pages/Posts';

import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<Tasks />} />
            
            <Route path="/posts" element={<Posts />} />
            {/* Add more routes here as we create them */}
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App; 