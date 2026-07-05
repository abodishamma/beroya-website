import logo from "../assets/beroya-logo-2026-transparent.png";
import { useLanguage } from "../hooks/useLanguage";

export default function Brand({ className = "", priority = false }) {
  const { content } = useLanguage();

  return (
    <a
      className={`brand-lockup ${className}`}
      href="#/"
      aria-label={content.accessibility.brandBackToTop}
    >
      <img
        src={logo}
        alt={content.accessibility.brandLogo}
        width="534"
        height="178"
        fetchPriority={priority ? "high" : "auto"}
      />
    </a>
  );
}
