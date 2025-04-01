import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const isLoggedIn = false;
  
  return (
    <nav className="bg-blue-500 text-white p-4 w-full">
      <div className="flex justify-between items-center container mx-auto">
        <div className="text-2xl font-bold">
          <Link to="/" className="text-white">DermaQ</Link>
        </div>

        <div className="space-x-4">
          {isLoggedIn ? (
            <>
              <Link to="/reservations" className="hover:text-gray-300">Reservations</Link>
              <Link to="/profile" className="hover:text-gray-300">My Profile</Link>
            </>
          ) : (
            <Link to="/signin" className="hover:text-gray-300">Sign In</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
