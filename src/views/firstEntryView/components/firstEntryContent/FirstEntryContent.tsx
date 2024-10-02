import { useDarkMode } from "../../../../contexts/DarkModeContext";
import s1ImgSrcLight from "../../assets/s1-map-light.svg";
import s2ImgSrcLight from "../../assets/s2-phone-light.svg";
import s3ImgSrcLight from "../../assets/s3-trophy-light.svg";
import s1ImgSrcDark from "../../assets/s1-map-dark.svg";
import s2ImgSrcDark from "../../assets/s2-phone-dark.svg";
import s3ImgSrcDark from "../../assets/s3-trophy-dark.svg";

import Button from "../../../../components/ui/Button";
import useFirstEntry from "../../hooks/useFirstEntry";

interface FirstEntryContent {
  imgSrc: { dark: string; light: string };
  imgAlt: string;
  text: string;
}

const firstEntryContentData: FirstEntryContent[] = [
  {
    imgSrc: { dark: s1ImgSrcDark, light: s1ImgSrcLight },
    imgAlt: "map img",
    text: "Managing group trips can be a hassle keep everyone *together and *engaged",
  },
  {
    imgSrc: { dark: s2ImgSrcDark, light: s2ImgSrcLight },
    imgAlt: "phone img",
    text: "Stay organized on your trips with *live *tracking and trip planning",
  },
  {
    imgSrc: { dark: s3ImgSrcDark, light: s3ImgSrcLight },
    imgAlt: "trophy img",
    text: "Make your own *adventure Complete challenges, collect points,and compete for *rewards.",
  },
];

const FirstEntryContent = () => {
  const { isDarkMode } = useDarkMode();

  const { index, handleNext, endFirstEntry } = useFirstEntry(
    firstEntryContentData.length,
  );

  return (
    <div className="mx-auto flex h-full max-w-[450px] flex-col">
      <div className="mx-auto flex h-[450px] flex-col justify-center gap-5 py-5">
        <p className="page-x-padding text-md text-center">
          {renderText(firstEntryContentData[index].text)}
        </p>
        <img
          className="max-w-[450px] self-center"
          width={"100%"}
          height={"100%"}
          src={
            isDarkMode
              ? firstEntryContentData[index].imgSrc.dark
              : firstEntryContentData[index].imgSrc.light
          }
          alt={firstEntryContentData[index].imgAlt}
        />
      </div>
      <div className="page-x-padding mx-auto w-full max-w-[600px]">
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

export default FirstEntryContent;

const renderText = (text: string) => {
  return text.split(" ").map((word, i) =>
    word[0] === "*" ? (
      <span
        key={word + i}
        className="text-2xl font-bold leading-3 text-primary"
      >
        {word.slice(1) + " "}
      </span>
    ) : (
      `${word} `
    ),
  );
};
