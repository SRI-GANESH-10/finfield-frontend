'use client'

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "../hooks";
import { LogoWithName } from "@/components/shared/Logo";

const SignupPage = () => {
  const { formData, handleChange, handleSubmit, error } = useAuth();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="space-y-3 max-w-sm w-full flex flex-col justify-center items-center">
        <LogoWithName className="h-8 w-8" />

        <Input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />

        <Input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="p-4"
        />

        {error && <div>{error}</div>}

        <Button onClick={handleSubmit} className="w-full">Sign Up</Button>
      </div>
    </div>
  );
};

export default SignupPage;