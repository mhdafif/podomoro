export interface ISignupData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface ISignupResponse {
  accessToken: string;
  user?: {
    email: string;
    firstName: string;
    lastName: string;
  };
}
