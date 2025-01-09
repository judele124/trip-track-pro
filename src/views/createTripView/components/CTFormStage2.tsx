import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import Button from "../../../components/ui/Button";
import InputFeildError from "../../../components/ui/InputFeildError";
import { IFormData } from "./CreateTripForm";
import { useRef, useState } from "react";
import StopLocationInput from "./StopLocationInput";

export default function CTFormStage2({
  setValue,
  register,
  errors,
}: {
  setValue: UseFormSetValue<IFormData>;
  register: UseFormRegister<IFormData>;
  errors: FieldErrors<IFormData>;
}) {
  const [middleStopsCount, setMiddleStopsCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div ref={containerRef}>
        {errors.firstStop?.message && (
          <InputFeildError message={errors.firstStop.message} />
        )}
        <StopLocationInput
          onValueChange={(value: string) => {
            setValue("firstStop", value);
          }}
          register={register}
          registerKey={"firstStop"}
          icon={"start"}
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
            onValueChange={(value: string) => {
              setValue(`middleStops.${i}`, value);
            }}
            key={i}
            register={register}
            registerKey={`middleStops.${i}` as keyof IFormData}
            icon={"middle"}
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
        onValueChange={(value: string) => setValue("lastStop", value)}
        register={register}
        registerKey={"lastStop"}
        icon={"end"}
        title={"Last Stop"}
      />
      <Button type="submit" primary>
        Send code
      </Button>
    </>
  );
}
