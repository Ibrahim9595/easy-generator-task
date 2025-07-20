import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

type SkeletonProps = {
  serverError?: boolean;
  onLogin: (data: { email: string; password: string }) => Promise<void>;
  onSignup: (data: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
};

export const Skeleton = ({ serverError, onLogin, onSignup }: SkeletonProps) => {
  const [currentForm, setCurrentForm] = useState<"login" | "signup">("login");

  const handleFormSwitch = () => {
    setCurrentForm((prev) => (prev === "login" ? "signup" : "login"));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black px-4">
      <div className="bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 sm:p-8 w-full max-w-sm shadow-xl border border-gray-700 animate-fade-in-slide">
        <h2 className="text-3xl font-bold text-center text-cyan-400 mb-6">
          Login
        </h2>

        {serverError && (
          <div className="text-red-500 text-center mb-4">
            An error occurred. Please try again.
          </div>
        )}

        {currentForm === "login" ? (
          <LoginForm onSubmit={onLogin} />
        ) : (
          <SignupForm onSubmit={onSignup} />
        )}

        <p className="text-sm text-gray-400 mt-4 display-block text-center">
          {currentForm === "login" ? (
            <>
              Don't have an account?{" "}
              <button
                className="text-cyan-400 hover:underline focus:outline-none"
                onClick={handleFormSwitch}
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                className="text-cyan-400 hover:underline focus:outline-none"
                onClick={handleFormSwitch}
              >
                Login
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};
