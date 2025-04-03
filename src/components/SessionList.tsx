import { useListClinicSession } from 'hooks/clinic-session';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import Cookies from "js-cookie";
import { Button, Modal } from './ui/components';
import { useReserveSlotMutation } from 'hooks/reservation';
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'

const SessionList: React.FC = () => {
  const navigate = useNavigate()
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);
  const [openReserveConfirmation, setOpenReserveConfirmation] = useState(false);
  const [openSuccessReserve, setOpenSuccessReserve] = useState(false);
  const [selectedClinicSession, setSelectedSession] = useState<any>({
    id: null,
    refno: null
  })
  const isAuthenticated: boolean = Cookies.get('auth_status') === 'authenticated';
  const { data: response, isLoading, isError }: any = useListClinicSession({})
  const list = response?.data?.data || []

  const onShowReserveSuccessfulHandler = () => {
    setShowConfetti(true)
    setOpenSuccessReserve(true)
  }

  const { mutate: reserveSlot, isPending: isReserveSlotLoading } = useReserveSlotMutation({
    onSuccess: () => {
      setOpenReserveConfirmation(false)
      onShowReserveSuccessfulHandler()
      setShowConfetti(true);
    },
    onError: () => {}
  });

  const onShowReserveConfirmationHandler = (payload: any) => {
    setSelectedSession({
      id: payload.id,
      refno: payload.refno
    })
    setOpenReserveConfirmation(true)
  }

  const onReserveSlotHandler = () => {
    reserveSlot({
      clinic_session_id: selectedClinicSession.id
    })
  }

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
    <div>
      {showConfetti && <Confetti width={width} height={height} />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {list.map((item: any) => (
          <div 
            key={item.id} 
            className="card text-gray-700 bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
            onClick={() => navigate(`/sessions/${item?.attributes?.refno}`)}
          >
            <div className="card-body p-6 flex flex-col">
              <span className="card-title text-lg font-bold flex items-center">
                {item?.attributes?.title}
              </span>

              <p className="text-sm italic text-black">{item?.attributes?.description}</p>

              <div className="mt-4 flex flex-col text-left text-sm text-black">
                <p className="font-semibold">
                  🧑‍🤝‍🧑 Max Slot: {item?.attributes?.max_slots}
                </p>       
                <p className="font-semibold">
                  📅 {`${item?.attributes?.session_date} (${item?.attributes?.formatted_start_time} - ${item?.attributes?.formatted_end_time})`}
                </p>
              </div>

              {isAuthenticated ? (
                <button 
                  className="mt-4 btn bg-blue-500 border-gray-300 text-white hover:bg-blue-800 transition"
                  onClick={(event) => {
                    event.stopPropagation();
                    onShowReserveConfirmationHandler({
                      id: item?.id,
                      refno: item?.attributes?.refno
                    })
                  }}
                >
                  Reserve Slot
                </button>
              ) : (
                <div className="mt-4 text-sm text-gray-500">You need to log in to reserve a slot.</div>
              )}
            </div>
          </div>
        ))}
      </div>

      <Modal
        id="reserve-slot-modal"
        title="Confirm Reservation"
        isOpen={openReserveConfirmation}
        onClose={() => setOpenReserveConfirmation(false)}
        headerColor="blue"
      >
        <p className='text-black text-left'>Are you sure you want to reserve this slot?</p>
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="secondary" onClick={() => setOpenReserveConfirmation(false)}>No</Button>
          <Button variant="primary" className="text-white" onClick={onReserveSlotHandler} disabled={isReserveSlotLoading}>{isReserveSlotLoading ? 'Reserving your slot..' : 'Yes'}</Button>
        </div>
      </Modal>

      <Modal
        id="proceed-to-queue-modal"
        title="🎉 Congratulations"
        isOpen={openSuccessReserve}
        onClose={() => setOpenSuccessReserve(false)}
        headerColor="blue"
        closeOnBackdrop={false}
      >
        <p className='text-black text-left'>You successfully reserved a slot 🎉🎉</p>
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="secondary" onClick={() => setOpenSuccessReserve(false)}>Close</Button>
          <Button variant="primary" className="text-white" onClick={() => {
            setShowConfetti(false)
            navigate(`/sessions/${selectedClinicSession.refno}`)
          }}>Monitor My Number</Button>
        </div>
      </Modal>
    </div>
  );
};

export default SessionList;
