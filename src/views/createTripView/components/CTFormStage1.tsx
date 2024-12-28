import { InputHTMLAttributes, useEffect, useState } from "react";
import { IFormData } from "./CreateTripForm";
import InputFeildError from "../../../components/ui/InputFeildError";
import AddRewardBtn from "./AddRewardBtn";
import InputWLabel from "../../../components/ui/InputWLabel";
import Button from "../../../components/ui/Button";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";

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
    name: "description",
    title: "Enter description",
    placeholder: "Enter description",
    textarea: true,
  },
];

export default function CTFormStage1({
  unregisterReward,
  register,
  errors,
  setValue,
}: {
  unregisterReward: () => void;
  register: UseFormRegister<IFormData>;
  errors: FieldErrors<IFormData>;
  setValue: UseFormSetValue<IFormData>;
}) {
  const [hasReward, setHasReward] = useState(false);

  useEffect(() => {
    if (!hasReward) {
      unregisterReward();
    }
  }, [hasReward]);

  return (
    <>
      {firstStageInputs.map((input: IFirstStageInput) => (
        <div key={input.name}>
          {errors[input.name]?.message && (
            <InputFeildError message={errors[input.name]?.message as string} />
          )}
          <InputWLabel
            autoComplete={input.name}
            {...register(input.name)}
            title={input.title}
            placeholder={input.placeholder}
            textarea={input.textarea}
          />
        </div>
      ))}
      {errors.reward?.title?.message && (
        <InputFeildError message={errors.reward?.title.message} />
      )}
      <AddRewardBtn
        onOpen={() => setHasReward(true)}
        onCancel={() => setHasReward(false)}
        rewardTitleRegister={() => register("reward.title")}
        rewardImageRegister={() =>
          register("reward.image", {
            onChange: (e) => setValue("reward.image", e.target.files[0]),
          })
        }
      />
      <Button className="w-full" type="submit">
        Confirm
      </Button>
    </>
  );
}
