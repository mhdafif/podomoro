import { useMutation } from "@tanstack/react-query";

import type {
  ISigninData,
  ISigninResponse,
  ISignupData,
  ISignupResponse,
} from "./IUser";
import { K_USER } from "./KUser";

import { signin, signup } from "@/services/apiUsers";

export const querySignin = () => {
  return useMutation<ISigninResponse, Error, ISigninData>({
    mutationKey: K_USER.signin(),
    mutationFn: signin,
  });
};

export const querySignup = () => {
  return useMutation<ISignupResponse, Error, ISignupData>({
    mutationKey: K_USER.signup(),
    mutationFn: signup,
  });
};
