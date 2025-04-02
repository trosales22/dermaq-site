import React, { useState } from 'react';
import { AlertTriangle, LoaderIcon } from 'lucide-react';
import { useListReservation } from 'hooks/reservation';
import { debounce } from 'lodash';

const ReservationList: React.FC = () => {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(25);

    const handleSearchChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }, 300);

    const { data: response, isLoading, isError }: any = useListReservation({
        params: { q: search, page: currentPage, limit: itemsPerPage }
    })
    const list = response?.data?.data || []
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {list.map((item: any) => (
                        <div 
                            key={item.id} 
                            className="card text-black shadow-xl rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer"
                            onClick={() => window.open(`/sessions/${item?.attributes?.clinic_session?.refno}`, "_blank")}
                        >
                            <div className="card-body p-6 flex flex-col">
                            <span className="text-medium font-semibold text-blue-600">{item?.attributes?.refno}</span>
                            <span className="card-title text-lg font-bold flex items-center">
                                {item?.attributes?.clinic_session?.title}
                            </span>

                            <p className="text-medium italic">{item?.attributes?.clinic_session?.description}</p>

                            <div className="mt-4 flex justify-between text-sm text-black-200">
                                <p className="font-semibold">🧑‍🤝‍🧑 Max Slots: <span className="font-bold text-black">{item?.attributes?.clinic_session?.max_slots}</span></p>       
                                <p className="font-semibold text-right">📅 {`${item?.attributes?.clinic_session?.session_date} (${item?.attributes?.clinic_session?.formatted_start_time} - ${item?.attributes?.clinic_session?.formatted_end_time})`}</p>
                            </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-6">
                    <button 
                        className="btn btn-sm btn-primary mr-2"
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                    Previous
                    </button>

                    <span className="font-semibold">
                    Page {currentPage} of {totalPages}
                    </span>

                    <button 
                        className="btn btn-sm btn-primary ml-2"
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
