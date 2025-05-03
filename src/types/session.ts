export type ReservedQueueListAttributes = {
  refno: string;
  clinic_session: {
    id: string;
    refno: string;
    session_date: string;
    start_time: string;
    end_time: string;
    max_slots: number;
  };
  customer: {
    email: string;
    fullname: string;
  };
  status: {
    code: string;
    label: string;
  };
  queue_number: number;
  created_at: string;
};

export type SessionReservationList = {
  id: string;
  attributes: SessionReservationListAttributes;
};

export type SessionReservationListAttributes = {
  refno: string;
  clinic_session: {
    id: string;
    refno: string;
    title: string;
    description: string;
    session_date: string;
    start_time: string;
    end_time: string;
    formatted_session_date: string;
    formatted_start_time: string;
    formatted_end_time: string;
    max_slots: number;
  };
  customer: {
    id: string;
    email: string;
    fullname: string;
  };
  status: {
    code: string;
    label: string;
  };
  queue_number: number;
  created_at: string;
};

export type CustomerClinicSessionList = {
  id: string;
  attributes: CustomerClinicSessionListAttributes;
};

export type CustomerClinicSessionListAttributes = {
  refno: string;
  title: string;
  description: string;
  session_date: string;
  start_time: string;
  end_time: string;
  formatted_session_date: string;
  formatted_start_time: string;
  formatted_end_time: string;
  max_slots: number;
  remaining_slots: number;
  created_at: string;
};
