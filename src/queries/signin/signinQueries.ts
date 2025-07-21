import { useMutation } from "@tanstack/react-query";

import type { ISigninData, ISigninResponse } from "./ISignin";

import { signin } from "@/services/apiUsers";

export const querySignin = () => {
  return useMutation<ISigninResponse, Error, ISigninData>({
    mutationFn: signin,
  });
};
