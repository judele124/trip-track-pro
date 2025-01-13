import { useFieldArray, useFormContext } from "react-hook-form";
import InputWLabel from "../ui/InputWLabel";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import TriviaOption from "./TriviaOption";

const MIN_OPTIONS = 1;
const MAX_OPTIONS = 4;

const TriviaForm = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [amountOptions, setAmountOptions] = useState<number>(1);
  const [amountError, setAmountError] = useState<boolean>(false);
  const { register, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "triviaOptions",
    keyName: "id",
  });

  const handleAddOption = () => {
    setAmountError(false);

    if (isValidOptionsAmount(amountOptions + 1)) {
      setAmountOptions((prev) => prev + 1);
    } else {
      setAmountError(true);
    }
  };

  const handleDeleteOption = (index: number) => {
    setAmountError(false);

    if (isValidOptionsAmount(amountOptions - 1)) {
      remove(index);
      setAmountOptions((prev) => prev - 1);
    } else {
      setAmountError(true);
    }
  };

  useEffect(() => {
    // difference between the selected number of options to the current number of options
    const difference = amountOptions - fields.length;
    if (difference > 0) {
      append(Array.from({ length: difference }, () => ({ value: "" })));
    } else if (difference < 0) {
      for (let i = 0; i < Math.abs(difference); i++) {
        remove(fields.length - 1);
      }
    }
  }, [amountOptions]);

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
              if (isValidOptionsAmount(value)) {
                setAmountOptions(value);
                setAmountError(false);
              } else {
                setAmountError(true);
              }
            }}
            value={amountOptions}
            min={MIN_OPTIONS}
            max={MAX_OPTIONS}
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
            fields={fields}
            amountError={amountError}
            register={register}
            handleDeleteOption={handleDeleteOption}
            handleAddOption={handleAddOption}
          />
        }
      />
    </>
  );
};

export default TriviaForm;

const isValidOptionsAmount = (amount: number) =>
  amount >= MIN_OPTIONS && amount <= MAX_OPTIONS;
