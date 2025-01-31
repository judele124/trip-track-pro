import { Route, Routes } from "react-router-dom";
import TripLayout from "@/components/layouts/TripLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import MapView from "@/views/TripViews/mapView";
import ParticipantsView from "@/views/TripViews/participantsView/ParticipantsView";
import ChatView from "@/views/TripViews/chatView/ChatView";
import LoadingTripDataView from "@/views/TripViews/loadingTripDataView/LoadingTripDataView";
import PageNotFoundView from "@/views/pageNotFoundView";

export default function TripRoutes() {
  return (
    <Routes>
      <Route path="/" element={<TripLayout />}>
        <Route path=":tripId?" element={<LoadingTripDataView />} />
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
      <Route path="*" element={<PageNotFoundView />} />
    </Routes>
  );
}
