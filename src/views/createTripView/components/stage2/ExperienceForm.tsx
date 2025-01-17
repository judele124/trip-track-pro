import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Dropdown from "@/components/ui/Dropdown";
import DropdownTriggerElement from "@/components/ui/Dropdown/DropdownTriggerElement";
import DropdownMenu from "@/components/ui/Dropdown/DropdownMenu";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import TriviaForm from "./experience/TriviaForm";
import TreasureFindForm from "./experience/TreasureFindForm";
import ScanQRForm from "./experience/ScanQRForm";
import { experienceSchema, ExperienceType } from "@/zodSchemas/trip.schema";
import { zodResolver } from "@hookform/resolvers/zod";

const ExperienceForm = ({ onClose }: { onClose: () => void }) => {
  const [experience, setExperience] = useState("");
  const methods = useForm({
    resolver: zodResolver(experienceSchema),
  });

  return (
    <div className="page-colors page-padding mx-4 flex flex-col gap-2 rounded-3xl sm:mx-auto sm:max-w-[450px]">
      <h3 className="">Select Experience</h3>
      <FormProvider {...methods}>
        <form
          className="flex flex-col gap-2"
          onSubmit={methods.handleSubmit((data) => console.log(data))}
        >
          <Dropdown list={Object.values(ExperienceType)}>
            <DropdownTriggerElement<ExperienceType>
              type="button"
              elemTextContent={(item) =>
                item?.toString() || "Select Experience"
              }
            />
            <DropdownMenu<ExperienceType>
              setSelected={(item) => {
                setExperience(item);
                methods.reset();
                methods.setValue("type", item);
              }}
              renderItem={({ item }) => <div>{item}</div>}
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
            <Button
              type="reset"
              className="bg-red-500"
              onClick={() => {
                methods.reset();
                setExperience("");
                onClose();
              }}
            >
              Cencel
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ExperienceForm;
