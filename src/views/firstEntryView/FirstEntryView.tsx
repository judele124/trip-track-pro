import Logo from "../../components/Logo/Logo.tsx";
import FirstEntryContent from "./components/firstEntryContent/FirstEntryContent.tsx";

const FirstEntryView = () => {
  return (
    <div className="page-colors h-dvh">
      <div className="mx-auto flex h-full max-h-screen flex-col gap-4 sm:max-w-[450px]">
        <div className="page-padding">
          <h3 className="text-xl font-bold">Welcome to</h3>
          <Logo />
        </div>
        <FirstEntryContent />
      </div>
    </div>
  );
};

export default FirstEntryView;
