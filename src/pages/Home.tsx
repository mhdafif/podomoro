import { Trans, useTranslation } from "react-i18next";

import useHome from "@/modules/home/useHome";

import useGlobalStore from "@/store/global/globalStore";

const Home = () => {
  /*======================== Props ======================== */

  const { t, i18n } = useTranslation();
  const { handleChangeLanguage } = useHome();

  /*======================== Store ======================== */

  const { loading } = useGlobalStore();

  /*======================== Return ======================== */

  return (
    <div>
      {loading && <div>{t("loading")}</div>}
      THIS IS{" "}
      <Trans
        i18nKey="home"
        components={{
          green: <span className="text-uvgreen" />,
        }}
      />
      <div className="">
        <div
          className={`w-52 cursor-pointer p-3 ${
            i18n.resolvedLanguage === "en" ? "bg-uvgreen !text-white" : ""
          }`}
          onClick={() => handleChangeLanguage("en")}
        >
          <div className="mr-1">English</div>
        </div>
        <div
          className={`w-52 cursor-pointer p-3 ${
            i18n.resolvedLanguage === "id" ? "bg-uvgreen !text-white" : ""
          }`}
          onClick={() => handleChangeLanguage("id")}
        >
          <div className="mr-1">Bahasa</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
