import { Navigate } from "react-router-dom";
import { useAuth } from "../useAuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../hooks/useLogin";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

const userFormSchema = z.object({
  email: z.email(),
  password: z.string().min(6)
});

export const Login = () => {
  const { user } = useAuth();
  const { mutate } = useLogin();
  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      email: "example@gmail.com",
      password: ""
    }
  });

  if (user) {
    return <Navigate to={"/admin/create-movie"} />;
  }

  const onSubmit: SubmitHandler<z.infer<typeof userFormSchema>> = data => {
    mutate(data);
  };

  return (
    <div className="max-w-lg">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Bug Title</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Enter your email"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Bug Title</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="password"
                type="password"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {/* <Input type="email" {...register("email")} />

        <Input type="password" {...register("password")} />
        {errors.password && <p>{errors.password.message}</p>} */}
        <Button type="submit" variant={"outline"}>
          Login
        </Button>
      </form>
    </div>
  );
};
