import { AuthLayout } from "@/modules/admin/auth/AuthLayout";
import { Login } from "@/modules/admin/auth/register/Login";

export const LoginPage = () => {
  return (
    <AuthLayout>
      <Login />
    </AuthLayout>
  );
};
