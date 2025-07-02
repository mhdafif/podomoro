import { queryLoadDummy } from "@/queries/dummy/dummyQueries";
import { useTranslation } from "react-i18next";

const useHome = () => {
  /*======================== Props ======================== */

  const { i18n } = useTranslation();

  /*======================== Queries ======================== */

  const { data, isLoading } = queryLoadDummy();

  /*======================== Handler ======================== */

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  /*======================== Return ======================== */

  return {
    data,
    isLoading,
    handleChangeLanguage,
  };
};

export default useHome;
