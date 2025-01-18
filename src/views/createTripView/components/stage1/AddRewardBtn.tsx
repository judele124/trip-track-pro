import { useState } from "react";
import Button from "@/components/ui/Button";
import InputWLabel from "@/components/ui/InputWLabel";
import { UseFormRegisterReturn } from "react-hook-form";

interface IAddRewardBtnProps {
  rewardTitleRegister: () => UseFormRegisterReturn<"reward.title">;
  rewardImageRegister: () => UseFormRegisterReturn<"reward.image">;
  fileName?: string | undefined;
  onOpen?: () => void;
  onCancel?: () => void;
}

export default function AddRewardBtn({
  onOpen,
  onCancel,
  rewardTitleRegister,
  rewardImageRegister,
  fileName,
}: IAddRewardBtnProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-primary`}>
      <Button
        type="button"
        className={`relative z-10 flex w-full flex-col items-center gap-4 bg-primary shadow-md transition-all duration-75`}
        onClick={() => {
          if (open) {
            onCancel?.();
          } else {
            onOpen?.();
          }
          setOpen((prev) => !prev);
        }}
      >
        {!open ? "+ Add reward" : "- Cancel"}
      </Button>
      {open && (
        <div
          className={`flex w-full flex-col gap-4 p-4 transition-all delay-150 duration-200 ease-in-out`}
          onClick={(e) => e.stopPropagation()}
        >
          <InputWLabel
            className="border-dark dark:border-light"
            {...rewardTitleRegister()}
          />
          <InputWLabel
            multiple={false}
            labelTextCenter
            labelClassName="rounded-2xl border py-3 border-dark dark:border-light bg-light dark:bg-dark "
            type="file"
            className="hidden"
            title={fileName || "Add image"}
            {...rewardImageRegister()}
          />
        </div>
      )}
    </div>
  );
}
