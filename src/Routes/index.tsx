import { Route, RouteObject, Routes } from "react-router-dom";
import routes from "./routes";
import { ReactNode } from "react";

function renderRoutes(ch: RouteObject[]): ReactNode[] {
  return ch.map(({index, path, children: childrenRouteObjects, element}) => {
    if (index) {
      return <Route key={'/'} index element={element}></Route>
    }

    let childrenRoutes = null;
    if (childrenRouteObjects && childrenRouteObjects.length > 0) {
      childrenRoutes = renderRoutes(childrenRouteObjects);
    }

    return (
      <Route
       path={path}
        key={path || '/'}
        element={element}
      >
        {childrenRoutes && childrenRoutes.length > 0 && childrenRoutes}
      </Route>
    );
  });
}

export default function AllRoutes() {
  return <Routes>{renderRoutes(routes)}</Routes>;
}
