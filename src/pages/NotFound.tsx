import { useTranslation } from "react-i18next";

import notFoundImg from "@/assets/img/404.svg";

const NotFound = () => {
  /*======================== Props ======================== */

  const { t } = useTranslation();

  /*======================== Return ======================== */

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <img src={notFoundImg} alt="not-found" className="w-[400px]" />
      <p className="mt-8 mb-2 text-lg font-bold">{t("page-not-found")}</p>
    </div>
  );
};

export default NotFound;
