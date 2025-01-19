import { useFormContext } from "react-hook-form";
import Dropdown from "@/components/ui/Dropdown";
import DropdownTriggerElement from "@/components/ui/Dropdown/DropdownTriggerElement";
import DropdownMenu from "@/components/ui/Dropdown/DropdownMenu";
import Button from "@/components/ui/Button";
import TriviaForm from "./experience/TriviaForm";
import InputWLabel from "@/components/ui/InputWLabel";
import { ExperienceType, Types } from "trip-track-package";
// import TreasureFindForm from "./experience/TreasureFindForm";
// import ScanQRForm from "./experience/ScanQRForm";

interface IExperienceFormProps {
  index: number;
  onConfirm: () => void;
  onCencel: () => void;
}

const ExperienceForm = ({
  index,
  onConfirm,
  onCencel,
}: IExperienceFormProps) => {
  const {
    watch,
    register,
    setValue,
    resetField,
    trigger,
    formState: { errors },
  } = useFormContext<Types["Trip"]["Model"]>();
  const experienceType = watch(`stops.${index}.experience.type`);
  return (
    <form
      className="page-colors page-padding mx-4 flex flex-col gap-2 rounded-3xl sm:mx-auto sm:max-w-[450px]"
      onSubmit={async (e) => {
        if (!(await trigger(`stops.${index}`))) {
          console.error(errors);
          return;
        }
        onConfirm();
      }}
    >
      <h3 className="">Select Experience</h3>
      <Dropdown list={Object.values(ExperienceType)}>
        <DropdownTriggerElement<ExperienceType>
          type="button"
          elemTextContent={(item) => item?.toString() || "Select Experience"}
        />
        <DropdownMenu<ExperienceType>
          setSelected={(item) => {
            setValue(`stops.${index}.experience.type`, item);
            resetField(`stops.${index}.experience.score`);
            resetField(`stops.${index}.experience.data`);
          }}
          renderItem={({ item }) => <div>{item}</div>}
        />
      </Dropdown>

      {experienceType === ExperienceType.TRIVIA && <TriviaForm index={index} />}

      <InputWLabel
        type="number"
        placeholder="Enter score"
        title="Add Score"
        {...register(`stops.${index}.experience.score`)}
      />
      <div className="flex gap-2">
        <Button
          type="reset"
          className="w-full bg-red-500"
          onClick={() => {
            setValue(`stops.${index}.experience`, undefined);
            onCencel();
          }}
        >
          Cencel
        </Button>
        <Button className="w-full" type="submit" primary>
          Confirm
        </Button>
      </div>
    </form>
  );
};

export default ExperienceForm;
