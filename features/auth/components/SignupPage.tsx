'use client'

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "../hooks";

const SignupPage = () => {
  const { formData, handleChange, handleSubmit ,error} = useAuth();

  return (
    <div className="space-y-3 max-w-md">
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
      />
        {error && <div>{error}</div>}
      <Button onClick={handleSubmit}>Sign Up</Button>
    </div>
  );
};

export default SignupPage;