import { ReactNode, useState } from "react";

interface IFormMultipleStagesProps {
  renderStages: ((index: number) => ReactNode)[];

  onSubmit: ({
    stage,
    incrementStage,
  }: {
    stage: number;
    incrementStage: () => void;
  }) => void;
}
export default function FormMultipleStages({
  renderStages,
  onSubmit,
}: IFormMultipleStagesProps) {
  const [stage, setStage] = useState(0);

  const stagesCount = renderStages.length;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({
          stage,
          incrementStage: () => {
            if (stage >= stagesCount - 1) {
              throw new Error(
                "can't increment stage because it's the last stage",
              );
            }
            setStage((prev) => prev + 1);
          },
        });
      }}
    >
      {renderStages[stage](stage)}
    </form>
  );
}
