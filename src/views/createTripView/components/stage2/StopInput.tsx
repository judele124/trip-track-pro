import StopLocationInput from "./StopLocationInput";
import ExperienceForm from "./ExperienceForm";
import Modal from "@/components/ui/Modal";
import useToggle from "@/hooks/useToggle";
import Button from "@/components/ui/Button";
import { useFormContext } from "react-hook-form";

interface IStopInputProps {
  isMiddleStop?: boolean;
  index: number;
  onRemove?: () => void;
}

export default function StopInput({
  index,
  onRemove,
  isMiddleStop,
}: IStopInputProps) {
  const { setValue } = useFormContext();
  const {
    isOpen: isModalOpan,
    setIsOpen: setIsModalOpen,
    toggle: toggleModal,
  } = useToggle();
  const { isOpen: showBtn, setIsOpen: setShowBtn } = useToggle();

  return (
    <div className="relative">
      <StopLocationInput
        onValueChange={({ address }) => {
          setShowBtn(true);
          setValue(`stops.${index}.address`, address);
        }}
        icon={"start"}
        title={"First Stop"}
      />

      <div className="absolute bottom-0 right-0 top-0 flex gap-2 py-2 pr-2">
        {showBtn && (
          <Button
            className="rounded-xl px-2 py-0 text-sm font-normal"
            type="button"
            onClick={() => toggleModal()}
            primary
          >
            Add Experience
          </Button>
        )}
        {isMiddleStop && (
          <Button
            className="rounded-xl bg-red-500 px-2 py-0"
            onClick={onRemove}
          >
            🗑️
          </Button>
        )}
      </div>
      <Modal
        center
        open={isModalOpan}
        onBackdropClick={() => setIsModalOpen(false)}
        containerClassName="w-full"
      >
        <ExperienceForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}
