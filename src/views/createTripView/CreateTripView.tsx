import { useState } from "react";
import CreateTripForm from "./components/CreateTripForm";
import ProgressLine from "./components/ProgressLine";

const STAGES_COUNT = 3;

export default function CreateTripView() {
  const [currentFormStage, setCurrentFormStage] = useState(0);

  return (
    <>
      {currentFormStage < STAGES_COUNT - 1 ? (
        <CreateTripForm
          currentFormStage={currentFormStage}
          setCurrentFormStage={setCurrentFormStage}
        />
      ) : (
        <ShareTrip />
      )}
      <ProgressLine
        className="absolute bottom-5 mt-auto w-full"
        length={3}
        index={currentFormStage}
      />
    </>
  );
}

const ShareTrip = () => {
  return (
    <div className="flex h-full w-full flex-col gap-4">
      <h1 className="heading">Trip create seccessfuly</h1>
      <p className="subheading">Share the trip to add sub guides and players</p>
    </div>
  );
};
