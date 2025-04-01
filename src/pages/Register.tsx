import React, { useState } from 'react';
import Layout from 'components/Layout';
import { Link } from 'react-router-dom';

const RegisterPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Simulate a registration attempt
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Dummy registration check (replace with real registration logic)
        if (password !== confirmPassword) {
            //toast.error('Passwords do not match.');
            setIsLoading(false);
            return;
        }

        // Simulate successful registration
        //toast.success('Registration successful!');
        setTimeout(() => window.location.href = '/login', 1000);

        setIsLoading(false);
    };

    return (
        <Layout>
            <main className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-12">
            <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-xl">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
                
                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter your email"
                    />
                    </div>

                    <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter your password"
                    />
                    </div>

                    <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Confirm your password"
                    />
                    </div>

                    <div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md focus:outline-none hover:bg-indigo-700 transition duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? 'Registering...' : 'Create Account'}
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
