"use client";

import { useState } from "react";
import { useAuthStore } from "../store";

export const useAuth = () => {
  const signUp = useAuthStore((state) => state.signup);
  const loading = useAuthStore((state)=>state.loading)
  const error = useAuthStore((state)=>state.error)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

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

  return {
    loading,
    error,
    formData,
    handleChange,
    handleSubmit,
  };
};