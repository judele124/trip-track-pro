import StopLocationInput from "./StopLocationInput";
import ExperienceForm from "./ExperienceForm";
import Modal from "@/components/ui/Modal";
import useToggle from "@/hooks/useToggle";
import Button from "@/components/ui/Button";
import { UseFormSetValue } from "react-hook-form";
import { IFormData } from "../CreateTripForm";
import { IconName } from "@/components/icons/Icon";

interface IStopInputProps {
    name: string;
    setValue: UseFormSetValue<IFormData>;
    icon?: IconName;
    middleStop?: boolean;
    onRemove?: () => void;
}

export default function StopInput({ 
    name,
    setValue,
    middleStop = false,
    icon = "map",
    onRemove = () => {}
}: IStopInputProps) {
  const {
    isOpen: isModalOpan,
    setIsOpen: setIsModalOpen,
    toggle: toggleModal,
  } = useToggle();
  const { isOpen: showBtn, setIsOpen: setShowBtn } = useToggle();

 

  return (
    <div className="relative">
       <StopLocationInput
          onValueChange={() => setShowBtn(false)}
          icon={"start"}
          title={"First Stop"}
        />
        {middleStop && (
          <Button
            className="rounded-xl bg-red-500 px-2 py-0"
            onClick={onRemove}
          >
            🗑️
          </Button>
        )}
      <div className="absolute bottom-0 right-0 top-0 flex gap-2 py-2 pr-2">
        {showBtn && (
          <Button
            className="rounded-xl px-2 py-0 text-sm font-normal"
            type="button"
            onClick={() => {
              toggleModal();
            }}
            primary
          >
            Add Experience
          </Button>
        )}
      </div>
      <Modal
        center
        open={isModalOpan}
        onBackdropClick={() => setIsModalOpen(false)}
        containerClassName="w-full"
      >
        {/* mission components */}
        <ExperienceForm />
      </Modal>
    </div>
  );
}
