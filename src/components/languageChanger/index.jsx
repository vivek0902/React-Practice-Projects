import { Trans, useTranslation } from "react-i18next";
import "./i18n";
import LanguageSelector from "./components/LanguageSelector";
const LanguageChanger = () => {
  const { t } = useTranslation();
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <LanguageSelector />
      <h2>{t("greeting")}</h2>
      <p>{t("description").line1}</p>
      <p>{t("description").line2}</p>

      <p>
        {t("greetingName", {
          name: t("name"), // can call anyother i18n keys value also // also can pass simple string
        })}
      </p>
      <Trans
        i18nKey={t("greetingNameForBold")}
        values={{ name: t("name") }}
        components={{ 1: <b></b> }}
      ></Trans>
    </div>
  );
};

export default LanguageChanger;
