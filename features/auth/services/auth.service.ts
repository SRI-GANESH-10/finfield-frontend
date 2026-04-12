import { api } from '@/lib/axios';
import { SignupPayload } from '../models';

export const authService = {

    signUpApi : (data:SignupPayload) =>{
        return api.post('/auth/signup' , data)
    }
};
