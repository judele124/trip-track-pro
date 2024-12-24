import { InputHTMLAttributes, useState } from "react";
import Button from "../../../components/ui/Button";
import InputWLabel from "../../../components/ui/InputWLabel";
import { useForm } from "react-hook-form";
import FormMultipleStages from "../../../components/FormMultipleStages";
import InputFeildError from "../../../components/ui/InputFeildError";
import AddRewardBtn from "./AddRewardBtn";
import Input from "../../../components/ui/Input";

type IFormData = {
  groupName: string;
  tripName: string;
  extraDetails: string;
  descrpition: string;
  reward?: { title: string; images: FileList };
  firstStop: string;
  lastStop: string;
  middleStops: string[];
};

interface IFirstStageInput extends InputHTMLAttributes<HTMLInputElement> {
  name: keyof IFormData;
  textarea?: boolean;
}

const firstStageInputs: IFirstStageInput[] = [
  {
    name: "groupName",
    title: "Enter group name",
    placeholder: "Enter group name",
  },
  {
    name: "tripName",
    title: "Enter trip name",
    placeholder: "Enter trip name",
  },
  {
    name: "descrpition",
    title: "Enter descrpition",
    placeholder: "Enter descrpition",
    textarea: true,
  },
];

export default function CreateTripForm() {
  const [middleStopsCount, setMiddleStopsCount] = useState(0);
  const {
    resetField,
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();

  return (
    <FormMultipleStages
      className="flex flex-col gap-3"
      onLastStageSubmit={handleSubmit((data) => {
        console.log(data);
      })}
      onMultipleStageSubmit={(e, { incrementStage }) => {
        handleSubmit((data) => {
          console.log(data);
          incrementStage();
        })(e);
      }}
      renderStages={[
        () => (
          <>
            {firstStageInputs.map((input) => (
              <div key={input.name}>
                {errors[input.name]?.message && (
                  <InputFeildError
                    message={errors[input.name]?.message || "Default error"}
                  />
                )}
                <InputWLabel
                  autoComplete={input.name}
                  {...register(input.name, {
                    required: "This field is required",
                  })}
                  title={input.title}
                  placeholder={input.placeholder}
                  textarea={input.textarea}
                />
              </div>
            ))}
            <AddRewardBtn
              onCancel={() => resetField("reward")}
              rewardTitleRegister={register("reward.title")}
              rewardImageRegister={register("reward.images")}
              fileName={watch("reward.images")?.[0].name}
            />
            <Button className="w-full" type="submit">
              Send code
            </Button>
          </>
        ),
        () => (
          <>
            <div key={"firstStop"}>
              {errors["firstStop"]?.message && (
                <InputFeildError
                  message={errors["firstStop"]?.message || "Default error"}
                />
              )}
              <InputWLabel
                autoComplete={"firstStop"}
                {...register("firstStop", {
                  required: "This field is required",
                })}
                title={"First Stop"}
                placeholder={"Enter first stop"}
              />
            </div>

            {Array.from({ length: middleStopsCount }, (_, i) => i).map(
              (_, i) =>
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
              {errors["lastStop"]?.message && (
                <InputFeildError
                  message={errors["lastStop"]?.message || "Default error"}
                />
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
        ),
      ]}
    />
  );
}
