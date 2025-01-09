import Dropdown from "../../../components/test/Dropdown/Dropdown";
import DropdownMenu from "../../../components/test/Dropdown/DropdownMenu";
import DropdownTriggerElement from "../../../components/test/Dropdown/DropdownTriggerElement";
import end from "../assets/end-stop-icon.svg";
import start from "../assets/start-stop-icon.svg";
import middle from "../assets/middle-stop-icon.svg";
import { UseFormRegister } from "react-hook-form";
import { IFormData } from "./CreateTripForm";
import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import useToggle from "../../../hooks/useToggle";
import ExperienceFrom from "../../../components/ExperienceFrom";
import { useRef } from "react";

const iconSrc = {
  start,
  end,
  middle,
};

interface IStopLocationInputProps {
  onValueChange: (value: string) => void;
  title?: string;
  icon?: "start" | "end" | "middle";
  registerKey: string & keyof IFormData;
  register: UseFormRegister<IFormData>;
}

const data = [
  { name: "aaa" },
  { name: "bbb" },
  { name: "ccc" },
  { name: "aaa" },
  { name: "bbb" },
  { name: "ccc" },
  { name: "aaa" },
  { name: "bbb" },
  { name: "ccc" },
];

export default function StopLocationInput({
  onValueChange,
  title,
  icon = "start",
}: IStopLocationInputProps) {
  const { isOpen: isModalOpan, setIsOpen: setIsModalOpen, toggle: toggleModal } = useToggle();
  const { isOpen: showBtn,setIsOpen: setShowBtn} = useToggle();

  const reef = useRef<HTMLDivElement>(null);


  return (
    <>
      <label className={`flex w-full flex-col gap-1`}>
        {title && (
          <span className={`pl-5 text-start font-semibold`}>{title}</span>
        )}
      </label>
      <div ref={reef} className="relative">
        <Dropdown list={data}>
          <DropdownTriggerElement<{ name: string }>
            icon={<img src={iconSrc[icon]} alt="" />}
            type="input"
            elemTextContent={(item) => item?.name || "default"}
            onChange={() => {
              setShowBtn(false);
            }}
          />
          <DropdownMenu<{ name: string }>
            setSelected={(item) => {
              if (!item || !item.name) return;
                onValueChange(item.name);
                setShowBtn(true);
            }}
            renderItem={({ item }) => <div>{item.name}</div>}
          />
        </Dropdown>
        {showBtn && (
          <Button
            type="button"
            onClick={() => {
              toggleModal()
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 scale-90 rounded-xl px-4 py-2"
            primary
          >
            Add Experience
          </Button>
        )}
      </div>

      <Modal center open={isModalOpan} onBackdropClick={() => setIsModalOpen(false)}>
        {/* mission components */}
        <ExperienceFrom />
      </Modal>
    </>
  );
}
