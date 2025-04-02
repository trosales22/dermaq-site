import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import { toast } from 'react-toastify';
import { useLogoutMutation } from 'hooks/auth';

const Navbar: React.FC = () => {
  const navigate = useNavigate()
  const isAuthenticated: boolean = Cookies.get('auth_status') === 'authenticated';
  const fullName = `${Cookies.get('firstname')} ${Cookies.get('lastname')}`
  
  const logoutMutation = useLogoutMutation({
    onSuccess: () => {
      toast.success("Successfully logged out.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "colored"
      });

      Cookies.remove('auth_status');
      Cookies.remove('firstname');
      Cookies.remove('lastname');
      Cookies.remove('token');
      Cookies.remove('role');

      navigate("/signin");
    },
    onError: () => {}
  })

  const onLogoutHander = () => {
    logoutMutation.mutate({})
  }

  return (
    <nav className="bg-blue-500 text-white p-4 w-full">
      <div className="flex justify-between items-center container mx-auto">
        <div className="text-2xl font-bold">
          <Link to="/" className="text-white">DermaQ</Link>
        </div>

        <div className="space-x-4">
          {isAuthenticated ? (
            <>
              <div className="flex items-center space-x-2">
                Welcome,&nbsp;<span className="text-white font-bold">{fullName}</span>
              </div>
              <Link to="/reservations" className="hover:text-gray-300">Reservations</Link>
              <Link to="/profile" className="hover:text-gray-300">My Profile</Link>

              <button 
                onClick={onLogoutHander} 
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
    </nav>
  );
};

export default Navbar;
