import { useState } from "react";
import { useForm } from "react-hook-form";
import FormMultipleStages from "../../../components/FormMultipleStages";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTripSchema } from "../../../zodSchemas/createTripSchemas";
import CTFormStage1 from "./CTFormStage1";
import CTFormStage2 from "./CTFormStage2";

export type IFormData = {
  groupName: string;
  tripName: string;
  description: string;
  reward?: { title: string; image: File };
  firstStop: string;
  lastStop: string;
  middleStops: string[];
};

export default function CreateTripForm() {
  const [currentFormStage, setCurrentFormStage] = useState(0);
  const {
    unregister,
    setValue,
    resetField,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: zodResolver(createTripSchema[currentFormStage]),
  });

  return (
    <FormMultipleStages
      className="flex flex-col gap-3"
      onLastStageSubmit={handleSubmit((data) => {
        console.log(data);
      })}
      onMultipleStageSubmit={(e, { incrementStage }) => {
        handleSubmit((data) => {
          console.log(data);
          setCurrentFormStage((prev) => prev + 1);
          incrementStage();
        })(e);
      }}
      renderStages={[
        // <CTFormStage1
        //   unregisterReward={() => {
        //     resetField("reward");
        //     unregister("reward.image");
        //     unregister("reward.title");
        //   }}
        //   errors={errors}
        //   register={register}
        //   setValue={setValue}
        // />,
        <CTFormStage2 register={register} errors={errors} />,
      ]}
    />
  );
}
