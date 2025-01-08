import { FieldErrors, UseFormRegister } from "react-hook-form";
import Button from "../../../components/ui/Button";
import InputFeildError from "../../../components/ui/InputFeildError";
import { IFormData } from "./CreateTripForm";
import { useRef, useState } from "react";
import StopLocationInput from "./StopLocationInput";

export default function CTFormStage2({
  register,
  errors,
}: {
  register: UseFormRegister<IFormData>;
  errors: FieldErrors<IFormData>;
}) {
  const [middleStopsCount, setMiddleStopsCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div ref={containerRef} key={"firstStop"}>
        {errors.firstStop?.message && (
          <InputFeildError message={errors.firstStop.message} />
        )}
        <StopLocationInput
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
        {[...Array(middleStopsCount)].map((_) => (
          <StopLocationInput
            register={register}
            registerKey={"firstStop"}
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
        register={register}
        registerKey={"firstStop"}
        icon={"end"}
        title={"Last Stop"}
      />
      <Button type="submit" primary>
        Send code
      </Button>
    </>
  );
}
