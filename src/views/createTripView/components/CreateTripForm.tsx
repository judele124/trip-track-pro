import { FormProvider, useForm } from "react-hook-form";
import FormMultipleStages from "@/components/FormMultipleStages";
import { zodResolver } from "@hookform/resolvers/zod";
import CTFormStage1 from "./stage1/CTFormStage1";
import CTFormStage2 from "./stage2/CTFormStage2";
import { Schemas, Types } from "trip-track-package";
// import { multipleStepsTripSchema, Trip } from "@/zodSchemas/tripSchema";

interface ICreateTripFormProps {
  currentFormStage: number;
  setCurrentFormStage: React.Dispatch<React.SetStateAction<number>>;
}

export interface IStopLocation {
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
}: ICreateTripFormProps) {
  const reactHookFormsMethods = useForm<Types["Trip"]>({
    resolver: zodResolver(
      Schemas.trip.multipleStepsTripSchema[currentFormStage],
    ),
    defaultValues: {
      description: "",
      groupName: "",
      name: "",
      reward: undefined,
      stops: [],
    },
  });

  console.log(reactHookFormsMethods.formState.errors);

  return (
    <FormProvider {...reactHookFormsMethods}>
      <FormMultipleStages
        className="flex flex-col gap-3"
        onLastStageSubmit={reactHookFormsMethods.handleSubmit(() => {
          console.log(reactHookFormsMethods.watch());
        })}
        onMultipleStageSubmit={(e, { incrementStage }) => {
          reactHookFormsMethods.handleSubmit(() => {
            setCurrentFormStage((prev) => prev + 1);
            incrementStage();
          })(e);
        }}
        renderStages={[<CTFormStage1 />, <CTFormStage2 />]}
      />
    </FormProvider>
  );
}
