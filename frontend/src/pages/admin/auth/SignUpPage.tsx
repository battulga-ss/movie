import { AuthLayout } from "@/modules/admin/auth/AuthLayout";
import { Signup } from "@/modules/admin/auth/register/Signup";

export const SignUpPage = () => {
  return (
    <AuthLayout>
      <Signup />
    </AuthLayout>
  );
};
