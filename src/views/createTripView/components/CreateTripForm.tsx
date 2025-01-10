import { useForm } from "react-hook-form";
import FormMultipleStages from "@/components/FormMultipleStages";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTripSchema } from "@/zodSchemas/createTripSchemas";
import CTFormStage1 from "./CTFormStage1";
import CTFormStage2 from "./CTFormStage2";
import { useEffect } from "react";

interface IStopLocation {
  address: string;
  location: { lat: number; lng: number };
}
export type IFormData = {
  groupName: string;
  tripName: string;
  description: string;
  reward?: { title: string; image: File };
  firstStop: IStopLocation;
  lastStop: IStopLocation;
  middleStops: IStopLocation[];
};

export default function CreateTripForm({
  currentFormStage,
  setCurrentFormStage,
}: {
  currentFormStage: number;
  setCurrentFormStage: React.Dispatch<React.SetStateAction<number>>;
}) {
  const {
    watch,
    unregister,
    setValue,
    resetField,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: zodResolver(createTripSchema[currentFormStage]),
  });

  useEffect(() => {
    console.log(watch());
  }, [watch()]);

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
        <CTFormStage1
          unregisterReward={() => {
            resetField("reward");
            unregister("reward.image");
            unregister("reward.title");
          }}
          errors={errors}
          register={register}
          setValue={setValue}
        />,
        <CTFormStage2
          resetField={resetField}
          setValue={setValue}
          errors={errors}
        />,
      ]}
    />
  );
}
