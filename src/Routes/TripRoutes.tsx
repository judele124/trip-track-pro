import { Route, Routes } from "react-router-dom";
import TripLayout from "@/components/layouts/TripLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import MapView from "@/views/mapView";
import ParticipantsView from "@/views/participantsView/ParticipantsView";
import ChatView from "@/views/chatView/ChatView";
import ConnectTripView from "@/views/connectTripView";
import PageNotFoundView from "@/views/pageNotFoundView";
export default function TripRoutes() {
  return (
    <Routes>
      <Route path="/trip" element={<TripLayout />}>
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
        <Route path=":tripId" element={<ConnectTripView />} />
        <Route path="*" element={<PageNotFoundView />} />
      </Route>
    </Routes>
  );
}
