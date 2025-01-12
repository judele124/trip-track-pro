import { ReactNode, useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, tokenValidationStatus } = useAuthContext();
  const nav = useNavigate();

  useEffect(() => {
    if (tokenValidationStatus && !user) {
      nav("/login");
    }
  }, [tokenValidationStatus]);

  return <>{children}</>;
}
