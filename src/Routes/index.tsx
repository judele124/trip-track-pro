import {
  Route,
  RouteObject,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import routes, { navigationRoutes } from "./routes";
import { ReactNode, useEffect } from "react";
import TripProvider, { useTripContext } from "@/contexts/TripContext";

function renderRoutes(ch: RouteObject[]): ReactNode[] {
  return ch.map(({ index, path, children: childrenRouteObjects, element }) => {
    if (index) {
      return <Route key={"/"} index element={element}></Route>;
    }

    let childrenRoutes = null;
    if (childrenRouteObjects && childrenRouteObjects.length > 0) {
      childrenRoutes = renderRoutes(childrenRouteObjects);
    }

    return (
      <Route path={path} key={path || "/"} element={element}>
        {childrenRoutes && childrenRoutes.length > 0 && childrenRoutes}
      </Route>
    );
  });
}

export default function AllRoutes() {
  const { pathname } = useLocation();
  const nav = useNavigate();
  useEffect(() => {
    if (pathname === "/") {
      nav(navigationRoutes.app);
    }
  }, []);
  return (
    <TripProvider>
      {" "}
      <Routes>{renderRoutes(routes)}</Routes>{" "}
    </TripProvider>
  );
}
