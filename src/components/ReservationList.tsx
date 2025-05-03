import React, { useState } from 'react';
import { AlertTriangle, Hash, LoaderIcon } from 'lucide-react';
import { useListReservation } from 'hooks/reservation';
import { debounce } from 'lodash';
import { SessionReservationList } from 'types/session';

const ReservationList: React.FC = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(25);

  const handleSearchChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, 300);

  const {
    data: response,
    isLoading,
    isError,
  }: any = useListReservation({
    params: { q: search, page: currentPage, limit: itemsPerPage },
  });
  const list: SessionReservationList[] = response?.data?.data || [];
  const totalItems = response?.data?.meta?.pagination?.total || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6">
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search.."
          onChange={handleSearchChange}
          className="input input-bordered input-primary w-full sm:w-3/4 md:w-1/2 max-w-md"
        />
      </div>

      {isLoading && (
        <div className="flex justify-center items-center h-64 text-white-500 text-lg font-semibold">
          <div className="text-4xl">
            <LoaderIcon />
          </div>
          Fetching reservations..
        </div>
      )}

      {isError && (
        <div className="flex justify-center items-center h-64 text-white-500 text-lg font-semibold">
          <div className="text-4xl">
            <AlertTriangle />
          </div>
          Failed to load reservations. Please try again later.
        </div>
      )}

      {list.length <= 0 && (
        <div className="flex flex-col justify-center items-center h-64 text-white-500 text-lg font-semibold space-y-4">
          <div className="text-4xl">
            <AlertTriangle />
          </div>
          <div>No reservations found.</div>
        </div>
      )}

      {!isLoading && !isError && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
            {list.map((item) => {
              const session = item?.attributes?.clinic_session;
              const sessionEnd = new Date(`${session?.session_date}T${session?.end_time}`);
              const currentDate = new Date();

              // Determine if the session has ended
              const hasEnded = currentDate > sessionEnd;

              return (
                <div
                  key={item.id}
                  className="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-transform transform hover:scale-[1.02] cursor-pointer"
                  onClick={() => window.open(`/sessions/${session?.refno}`, '_blank')}
                >
                  <div className="p-5 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-blue-600 font-semibold">
                        <Hash size={18} color="blue" />
                        <span>{item?.attributes?.refno}</span>
                      </div>
                      <span
                        className={`badge text-xs px-3 py-1 rounded-full ${
                          hasEnded ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                        }`}
                      >
                        {hasEnded ? 'Ended' : 'Upcoming'}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-gray-800 line-clamp-2">
                      {session?.title}
                    </h2>

                    <p className="text-sm text-gray-500 line-clamp-3 italic">
                      {session?.description}
                    </p>

                    <div className="text-sm text-gray-700 mt-2 space-y-1">
                      <p>
                        📅 <span className="font-semibold">{session?.formatted_session_date}</span>{' '}
                        ({session?.formatted_start_time} - {session?.formatted_end_time})
                      </p>
                      <p>🧑‍🤝‍🧑 Max Slot: {session?.max_slots}</p>
                    </div>

                    <div className="mt-3 text-blue-600 text-sm font-semibold">
                      Queue #: <span className="text-black">{item?.attributes?.queue_number}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center items-center mt-8 gap-4 px-4">
            <button
              className="btn btn-sm btn-outline"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>

            <span className="text-sm font-medium">
              Page {currentPage} of {totalPages}
            </span>

            <button
              className="btn btn-sm btn-outline"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ReservationList;
