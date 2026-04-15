'use client'

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "../hooks";
import { LogoWithName } from "@/components/shared/Logo";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const { formDataLogin, handleLoginValueChange, handleLogin, error , user} = useAuth();

  const router = useRouter();

  useEffect(()=>{   
    if(user){
        router.replace('/dashboard')
    }
  }, [user])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="space-y-3 max-w-sm w-full flex flex-col justify-center items-center">
        <LogoWithName className="h-8 w-8" />

        <Input
          name="email"
          placeholder="Email"
          value={formDataLogin.email}
          onChange={handleLoginValueChange}
        />

        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={formDataLogin.password}
          onChange={handleLoginValueChange}
          className="p-4"
        />

        {error && <div>{error}</div>}

        <Button onClick={handleLogin} className="w-full">Sign Up</Button>
      </div>
    </div>
  );
};

export default LoginPage;