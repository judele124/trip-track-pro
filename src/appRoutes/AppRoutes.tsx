import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageLayout from "../views/PageLayout.tsx";

import TestUI from "../components/test/TestUI.tsx";
import HomePageView from "../views/homePageView/HomePageView";
import FirstEntryView from "../views/firstEntryView/FirstEntryView";
import CreateTripView from "../views/createTripView/index.tsx";
import LoginView from "../views/loginView/LoginView.tsx";
import NavbarLayout from "../views/NavbarLayout.tsx";
import PageNotFoundView from "../views/pageNotFoundView/PageNotFoundView.tsx";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<LoginView />} />
          <Route path="first-entry" element={<FirstEntryView />} />
          <Route path="home" element={<HomePageView />} />
          <Route path="" element={<NavbarLayout />}>
            <Route path="create-trip" element={<CreateTripView />} />
            <Route path="test" element={<TestUI />} />
            <Route path="*" element={<PageNotFoundView />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
