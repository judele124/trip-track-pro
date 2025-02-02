import { ReactNode, useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { navgationRoutes } from "@/Routes/routes";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, tokenValidationStatus } = useAuthContext();
  const nav = useNavigate();

  useEffect(() => {
    if (tokenValidationStatus && !user) {
      nav(navgationRoutes.login);
    }
  }, [tokenValidationStatus]);

  return <>{children}</>;
}
