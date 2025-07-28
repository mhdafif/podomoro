import { ChartNoAxesColumn, PersonStanding, Timer } from "lucide-react";
import React from "react";

interface IMenus {
  name: string;
  icon: React.ReactNode;
  to: string;
}
const useNavbar = () => {
  /*======================== Props ======================== */

  /*======================== Queries ======================== */

  /*======================== Store ======================== */

  /*======================== Form ======================== */

  /*======================== UseState ======================== */

  /*======================== Handler ======================== */

  /*======================== UseEffect ======================== */

  /*======================== Others ======================== */

  const menus: IMenus[] = [
    {
      name: "Report",
      icon: <ChartNoAxesColumn />,
      to: "/tes",
    },
    {
      name: "Home",
      icon: <Timer />,
      to: "/",
    },
    {
      name: "Profile",
      icon: <PersonStanding />,
      to: "/tes2",
    },
    {
      name: "Profile",
      icon: <PersonStanding />,
      to: "/tes2",
    },
  ];

  /*======================== Return ======================== */

  return {
    menus,
  };
};

export default useNavbar;
