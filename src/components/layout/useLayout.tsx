import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useLayout = () => {
  /*======================== Props ======================== */

  const { pathname } = useLocation();

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

  /*======================== Return ======================== */

  return {
    isVisibleScrollToTop,
    scrollToTop,
    handleMenuTitle,
  };
};

export default useLayout;
