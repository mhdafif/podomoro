import { Outlet } from "react-router-dom";

import { Toaster } from "../ui/sonner";
import useLayout from "./useLayout";

import arrowIcon from "@/assets/icon/arrow-white.svg";

const Layout = () => {
  /*======================== Props ======================== */

  const { isVisibleScrollToTop, scrollToTop } = useLayout();

  /*======================== Return ======================== */

  return (
    <div>
      <div className="relative h-full w-full">
        <div className="laptop:bg-whitef8 bg-white">
          <Outlet />
        </div>
      </div>

      <Toaster />

      {/* Scroll Top */}
      {isVisibleScrollToTop && (
        <div
          className="laptop:!hidden go-top bg-uvgreen rounded-5 fixed right-6 bottom-6 z-5 block cursor-pointer p-1"
          onClick={scrollToTop}
        >
          <img src={arrowIcon} className="w-6 rotate-180" />
        </div>
      )}
    </div>
  );
};

export default Layout;
