import type { ISignupData } from "@/queries/user/IUser";
import { querySignup } from "@/queries/user/userQueries";
import { useState } from "react";

const useSignup = () => {
  /*======================== Queries ======================== */

  const {
    data: signupResponse,
    mutateAsync: signUp,
    isPending: isLoading,
    isError,
    isSuccess,
    error,
  } = querySignup();

  /*======================== Form ======================== */

  const [formData, setFormData] = useState<ISignupData>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const [errors, setErrors] = useState<Partial<ISignupData>>({});

  /*======================== UseState ======================== */

  // const [isLoading, setIsLoading] = useState(false);

  /*======================== Handler ======================== */

  const handleInputChange = (field: keyof ISignupData, value: string) => {
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
    const newErrors: Partial<ISignupData> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    await signUp(formData);
    // Reset form on success
    setFormData({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    });
    // // setIsLoading(true);
    // try {
    //   await signUp(formData);
    //   // Reset form on success
    //   setFormData({
    //     email: "",
    //     password: "",
    //     firstName: "",
    //     lastName: "",
    //   });
    // } catch {
    //   // Error is handled by the mutation
    // } finally {
    //   setIsLoading(false);
    // }
  };

  // const resetForm = () => {
  //   setFormData({
  //     email: "",
  //     password: "",
  //     firstName: "",
  //     lastName: "",
  //   });
  //   setErrors({});
  // };

  /*======================== Return ======================== */

  return {
    formData,
    errors,
    isLoading,
    isSuccess,
    isError,
    error,
    signupResponse,
    handleInputChange,
    handleSignup,
    // resetForm,
  };
};

export default useSignup;
