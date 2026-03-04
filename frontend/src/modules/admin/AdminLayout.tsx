import { Outlet } from "react-router-dom";
import { AuthContextProvider } from "./auth/AuthContextProvider";

export const AdminLayout = () => {
  return (
    <AuthContextProvider>
      <Outlet />
    </AuthContextProvider>
  );
};
