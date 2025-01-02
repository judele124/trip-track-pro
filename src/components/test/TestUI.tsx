import { useState } from "react";
import Dropdown from "./Dropdown";

const data = [
  {
    label: "Mercury",
    value: "mercury",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Mercury_in_color_-_Procesado.jpg/1200px-Mercury_in_color_-_Procesado.jpg",
  },
  {
    label: "Mars",
    value: "mars",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/1200px-OSIRIS_Mars_true_color.jpg",
  },
  {
    label: "Earth",
    value: "earth",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/1200px-The_Earth_seen_from_Apollo_17.jpg",
  },
  {
    label: "Neptune",
    value: "neptune",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Neptune_Full.jpg/1200px-Neptune_Full.jpg",
  },
  {
    label: "Saturn",
    value: "saturn",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Saturn%2C_Earth_and_Moon.jpg/1200px-Saturn%2C_Earth_and_Moon.jpg",
  },
  {
    label: "Uranus",
    value: "uranus",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Uranus2.jpg/1200px-Uranus2.jpg",
  },
  {
    label: "Venus",
    value: "venus",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Venus-real_color.jpg/1200px-Venus-real_color.jpg",
  },
];

export default function TestUI() {
  const [selectedValue, setSelectedValue] = useState(data[0]);

  return (
    <div className="mx-auto max-w-[400px]">
      <Dropdown
        list={data}
        triggerType="button"
        displayKey="label"
        selected={selectedValue}
        setSelected={(item) => {
          setSelectedValue(item);
        }}
      />
    </div>
  );
}
// interface IDropdownProps<T> {
//   open: boolean;
//   data: T[];
//   renderItem: (item: T, index: number) => JSX.Element;
//   backgroundColor?: "primary" | "secondary" | "dark" | "light";
//   borderColor?: "primary" | "secondary" | "dark" | "light";
// }

// const backgroundClassnameMap = {
//   primary: "bg-primary dark:bg-secondary",
//   secondary: "bg-secondary dark:bg-primary",
//   dark: "bg-dark dark:bg-light",
//   light: "bg-light dark:bg-dark",
// };

// function Dropdown<T>({
//   data,
//   renderItem,
//   open,
//   backgroundColor = "light",
//   borderColor = "dark",
// }: IDropdownProps<T>) {
//   if (!open) return null;

//   const backgroundClassname = backgroundClassnameMap[backgroundColor];

//   return (
//     <ul
//       className={`flex flex-col rounded-2xl border-2 ${backgroundClassname} border-${borderColor} dark:border-light`}
//     >
//       {data.map((item, i) => {
//         return (
//           <li
//             className={`px-5 py-3 ${i !== data.length - 1 && "border-b-2 border-primary dark:border-light"}`}
//           >
//             {renderItem(item, i)}
//           </li>
//         );
//       })}
//     </ul>
//   );
// }
