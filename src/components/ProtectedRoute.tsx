import { ReactNode, useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = useAuthContext();
  const nav = useNavigate();
  useEffect(() => {
    if (!user) {
      nav("/login");
    }
  }, []);
  return <>{children}</>;
}
