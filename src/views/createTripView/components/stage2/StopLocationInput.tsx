import Dropdown from "@/components/ui/Dropdown/Dropdown";
import DropdownMenu from "@/components/ui/Dropdown/DropdownMenu";
import DropdownTriggerElement from "@/components/ui/Dropdown/DropdownTriggerElement";
import end from "../../assets/end-stop-icon.svg";
import start from "../../assets/start-stop-icon.svg";
import middle from "../../assets/middle-stop-icon.svg";
import {
  PlacePrediction,
  useAddressSugestions,
} from "@/hooks/useAddressSuggestions";
import { useEffect, useState } from "react";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import axios from "axios";
import { API_BASE_URL } from "@/env.config";
import { Stop } from "@/zodSchemas/tripSchema";
const iconSrc = {
  start,
  end,
  middle,
};

interface GoogleGeocodeResults {
  geometry: { location: { lat: number; lng: number } };
}

interface IStopLocationInputProps {
  onValueChange: (value: Stop | undefined) => void;
  title?: string;
  icon?: "start" | "end" | "middle";
}

export default function StopLocationInput({
  onValueChange,
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
      onValueChange({ location: { lat, lon: lng }, address: item.description });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (debouncedInputValue === "") {
      onValueChange(undefined);
    }
  }, [debouncedInputValue]);

  return (
    <>
      <div className="relative">
        <Dropdown list={suggestions?.predictions}>
          <DropdownTriggerElement<PlacePrediction>
            icon={<img src={iconSrc[icon]} alt="" />}
            type="input"
            elemTextContent={(item) => item?.description || "default"}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <DropdownMenu<PlacePrediction>
            setSelected={handleAddressSelection}
            renderItem={({ item }) => <div>{item.description}</div>}
          />
        </Dropdown>
      </div>
    </>
  );
}
