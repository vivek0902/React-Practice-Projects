import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", lang: "English" },
  { code: "fr", lang: "French" },
  { code: "hi", lang: "Hindi" },
  { code: "ar", lang: "Aribic" },
  { code: "ur", lang: "urdu" },
];
const LanguageSelector = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.body.dir = i18n.dir();
  }, [i18n, i18n.language]);
  return (
    <div>
      {languages.map((lng) => {
        return (
          <button
            style={
              lng.code === i18n.language
                ? { backgroundColor: "blue" }
                : { backgroundColor: "" }
            }
            key={lng.code}
            onClick={() => i18n.changeLanguage(lng.code)}
          >
            {lng.lang}
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSelector;
