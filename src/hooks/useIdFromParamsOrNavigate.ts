import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function useIdFromParamsOrNavigate(fallbackRoute: string) {
  const [searchParams, _] = useSearchParams();
  const nav = useNavigate();

  useEffect(() => {
    const tripId = searchParams.get("tripId");
    if (!tripId) {
      nav(fallbackRoute);
    }
  }, [searchParams]);

  return searchParams.get("tripId");
}
