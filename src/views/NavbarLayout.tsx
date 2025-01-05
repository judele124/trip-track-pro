import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProgressLine from "../components/ui/ProgressLine";

export default function NavbarLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <div className="absolute right-0 left-0 bottom-0 flex justify-center">
        <ProgressLine className="w-[40%]" lineColor="secondary" fillColor="primary" length={3} index={1} />
      </div>
    </>
  );
}