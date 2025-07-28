import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

import useNavbar from "./useNavbar";

const MobileNavbar = () => {
  /*======================== Props ======================== */

  const { menus } = useNavbar();
  const { pathname } = useLocation();

  /*======================== Return ======================== */

  return (
    // <nav className="bg-gradient-navbar fixed bottom-0 left-1/2 z-50 w-full max-w-md -translate-x-1/2 transform border-t-4 border-white/10">
    <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-md -translate-x-1/2 transform border-t-4 border-[#323B4F]/10 bg-[#28303F]">
      <div className="relative grid grid-cols-4 gap-3">
        {menus.map((menu, index) => (
          <Link
            key={index}
            to={menu.to}
            className={cn(
              "relative flex flex-col items-center py-1.5 text-sm transition-all duration-300 ease-out",
              pathname === menu.to
                ? "shadow-pushed bg-[#323B4F]"
                : "bg-[#28303F]"
            )}
          >
            <div
              className={cn(
                "rounded-10 flex h-10 w-10 items-center justify-center transition-all duration-300 ease-out",
                pathname === menu.to
                  ? "text-blue-tertiary scale-90"
                  : "text-white/60"
              )}
            >
              {menu.icon}
            </div>
          </Link>
        ))}
      </div>
      {/* <div className="relative grid grid-cols-4">
        {menus.map((menu, index) => (
          <Link
            key={index}
            to={menu.to}
            className={cn(
              "rounded-10 relative flex flex-col items-center text-sm transition-all duration-300 ease-in",
              pathname === menu.to ? "text-white" : "text-white/60"
            )}
          >
            <div
              className={cn(
                "rounded-10 flex h-10 w-10 items-center justify-center transition-all duration-300 ease-out",
                pathname === menu.to
                  ? "bg-gradient-primary origin-top -translate-y-5 scale-130"
                  : ""
              )}
            >
              {menu.icon}
            </div>
            <span
              className={cn(
                "rounded-5 px-4 py-1 transition-all duration-200 ease-in-out",
                pathname === menu.to
                  ? "bg-gradient-to-r from-[#3CA4EB] to-[#4286EE] bg-clip-text text-transparent"
                  : ""
              )}
            >
              {menu.name}
            </span>
          </Link>
        ))}
      </div> */}
    </nav>
  );
};

export default MobileNavbar;
