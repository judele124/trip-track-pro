import { Outlet } from "react-router-dom";

const PageLayout = () => {
  return (
    <div className="page-colors page-padding relative h-dvh overflow-hidden">
      <div className="relative mx-auto size-full sm:max-w-[400px]">
        <Outlet />
      </div>
    </div>
  );
};

export default PageLayout;
