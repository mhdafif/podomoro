import { AlertCircle, CheckCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import useSignup from "@/modules/signup/useSignup";

const Signup = () => {
  /*======================== Props ======================== */
  const {
    formData,
    errors,
    isLoading,
    isSuccess,
    isError,
    error,
    // signupResponse,
    handleInputChange,
    handleSignup,
  } = useSignup();

  const navigate = useNavigate();

  /*======================== Local State ======================== */

  const [showPassword, setShowPassword] = useState(false);

  /*======================== Handlers ======================== */

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSignup();
  };

  /*======================== Render Success State ======================== */

  if (isSuccess) {
    return (
      <div className="flex min-h-screen min-w-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md p-8">
          <div className="text-center">
            <CheckCircle className="text-blue-tertiary mx-auto h-12 w-12" />
            <h2 className="text-blue-tertiary mt-6 text-3xl font-bold tracking-tight">
              Account Created!
            </h2>
            <p className="mt-2 text-sm text-white">
              Your account has been created successfully.
            </p>
            <Button
              onClick={() => navigate("/signin")}
              className="mt-6 w-full"
              variant="outline"
            >
              Sign In
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  /*======================== Return ======================== */

  return (
    <div className="flex min-h-screen min-w-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md p-8 text-white">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-blue-tertiary text-3xl font-bold tracking-tight">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-white">
              Sign up to get started with your Pomodoro timer
            </p>
          </div>

          {/* Error Alert */}
          {isError && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Sign up failed
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    {error?.message ||
                      "Something went wrong. Please try again."}
                  </div>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* First Name */}
            <div>
              <Label htmlFor="firstName" className="block text-white">
                First Name
              </Label>
              <Input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                aria-invalid={!!errors.firstName}
                className="mt-1"
                placeholder="Enter your first name"
              />
              {errors.firstName && (
                <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <Label htmlFor="lastName" className="block text-white">
                Last Name
              </Label>
              <Input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                aria-invalid={!!errors.lastName}
                className="mt-1"
                placeholder="Enter your last name"
              />
              {errors.lastName && (
                <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="block text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                aria-invalid={!!errors.email}
                className="mt-1"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="block text-white">
                Password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  aria-invalid={!!errors.password}
                  className="pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-sm text-white">
              Already have an account?{" "}
              <Link to="/signin" className="text-blue-tertiary font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Signup;
