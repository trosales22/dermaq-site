import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from 'components/Layout';
import { listenToQueueData } from 'utils/firebaseHelper';
import { useListReservedQueue, useShowClinicSessionByRefNo } from 'hooks/clinic-session';
import { AlertTriangle } from 'lucide-react';
import Cookies from "js-cookie";

interface QueueItem {
  queueNo: number;
}

const SessionDetailPage: React.FC = () => {
  const isAuthenticated: boolean = Cookies.get('auth_status') === 'authenticated';
  const navigate = useNavigate()
  const { refno } = useParams<{ refno: string }>();

  const { data: response, isLoading, isError }: any = useShowClinicSessionByRefNo({refno})
  const sessionDetail = response?.data?.data?.attributes || null

  const { 
    data: reservedQueueListResponse
  }: any = useListReservedQueue({
    refno
  })

  const reservedQueueList = reservedQueueListResponse?.data?.data || []

  const [queue, setQueue] = useState<QueueItem[]>([]);

  useEffect(() => {
    if (!refno) return;

    const unsubscribe = listenToQueueData(refno, (queueData) => {
      setQueue(queueData);
    });

    return () => unsubscribe();
  }, [refno]);

  const currentQueueNumber = queue.length > 0 ? queue[0].queueNo : 0;
  const nextQueueNumbers = queue.slice(1, 6).map((item) => item.queueNo);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full bg-gray-100 relative">
        <div className="absolute inset-0 bg-white bg-opacity-80 flex flex-col justify-center items-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-lg font-semibold text-gray-700">Loading sessions, please wait...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen w-full bg-gray-100 relative">
        <div className="absolute inset-0 bg-red-100 bg-opacity-80 flex flex-col justify-center items-center border border-red-400 text-red-700 p-6">
          <AlertTriangle /> <span className="text-lg font-semibold">Failed to load clinic session. Please try again later.</span>
          <button 
            className="mt-4 btn btn-outline btn-primary hover:bg-primary hover:text-white transition" 
            onClick={() => navigate('/')}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="relative flex-1 bg-gradient-to-b from-indigo-500 to-blue-500 py-16">
        <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

        <div className="relative z-10 container mx-auto px-6 text-white">
          <h1 className="text-4xl font-bold mb-4">{sessionDetail?.title}</h1>
          <p className="text-lg mb-8">{sessionDetail?.description}</p>

          <div className="bg-white bg-opacity-70 p-8 rounded-lg shadow-xl max-w-2xl mx-auto relative">
            {isAuthenticated && (
              <div className='absolute bottom-4 right-4'>
                <button className="py-2 px-6 bg-red-600 text-white rounded-full hover:bg-red-700 transition duration-300">
                  Cancel Reservation
                </button>
              </div>
            )}

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Session Details</h2>
            <ul className="text-gray-700 space-y-2">
              <li><strong>Max Slot:</strong> {sessionDetail?.max_slots || 0}</li>
              <li><strong>Date & Time:</strong> {`${sessionDetail?.session_date} (${sessionDetail?.formatted_start_time} - ${sessionDetail?.formatted_end_time})`}</li>
              <li><strong>Status:</strong> {sessionDetail?.status?.label}</li>
            </ul>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {isAuthenticated && (
              <div className="p-6 bg-gradient-to-b from-gray-200 to-gray-300 rounded-lg shadow-xl transform transition-all duration-300 hover:scale-105">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Reserved Queue Numbers</h3>
    
              <div className="space-y-2">
                {reservedQueueList.map((item: any, index: number) => {
                  return <div
                    key={index}
                    className="text-4xl font-bold text-gray-800 py-2 px-8 border-4 border-gray-300 rounded-lg inline-block"
                  >
                    #{item?.attributes?.queue_number}
                  </div>
                })}
              </div>
            </div>
            )}

            <div className="p-6 bg-gradient-to-b from-gray-200 to-gray-300 rounded-lg shadow-xl transform transition-all duration-300 hover:scale-105">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Current Queue Number</h3>
              {currentQueueNumber > 0 && (
                <div className="text-4xl font-bold text-gray-800 py-2 px-8 border-4 border-gray-300 rounded-lg inline-block">
                  #{currentQueueNumber}
                </div>
              )}
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

          {!isAuthenticated && (
            <div className="mt-8 text-center">
              <button className="py-3 px-8 bg-blue-600 text-white text-lg rounded-full hover:bg-blue-700 transition duration-300">
                Book This Session
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SessionDetailPage;
