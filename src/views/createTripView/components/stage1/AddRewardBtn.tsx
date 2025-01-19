import { useEffect, useState } from "react";
import Button from "../../../../components/ui/Button";
import InputWLabel from "../../../../components/ui/InputWLabel";
import { useFormContext } from "react-hook-form";
import InputFeildError from "@/components/ui/InputFeildError";
import Modal from "@/components/ui/Modal";
import { Types } from "trip-track-package";
export default function AddRewardBtn() {
  const [open, setOpen] = useState(false);
  const {
    watch,
    setValue,
    register,
    resetField,
    unregister,
    formState: { errors },
    trigger,
  } = useFormContext<Types["Trip"]>();

  const clearReward = () => {
    setOpen(false);
    resetField("reward");
    unregister("reward.image");
    unregister("reward.title");
  };

  const confirmReward = async () => {
    const res = await trigger("reward");
    if (res) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      setValue("reward.image", undefined);
    }
  }, [open]);

  return (
    <>
      <div className={`relative rounded-2xl bg-primary`}>
        <Button
          type="button"
          className={`relative z-10 flex w-full flex-col items-center gap-4 bg-primary shadow-md transition-all duration-75`}
          onClick={() => setOpen(true)}
        >
          {watch("reward.title") ? `🏆 ${watch("reward.title")}` : "Add reward"}
        </Button>
        {open && (
          <Modal
            containerClassName="w-full page-x-padding"
            open={open}
            onBackdropClick={() => setOpen(false)}
            center
          >
            <div
              className={`page-colors relative flex w-full flex-col gap-2 rounded-2xl p-4 transition-all delay-150 duration-200 ease-in-out`}
              onClick={(e) => e.stopPropagation()}
            >
              {errors.reward?.title?.message && (
                <InputFeildError message={errors.reward?.title.message} />
              )}
              <InputWLabel
                className="border-dark dark:border-light"
                {...register("reward.title")}
              />
              {errors.reward?.image?.message && (
                <InputFeildError message={errors.reward?.image?.message} />
              )}
              <InputWLabel
                multiple={false}
                labelTextCenter
                labelClassName="rounded-2xl border py-3 border-dark text-light dark:border-light dark:bg-light bg-dark"
                type="file"
                className="hidden"
                title={`${watch("reward.image")?.name || "Add image +"}`}
                {...register("reward.image", {
                  onChange: (e) =>
                    setValue("reward.image", e.target.files[0] || undefined),
                })}
              />
              <Button type="button" primary onClick={confirmReward}>
                Confirm Reward
              </Button>
              <Button
                type="button"
                className="bg-transparent px-0 py-0 text-dark underline underline-offset-1 dark:text-light"
                onClick={clearReward}
              >
                Delete Reward
              </Button>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
}
