import Icon from "../icons/Icon";

export default function TestUI() {
  return (
    <div className="mx-auto h-full max-w-[400px]">
      <div className="flex flex-wrap gap-5">
        <Icon name={"alert"} />
        <Icon name={"participants"} />
        <Icon name={"chat"} />
      </div>
    </div>
  );
}
