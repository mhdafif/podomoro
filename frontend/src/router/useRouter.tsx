import { type JSX, useEffect } from "react";

// import { useLocation } from "react-router-dom";

import Home from "@/pages/Home";
import HowToShadcn from "@/pages/HowToShadcn";
import PomodoroTaskManager from "@/pages/Tes";
import PomodoroTaskManager2 from "@/pages/Tes2";

import useGlobalStore from "@/store/global/globalStore";

export const EPath = {
  home: "/",
  useShadcn: "/shadcn",
  tes: "/tes",
  tes2: "/tes2",
  signin: "/signin",
  signup: "/signup",
};

interface IRoutes {
  index?: boolean;
  children?: IRoutes[];
  path: string;
  element: JSX.Element;
  title?: string;
}

const useRouter = () => {
  /*======================== Props ======================== */

  // const { pathname } = useLocation();
  // const navigate = useNavigate();
  const loading = useGlobalStore((state) => state.loading);
  const resetGlobalState = useGlobalStore((state) => state.resetState);

  /*======================== Handler ======================== */

  // const handlePageNeedToken = () => {
  //   if (!user?.token) {
  //     switch (true) {
  //       case pathname.startsWith(EPath.order):
  //       case pathname.startsWith(EPath.report):
  //       case pathname === EPath.historyTopUp:
  //       case pathname === EPath.notification:
  //       case pathname === EPath.cart:
  //         return true;
  //       default:
  //         return false;
  //     }
  //   } else {
  //     switch (true) {
  //       case pathname.startsWith(EPath.order):
  //         return user?.access_api !== "No";
  //       default:
  //         return false;
  //     }
  //   }
  // };

  /*======================== UseEffect ======================== */

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  //   // redirect to home
  //   // if (handlePageNeedToken()) {
  //   //   navigate("/");
  //   // }
  // }, [pathname]);

  useEffect(() => {
    // to reset loading if somehow when signin or something(api request) stuck the loading as true
    if (loading) {
      resetGlobalState("loading");
    }
  }, []);

  /*======================== Others ======================== */

  const routes: IRoutes[] = [
    {
      path: EPath.home,
      element: <Home />,
    },
    // {
    //   path: EPath.signin,
    //   element: <Signin />,
    // },
    // {
    //   path: EPath.signup,
    //   element: <Signup />,
    // },

    // OTHERS
    {
      path: EPath.useShadcn,
      element: <HowToShadcn />,
    },
    {
      path: EPath.tes,
      element: <PomodoroTaskManager />,
    },
    {
      path: EPath.tes2,
      element: <PomodoroTaskManager2 />,
    },
  ];

  /*======================== Return ======================== */

  return {
    routes,
  };
};

export default useRouter;
