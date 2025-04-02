import React from 'react';
import Layout from 'components/Layout';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useLoginMutation } from 'hooks/auth';
import Cookies from "js-cookie";
import { toast } from 'react-toastify';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm();

    const { mutate: login, isPending: isLoginLoading } = useLoginMutation({
        onSuccess: (res) => {
            toast.success("Successfully logged in.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                progress: undefined,
                theme: "colored"
            });

            Cookies.set('auth_status', 'authenticated');
            Cookies.set('token', res.data?.access_token?.token);
            Cookies.set('firstname', res?.data?.details?.firstname);
            Cookies.set('lastname', res?.data?.details?.lastname);
            Cookies.set('role', res?.data?.details?.role);

            navigate("/");
        },
        onError: () => {}
    });

    const onLoginHandler = (data: any) => {
        login(data);
    };

    return (
        <Layout>
            <main className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-12">
                <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-xl">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
                    
                    <form onSubmit={handleSubmit(onLoginHandler)} className="space-y-4">
                        <div>
                        <label htmlFor="user_id" className="block text-sm font-medium text-gray-700 mb-2">User ID</label>
                        <input
                            type="text"
                            id="user_id"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your user ID"
                            {...register("user_id")}
                        />
                        </div>

                        <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your password"
                            {...register("password")}
                        />
                        </div>

                        <div className="flex justify-between items-center">
                            <Link to="/forgot-password" className="text-sm text-indigo-500 hover:text-indigo-700">Forgot password?</Link>
                        </div>

                        <div>
                        <button
                            type="submit"
                            disabled={isLoginLoading}
                            className={`w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md focus:outline-none hover:bg-indigo-700 transition duration-300 ${isLoginLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isLoginLoading ? 'Logging in...' : 'Log in'}
                        </button>
                        </div>
                    </form>

                    <div className="text-center mt-6">
                        <p className="text-sm text-gray-600">Don't have an account? <Link to="/register" className="text-indigo-500 hover:text-indigo-700">Register</Link></p>
                    </div>
                </div>
            </main>
        </Layout>
    );
};

export default LoginPage;
