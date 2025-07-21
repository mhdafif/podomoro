export interface ISigninData {
  email: string;
  password: string;
}

export interface ISigninResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
    };
    accessToken: string;
  };
}
