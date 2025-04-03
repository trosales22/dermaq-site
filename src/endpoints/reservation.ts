import axios from 'axios';
import { removeEmpty } from 'utils';

interface ReservationListParams {
    q?: string;
    page?: number;
    limit?: number;
}

interface ReserveSlotPayload {
    clinic_session_id: string
}

export const getAllReservation = (params: ReservationListParams) => {
    const config: any = { 
        params: removeEmpty(params),
        disableToast: true 
    };
    return axios.get('/api/v1/customers/reservations', config)
};

export const reserveSlot = (payload: ReserveSlotPayload) => axios.post('/api/v1/customers/reserve_slot', payload)