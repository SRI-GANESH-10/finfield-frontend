import { api } from '@/lib/axios';
import { LoginPayload, SignupPayload } from '../models';

export const authService = {

    signUpApi: (data: SignupPayload) => {
        return api.post('/auth/signup', data)
    },

    loginAPi: async (data: LoginPayload) => {
        const res = await api.post('/auth/login', data);
        return res.data;
    }
};
