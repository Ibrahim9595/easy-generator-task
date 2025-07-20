import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, InputField, PasswordField } from "..";

const signupSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-zA-Z]/, "Must contain at least one letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[^a-zA-Z0-9]/, "Must contain at least one special character"),
});

type SignupFormData = z.infer<typeof signupSchema>;

type SignupFormProps = {
  onSubmit: (data: SignupFormData) => Promise<void>;
};

export default function SignupForm({ onSubmit }: SignupFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted: isLoading, isSubmitSuccessful },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  return isSubmitSuccessful ? (
    <div className="text-green-500 text-center mb-4">
      Signup successful! Please log in.
    </div>
  ) : (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <InputField
        label="Name"
        placeholder="Enter your name"
        formAttributes={register("name")}
        errors={errors.name}
        disabled={isLoading}
      />

      <InputField
        label="Email"
        placeholder="Enter your email"
        formAttributes={register("email")}
        errors={errors.email}
        disabled={isLoading}
      />

      <PasswordField
        label="Password"
        placeholder="Enter your password"
        formAttributes={register("password")}
        errors={errors.password}
        disabled={isLoading}
      />

      <Button
        label={isLoading ? "Loading..." : "Sign Up"}
        type="submit"
        disabled={isLoading}
      />
    </form>
  );
}
