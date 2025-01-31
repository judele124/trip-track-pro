import NavbarLayout from "@/components/layouts/NavbarLayout";
import PageLayout from "@/components/layouts/PageLayout";
import TripLayout from "@/components/layouts/TripLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import TripProvider from "@/contexts/TripContext";
import BeforeJoinTripView from "@/views/AppViews/beforeJoinTripView";
import CreateTripView from "@/views/AppViews/createTripView";
import FirstEntryView from "@/views/AppViews/firstEntryView/FirstEntryView";
import HomePageView from "@/views/AppViews/homePageView";
import LoginView from "@/views/AppViews/loginView/LoginView";
import ShareTripView from "@/views/AppViews/shareTripView";
import PageNotFoundView from "@/views/pageNotFoundView";
import ChatView from "@/views/TripViews/chatView";
import LoadingTripDataView from "@/views/TripViews/loadingTripDataView";
import MapView from "@/views/TripViews/mapView";
import ParticipantsView from "@/views/TripViews/participantsView";
import { RouteObject, RouteProps } from "react-router-dom";


const routes: RouteObject[] = [
  {
    path: "/app/*",
    element: <PageLayout />,
    children: [
      { index: true, element: <HomePageView /> },
      {
        element: <NavbarLayout />,
        children: [
          { path: "first-entry", element: <FirstEntryView /> },
          { path: "login", element: <LoginView /> },
          {
            path: "create-trip",
            element: (
              <ProtectedRoute>
                <CreateTripView />
              </ProtectedRoute>
            ),
          },
          {
            path: "share-trip",
            element: (
              <ProtectedRoute>
                <ShareTripView />
              </ProtectedRoute>
            ),
          },
          {
            path: "join-trip",
            element: (
              <ProtectedRoute>
                <BeforeJoinTripView />
              </ProtectedRoute>
            ),
          },
          { path: "*", element: <PageNotFoundView /> },
        ],
      },
    ],
  },
  {
    path: "/trip/*",
    element:<TripProvider><TripLayout /></TripProvider>,
    children: [
      { path: ":tripId?", element: <LoadingTripDataView /> },
      {
        path: "map",
        element: (
          <ProtectedRoute>
            <MapView />
          </ProtectedRoute>
        ),
      },
      {
        path: "participants",
        element: (
          <ProtectedRoute>
            <ParticipantsView />
          </ProtectedRoute>
        ),
      },
      {
        path: "chat",
        element: (
          <ProtectedRoute>
            <ChatView />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <PageNotFoundView /> },
    ],
  },
  { path: "*", element: <PageNotFoundView /> },
];

export default routes;
