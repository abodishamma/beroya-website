import { useEffect, useMemo, useState } from "react";
import { dictionary } from "../data/i18n";
import { LanguageContext } from "./languageContext";

const storageKey = "beroya-language";

function getInitialLanguage() {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(storageKey);
  return stored === "ar" ? "ar" : "en";
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage);
  const isArabic = language === "ar";

  useEffect(() => {
    const dir = isArabic ? "rtl" : "ltr";
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
    document.body.dataset.lang = language;
    window.localStorage.setItem(storageKey, language);
  }, [isArabic, language]);

  const value = useMemo(
    () => ({
      language,
      isArabic,
      dir: isArabic ? "rtl" : "ltr",
      content: dictionary[language],
      setLanguage,
      toggleLanguage: () => setLanguage((current) => (current === "en" ? "ar" : "en")),
    }),
    [isArabic, language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
