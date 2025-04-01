import axios from 'axios';

export const getAllClinicSession = () => axios.get('/api/v1/customers/clinic_sessions');

export const getClinicSessionByRefNo = (refno: string | undefined | null) => {
    const config: any = { disableToast: true };
    return axios.get(`/api/v1/customers/clinic_sessions/${refno}`, config)
};