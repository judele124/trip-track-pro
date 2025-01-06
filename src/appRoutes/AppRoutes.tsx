import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageLayout from "../views/PageLayout.tsx";
import HomePageView from "../views/homePageView/HomePageView";
import FirstEntryView from "../views/firstEntryView/FirstEntryView";
import CreateTripView from "../views/createTripView/index.tsx";
import LoginView from "../views/loginView/LoginView.tsx";
import NavbarLayout from "../views/NavbarLayout.tsx";
import PageNotFoundView from "../views/pageNotFoundView/PageNotFoundView.tsx";
import TripLayout from "../views/TripLayout.tsx";
import Map from "../views/mapView/Map.tsx";
import ParticipantsView from "../views/participantsView/ParticipantsView.tsx";
import ChatView from "../views/chatView/ChatView.tsx";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<HomePageView />} />
          <Route path="first-entry" element={<FirstEntryView />} />
          <Route path="login" element={<LoginView />} />
          <Route path="" element={<NavbarLayout />}>
            <Route path="create-trip" element={<CreateTripView />} />
            <Route path="*" element={<PageNotFoundView />} />
          </Route>
        </Route>
        <Route path="/trip" element={<TripLayout />}>
          <Route path="map" element={<Map />} />
          <Route path="participants" element={<ParticipantsView />} />
          <Route path="chat" element={<ChatView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;