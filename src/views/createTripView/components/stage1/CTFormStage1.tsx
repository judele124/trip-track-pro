import { InputHTMLAttributes } from "react";
import InputFeildError from "@/components/ui/InputFeildError";
import AddRewardBtn from "./AddRewardBtn";
import InputWLabel from "@/components/ui/InputWLabel";
import Button from "@/components/ui/Button";
import { useFormContext } from "react-hook-form";
import { Types } from "trip-track-package";

interface IFirstStageInput extends InputHTMLAttributes<HTMLInputElement> {
  name: keyof Types["Trip"];
  textarea?: boolean;
}

const firstStageInputs: IFirstStageInput[] = [
  {
    name: "groupName",
    title: "Enter group name",
    placeholder: "Enter group name",
  },
  {
    name: "name",
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

export default function CTFormStage1() {
  const {
    register,
    formState: { errors },
  } = useFormContext<Types["Trip"]>();

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
      <AddRewardBtn />
      <Button className="w-full" type="submit">
        Confirm
      </Button>
    </>
  );
}
