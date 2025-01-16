import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormRegister,
  UseFormResetField,
  UseFormSetValue,
} from "react-hook-form";
import Button from "../../../../components/ui/Button";
import InputFeildError from "../../../../components/ui/InputFeildError";
import { IFormData } from "../CreateTripForm";
import { useRef, useState } from "react";
import StopLocationInput from "./StopLocationInput";
import { useCounter } from "@/hooks/useCounter";
import StopInput from "./StopInput";

interface ICTFormStage2Props {
  resetField: UseFormResetField<IFormData>;
  setValue: UseFormSetValue<IFormData>;
  errors: FieldErrors<IFormData>;
  control: Control<IFormData, any>;
}

export default function CTFormStage2({
  resetField,
  setValue,
  errors,
  control,
}: ICTFormStage2Props) {

  const { fields, append, remove } = useFieldArray({
    control,
    name: "middleStops", // Name of the field array
  });
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
        <StopInput 
           name={"firstStop"}
           setValue={setValue}
           icon={"alert"}
           onRemove={() => {
             resetField("firstStop");
             setMiddleStopsCount((prev) => prev - 1);
           }}
        />
        {/* <StopLocationInput
          onValueChange={handleOnValueChange("firstStop")}
          icon={"start"}
          title={"First Stop"}
        /> */}
      </div>
      {fields.length > 0 && (
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
        {fields.map((field, i) => (
          <StopInput
            key={i}
            name={`middleStops.${i as keyof IFormData["middleStops"]}`}
            setValue={setValue}
            icon={"alert"}
            onRemove={() => {
              resetField(`middleStops.${i}`);
              setMiddleStopsCount((prev) => prev - 1);
            }}
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
        icon={"end"}
        title={"Last Stop"}
      />
      <Button type="submit" primary>
        Send code
      </Button>
    </>
  );
}
