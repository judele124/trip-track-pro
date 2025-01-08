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
  title?: string;
  icon?: "start" | "end" | "middle";
  registerKey: string;
  register: UseFormRegister<IFormData>;
}

export default function StopLocationInput({
  title,
  icon = "start",
  registerKey,
  register,
}: IStopLocationInputProps) {
  return (
    <label className={`flex w-full flex-col gap-1`}>
      {title && (
        <span className={`pl-5 text-start font-semibold`}>{title}</span>
      )}
      <Dropdown
        list={[
          { name: "aaa" },
          { name: "bbb" },
          { name: "ccc" },
          { name: "aaa" },
          { name: "bbb" },
          { name: "ccc" },
          { name: "aaa" },
          { name: "bbb" },
          { name: "ccc" },
        ]}
      >
        <DropdownTriggerElement<{ name: string }>
          icon={<img src={iconSrc[icon]} alt="" />}
          register={register(registerKey)}
          type="input"
          elemTextContent={(item) => item?.name || "default"}
          onChange={(e) => console.log(e)}
        />
        <DropdownMenu<{ name: string }>
          setSelected={() => {}}
          renderItem={({ item }) => <div>{item.name}</div>}
        />
      </Dropdown>
    </label>
  );
}
