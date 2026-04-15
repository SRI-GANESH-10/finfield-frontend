import { User, UserState } from "@/store/user.store";

export interface Auth {
  id: string;
}

type UserModal = {
  id: string;
  email: string;
  name: string;
};

export type SignupPayload = {
  name:string,
  email:string,
  password : string,
}

export type LoginPayload = {
  email:string,
  password:string
}

export type LoginResModel = {
  message:string,
  token:string,
  user:User
}

export type AuthState = {
  loading:boolean
  error:string | null

  
  signup:(data:SignupPayload) => Promise<void>
  login:(data:LoginPayload) => Promise<LoginResModel>
}
