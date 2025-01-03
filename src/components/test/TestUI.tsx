import { useEffect, useState } from "react";
import Dropdown from "./Dropdown/Dropdown";

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
  {
    label: "Neptasdaghxzxcune",
    value: "neptasdagnhmsdxzcune",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Neptune_Full.jpg/1200px-Neptune_Full.jpg",
  },
  {
    label: "Saturn",
    value: "asdghnmasdxz",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Saturn%2C_Earth_and_Moon.jpg/1200px-Saturn%2C_Earth_and_Moon.jpg",
  },
  {
    label: "asdaxczUranus",
    value: "asdauyijhsdxza",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Uranus2.jpg/1200px-Uranus2.jpg",
  },
  {
    label: "Vezxczxcasdnus",
    value: "veartnbmkjluiol,ilhaasnus",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Venus-real_color.jpg/1200px-Venus-real_color.jpg",
  },
  {
    label: "aaaaaaaaaaa",
    value: "aacarthgjkjm,.i;haasdaaaaaa",
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
    value: "eassddasxcarth",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/1200px-The_Earth_seen_from_Apollo_17.jpg",
  },
  {
    label: "Neptasdaxzxcune",
    value: "neptasdasdxzcune",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Neptune_Full.jpg/1200px-Neptune_Full.jpg",
  },
  {
    label: "Saturn",
    value: "satasdvcvfasdurn",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Saturn%2C_Earth_and_Moon.jpg/1200px-Saturn%2C_Earth_and_Moon.jpg",
  },
  {
    label: "asdaxdsvctrsczUranus",
    value: "uransxcdfhrftghus",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Uranus2.jpg/1200px-Uranus2.jpg",
  },
  {
    label: "Vezxagfxcgfhczxcasdnus",
    value: "vengfxus",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Venus-real_color.jpg/1200px-Venus-real_color.jpg",
  },
];

export default function TestUI() {
  const [selectedValue, setSelectedValue] = useState<(typeof data)[0] | null>(
    null,
  );

  return (
    <div className="mx-auto max-w-[400px]">
      <Dropdown
        list={data}
        type="button"
        setSelected={(item) => {
          setSelectedValue(item);
        }}
        displayKey="value"
      />
    </div>
  );
}
