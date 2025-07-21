// import { setViewportHeight } from "@/utils/setViewportHeight";
import { QueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useUserStore from "@/store/user/userStore";

// import useDummyStore from "@/store/dummy/dummyStore";

const useApp = () => {
  /*======================== Props ======================== */

  const { pathname } = useLocation();
  const navigate = useNavigate();

  /*======================== UseState ======================== */

  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          // stale time as default is 30 minutes
          staleTime: 1000 * 60 * 30,
          // retry: 1,
        },
      },
    })
  );

  /*======================== Store ======================== */

  // const loadTesApi = useDummyStore((state) => state.loadData);
  const { isAuthenticated } = useUserStore();

  /*======================== UseEffect ======================== */

  // uncomment below for setViewportHeight on mobile devices, because old devices doesn't support some modern approach / css properties such as svh,dvh,etc...
  // useEffect(() => {
  //   setViewportHeight();
  // }, []);

  // useEffect(() => {
  //   loadTesApi();
  // }, []);

  // Check authentication and redirect to signin if not authenticated
  useEffect(() => {
    // Skip authentication check for public routes
    const publicRoutes = ["/signin", "/signup"];
    const isPublicRoute = publicRoutes.includes(pathname);

    if (!isPublicRoute && !isAuthenticated()) {
      navigate("/signin", { replace: true });
    }
  }, [pathname, isAuthenticated, navigate]);

  /*======================== Return ======================== */
  return {
    queryClient,
  };
};

export default useApp;
