import { useState } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

type PasswordFieldProps = {
  label: string;
  formAttributes: UseFormRegisterReturn;
  errors: FieldError | undefined;
} & Omit<Partial<React.InputHTMLAttributes<HTMLInputElement>>, "type">;

export const PasswordField = ({
  label,
  formAttributes,
  errors,
  ...rest
}: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label className="block text-sm font-medium text-cyan-300">{label}</label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          {...rest}
          {...formAttributes}
          className="mt-1 w-full px-4 py-2 pr-10 bg-gray-900 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-200 focus:ring-2"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-3 text-gray-400 hover:text-cyan-400"
        >
          {showPassword ? "🙈" : "👁️"}
        </button>
      </div>
      {errors && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
    </div>
  );
};
