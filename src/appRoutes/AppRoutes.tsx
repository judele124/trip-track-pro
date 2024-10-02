import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../views/Layout.tsx";

import TestUI from "../components/test/TestUI.tsx";
import HomePageView from "../views/homePageView/HomePageView";
import FirstEntryView from "../views/firstEntryView/FirstEntryView";
import CreateTripView from "../views/createTripView/index.tsx";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<HomePageView />} />
          <Route path="first-entry" element={<FirstEntryView />} />
          <Route path="create-trip" element={<CreateTripView />} />
          <Route path="test" element={<TestUI />} />
        </Route>
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
