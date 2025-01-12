import { useFormContext } from "react-hook-form";
import InputWLabel from "../ui/InputWLabel";
import Button from "../ui/Button";

const TreasureFindForm = () => {
  const { register } = useFormContext();

  return (
    <>
      <InputWLabel
        type="text"
        textarea
        title="Treasure Description"
        placeholder="Enter treasure description"
        {...register("treasureDescription")}
      />
      <Button primary className="w-full" about="add a photo">
        Add a Photo
      </Button>
    </>
  );
};

export default TreasureFindForm;