import React, { useEffect } from "react";
import { useFieldArray ,Control ,UseFormRegister } from "react-hook-form";
import Input from "../ui/Input";
import InputFeildError from "../ui/InputFeildError";
import Button from "../ui/Button";

interface ITriviaOption {
    control: Control;
    register: UseFormRegister<any>;
    amountOptions: number;
    setAmountOptions: React.Dispatch<React.SetStateAction<number>>;
    setAmountError: React.Dispatch<React.SetStateAction<boolean>>;
    amountError: boolean;    
}



const TriviaOption = ({control, register, amountOptions, setAmountOptions, amountError ,setAmountError}: ITriviaOption)=> {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "triviaOptions",
    keyName: "id",
  });

  useEffect(() => {
    if (fields.length > amountOptions) {
      const inputCountToRemove = fields.length - amountOptions;
      for (let i = 0; i < inputCountToRemove; i++) {
        remove(fields.length - 1);
      }
    } else if (fields.length < amountOptions) {
      const inputCountToAdd = amountOptions - fields.length;
      const newFields = Array.from({ length: inputCountToAdd }, () => ({
        value: "",
      }));
      append(newFields);
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
    <div className="page-colors m-4 flex flex-col gap-3 overflow-auto rounded-3xl p-4 sm:m-auto sm:max-w-[450px]">
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
                  remove(index);
                  validateAmountOptions(fields.length - 1);
                  setAmountOptions((prev) => prev - 1);
                }}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ))}
      {amountError && (
        <InputFeildError message="Options amount shuold be between 1-4" />
      )}
      <Button
        primary
        className="mt-2 w-full"
        type="button"
        onClick={() => {
          validateAmountOptions(fields.length + 1);
          if (fields.length < 4 && amountOptions < 4) {
            append({ value: "" });
            setAmountOptions((prev) => prev + 1);
          }
        }}
      >
        Add Another Option
      </Button>
    </div>
  );
};

export default TriviaOption;
