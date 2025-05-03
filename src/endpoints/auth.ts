import axios from 'axios';

interface LoginPayload {
  user_id: string;
  password: string;
}

interface UpdateMyProfilePayload {
  username?: string;
  email?: string;
  mobile?: string;
  firstname: string;
  lastname?: string;
}

interface RegisterCustomerPayload {
  username?: string;
  email?: string;
  mobile?: string;
  firstname: string;
  lastname?: string;
}

export const login = (payload: LoginPayload) => axios.post('/api/v1/customers/login', payload);

export const logout = () => axios.post('/api/v1/customers/logout');

export const myProfile = () => axios.get('/api/v1/customers/my_profile');

export const updateMyProfile = (payload: UpdateMyProfilePayload) =>
  axios.put('/api/v1/customers/my_profile', payload);

export const registerCustomer = (payload: RegisterCustomerPayload) =>
  axios.post('/api/v1/customers', payload);
