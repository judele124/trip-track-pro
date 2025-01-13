import { useFormContext } from "react-hook-form";
import InputWLabel from "../ui/InputWLabel";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { useState } from "react";
import Modal from "../ui/Modal";
import TriviaOption from "./TriviaOption";

const TriviaForm = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [amountOptions, setAmountOptions] = useState<number>(1);
  const [amountError, setAmountError] = useState<boolean>(false);
  const { register, control } = useFormContext();

  return (
    <>
      <InputWLabel
        type="text"
        title="Question"
        placeholder="Enter a question"
        {...register("triviaQuestion")}
      />
      <InputWLabel
        type="text"
        title="Answer"
        placeholder="Enter an answer"
        {...register("triviaAnswer")}
      />
      <div>
        <label className="pl-5 text-start font-semibold">Options</label>
        <div className="flex gap-2">
          <Input
            type="number"
            title="Number of options"
            placeholder="Enter the number of options"
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value >= 1 && value <= 4) {
                setAmountOptions(value);
                setAmountError(true);
              }else{
                setAmountError(false)
              }
            }}
            value={amountOptions}
            min={1}
            max={4}
          />
          <Button
            className="w-full"
            primary
            type="button"
            onClick={() => setIsModalOpen((prev) => !prev)}
          >
            Manage Options
          </Button>
        </div>
      </div>
      <Modal
        center
        open={isModalOpen}
        onBackdropClick={() => setIsModalOpen(false)}
        containerClassName="w-full sm:max-w-[400px]"
        children={
            <TriviaOption 
              register={register} 
              control={control} 
              amountOptions={amountOptions} 
              setAmountOptions={setAmountOptions} 
              amountError={amountError} 
              setAmountError={setAmountError}
              />
        }
      />
    </>
  );
};

export default TriviaForm;