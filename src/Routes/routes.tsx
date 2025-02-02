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
import { RouteObject } from "react-router-dom";

const baseRoutes = {
  app: "/app",
  trip: "/trip",
} as const;

const tripRoutes = {
  map: `map`,
  participants: `participants`,
  chat: `chat`,
  notFound: "not-found",
} as const;

const appRoutes = {
  login: `login`,
  firstEntry: `first-entry`,
  createTrip: `create-trip`,
  shareTrip: `share-trip`,
  joinTrip: `join-trip`,
  notFound: "not-found",
} as const;

export const navigationRoutes = {
  login: `${baseRoutes.app}/${appRoutes.login}`,
  firstEntry: `${baseRoutes.app}/${appRoutes.firstEntry}`,
  createTrip: `${baseRoutes.app}/${appRoutes.createTrip}`,
  shareTrip: `${baseRoutes.app}/${appRoutes.shareTrip}`,
  joinTrip: `${baseRoutes.app}/${appRoutes.joinTrip}`,

  map: `${baseRoutes.trip}/${tripRoutes.map}`,
  participants: `${baseRoutes.trip}/${tripRoutes.participants}`,
  chat: `${baseRoutes.trip}/${tripRoutes.chat}`,

  notFound: `${appRoutes.notFound}`,
  app: `${baseRoutes.app}`,
  trip: `${baseRoutes.trip}`,
} as const;

const routes: RouteObject[] = [
  {
    path: `${baseRoutes.app}/*`,
    element: <PageLayout />,
    children: [
      { index: true, element: <HomePageView /> },
      {
        element: <NavbarLayout />,
        children: [
          { path: appRoutes.firstEntry, element: <FirstEntryView /> },
          { path: appRoutes.login, element: <LoginView /> },
          {
            path: appRoutes.createTrip,
            element: (
              <ProtectedRoute>
                <CreateTripView />
              </ProtectedRoute>
            ),
          },
          {
            path: appRoutes.shareTrip,
            element: (
              <ProtectedRoute>
                <ShareTripView />
              </ProtectedRoute>
            ),
          },
          {
            path: appRoutes.joinTrip,
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
    path: `${baseRoutes.trip}/*`,
    element: (
      <TripProvider>
        <TripLayout />
      </TripProvider>
    ),
    children: [
      { index: true, element: <LoadingTripDataView /> },
      {
        path: tripRoutes.map,
        element: (
          <ProtectedRoute>
            <MapView />
          </ProtectedRoute>
        ),
      },
      {
        path: tripRoutes.participants,
        element: (
          <ProtectedRoute>
            <ParticipantsView />
          </ProtectedRoute>
        ),
      },
      {
        path: tripRoutes.chat,
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
