import { useNavigate, useSearchParams } from "react-router-dom";
import ProgressLine from "../createTripView/components/ProgressLine";
import ShareTrip from "../createTripView/components/ShareTrip";
import { useEffect } from "react";

export default function ShareTripView() {
  const [searchParams, _] = useSearchParams({});
  const nav = useNavigate();

  useEffect(() => {
    if (!searchParams.get("tripId")) {
      nav("/404");
    }
  }, []);
  return (
    <>
      <ShareTrip />
      <ProgressLine
        className="absolute bottom-5 mt-auto w-full"
        length={3}
        index={3}
      />
    </>
  );
}
