import { create } from 'zustand';
import { authService, AuthState, LoginPayload, LoginResModel, SignupPayload } from '@/features/auth';
import axios from 'axios';
import { useUserStore } from '@/store/user.store';
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
  },

  login: async (data: LoginPayload) => {
    try {
      set({ loading: true })
      const res:LoginResModel = await authService.loginAPi(data);
      set({
        loading: false,
      })
          useUserStore.getState().setUser(res.user);

      return res;
    } catch (error) {
      let message = "Something went wrong"
      if(axios.isAxiosError(error)){
        message = error.response?.data?.message
      }
      console.error('Login failed:', error);
      set({ loading: false, error: message });
      throw error;
    }
  }
}))
