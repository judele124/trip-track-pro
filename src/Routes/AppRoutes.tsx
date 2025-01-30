import { Route, Routes } from "react-router-dom";
import PageLayout from "@/components/layouts/PageLayout";
import HomePageView from "@/views/AppViews/homePageView";
import FirstEntryView from "@/views/AppViews/firstEntryView/FirstEntryView";
import CreateTripView from "@/views/AppViews/createTripView";
import LoginView from "@/views/AppViews/loginView/LoginView";
import NavbarLayout from "@/components/layouts/NavbarLayout.tsx";
import PageNotFoundView from "@/views/pageNotFoundView/PageNotFoundView.tsx";
import ShareTripView from "@/views/AppViews/shareTripView";
import BeforeJoinTripView from "@/views/AppViews/beforeJoinTripView";
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
