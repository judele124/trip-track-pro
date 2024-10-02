import Logo from "../../components/Logo/Logo.tsx";
import FirstEntryContent from "./components/firstEntryContent/FirstEntryContent.tsx";

const FirstEntryView = () => {
  return (
    <div className="page-colors page-y-padding size-full overflow-hidden">
      <div className="page-x-padding mx-auto w-fit self-center">
        <h3 className="text-xl font-bold">Welcome to</h3>
        <Logo />
      </div>
      <FirstEntryContent />
    </div>
  );
};

export default FirstEntryView;
