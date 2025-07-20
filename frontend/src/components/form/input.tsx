import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

type InputFieldProps = {
  label: string;
  formAttributes: UseFormRegisterReturn;
  errors: FieldError | undefined;
} & Partial<React.InputHTMLAttributes<HTMLInputElement>>;

export const InputField = ({
  label,
  formAttributes,
  errors,
  ...rest
}: InputFieldProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-cyan-300">{label}</label>
      <input
        {...rest}
        {...formAttributes}
        className="mt-1 w-full px-4 py-2 bg-gray-900 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-200 focus:ring-2"
      />
      {errors && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
    </div>
  );
};
