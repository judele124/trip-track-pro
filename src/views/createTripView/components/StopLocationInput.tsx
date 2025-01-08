import Dropdown from "../../../components/test/Dropdown/Dropdown";
import DropdownMenu from "../../../components/test/Dropdown/DropdownMenu";
import DropdownTriggerElement from "../../../components/test/Dropdown/DropdownTriggerElement";
import end from "../assets/end-stop-icon.svg";
import start from "../assets/start-stop-icon.svg";
import middle from "../assets/middle-stop-icon.svg";
import { UseFormRegister } from "react-hook-form";
import { IFormData } from "./CreateTripForm";

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
  return (
    <label className={`flex w-full flex-col gap-1`}>
      {title && (
        <span className={`pl-5 text-start font-semibold`}>{title}</span>
      )}
      <Dropdown list={data}>
        <DropdownTriggerElement<{ name: string }>
          icon={<img src={iconSrc[icon]} alt="" />}
          type="input"
          elemTextContent={(item) => item?.name || "default"}
        />
        <DropdownMenu<{ name: string }>
          setSelected={(item) => {
            onValueChange(item.name);
          }}
          renderItem={({ item }) => <div>{item.name}</div>}
        />
      </Dropdown>
    </label>
  );
}
