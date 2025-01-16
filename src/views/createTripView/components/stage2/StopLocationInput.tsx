import Dropdown from "@/components/ui/Dropdown/Dropdown";
import DropdownMenu from "@/components/ui/Dropdown/DropdownMenu";
import DropdownTriggerElement from "@/components/ui/Dropdown/DropdownTriggerElement";
import end from "../../assets/end-stop-icon.svg";
import start from "../../assets/start-stop-icon.svg";
import middle from "../../assets/middle-stop-icon.svg";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import useToggle from "@/hooks/useToggle";
import {
  PlacePrediction,
  useAddressSugestions,
} from "@/hooks/useAddressSuggestions";
import { useState } from "react";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import axios from "axios";
import { API_BASE_URL } from "@/env.config";
import ExperienceForm from "./ExperienceForm";
import { Experience } from "@/zodSchemas/trip.schema";
import { IStopLocation } from "../CreateTripForm";
const iconSrc = {
  start,
  end,
  middle,
};

interface GoogleGeocodeResults {
  geometry: { location: { lat: number; lng: number } };
}
type StopData =
  | { address: string; location: { lat: number; lng: number } }
  | IStopLocation;

interface IStopLocationInputProps {
  onRemove?: () => void;
  middleStop?: boolean;
  onValueChange: (data: IStopLocation) => void;
  title?: string;
  icon?: "start" | "end" | "middle";
}

export default function StopLocationInput({
  onRemove,
  middleStop = false,
  onValueChange,
  title,
  icon = "start",
}: IStopLocationInputProps) {
  const [inputValue, setInputValue] = useState("");
  const debouncedInputValue = useDebouncedValue(inputValue, 1000);

  const { suggestions } = useAddressSugestions({
    query: debouncedInputValue,
  });

  const getGeoLocationFromAddress = async (
    address: string,
  ): Promise<GoogleGeocodeResults["geometry"]["location"]> => {
    const { data } = await axios(
      `${API_BASE_URL}/google/geocode?address=${address}`,
    );

    return (data.results as GoogleGeocodeResults[])[0].geometry.location;
  };

  const handleAddressSelection = async (item: PlacePrediction) => {
    try {
      const { lat, lng } = await getGeoLocationFromAddress(item.description);
      onValueChange({ address: item.description, location: { lat, lng } });
      // setShowBtn(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <label className={`flex w-full flex-col gap-1`}>
        {title && (
          <span className={`pl-5 text-start font-semibold`}>{title}</span>
        )}
      </label>
      <div className="relative">
        <Dropdown list={suggestions?.predictions}>
          <DropdownTriggerElement<PlacePrediction>
            icon={<img src={iconSrc[icon]} alt="" />}
            type="input"
            elemTextContent={(item) => item?.description || "default"}
            onChange={(e) => {
              setInputValue(e.target.value);
              // setShowBtn(false);
            }}
          />
          <DropdownMenu<PlacePrediction>
            setSelected={handleAddressSelection}
            renderItem={({ item }) => <div>{item.description}</div>}
          />
        </Dropdown>
        {middleStop && (
          <Button
            className="rounded-xl bg-red-500 px-2 py-0"
            onClick={onRemove}
          >
            🗑️
          </Button>
        )}
      </div>
    </>
  );
}
