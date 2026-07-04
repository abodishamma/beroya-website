import { useLanguage } from "../hooks/useLanguage";

export default function LanguageSwitcher({ className = "language-toggle" }) {
  const { content, language, toggleLanguage } = useLanguage();

  return (
    <button
      className={className}
      type="button"
      aria-label={content.nav.aria}
      onClick={toggleLanguage}
    >
      <span className={language === "en" ? "is-active" : ""}>{content.nav.englishLabel}</span>
      <i aria-hidden="true" />
      <span className={language === "ar" ? "is-active" : ""}>{content.nav.arabicLabel}</span>
    </button>
  );
}
