import React from 'react';
import Layout from 'components/Layout';
import { Link, useNavigate } from 'react-router-dom';
import { CustomerFormData, customerSchema } from 'schemas/customerSchema';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { useRegisterCustomer } from 'hooks/auth';
import { toast } from 'react-toastify';
import Cookies from "js-cookie";

const RegisterPage: React.FC = () => {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CustomerFormData>({
        resolver: zodResolver(customerSchema)
    });

    const { mutate: registerCustomer, isPending: isRegisterLoading } = useRegisterCustomer({
        onSuccess: (res) => {
            toast.info("Registered user successfully.")

            Cookies.set('auth_status', 'authenticated');
            Cookies.set('token', res.data?.access_token?.token);
            Cookies.set('firstname', res?.data?.details?.firstname);
            Cookies.set('lastname', res?.data?.details?.lastname);
            Cookies.set('role', res?.data?.details?.role);

            reset()
            navigate('/profile')
        },
        onError: () => {}
    });

    const onSubmit = (data: any) => {
        registerCustomer(data);
    };

    return (
        <Layout>
            <main className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-12">
            <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-xl">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your username"
                            {...register("username")}
                        />
                        {errors.username && <label className="text-red-500 text-sm">{errors.username.message}</label>}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                            type="text"
                            id="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your email"
                            {...register("email")}
                        />
                        {errors.email && <label className="text-red-500 text-sm">{errors.email.message}</label>}
                    </div>

                    <div>
                        <label htmlFor="firstname" className="block text-sm font-medium text-gray-700 mb-2">Firstname</label>
                        <input
                            type="text"
                            id="firstname"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your firstname"
                            {...register("firstname")}
                        />
                        {errors.firstname && <label className="text-red-500 text-sm">{errors.firstname.message}</label>}
                    </div>

                    <div>
                        <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mb-2">Lastname</label>
                        <input
                            type="text"
                            id="lastname"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your lastname"
                            {...register("lastname")}
                        />
                        {errors.lastname && <label className="text-red-500 text-sm">{errors.lastname.message}</label>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your password"
                            {...register("password")}
                        />
                        {errors.password && <label className="text-red-500 text-sm">{errors.password.message}</label>}
                    </div>

                    <div>
                    <button
                        type="submit"
                        disabled={isRegisterLoading}
                        className={`w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md focus:outline-none hover:bg-indigo-700 transition duration-300 ${isRegisterLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isRegisterLoading ? 'Registering...' : 'Create Account'}
                    </button>
                    </div>
                </form>

                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">Already have an account? <Link to="/signin" className="text-indigo-500 hover:text-indigo-700">Login</Link></p>
                </div>
            </div>
        </main>
        </Layout>
    );
};

export default RegisterPage;
