import { useFormContext } from "react-hook-form";
import InputWLabel from "../../../../../components/ui/InputWLabel";
import Button from "../../../../../components/ui/Button";
import Input from "../../../../../components/ui/Input";
import { ChangeEvent, useEffect, useState } from "react";
import Modal from "../../../../../components/ui/Modal";
import TriviaOption from "./TriviaOption";
import InputFeildError from "@/components/ui/InputFeildError";
import { Types } from "trip-track-package";

const MIN_OPTIONS = 1;
const MAX_OPTIONS = 4;

const TriviaForm = ({ index: stopIndex }: { index: number }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [amountOptions, setAmountOptions] = useState<number>(1);
  const [amountError, setAmountError] = useState<boolean>(false);
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<Types["Trip"]["Model"]>();

  const handleInputAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (isValidOptionsAmount(value)) {
      setAmountOptions(value);
      setAmountError(false);
    } else {
      setAmountError(true);
    }
  };

  const handleAddOption = () => {
    setAmountError(false);

    if (isValidOptionsAmount(amountOptions + 1)) {
      setAmountOptions((prev) => prev + 1);
    } else {
      setAmountError(true);
    }
  };

  const handleDeleteOption = (optionIndex: number) => {
    setAmountError(false);

    if (!isValidOptionsAmount(amountOptions - 1)) {
      setAmountError(true);
      return;
    }

    const options = watch(`stops.${stopIndex}.experience.data.options`);

    options.splice(optionIndex, 1);

    setValue(`stops.${stopIndex}.experience.data.options`, options);

    setAmountOptions((prev) => prev - 1);
  };

  useEffect(() => {
    const options = watch(`stops.${stopIndex}.experience.data.options`);
    if (!options) {
      setValue(`stops.${stopIndex}.experience.data.options`, [""]);
      return;
    }

    if (options.length < amountOptions) {
      setValue(`stops.${stopIndex}.experience.data.options`, [...options, ""]);
    } else {
      setValue(
        `stops.${stopIndex}.experience.data.options`,
        options.filter((_, i) => i < amountOptions),
      );
    }
  }, [amountOptions]);

  const experienceDataErrors = errors.stops?.[stopIndex]?.experience
    ?.data as Types["Trip"]["Stop"]["Experience"]["Details"]["Trivia"]["Model"]["data"];

  return (
    <>
      {experienceDataErrors?.question && (
        <InputFeildError
          message={"Trivia question must be at least 2 characters long"}
        />
      )}
      <InputWLabel
        type="text"
        title="Question"
        placeholder="Enter a question"
        {...register(`stops.${stopIndex}.experience.data.question`)}
      />
      {experienceDataErrors?.answer && (
        <InputFeildError
          message={"Answer must be at least 2 characters long"}
        />
      )}
      <InputWLabel
        type="text"
        title="Answer"
        placeholder="Enter an answer"
        {...register(`stops.${stopIndex}.experience.data.answer`)}
      />
      {experienceDataErrors?.options && (
        <InputFeildError
          message={
            "Trivia question must have at least 2 options. and options must be at least 2 char long."
          }
        />
      )}
      <div>
        <label className="pl-5 text-start font-semibold">Trivia Options</label>
        <div className="flex gap-2">
          <Input
            containerClassName="w-full"
            type="number"
            title="Number of options"
            placeholder="Enter the number of options"
            onChange={
              handleInputAmountChange as (
                e:
                  | ChangeEvent<HTMLInputElement>
                  | ChangeEvent<HTMLTextAreaElement>,
              ) => void
            }
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
            set options
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
            stopIndex={stopIndex}
            fieldsCount={amountOptions}
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
