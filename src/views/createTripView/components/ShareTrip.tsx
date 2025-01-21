import Icon from "@/components/icons/Icon";
import Button from "@/components/ui/Button";
import InputFeildError from "@/components/ui/InputFeildError";
import Modal from "@/components/ui/Modal";
import useAxios from "@/hooks/useAxios";
import useIdFromParamsOrNavigate from "@/hooks/useIdFromParamsOrNavigate";
import useToggle from "@/hooks/useToggle";
import { tripGet } from "@/servises/tripService";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Types } from "trip-track-package";

export default function ShareTrip() {
  const nav = useNavigate();
  const tripId = useIdFromParamsOrNavigate("404");
  const { isOpen: isQrModalOpen, toggle: toggleIsQrModalOpen } = useToggle();
  const { activate, data, error, loading } = useAxios({ manual: true });
  const [browserError, setBrowserError] = useState<string | null>(null);

  useEffect(() => {
    if (tripId) {
      tripGet(activate, tripId);
    }
  }, [tripId]);

  const handleClickOtherShareMethod = async () => {
    if (!navigator.canShare) {
      setBrowserError("Sorry your browser doest support sharing.");
      return;
    }

    try {
      if (navigator.canShare(shareData)) {
        await navigator.share(shareData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (error) {
    return (
      <div className="text-center">
        <p>Sorry something went wrong please try again later</p>
        <Button primary className="mt-5 w-full" onClick={() => nav("/")}>
          Home
        </Button>
      </div>
    );
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data) return null;

  const { name, description, _id }: Types["Trip"]["Model"] = data;

  const shareTripUrl = `${window.location.origin + "/join-trip"}?tripId=${_id}`;

  const shareData = {
    url: shareTripUrl,
    text: `Check out this trip!
The trip is called ${name}
${description ? `the trip is about ${description}` : ""}
and you can join it here:\n${shareTripUrl}`,
    title: "Check out this trip!",
  };

  return (
    <>
      <div className="flex h-full w-full flex-col gap-4">
        <div>
          <h1>
            Trip{" "}
            <span className="text-4xl font-semibold text-primary">{name}</span>{" "}
            created seccessfuly
          </h1>
          <p>Share the trip to add sub guides and players</p>
        </div>

        {/* share methods */}
        <div className="flex flex-wrap justify-center gap-5 text-center">
          {/* whatsapp share */}
          <div className="max-w-32 rounded-2xl bg-white p-5 shadow-lg">
            <Link
              to={`https://wa.me/?text=${encodeURIComponent(shareData.text)}`}
              target="_blank"
            >
              <Icon size={"100%"} className="fill-green-500" name="whatsapp" />
              <p>share on whatsapp</p>
            </Link>
          </div>

          {/* create qr code */}
          <div
            onClick={() => toggleIsQrModalOpen()}
            className="max-w-32 rounded-2xl bg-white p-5 shadow-lg"
          >
            <Icon size={"100%"} className="fill-dark" name="qr" />
            <p>create a QR code</p>
            {/* modal qr code */}
            <Modal
              center
              onBackdropClick={() => toggleIsQrModalOpen()}
              open={isQrModalOpen}
            >
              <div className="flex flex-col items-center gap-2 rounded-2xl bg-white p-10 print:w-full">
                <QRCodeSVG
                  className="print:h-full print:w-full"
                  value={shareTripUrl}
                />
                <Button className="print:hidden" onClick={() => window.print()}>
                  Click to print
                </Button>
                <div className="hidden print:block">
                  <h1>{name}</h1>
                  <p>scan the code to join the trip</p>
                </div>
              </div>
            </Modal>
          </div>
        </div>
        <div className="text-center">
          {browserError && <InputFeildError message={browserError} />}
          <Button
            className="bg-transparent px-0 py-0 text-dark underline underline-offset-1 dark:text-light"
            onClick={handleClickOtherShareMethod}
          >
            other share methods
          </Button>
        </div>
        <Button primary>Start trip now</Button>
        <Button>Start later</Button>
      </div>
    </>
  );
}
