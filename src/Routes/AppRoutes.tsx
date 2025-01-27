import { Route, Routes } from "react-router-dom";
import PageLayout from "@/components/layouts/PageLayout";
import HomePageView from "@/views/homePageView/HomePageView.tsx";
import FirstEntryView from "@/views/firstEntryView/FirstEntryView.tsx";
import CreateTripView from "@/views/createTripView/CreateTripView.tsx";
import LoginView from "@/views/loginView/LoginView.tsx";
import NavbarLayout from "@/components/layouts/NavbarLayout.tsx";
import PageNotFoundView from "@/views/pageNotFoundView/PageNotFoundView.tsx";
import ShareTripView from "@/views/shareTripView";
import BeforeJoinTripView from "@/views/beforeJoinTripView";
import ConnectTripView from "@/views/connectTripView/index.tsx";
import ProtectedRoute from "@/components/ProtectedRoute.tsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
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
          <Route path="*" element={<PageNotFoundView />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
