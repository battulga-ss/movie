import { Card } from "@/components/ui/card";
import type { ReactNode } from "react";

export const AuthLayout = ({ children }: { children: ReactNode }) => {
  return <Card className="p-4">{children}</Card>;
};
