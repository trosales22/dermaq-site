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
