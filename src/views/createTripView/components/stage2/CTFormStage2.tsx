import {
  FieldErrors,
  UseFormResetField,
  UseFormSetValue,
} from "react-hook-form";
import Button from "@/components/ui/Button";
import InputFeildError from "@/components/ui/InputFeildError";
import { IFormData } from "../CreateTripForm";
import { useRef, useState } from "react";
import StopLocationInput from "./StopLocationInput";
import { useCounter } from "@/hooks/useCounter";

interface ICTFormStage2Props {
  resetField: UseFormResetField<IFormData>;
  setValue: UseFormSetValue<IFormData>;
  errors: FieldErrors<IFormData>;
}

export default function CTFormStage2({
  resetField,
  setValue,
  errors,
}: ICTFormStage2Props) {
  const {} = useCounter({ initial: 0 });
  const [middleStopsCount, setMiddleStopsCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleOnValueChange = (key: string & keyof IFormData) => {
    return (address: string, location: { lat: number; lng: number }) => {
      setValue(key, { address, location });
    };
  };

  return (
    <>
      <div ref={containerRef}>
        {errors.firstStop?.message && (
          <InputFeildError message={errors.firstStop.message} />
        )}
        <StopLocationInput
          onValueChange={handleOnValueChange("firstStop")}
          icon={"target"}
          iconFill="#ce5737"
          title={"First Stop"}
        />
      </div>
      {middleStopsCount > 0 && (
        <label className={`flex w-full flex-col gap-1`}>
          {
            <span className={`pl-5 text-start font-semibold`}>
              Middle Stops
            </span>
          }
        </label>
      )}
      <div
        className={`flex max-h-[40vh] flex-col gap-2 ${middleStopsCount > 3 && "overflow-y-scroll"}`}
      >
        {[...Array(middleStopsCount)].map((_, i) => (
          <StopLocationInput
            middleStop
            onRemove={() => {
              // TODO: remove middle stop from state
              setMiddleStopsCount((prev) => prev - 1);
            }}
            onValueChange={handleOnValueChange(
              `middleStops.${i}` as keyof IFormData,
            )}
            key={i}
            icon={"circle"}
          />
        ))}
      </div>
      <Button
        onClick={() => setMiddleStopsCount((prev) => prev + 1)}
        type="button"
      >
        Add middle stop
      </Button>
      <StopLocationInput
        onValueChange={handleOnValueChange("lastStop")}
        icon={"flag"}
        iconFill="#ce5737"
        title={"Last Stop"}
      />
      <Button type="submit" primary>
        Send code
      </Button>
    </>
  );
}
