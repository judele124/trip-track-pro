import React from "react";
import Button from "../../../components/ui/Button";

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
      className="mx-auto flex max-w-[350px] flex-col gap-4 p-4"
    >
      <label htmlFor="tripName" className="flex flex-col">
        <span className="text-lg font-bold">Trip name</span>
        <input
          type="text"
          id="tripName"
          name="tripName"
          placeholder="Trip name"
          className="rounded-md bg-light px-2 py-1"
        />
      </label>
      <label htmlFor="startDate" className="flex flex-col">
        <span className="text-lg font-bold">Start date</span>
        <input
          type="date"
          id="startDate"
          name="startDate"
          className="rounded-md bg-light px-2 py-1"
        />
      </label>
      <label htmlFor="endDate" className="flex flex-col">
        <span className="text-lg font-bold">End date</span>
        <input
          type="date"
          id="endDate"
          name="endDate"
          className="rounded-md bg-light px-2 py-1"
        />
      </label>
      <Button primary type="submit">
        Create trip
      </Button>
    </form>
  );
}
