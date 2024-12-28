import { FieldErrors, UseFormRegister } from "react-hook-form";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import InputFeildError from "../../../components/ui/InputFeildError";
import InputWLabel from "../../../components/ui/InputWLabel";
import { IFormData } from "./CreateTripForm";
import { useState } from "react";

export default function CTFormStage2({
  register,
  errors,
}: {
  register: UseFormRegister<IFormData>;
  errors: FieldErrors<IFormData>;
}) {
  const [middleStopsCount, setMiddleStopsCount] = useState(0);

  return (
    <>
      <div key={"firstStop"}>
        {errors.firstStop?.message && (
          <InputFeildError message={errors.firstStop.message} />
        )}
        <InputWLabel
          autoComplete={"firstStop"}
          {...register("firstStop")}
          title={"First Stop"}
          placeholder={"Enter first stop"}
        />
      </div>

      {[...Array(middleStopsCount)].map((_, i) =>
        i === 0 ? (
          <InputWLabel
            title="Middle stops"
            key={i}
            {...register(`middleStops.${i}`)}
          />
        ) : (
          <Input key={i} {...register(`middleStops`)} />
        ),
      )}
      <Button
        onClick={() => setMiddleStopsCount((prev) => prev + 1)}
        type="button"
      >
        Add middle stop
      </Button>
      <div key={"lastStop"}>
        {errors.lastStop?.message && (
          <InputFeildError message={errors.lastStop.message} />
        )}
        <InputWLabel
          autoComplete={"lastStop"}
          {...register("lastStop", {
            required: "This field is required",
          })}
          title={"Last Stop"}
          placeholder={"Enter last stop"}
        />
      </div>
      <Button type="submit" primary>
        Send code
      </Button>
    </>
  );
}
