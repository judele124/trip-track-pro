import Logo from "@/components/Logo";
import Button from "@/components/ui/Button";
import useAxios from "@/hooks/useAxios";
import useIdFromParamsOrNavigate from "@/hooks/useIdFromParamsOrNavigate";
import { navgationRoutes } from "@/Routes/routes";
import { tripGet } from "@/servises/tripService";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Types } from "trip-track-package";

export default function BeforeJoinTripView() {
  const { activate, data, status, loading, error } = useAxios({ manual: true });
  const tripId = useIdFromParamsOrNavigate("404");

  useEffect(() => {
    if (!tripId) return;
    tripGet(activate, tripId);
  }, [tripId]);

  if (!status || loading || error) {
    return <p>{loading ? "Loading..." : error?.message}</p>;
  }

  const { name, description, creator }: Types["Trip"]["Model"] = data;

  return (
    <div className="flex flex-col gap-2">
      <Logo />
      <h4>You are trying to going to trip: {name}</h4>
      <p>Creator: {creator.toString()}</p>
      <p>{description}</p>
      <div>
        <Button primary className="mb-1 w-full">
          <Link to={`${navgationRoutes.trip}/${tripId}`}>Join the trip</Link>
        </Button>
      </div>
    </div>
  );
}
