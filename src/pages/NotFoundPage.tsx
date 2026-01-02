import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
    <h1 className="text-6xl font-black text-primary">404</h1>
    <p className="text-gray-500">Oops! The page you're looking for doesn't exist.</p>
    <Link to="/dashboard" className="text-accent font-bold underline">Return to Dashboard</Link>
  </div>
);

export default NotFoundPage;