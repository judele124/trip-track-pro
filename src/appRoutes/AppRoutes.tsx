import { Route, Routes } from "react-router-dom";
import PageLayout from "../components/layouts/PageLayout.tsx";
import HomePageView from "../views/homePageView/HomePageView";
import FirstEntryView from "../views/firstEntryView/FirstEntryView";
import CreateTripView from "../views/createTripView/index.tsx";
import LoginView from "../views/loginView/LoginView.tsx";
import NavbarLayout from "../components/layouts/NavbarLayout.tsx";
import PageNotFoundView from "../views/pageNotFoundView/PageNotFoundView.tsx";
import TripLayout from "../components/layouts/TripLayout/TripLayout.tsx";
import Map from "../views/mapView/Map.tsx";
import ParticipantsView from "../views/participantsView/ParticipantsView.tsx";
import ChatView from "../views/chatView/ChatView.tsx";
import TestUI from "../components/test/TestUI.tsx";
import ProtectedRoute from "../components/ProtectedRoute.tsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route path="test" element={<TestUI />} />
        <Route index element={<HomePageView />} />
        <Route path="" element={<NavbarLayout />}>
          <Route path="first-entry" element={<FirstEntryView />} />
          <Route path="login" element={<LoginView />} />
          <Route
            path="create-trip"
            element={
              <ProtectedRoute>
                <CreateTripView />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<PageNotFoundView />} />
        </Route>
      </Route>
      <Route path="/trip" element={<TripLayout />}>
        <Route
          path="map"
          element={
            <ProtectedRoute>
              <Map />
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
