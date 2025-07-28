import type { ISigninData } from "@/queries/user/IUser";
import { querySignin } from "@/queries/user/userQueries";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useUserStore from "@/store/user/userStore";

const useSignin = () => {
  /*======================== Queries ======================== */

  const {
    data: signinResponse,
    mutateAsync: signIn,
    isPending: isLoading,
    isError,
    isSuccess,
    error,
  } = querySignin();

  /*======================== Store ======================== */

  const { setUser } = useUserStore();

  /*======================== Navigation ======================== */

  const navigate = useNavigate();

  /*======================== Form ======================== */

  const [formData, setFormData] = useState<ISigninData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<ISigninData>>({});

  /*======================== Handler ======================== */

  const handleInputChange = (field: keyof ISigninData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ISigninData> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignin = async () => {
    if (!validateForm()) return;

    try {
      const response = await signIn(formData);

      // Store user data and token
      setUser(response.user, response.accessToken);

      // Reset form
      setFormData({
        email: "",
        password: "",
      });

      // Redirect to home
      navigate("/");
    } catch {
      // Error is handled by the mutation
    }
  };

  /*======================== Return ======================== */

  return {
    formData,
    errors,
    isLoading,
    isSuccess,
    isError,
    error,
    signinResponse,
    handleInputChange,
    handleSignin,
  };
};

export default useSignin;
