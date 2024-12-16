import { InputHTMLAttributes } from "react";
import Button from "../../../components/ui/Button";
import InputWLabel from "../../../components/ui/InputWLabel";
import InputWBtnAndLabel from "../../../components/ui/InputWBtnAndLabel";
import { useForm } from "react-hook-form";

type IFormData = {
  groupName: string;
  tripName: string;
  extraDetails: string;
};

export default function CreateTripForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();

  const onSubmit = (data: IFormData) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex max-w-[350px] flex-col gap-2 p-4"
    >
      {inputsFieldsProps.map((props) => (
        <InputWLabel
          {...(props.name == "extraDetails" && { textarea: true })}
          key={props.name}
          {...props}
          {...register(props.name as keyof IFormData)}
        />
      ))}
      <InputWBtnAndLabel
        title="Add a reward"
        placeholder="Enter your query"
        primary
        isColumn
      >
        <span>🔍</span>
        <Button className="w-full" type="button" primary>
          Add a photo
        </Button>
      </InputWBtnAndLabel>
      <Button type="submit">Confirm</Button>
    </form>
  );
}

const inputsFieldsProps: InputHTMLAttributes<HTMLInputElement>[] = [
  {
    type: "text",
    name: "groupName",
    title: "Enter group name",
    placeholder: "Enter group name",
  },
  {
    type: "text",
    name: "tripName",
    title: "Enter trip name",
    placeholder: "Enter trip name",
  },
  {
    type: "text",
    name: "extraDetails",
    title: "Enter extra information",
    // placeholder: "Enter 2 digits code",
  },
];
