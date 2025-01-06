import { useForm } from "react-hook-form";
import FormMultipleStages from "../../../components/FormMultipleStages";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTripSchema } from "../../../zodSchemas/createTripSchemas";
import CTFormStage1 from "./CTFormStage1";
import CTFormStage2 from "./CTFormStage2";
// import { useTripSocket } from "../../../contexts/SocketContext";

export type IFormData = {
  groupName: string;
  tripName: string;
  description: string;
  reward?: { title: string; image: File };
  firstStop: string;
  lastStop: string;
  middleStops: string[];
};

export default function CreateTripForm({
  currentFormStage,
  setCurrentFormStage,
}: {
  currentFormStage: number;
  setCurrentFormStage: React.Dispatch<React.SetStateAction<number>>;
}) {
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
  // const { setTripSocket } = useTripSocket();

  return (
    <>
      <h1 className="py-2 text-center text-3xl font-bold">
        Enter trip details
      </h1>
      <FormMultipleStages
        className="flex flex-col gap-3"
        onLastStageSubmit={handleSubmit((data) => {
          console.log(data);
          setCurrentFormStage((prev) => prev + 1);
          // TODO:
          // axios to create trip
          // if success
          // set trip socket
          // setTripSocket(tripId);
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
          <CTFormStage2 register={register} errors={errors} />,
        ]}
      />
    </>
  );
}
