import { InputHTMLAttributes, useState } from "react";
import Button from "../../../components/ui/Button";
import InputWLabel from "../../../components/ui/InputWLabel";
import { useForm } from "react-hook-form";
import FormMultipleStages from "../../../components/FormMultipleStages";
import InputFeildError from "../../../components/ui/InputFeildError";
import AddRewardBtn from "./AddRewardBtn";

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

const secondStageInputs: IFirstStageInput[] = [
  {
    name: "firstStop",
    title: "First stop",
    placeholder: "Enter first stop",
  },
  {
    name: "lastStop",
    title: "Last stop",
    placeholder: "Enter last stop",
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
              onCencel={() => resetField("reward")}
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
            <div key={secondStageInputs[0].name}>
              {errors[secondStageInputs[0].name]?.message && (
                <InputFeildError
                  message={
                    errors[secondStageInputs[0].name]?.message ||
                    "Default error"
                  }
                />
              )}
              <InputWLabel
                autoComplete={secondStageInputs[0].name}
                {...register(secondStageInputs[0].name, {
                  required: "This field is required",
                })}
                title={secondStageInputs[0].title}
                placeholder={secondStageInputs[0].placeholder}
                textarea={secondStageInputs[0].textarea}
              />
            </div>

            <div key={secondStageInputs[1].name}>
              {errors[secondStageInputs[1].name]?.message && (
                <InputFeildError
                  message={
                    errors[secondStageInputs[1].name]?.message ||
                    "Default error"
                  }
                />
              )}
              <InputWLabel
                autoComplete={secondStageInputs[1].name}
                {...register(secondStageInputs[1].name, {
                  required: "This field is required",
                })}
                title={secondStageInputs[1].title}
                placeholder={secondStageInputs[1].placeholder}
                textarea={secondStageInputs[1].textarea}
              />
            </div>
            <Button className="w-full" type="submit" primary>
              Send code
            </Button>
          </>
        ),
      ]}
    />
  );
}
