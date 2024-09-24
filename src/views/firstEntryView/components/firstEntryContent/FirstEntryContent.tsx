interface IFirstEntryContentProps {
  text: string;
  imgSrc: string;
  imgAlt: string;
}

const renderText = (text: string) => {
  return text.split(" ").map((word, i) =>
    word[0] === "*" ? (
      <span key={word + i} className="text-2xl font-bold text-orange">
        {word.slice(1) + " "}
      </span>
    ) : (
      word + " "
    )
  );
};

const FirstEntryContent = ({
  text,
  imgSrc,
  imgAlt,
}: IFirstEntryContentProps) => {
  return (
    <div className="flex flex-col flex-grow justify-around">
      <p className="page-x-padding  text-center text-xl">{renderText(text)}</p>
      <img width={"100%"} height={"100%"} src={imgSrc} alt={imgAlt} />
    </div>
  );
};

export default FirstEntryContent;
