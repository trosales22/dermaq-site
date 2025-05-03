import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center px-6 bg-base-100">
      <AlertTriangle className="w-16 h-16 text-error mb-4 animate-bounce" />
      <h1 className="text-5xl font-bold text-error mb-2">404</h1>
      <p className="text-xl font-medium text-base-content mb-6">Page Not Found</p>
      <p className="text-base-content mb-8 max-w-md">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary text-white rounded-full px-6 py-2">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
