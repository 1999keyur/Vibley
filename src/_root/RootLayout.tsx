import Bottombar from "@/components/ui/shared/Bottombar";
import Leftbar from "@/components/ui/shared/Leftbar";
import Topbar from "@/components/ui/shared/Topbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="w-full md:flex">
      <Topbar />
      <Leftbar />
      <section className="flex flex-1 h-full">
        <Outlet />
      </section>
      <Bottombar />
    </div>
  );
};

export default RootLayout;
