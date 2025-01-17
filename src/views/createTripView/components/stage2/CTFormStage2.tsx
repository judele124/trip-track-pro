import { useFormContext } from "react-hook-form";
import Button from "../../../../components/ui/Button";
import InputFeildError from "../../../../components/ui/InputFeildError";
import { useRef, useState } from "react";
import StopLocationInput from "./StopLocationInput";
import { Stop, Trip } from "@/zodSchemas/tripSchema";
import StopInput from "./StopInput";

export default function CTFormStage2() {
  const {
    setValue,
    formState: { errors },
  } = useFormContext<Trip>();
  const [middleStopsCount, setMiddleStopsCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div ref={containerRef}>
        {errors.stops?.[0]?.message && (
          <InputFeildError message={errors.stops[0].message} />
        )}
        <p className={`mb-1 pl-5 text-start font-semibold`}>First Stop</p>
        <StopInput index={0} />
      </div>
      <div>
        {middleStopsCount > 0 && (
          <p className={`mb-1 pl-5 text-start font-semibold`}>Middle Stops</p>
        )}
        <div
          className={`flex max-h-[40vh] flex-col gap-2 ${middleStopsCount > 3 && "overflow-y-scroll"}`}
        >
          {[...Array(middleStopsCount)].map((_, i) => (
            <StopInput
              onRemove={() => setMiddleStopsCount((prev) => prev - 1)}
              isMiddleStop
              index={i + 1}
              key={i + 1}
            />
          ))}
        </div>
      </div>
      <Button
        onClick={() => setMiddleStopsCount((prev) => prev + 1)}
        type="button"
        className="font-normal"
      >
        Add middle stop
      </Button>
      {errors.stops?.[middleStopsCount + 1]?.message && (
        <InputFeildError
          message={errors.stops?.[middleStopsCount + 1]?.message!}
        />
      )}
      <p className={`mb-1 pl-5 text-start font-semibold`}>Last Stop</p>
      <StopInput index={middleStopsCount + 1} />
      <Button type="submit" primary>
        Create Trip
      </Button>
    </>
  );
}
