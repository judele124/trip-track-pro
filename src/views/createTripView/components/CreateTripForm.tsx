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
      className="p-4s mx-auto flex max-w-[350px] flex-col gap-2 text-left"
    >
      <InputWLabel type="text" name="groupName" title="Trip name" />
      <InputWLabel type="text" name="tripName" title="Trip name" />
      <InputWLabel textarea type="text" name="decription" title="Decription" />

      <Button primary type="submit">
        Create trip
      </Button>
    </form>
  );
}
