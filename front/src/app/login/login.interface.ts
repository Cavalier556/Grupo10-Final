export interface Login {
  username: string;
  password: string;
}

export interface LoginResponse {
  auth: boolean;
  token: string;
}
