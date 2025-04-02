import React from 'react';
import SessionList from 'components/SessionList';
import { Link } from 'react-router-dom';
import Layout from 'components/Layout';
import Cookies from "js-cookie";

const LandingPage: React.FC = () => {
    const authStatus = Cookies.get('auth_status') ?? '';
    const isAuthenticated: boolean = authStatus === 'authenticated'

    return (
        <Layout>
            <div className="relative flex-1 bg-gradient-to-b from-blue-500 to-blue-300 py-16">
                <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
                <div className="relative z-10 container mx-auto px-6 text-center text-white">
                    <h1 className="text-5xl font-bold leading-tight mb-4">Transform Your Skin with Our Exclusive Sessions</h1>
                    <p className="text-xl mb-8">Book your next session today and get glowing!</p>
                    <SessionList />
                </div>
            </div>

            {!isAuthenticated && (
                <div className="w-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 p-12 text-center">
                <div className="container mx-auto">
                    <div className="bg-transparent p-10 rounded-lg shadow-xl text-center">
                    <h2 className="text-3xl font-semibold text-white mb-6">Ready to Get Started?</h2>
                    <p className="text-lg text-white mb-8">Join us today to start booking your sessions and enjoying exclusive offers.</p>
                    <Link to="/register">
                        <button className="py-3 px-8 bg-blue-600 text-white text-lg rounded-full hover:bg-blue-700 transition duration-300">
                        Register Now
                        </button>
                    </Link>
                    </div>
                </div>
                </div>
            )}
        </Layout>
    );
};

export default LandingPage;
