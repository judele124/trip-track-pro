import Loader from "@/components/ui/Loader";
import { useTripContext } from "@/contexts/TripContext";
import useAxios from "@/hooks/useAxios";
import { navigationRoutes } from "@/Routes/routes";
import { tripGet } from "@/servises/tripService";
import { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Schemas } from "trip-track-package";

export default function LoadingTripDataView() {
  const { setTrip } = useTripContext();
  const { activate, loading, error, data } = useAxios({ manual: true });
  const [searchParams, _] = useSearchParams();
  const { pathname } = useLocation();
  const nav = useNavigate();

  useEffect(() => {
    const tripId = searchParams.get("tripId");
    const validateTripId = Schemas.mongoObjectId.safeParse(tripId);

    if (!tripId || !validateTripId.success) {
      nav(navigationRoutes.notFound);
      return;
    }

    tripGet(activate, tripId);
  }, [pathname]);

  useEffect(() => {
    if (!data && !error) return;

    if (error) {
      return nav(navigationRoutes.notFound);
    }

    // TODO: connect socket
    setTrip(data);
    nav(navigationRoutes.map);
  }, [error, data]);

  if (loading) {
    return (
      <div className="page-colors relative z-0 mx-auto flex h-dvh max-w-[450px] items-center justify-center">
        <div className="-z-10 grow overflow-hidden bg-secondary/20">
          <Loader />
        </div>
      </div>
    );
  }

  return null;
}
