import { LogOut, User } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";

import MobileNavbar from "../Navbar/MobileNavbar";
import { Toaster } from "../ui/sonner";

import { Button } from "@/components/ui/button";

import useUserStore from "@/store/user/userStore";

const Layout = () => {
  /*======================== Props ======================== */
  const navigate = useNavigate();
  /*======================== Store ======================== */

  const { user, logout } = useUserStore();

  /*======================== Handlers ======================== */

  const handleLogout = () => {
    logout();
    navigate("/signin", { replace: true });
  };

  /*======================== Return ======================== */

  return (
    <div>
      <div className="relative container mx-auto h-full w-full pb-12">
        {/* Header with user info and logout */}
        {user && (
          <div className="flex items-center justify-between border-b border-gray-700 p-5">
            <div className="flex items-center gap-2 text-white">
              <User className="h-5 w-5" />
              <span className="text-sm">
                Welcome, {user.firstName} {user.lastName}
              </span>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="border-none bg-black text-white"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        )}

        <div className="space-y-4 p-5">
          {/* <div
            className={cn(
              "flex items-center justify-center gap-2.5 rounded-[10px] bg-[#323B4F] px-5 py-2.5 transition-all duration-300",
              isTrue
                ? "shadow-pushed bg-[#323B4F]"
                : "shadow-popped bg-[#28303F]"
            )}
          >
            <span
              className={`font-poppins bg-gradient-to-r from-[#3CA4EB] to-[#4286EE] bg-clip-text text-center text-[15px] leading-normal font-bold tracking-[0.35px] text-transparent`}
            >
              {handleMenuTitle()}
            </span>
          </div> */}
          <Outlet />
        </div>
      </div>

      <Toaster />

      <MobileNavbar />

      {/* <div className="bg-gradient-bg fixed top-[0%] left-[43%] h-[150vh] w-[120vh] rotate-[30deg]"></div> */}
    </div>
  );
};

export default Layout;
