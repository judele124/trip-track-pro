import { FormEvent, HTMLAttributes, ReactNode, useRef, useState } from "react";

interface IFormMultipleStagesProps extends HTMLAttributes<HTMLFormElement> {
  renderStages: ((index: number) => ReactNode)[];
  onMultipleStageSubmit: (
    e: FormEvent<HTMLFormElement>,
  ) => Promise<void> | void;
  onLastStageSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export default function FormMultipleStages({
  renderStages,
  onMultipleStageSubmit,
  onLastStageSubmit,
  ...prev
}: IFormMultipleStagesProps) {
  const [stage, setStage] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const stagesCount = renderStages.length;

  const incrementStage = () => {
    if (stage >= stagesCount - 1) {
      throw new Error("can't increment stage because it's the last stage");
    }
    formRef.current?.reset();
    setStage((prev) => prev + 1);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isLastStage = stage >= stagesCount - 1;
    if (isLastStage) {
      onLastStageSubmit(e);
    } else {
      onMultipleStageSubmit(e);
      incrementStage();
    }
  };

  return (
    <form ref={formRef} {...prev} onSubmit={handleSubmit}>
      {renderStages[stage](stage)}
    </form>
  );
}
