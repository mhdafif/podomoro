import { useMutation } from "@tanstack/react-query";

import type { ISignupData, ISignupResponse } from "./ISignup";
import { QryKeySignup } from "./KSignup";

import { signup } from "@/services/apiUsers";

const querySignup = () => {
  return useMutation<ISignupResponse, Error, ISignupData>({
    mutationKey: [QryKeySignup.signup],
    mutationFn: (payload: ISignupData) => signup(payload),
  });
};

export { querySignup };
