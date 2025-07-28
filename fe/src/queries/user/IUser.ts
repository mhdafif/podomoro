// Signin interfaces
export interface ISigninData {
  email: string;
  password: string;
}

export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface ISigninResponse {
  user: IUser;
  accessToken: string;
}

// Signup interfaces
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
