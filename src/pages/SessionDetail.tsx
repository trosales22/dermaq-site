import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Layout from 'components/Layout';

const user = {
  isAuthenticated: true,
  reservedQueueNumber: 42,
  reservedSession: 'Glowing Skin Facial'
};

const SessionDetailPage: React.FC = () => {
  const { refno } = useParams();
  
  const sessionData = {
    refno: refno,
    title: 'Glowing Skin Facial',
    description: 'A rejuvenating facial treatment designed to bring out your natural glow and youthful appearance.',
    date: 'April 5, 2025, 10:00 AM',
    location: 'DermaQ Clinic, Main Branch',
    price: '$50',
  };

  const currentQueueNumber = 50;
  const nextQueueNumbers = [51, 52, 53, 54, 55];

  return (
    <Layout>
      <div className="relative flex-1 bg-gradient-to-b from-indigo-500 to-blue-500 py-16">
        <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

        <div className="relative z-10 container mx-auto px-6 text-white">
          <h1 className="text-4xl font-bold mb-4">{sessionData.title}</h1>
          <p className="text-lg mb-8">{sessionData.description}</p>

          <div className="bg-white bg-opacity-70 p-8 rounded-lg shadow-xl max-w-2xl mx-auto relative">
            {user.isAuthenticated && (
              <Link to="/cancel-reservation" className="absolute bottom-4 right-4">
                <button className="py-2 px-6 bg-red-600 text-white rounded-full hover:bg-red-700 transition duration-300">
                  Cancel Reservation
                </button>
              </Link>
            )}

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Session Details</h2>
            <ul className="text-gray-700 space-y-2">
              <li><strong>Date & Time:</strong> {sessionData.date}</li>
              <li><strong>Location:</strong> {sessionData.location}</li>
              <li><strong>Price:</strong> {sessionData.price}</li>
            </ul>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="p-6 bg-gradient-to-b from-gray-200 to-gray-300 rounded-lg shadow-xl transform transition-all duration-300 hover:scale-105">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Reserved Queue Number</h3>
              <div className="text-4xl font-bold text-gray-800 py-2 px-8 border-4 border-gray-300 rounded-lg inline-block">
                #{user.reservedQueueNumber}
              </div>
            </div>

            <div className="p-6 bg-gradient-to-b from-gray-200 to-gray-300 rounded-lg shadow-xl transform transition-all duration-300 hover:scale-105">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Current Queue Number</h3>
              <div className="text-4xl font-bold text-gray-800 py-2 px-8 border-4 border-gray-300 rounded-lg inline-block">
                #{currentQueueNumber}
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-between items-center max-w-2xl mx-auto">
            <div className="w-full text-center p-6 bg-gradient-to-b from-gray-200 to-gray-300 rounded-lg shadow-xl">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Next Queue Numbers</h3>
              <div className="text-lg text-gray-800 space-y-2">
                {nextQueueNumbers.map((num, index) => (
                  <div key={index} className="py-2 px-8 border-2 border-gray-300 rounded-lg inline-block">
                    #{num}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {!user.isAuthenticated && (
            <div className="mt-8 text-center">
              <Link to="/book-session">
                <button className="py-3 px-8 bg-blue-600 text-white text-lg rounded-full hover:bg-blue-700 transition duration-300">
                  Book This Session
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SessionDetailPage;
