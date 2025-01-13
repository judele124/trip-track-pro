import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Dropdown from "../components/ui/Dropdown/Dropdown";
import DropdownTriggerElement from "../components/ui/Dropdown/DropdownTriggerElement";
import DropdownMenu from "../components/ui/Dropdown/DropdownMenu";
import Button from "./ui/Button";
import Input from "./ui/Input";
import TriviaForm from "../components/experience/TriviaForm";
import TreasureFindForm from "../components/experience/TreasureFindForm";
import ScanQRForm from "../components/experience/ScanQRForm";

const data = [
  { name: "Trivia" },
  { name: "Treasure find" },
  { name: "Scan QR" },
];

const ExperienceFrom = () => {
  const [experience, setExperience] = useState("");
  const methods = useForm();

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="page-colors page-padding mx-4 flex flex-col gap-2 rounded-3xl sm:mx-auto sm:max-w-[450px]">
      <h3 className="">Select Experience</h3>
      <FormProvider {...methods}>
        <form className="flex flex-col gap-2" onSubmit={methods.handleSubmit(onSubmit)}>
          <Dropdown list={data}>
            <DropdownTriggerElement<{ name: string }>
              type="button"
              elemTextContent={(item) => item?.name || "Select Experience"}
            />
            <DropdownMenu<{ name: string }>
              setSelected={(item) => {
                setExperience(item.name);
                methods.reset();
                methods.setValue("experience", item.name);
              }}
              renderItem={({ item }) => <div>{item.name}</div>}
            />
          </Dropdown>
          {experience === "Trivia" && <TriviaForm />}
          {experience === "Treasure find" && <TreasureFindForm />}
          {experience === "Scan QR" && <ScanQRForm />}

          <div className="flex flex-col gap-1">
            <label className="pl-5 text-start font-semibold">Add Score</label>
            <div className="flex gap-2">
              <Input
                type="number"
                title="Add Score"
                placeholder="Enter score"
                {...methods.register("score")}
              />
              <Button className="w-full" type="submit" primary>
                Confirm
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ExperienceFrom;
