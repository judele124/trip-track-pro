import React from "react";
import Button from "../../../components/ui/Button";
import InputWLabel from "../../../components/ui/InputWLabel";

export default function CreateTripForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const tripName = formData.get("tripName") as string;
    const startDate = formData.get("startDate") as string;
    const endDate = formData.get("endDate") as string;
    console.log({ tripName, startDate, endDate });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex max-w-[350px] flex-col gap-2 p-4"
    >
      <InputWLabel title="Enter group name" name="groupName" type="text" />
      <InputWLabel title="Enter trip name" name="tripName" type="text" />
      <InputWLabel
        title="Enter extra information"
        name="extraDetails"
        type="text"
      />
      <Button primary type="button">
        Add a reward
      </Button>
      <Button type="submit">Confirm</Button>
    </form>
  );
}
