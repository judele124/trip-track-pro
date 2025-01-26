import { Route, Routes } from "react-router-dom";
import PageLayout from "../components/layouts/PageLayout.tsx";
import HomePageView from "../views/homePageView/HomePageView";
import FirstEntryView from "../views/firstEntryView/FirstEntryView";
import CreateTripView from "../views/createTripView/index.tsx";
import LoginView from "../views/loginView/LoginView.tsx";
import NavbarLayout from "../components/layouts/NavbarLayout.tsx";
import PageNotFoundView from "../views/pageNotFoundView/PageNotFoundView.tsx";
import TripLayout from "../components/layouts/TripLayout/TripLayout.tsx";
import MapView from "../views/mapView";
import ParticipantsView from "../views/participantsView/ParticipantsView.tsx";
import ChatView from "../views/chatView/ChatView.tsx";
import ProtectedRoute from "../components/ProtectedRoute.tsx";
import ShareTripView from "@/views/shareTripView";
import BeforeJoinTripView from "@/views/beforeJoinTripView";
import JoiningTripView from "@/views/connectTripView/index.tsx";
import ConnectTripView from "@/views/connectTripView/index.tsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        {/* <PageLayout /> */}
        <Route index element={<HomePageView />} />
        <Route path="" element={<NavbarLayout />}>
          <Route path="first-entry" element={<FirstEntryView />} />
          <Route path="login" element={<LoginView />} />

          {/* protected routes */}
          <Route
            path="create-trip"
            element={
              <ProtectedRoute>
                <CreateTripView />
              </ProtectedRoute>
            }
          />
          <Route
            path="share-trip"
            element={
              <ProtectedRoute>
                <ShareTripView />
              </ProtectedRoute>
            }
          />
          <Route
            path="join-trip"
            element={
              <ProtectedRoute>
                <BeforeJoinTripView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/connect/:tripId"
            element={
              <ProtectedRoute>
                <ConnectTripView />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<PageNotFoundView />} />
        </Route>
      </Route>

      <Route path="/trip" element={<TripLayout />}>
        <Route path="joining/:tripId" element={<JoiningTripView />} />
        <Route
          path="map"
          element={
            <ProtectedRoute>
              <MapView />
            </ProtectedRoute>
          }
        />
        <Route
          path="participants"
          element={
            <ProtectedRoute>
              <ParticipantsView />
            </ProtectedRoute>
          }
        />
        <Route
          path="chat"
          element={
            <ProtectedRoute>
              <ChatView />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
