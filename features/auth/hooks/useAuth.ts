"use client";

import { useState } from "react";
import { useAuthStore } from "../store";
import { useUserStore } from "@/store/user.store";

export const useAuth = () => {
  const signUp = useAuthStore((state) => state.signup);
  const login = useAuthStore((state)=>state.login)
  const loading = useAuthStore((state)=>state.loading)
  const error = useAuthStore((state)=>state.error)
  let user = useUserStore((state)=> state.user);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [formDataLogin , setFormDataLogin] = useState({
    email:'',
    password:''
  })

  const handleLoginValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormDataLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    await signUp(formData);
  };

  const handleLogin = async () =>{
    const res = await login(formDataLogin);
    if(res.user){
      user = res?.user
    }
  }

  return {
    loading,
    error,
    formData,
    formDataLogin,
    user,
    handleChange,
    handleSubmit,
    handleLogin,
    handleLoginValueChange
  };
};