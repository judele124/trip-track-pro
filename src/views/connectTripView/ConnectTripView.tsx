import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ConnectTripView() {
  const [text, setText] = useState<string>("Connecting...");
  let { tripId } = useParams();

  useEffect(() => {
    if (!tripId) return;

    const id = setInterval(() => {
      setText((prev) => {
        if (prev === "Connecting...") {
          return "Connecting." as string;
        } else if (prev === "Connecting.") {
          return "Connecting.." as string;
        } else if (prev === "Connecting..") {
          return "Connecting..." as string;
        } else {
          return "Connecting" as string;
        }
      });
    }, 400);
    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <>
      <h1>
        {text}
        <br />
        {tripId}
      </h1>
    </>
  );
}
