import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// import useUserStore from "@/store/user/userStore";

const useLayout = () => {
  /*======================== Props ======================== */

  const { pathname } = useLocation();
  // const navigate = useNavigate();

  /*======================== Store ======================== */

  // const { isAuthenticated } = useUserStore();

  /*======================== UseState ======================== */

  const [isVisibleScrollToTop, setIsVisibleScrollToTop] = useState(false);

  /*======================== Handler ======================== */

  // Function to detect scroll position
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisibleScrollToTop(true);
    } else {
      setIsVisibleScrollToTop(false);
    }
  };

  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleMenuTitle = () => {
    switch (pathname) {
      case "/":
        return "Home";
      case "/tes":
        return "Report";
      case "/tes2":
        return "Profile";
      default:
        return "";
    }
  };

  /*======================== UseEffect ======================== */

  // Adding event listener for scroll
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  // Check authentication and redirect to signin if not authenticated
  // useEffect(() => {
  //   // Skip authentication check for public routes
  //   const publicRoutes = ["/signin", "/signup"];
  //   const isPublicRoute = publicRoutes.includes(pathname);

  //   if (!isPublicRoute && !isAuthenticated()) {
  //     navigate("/signin", { replace: true });
  //   }
  // }, [pathname, isAuthenticated, navigate]);

  /*======================== Return ======================== */

  return {
    isVisibleScrollToTop,
    scrollToTop,
    handleMenuTitle,
  };
};

export default useLayout;
