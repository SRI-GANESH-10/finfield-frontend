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

export type AuthState = {
  loading:boolean
  error:string | null

  signup:(data:SignupPayload) => Promise<void>
}
