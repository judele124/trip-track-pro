import Logo from "../../components/Logo.tsx";
import FirstEntryContent from "./components/firstEntryContent/FirstEntryContent.tsx";

const FirstEntryView = () => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-xl font-bold">Welcome to</h3>
          <Logo />
        </div>
        <FirstEntryContent />
      </div>
    </>
  );
};

export default FirstEntryView;
