import { Outlet } from "react-router-dom";

const PageLayout = () => {
  return (
    <div className="page-colors page-padding relative h-dvh overflow-hidden">
      <div className="mx-auto h-full sm:max-w-[450px]">
        <Outlet />
      </div>
    </div>
  );
};

export default PageLayout;
