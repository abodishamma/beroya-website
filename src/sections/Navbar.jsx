import { useEffect, useState } from "react";
import { AnimatePresence, motion as Motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Brand from "../components/Brand";
import { useLanguage } from "../hooks/useLanguage";
import { navigation } from "../data/siteData";
import { useScrolled } from "../hooks/useScrolled";

export default function Navbar() {
  const { content, language, toggleLanguage } = useLanguage();
  const scrolled = useScrolled(18);
  const reduceMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  useEffect(() => {
    const sectionIds = navigation.map((item) => item.href.slice(1));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-28% 0px -58% 0px", threshold: [0.05, 0.2, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
      <div className="container nav">
        <Brand className="nav__brand" priority />

        <nav className="nav__links" aria-label={content.nav.primaryNavigation}>
          {navigation.map((item) => {
            const id = item.href.slice(1);
            const active = activeSection === id;
            return (
              <a
                className={active ? "is-active" : ""}
                href={item.href}
                key={item.key}
                aria-current={active ? "page" : undefined}
              >
                {content.nav[item.key]}
              </a>
            );
          })}
        </nav>

        <div className="nav__actions">
          <button
            className="language-toggle"
            type="button"
            aria-label={content.nav.aria}
            onClick={toggleLanguage}
          >
            <span className={language === "en" ? "is-active" : ""}>{content.nav.englishLabel}</span>
            <i aria-hidden="true" />
            <span className={language === "ar" ? "is-active" : ""}>{content.nav.arabicLabel}</span>
          </button>

          <a className="nav__cta" href="#contact">
            <span>{content.nav.cta}</span>
            <i aria-hidden="true" />
          </a>
        </div>

        <button
          className="nav__menu"
          type="button"
          aria-label={menuOpen ? content.nav.menuClose : content.nav.menuOpen}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <div className="site-header__progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${scrollProgress})` }} />
      </div>

      <AnimatePresence>
        {menuOpen && (
          <Motion.div
            className="mobile-nav"
            id="mobile-navigation"
            initial={reduceMotion ? false : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav aria-label={content.nav.mobileNavigation}>
              {navigation.map((item, index) => (
                <a
                  href={item.href}
                  key={item.key}
                  onClick={() => setMenuOpen(false)}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {content.nav[item.key]}
                </a>
              ))}
            </nav>
            <button className="mobile-nav__language" type="button" onClick={toggleLanguage}>
              {content.nav.englishLabel}
              <i aria-hidden="true" />
              {content.nav.arabicLabel}
            </button>
            <a className="mobile-nav__cta" href="#contact" onClick={() => setMenuOpen(false)}>
              {content.nav.mobileCta}
            </a>
          </Motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
