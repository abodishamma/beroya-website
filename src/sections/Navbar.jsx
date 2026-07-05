import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion as Motion, useReducedMotion } from "framer-motion";
import { Menu, ShoppingCart, UserCircle, X } from "lucide-react";
import Brand from "../components/Brand";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { useCart } from "../hooks/useCart";
import { useLanguage } from "../hooks/useLanguage";
import { navigation } from "../data/siteData";
import { useScrolled } from "../hooks/useScrolled";
import { getRouteHref } from "../utils/routes";

export default function Navbar({ currentPage = "home" }) {
  const { content } = useLanguage();
  const { lastAddedItem, totalQuantity } = useCart();
  const scrolled = useScrolled(18);
  const reduceMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartPulse, setCartPulse] = useState(false);
  const progressRef = useRef(null);
  const activePage = currentPage === "product" ? "shop" : currentPage;

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
    let frame = 0;

    const updateProgress = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    const scheduleProgress = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", scheduleProgress, { passive: true });
    window.addEventListener("resize", scheduleProgress);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleProgress);
      window.removeEventListener("resize", scheduleProgress);
    };
  }, []);

  useEffect(() => {
    if (!lastAddedItem) return undefined;

    setCartPulse(false);
    const frame = window.requestAnimationFrame(() => setCartPulse(true));
    const timer = window.setTimeout(() => setCartPulse(false), 780);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [lastAddedItem]);

  const handleRouteClick = (event) => {
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    setMenuOpen(false);
  };

  return (
    <header
      className={[
        "site-header",
        scrolled ? "site-header--scrolled" : "",
        menuOpen ? "site-header--menu-open" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="container nav">
        <Brand className="nav__brand" priority />

        <nav className="nav__links" aria-label={content.nav.primaryNavigation}>
          {navigation.map((item) => {
            const active = activePage === item.page;
            return (
              <a
                className={active ? "is-active" : ""}
                href={item.href}
                key={item.key}
                aria-current={active ? "page" : undefined}
                onClick={handleRouteClick}
              >
                {content.nav[item.key]}
              </a>
            );
          })}
        </nav>

        <div className="nav__actions">
          <LanguageSwitcher />

          <a
            className={[
              "nav__account",
              activePage === "account" ? "is-active" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            href={getRouteHref("account")}
            onClick={handleRouteClick}
          >
            <UserCircle aria-hidden="true" size={15} />
            <span>{content.nav.account}</span>
          </a>

          <a
            className={[
              "nav__cart",
              activePage === "cart" ? "is-active" : "",
              cartPulse ? "is-bumping" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            href={getRouteHref("cart")}
            onClick={handleRouteClick}
          >
            <ShoppingCart aria-hidden="true" size={15} />
            <span>{content.nav.cart}</span>
            <b>{totalQuantity}</b>
          </a>

          <a className="nav__cta" href={getRouteHref("checkout")} onClick={handleRouteClick}>
            <span>{content.nav.checkout}</span>
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
        <span ref={progressRef} />
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
                  onClick={handleRouteClick}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {content.nav[item.key]}
                </a>
              ))}
            </nav>
            <LanguageSwitcher className="mobile-nav__language" />
            <a className="mobile-nav__cta" href={getRouteHref("checkout")} onClick={handleRouteClick}>
              {content.nav.checkout}
            </a>
          </Motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
