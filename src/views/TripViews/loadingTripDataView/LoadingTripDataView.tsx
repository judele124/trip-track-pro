import Loader from "@/components/ui/Loader";
import { useTripContext } from "@/contexts/TripContext";
import useAxios from "@/hooks/useAxios";
import { navgationRoutes } from "@/Routes/routes";
import { tripGet } from "@/servises/tripService";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {Schemas} from 'trip-track-package';


export default function LoadingTripDataView() {
  const { setTrip } = useTripContext();
  const { activate, loading, error, data } = useAxios({ manual: true });
  const { tripId } = useParams();
  const { pathname } = useLocation();
  const nav = useNavigate();

  useEffect(() => {
    console.log(Schemas);
    
    if (!tripId) {
      return nav(navgationRoutes.notFound);
      
    }
    console.log('null tripId');
    
    tripGet(activate, tripId);
  }, [pathname]);

  useEffect(() => {
    if (!data && !error) return;

    if (error) {
      console.log('error');
      
      return nav(navgationRoutes.notFound);
    }

    // TODO: connect socket
    setTrip(data);
    nav(navgationRoutes.map);
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
