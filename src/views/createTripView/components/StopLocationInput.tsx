import Dropdown from "@/components/ui/Dropdown/Dropdown";
import DropdownMenu from "@/components/ui/Dropdown/DropdownMenu";
import DropdownTriggerElement from "@/components/ui/Dropdown/DropdownTriggerElement";
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
import { IconName } from "@/components/icons/Icon";
import InputFeildError from "@/components/ui/InputFeildError";
import ExperienceForm from "@/components/ExperienceForm";

interface GoogleGeocodeResults {
  geometry: { location: { lat: number; lng: number } };
}

interface IStopLocationInputProps {
  onRemove?: () => void;
  middleStop?: boolean;
  onValueChange: (
    address: string,
    location: { lat: number; lng: number },
  ) => void;
  title?: string;
  icon?: IconName;
  iconFill?: string;
}

export default function StopLocationInput({
  onRemove,
  middleStop = false,
  onValueChange,
  title,
  icon,
  iconFill = "#5e6166",
}: IStopLocationInputProps) {
  const [isAddressGeoLocationError, setIsAddressGeoLocationError] =
    useState(false);
  const [inputValue, setInputValue] = useState("");
  const debouncedInputValue = useDebouncedValue(inputValue, 800);

  const {
    isOpen: isModalOpan,
    setIsOpen: setIsModalOpen,
    toggle: toggleModal,
  } = useToggle();
  const { isOpen: showBtn, setIsOpen: setShowBtn } = useToggle();

  const { suggestions, error, loading } = useAddressSugestions({
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
      onValueChange(item.description, { lat, lng });
      setShowBtn(true);
      setIsAddressGeoLocationError(false);
    } catch (error) {
      setIsAddressGeoLocationError(true);
      console.error(error);
    }
  };
  console.log(loading);

  return (
    <>
      {(error || isAddressGeoLocationError) && (
        <InputFeildError message="Something went wrong please try again later" />
      )}
      <label className={`flex w-full flex-col gap-1`}>
        {title && (
          <span className={`pl-5 text-start font-semibold`}>{title}</span>
        )}
      </label>
      <div className="relative">
        <Dropdown list={suggestions?.predictions}>
          <DropdownTriggerElement<PlacePrediction>
            icon={loading ? "spinner" : icon}
            type="input"
            iconFill={iconFill}
            elemTextContent={(item) => item?.description || "default"}
            onChange={(e) => {
              setInputValue(e.target.value);
              setShowBtn(false);
            }}
          />
          <DropdownMenu<PlacePrediction>
            setSelected={handleAddressSelection}
            renderItem={({ item }) => <div>{item.description}</div>}
          />
        </Dropdown>
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
          {middleStop && (
            <Button
              className="rounded-xl bg-red-500 px-2 py-0"
              onClick={onRemove}
            >
              🗑️
            </Button>
          )}
        </div>
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
    </>
  );
}
