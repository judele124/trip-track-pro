import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Dropdown from "./test/Dropdown/Dropdown";
import DropdownTriggerElement from "./test/Dropdown/DropdownTriggerElement";
import DropdownMenu from "./test/Dropdown/DropdownMenu";
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
    <div className="page-colors mx-4 flex flex-col gap-3 rounded-3xl border p-4">
      <p className="text-xl font-bold">Select Experience</p>
      <Dropdown list={data}>
        <DropdownTriggerElement<{ name: string }>
          type="button"
          elemTextContent={(item) => item?.name || "Select Experience"}
        />
        <DropdownMenu<{ name: string }>
          setSelected={(item) => {
            setExperience(item.name);
            methods.reset();
          }}
          renderItem={({ item }) => <div>{item.name}</div>}
        />
      </Dropdown>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {experience === "Trivia" && <TriviaForm />}
          {experience === "Treasure find" && <TreasureFindForm />}
          {experience === "Scan QR" && <ScanQRForm />}

          <div>
            <label className="pl-5 text-start font-semibold">Add Score</label>
            <div className="flex gap-2">
              <Input
                type="number"
                title="Add Score"
                placeholder="Enter score"
                {...methods.register("score")}
              />
              <Button primary type="submit">
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