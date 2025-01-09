import Dropdown from "./Dropdown/Dropdown";
import DropdownMenu from "./Dropdown/DropdownMenu";
import DropdownTriggerElement from "./Dropdown/DropdownTriggerElement";
import { useMapboxAutocomplete } from "../../hooks/useMapBoxApi";
import { useEffect, useState } from "react";

const data = [
  {
    label: "aaaaaaaaaaa",
    value: "aaaaaaaaaaaaa",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Mercury_in_color_-_Procesado.jpg/1200px-Mercury_in_color_-_Procesado.jpg",
  },
  {
    label: "bbbbbbbbbbbb",
    value: "marasdaxczxcs",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/1200px-OSIRIS_Mars_true_color.jpg",
  },
  {
    label: "Earth",
    value: "easdasxcarth",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/1200px-The_Earth_seen_from_Apollo_17.jpg",
  },
];

type IItem = (typeof data)[0];

export default function TestUI() {

  const [placeName, setPlaceName] = useState<string>("Paris");
  const apiKey = "pk.eyJ1IjoianVkZWxlIiwiYSI6ImNtM3ZndjQ0MzByb3QycXIwczd6c3l4MnUifQ.aWTDBy7JZWGbopN3xfikNg";
  const suggestions = useMapboxAutocomplete({ query: placeName, apiKey ,limit: 50});

  useEffect(() => {
    console.log("Suggestions:", suggestions);
  }, [suggestions]);


  return (
    <div className="mx-auto h-full max-w-[400px]">
       <div>
      <input
      className="text-black"
        type="text"
        value={placeName}
        onChange={(e) => setPlaceName(e.target.value)}
        placeholder="Enter a place"
      />
      <ul className="mt-2">
        {suggestions.map((s, index) => (
          <li className="border border-sky-400 m-2" key={index}>{s.place_name}</li>
        ))}
      </ul>
    </div>
      {/* <Dropdown list={data}>
        <DropdownTriggerElement<IItem>
          type="input"
          elemTextContent={(data) => data?.label || "default"}
        />
        <DropdownMenu<IItem>
          setSelected={(item) => {
            console.log(item);
          }}
          renderItem={({ item, isSelected }) => (
            <>
              <svg
                width="10"
                height="14"
                viewBox="0 0 10 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 5.04202C10 9.45378 6.66667 11.9792 5 13.4375C3.54167 12.0833 0 9.32773 0 5.04202C0 2.25739 2.23858 0 5 0C7.76142 0 10 2.25739 10 5.04202Z"
                  fill="#CE5737"
                />
                <circle cx="5" cy="5.20833" r="2.70833" fill="white" />
              </svg>
              {item.label}
              {isSelected && <span>✅</span>}
            </>
          )}
        />
      </Dropdown> */}
    </div>
  );
}
