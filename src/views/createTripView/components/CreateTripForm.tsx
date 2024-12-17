import { InputHTMLAttributes } from "react";
import Button from "../../../components/ui/Button";
import InputWLabel from "../../../components/ui/InputWLabel";
import { useForm } from "react-hook-form";
import FormMultipleStages from "../../../components/FormMultipleStages";
import InputFeildError from "../../../components/ui/InputFeildError";

type IFormData = {
  groupName: string;
  tripName: string;
  extraDetails: string;
  descrpition: string;
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
  const {
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
      onMultipleStageSubmit={handleSubmit((data) => {
        console.log(data);
      })}
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
            <Button type="button">+ Add another group</Button>
            <Button className="w-full" type="submit" primary>
              Send code
            </Button>
          </>
        ),
        () => (
          <>
            <div className="text-center text-yellow-300">
              TODO add stage for getting locations
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
