import { useListClinicSession } from 'hooks/clinic-session';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import Cookies from "js-cookie";

const SessionList: React.FC = () => {
  const navigate = useNavigate()
  const isAuthenticated: boolean = Cookies.get('auth_status') === 'authenticated';
  const { data: response, isLoading, isError }: any = useListClinicSession({})
  const list = response?.data?.data || []

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-64 text-white-500 text-lg font-semibold">
        <AlertTriangle />&nbsp;Failed to load sessions. Please try again later.
      </div>
    );
  }

  if (list.length <= 0) {
    return (
      <div className="flex flex-col justify-center items-center h-64 text-white-500 text-lg font-semibold space-y-4">
        <div className="text-4xl">
          <AlertTriangle />
        </div>
        <div>No sessions available at the moment.</div>
      </div>
    );
  }
  
  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {list.map((item: any) => (
        <div 
          key={item.id} 
          className="card bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-xl rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer"
          onClick={() => navigate(`/sessions/${item?.attributes?.refno}`)}
        >
          <div className="card-body p-6">
            <h2 className="card-title text-xl font-bold flex items-center gap-2">
              <span className="bg-white text-black px-2 py-1 rounded-md">[{item?.attributes?.refno}]</span>
              {item?.attributes?.title}
            </h2>
            <p className="text-lg mt-2">{item?.attributes?.description}</p>
            <p className="text-sm font-semibold text-gray-200 mt-4">🧑‍🤝‍🧑 Max Slots: <span className="font-bold text-white">{item?.attributes?.max_slots}</span></p>

            {isAuthenticated ? (
              <button 
                className="mt-4 btn btn-outline btn-white hover:bg-white hover:text-black transition"
                onClick={(event) => {
                  event.stopPropagation();
                }}
              >
                Reserve Slot
              </button>
            ) : (
              <div className="mt-4 text-sm text-black">You need to log in to reserve slot.</div>
            )}            
          </div>
        </div>
      ))}
    </div>
  );
};

export default SessionList;
