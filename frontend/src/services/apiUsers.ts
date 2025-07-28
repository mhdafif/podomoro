import type {
  ISigninData,
  ISigninResponse,
  ISignupData,
  ISignupResponse,
} from "@/queries/user/IUser";

import http from "@/config/http";

const Api = {
  signup: "/users/signup",
  signin: "/users/signin",
} as const;

const signup = async (payload: ISignupData): Promise<ISignupResponse> => {
  const response = await http({
    method: "post",
    url: Api.signup,
    data: payload,
  });
  return response.data;
};

const signin = async (payload: ISigninData): Promise<ISigninResponse> => {
  const response = await http({
    method: "post",
    url: Api.signin,
    data: payload,
  });
  return response.data;
};

export { Api, signup, signin };
