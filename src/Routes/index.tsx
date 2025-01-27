import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import TripRoutes from "./TripRoutes";
import TripProvider from "@/contexts/TripContext";

export default function AllRoutes() {
  const nav = useNavigate();

  useEffect(() => {
    const isFirstEntry = localStorage.getItem("notFirstEntry") !== "true";
    if (isFirstEntry) {
      nav("/first-entry");
    }
  }, []);

  return (
    <>
      <TripProvider>
        <TripRoutes />
      </TripProvider>
      <AppRoutes />
    </>
  );
}
