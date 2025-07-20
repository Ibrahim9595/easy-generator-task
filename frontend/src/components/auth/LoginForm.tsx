import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, InputField, PasswordField } from "..";

const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

type LoginFormProps = {
  onSubmit: (data: LoginFormData) => Promise<void>;
};

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: isLoading },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <InputField
        formAttributes={register("email")}
        errors={errors.email}
        label="Email"
        disabled={isLoading}
      />

      <PasswordField
        label="Password"
        formAttributes={register("password")}
        errors={errors.password}
        disabled={isLoading}
      />

      <Button
        label={isLoading ? "Loading..." : "Login"}
        type="submit"
        disabled={isLoading}
      />
    </form>
  );
}
