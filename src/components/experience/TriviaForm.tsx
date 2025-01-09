import { useFormContext, useFieldArray } from "react-hook-form";
import InputWLabel from "../ui/InputWLabel";
import Button from "../ui/Button";
import Input from "../ui/Input";
import React, { useEffect } from "react";

const TriviaForm = () => {
  const { register, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "triviaOptions",
    keyName: "id",
  });

  useEffect(() => {
    if (fields.length === 0) {
        append({ value: "" });
      }
  }, [fields.length, append]);

  return (
    <div>
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
      <p className="text-xl font-bold m-1">Options</p>
      <div className="max-h-[200px] border-2 border-primary p-2 rounded-lg overflow-auto">
        {fields.map((field, index) => (
        <React.Fragment key={field.id}>
          <p className="pl-5">{`Option ${index + 1}`}</p>
          <div key={field.id} className="relative mt-2">
            <Input
              type="text"
              title={`Option ${index + 1}`}
              placeholder={`Enter option ${index + 1}`}
              {...register(`triviaOptions.${index}.value`)} 
            />
           {index > 0 && <button
              type="button"
              className="absolute top-1/2 -translate-y-1/2 right-0 text-red-500"
              onClick={() => remove(index)}
            >
              Delete
            </button>}
          </div>
          </React.Fragment>
        ))}
        <Button primary className="w-full mt-2" about="add" onClick={() => append({ value: "" })}>
          Add Option
        </Button>
      </div>
    </div>
  );
};

export default TriviaForm;
