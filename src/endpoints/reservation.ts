import axios from 'axios';
import { removeEmpty } from 'utils';

interface ReservationListParams {
    q?: string;
    page?: number;
    limit?: number;
}

export const getAllReservation = (params: ReservationListParams) => {
    const config: any = { 
        params: removeEmpty(params),
        disableToast: true 
    };
    return axios.get('/api/v1/customers/reservations', config)
};