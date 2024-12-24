import { useEffect, useRef, useState } from "react";
import Button from "../../../components/ui/Button";
import InputWLabel from "../../../components/ui/InputWLabel";
import { UseFormRegisterReturn } from "react-hook-form";
import Input from "../../../components/ui/Input";

interface IAddRewardBtnProps {
  rewardTitleRegister: UseFormRegisterReturn;
  rewardImageRegister: UseFormRegisterReturn;
  fileName?: string | undefined;
  onCancel?: () => void;
}

export default function AddRewardBtn({
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
            {...rewardTitleRegister}
          />
          <Button type="button" className="px-0 py-0">
            <label className="inline-block w-full rounded-2xl border border-dark bg-light px-5 py-2 text-center text-dark dark:border-light dark:bg-dark dark:text-light">
              {fileName || "+ Add image"}
              <Input className="hidden" {...rewardImageRegister} type="file" />
            </label>
          </Button>
        </div>
      )}
    </div>
  );
}
