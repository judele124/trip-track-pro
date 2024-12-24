import { useEffect, useState } from "react";
import Button from "../../../components/ui/Button";
import InputWLabel from "../../../components/ui/InputWLabel";
import { UseFormRegisterReturn } from "react-hook-form";
import Input from "../../../components/ui/Input";

interface IAddRewardBtnProps {
  rewardTitleRegister: UseFormRegisterReturn;
  rewardImageRegister: UseFormRegisterReturn;
  fileName?: string | undefined;
  onCencel?: () => void;
}

export default function AddRewardBtn({
  onCencel,
  rewardTitleRegister,
  rewardImageRegister,
  fileName,
}: IAddRewardBtnProps) {
  const [open, setOpen] = useState(true);

  return (
    <Button
      type="button"
      primary
      className="flex flex-col items-center gap-4"
      onClick={() => {
        if (open) {
          onCencel?.();
        }
        setOpen((prev) => !prev);
      }}
    >
      {open ? "+ Add reward" : "- Cancel"}
      {!open && (
        <div
          className="flex w-full flex-col gap-4"
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
    </Button>
  );
}
