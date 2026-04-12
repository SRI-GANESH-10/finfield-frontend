import { create } from 'zustand';
import { authService, AuthState, SignupPayload } from '@/features/auth';
import axios from 'axios';
export const useAuthStore = create<AuthState>((set) => ({
  loading: false,
  error: null,

  signup: async (data: SignupPayload) => {
    try {
      set({ loading: true })
      const res = await authService.signUpApi(data);
      set({
        loading: false,
      })
    } catch (error) {
      let message = "Something went wrong"
      if(axios.isAxiosError(error)){
        message = error.response?.data?.message
      }
      console.error('Signup failed:', error);
      set({ loading: false, error: message });
    }
  }
}))
