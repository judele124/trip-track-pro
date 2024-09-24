import map from "./assets/s1-map.svg";
import phone from "./assets/s2-phone.svg";
import trophy from "./assets/s3-trophy.svg";
import Logo from "../../components/Logo/Logo.tsx";
import Button from "../../components/ui/Button.tsx";
import FirstEntryContent from "./components/firstEntryContent/FirstEntryContent.tsx";
import useFirstEntry from "./hooks/useFirstEntry.tsx";

const firstEntryContentData = [
  {
    img: map,
    alt: "map img",
    text: "Managing group trips can be a hassle keep everyone *together and *engaged",
  },
  {
    img: phone,
    alt: "phone img",
    text: "Stay organized on your trips with *live *tracking and trip planning",
  },
  {
    img: trophy,
    alt: "trophy img",
    text: "Make your own *adventure Complete challenges, collect points,and compete for *rewards.",
  },
];

const FirstEntryView = () => {
  const { index, handleNext, endFirstEntry } = useFirstEntry(
    firstEntryContentData.length,
  );

  return (
    <div className="page-colors page-y-padding flex h-full flex-col justify-between">
      <div className="page-x-padding self-center">
        <h3 className="text-xl font-bold">Welcome to</h3>
        <Logo />
      </div>
      <FirstEntryContent
        text={firstEntryContentData[index].text}
        imgSrc={firstEntryContentData[index].img}
        imgAlt={firstEntryContentData[index].alt}
      />
      <div className="page-x-padding">
        <Button onClick={handleNext} primary className="w-full">
          Next
        </Button>
        <Button
          onClick={endFirstEntry}
          primary
          className="w-full bg-transparent text-dark underline dark:text-light"
        >
          skip
        </Button>
      </div>
    </div>
  );
};

export default FirstEntryView;
