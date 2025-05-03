import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useLogoutMutation } from 'hooks/auth';
import { Menu, X } from 'lucide-react';
import { useRemoveAuthField } from 'hooks/useRemoveAuthField';
import { useAuthData } from 'hooks/useAuthData';

const Navbar: React.FC = () => {
  const { removeAuthField } = useRemoveAuthField();
  const { isAuthenticated, firstname, lastname } = useAuthData();
  const fullName = `${firstname} ${lastname}`;
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
 

  const logoutMutation = useLogoutMutation({
    onSuccess: () => {
      toast.success("Successfully logged out.");

      removeAuthField('auth_status');
      removeAuthField('firstname');
      removeAuthField('lastname');
      removeAuthField('token');
      removeAuthField('role');

      navigate("/signin");
    },
    onError: () => {}
  });

  const onLogoutHandler = () => {
    logoutMutation.mutate({});
  };

  return (
    <nav className="bg-blue-500 text-white p-4 w-full">
      <div className="flex justify-between items-center container mx-auto">
        <div className="text-2xl font-bold">
          <Link to="/" className="text-white">DermaQ</Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white focus:outline-none">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4">
          {isAuthenticated ? (
            <>
              <div className="flex items-center space-x-2">
                Welcome,&nbsp;<span className="text-white font-bold">{fullName}</span>
              </div>
              <Link to="/reservations" className="hover:text-gray-300">Reservations</Link>
              <Link to="/profile" className="hover:text-gray-300">My Profile</Link>

              <button 
                onClick={onLogoutHandler} 
                className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md font-bold"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/signin" className="hover:text-gray-300">Sign In</Link>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-600 p-4 space-y-3 text-center">
          {isAuthenticated ? (
            <>
              <div className="text-white font-bold">Welcome, {fullName}</div>
              <Link to="/reservations" className="block hover:text-gray-300">Reservations</Link>
              <Link to="/profile" className="block hover:text-gray-300">My Profile</Link>

              <button 
                onClick={onLogoutHandler} 
                className="w-full text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md font-bold mt-2"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/signin" className="block hover:text-gray-300">Sign In</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
