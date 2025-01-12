import { useFormContext, useFieldArray } from "react-hook-form";
import InputWLabel from "../ui/InputWLabel";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import InputFeildError from "../ui/InputFeildError";

const TriviaForm = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [amountOptions, setAmountOptions] = useState<number>(1);
  const [amountError, setAmountError] = useState<boolean>(false);
  const { register, control } = useFormContext();
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "triviaOptions",
    keyName: "id",
  });

  useEffect(() => {
    if (fields.length !== amountOptions) {
      const newFields = Array.from({ length: amountOptions }, () => ({ value: "" }));
      replace(newFields);
    }
  }, [amountOptions]);
 
  
  const validateAmountOptions = (amount: number)=>{
    if(amount < 1 || amount > 4){
      setAmountError(true);
    }
    else{
      setAmountError(false);
    }
  }

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
              validateAmountOptions(value);
              if (value >= 1 && value <= 4) {
                setAmountOptions(value);
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
          <div className="flex flex-col gap-3 page-colors m-4 sm:max-w-[450px] sm:m-auto overflow-auto rounded-3xl p-4">
            {fields.map((field, index) => (
              <div className="flex flex-col" key={field.id}>
                <p className="pl-5">{`Option ${index + 1}`}</p>
                <div className="relative">
                  <Input
                    type="text"
                    title={`Option ${index + 1}`}
                    placeholder={`Enter option ${index + 1}`}
                    {...register(`triviaOptions.${index}.value`)}
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-primary"
                      onClick={() => {
                        remove(index)
                        validateAmountOptions(fields.length - 1);
                      }}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
            { amountError && <InputFeildError message="Options amount shuold be between 1-4" />}
            <Button
              primary
              className="mt-2 w-full"
              type="button"
              onClick={() => {
                validateAmountOptions(fields.length + 1);
                if(fields.length < 4){
                  append({ value: ""});
                }
                }}
            >
              Add Another Option
            </Button>
          </div>
        }
      />
    </>
  );
};

export default TriviaForm;