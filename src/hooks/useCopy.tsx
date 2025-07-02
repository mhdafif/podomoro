import { useState } from "react";
// import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

// import { toast } from "./use-toast";

const useCopy = () => {
  /*======================== Props ======================== */

  // const { t } = useTranslation();
  const location = useLocation(); // To get the current path
  const navigate = useNavigate(); // To navigate to the updated URL

  /*======================== UseState ======================== */

  const [isCopied, setIsCopied] = useState(false);

  /*======================== Handler ======================== */

  const copyToClipboard = async (text: any) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    textArea.remove();
    if (!isCopied) {
      setIsCopied(true);
      const searchParams = new URLSearchParams(location.search); // Get existing query params
      searchParams.set("copy", text); // Add or update the 'copy' parameter

      navigate(`${location.pathname}?${searchParams.toString()}`); // Navigate to the updated URL

      // toast({
      //   description: t("copy-success"),
      //   toastType: "success",
      // });
      setTimeout(() => {
        setIsCopied(false);
      }, 700);
    }
  };

  /*======================== Return ======================== */

  return { copyToClipboard, isCopied };
};

export default useCopy;
