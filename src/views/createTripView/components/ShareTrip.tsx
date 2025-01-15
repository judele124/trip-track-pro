import Icon from "@/components/icons/Icon";
import Button from "@/components/ui/Button";
import InputFeildError from "@/components/ui/InputFeildError";
import Modal from "@/components/ui/Modal";
import useToggle from "@/hooks/useToggle";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";

export default function ShareTrip() {
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams({
    tripId: "default trip id",
    tripName: "default trip name",
  });
  const { pathname } = useLocation();
  const { isOpen: isQrModalOpen, toggle: toggleIsQrModalOpen } = useToggle();

  const shareTripUrl = `${window.location.origin + pathname}?tripId=${searchParams.get("tripId")}&tripName=${searchParams.get("tripName")}`;

  const shareData = {
    url: shareTripUrl,
    text: `Check out this trip!\n${shareTripUrl}`,
    title: "Check out this trip!",
  };

  const handleClickOtherShareMethod = async () => {
    if (!navigator.canShare) {
      setError("Sorry your browser doest support sharing.");
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

  return (
    <>
      <div className="flex h-full w-full flex-col gap-4">
        <div>
          <h1>Trip create seccessfuly</h1>
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
                  <h1>{searchParams.get("tripName")}</h1>
                  <p>scan the code to join the trip</p>
                </div>
              </div>
            </Modal>
          </div>
        </div>
        <div className="text-center">
          {error && <InputFeildError message={error} />}
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
