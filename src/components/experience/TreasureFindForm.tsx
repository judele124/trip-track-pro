import { useFormContext } from "react-hook-form";
import InputWLabel from "../ui/InputWLabel";
import Button from "../ui/Button";

const TreasureFindForm = () => {
  const { register } = useFormContext();

  return (
    <div className="flex flex-col gap-2">
      <InputWLabel
        type="text"
        textarea
        title="Treasure Description"
        placeholder="Enter treasure description"
        {...register("treasureDescription")}
      />
      <Button primary className="w-full py-5" about="add a photo">
        Add a Photo
      </Button>
    </div>
  );
};

export default TreasureFindForm;