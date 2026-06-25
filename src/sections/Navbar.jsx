import { useEffect, useState } from "react";
import { AnimatePresence, motion as Motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Brand from "../components/Brand";
import ArrowLink from "../components/ArrowLink";
import { navigation } from "../data/siteData";
import { useScrolled } from "../hooks/useScrolled";

export default function Navbar() {
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className={`site-nav ${scrolled ? "site-nav--scrolled" : ""}`}>
      <div className="nav-shell">
        <Brand priority />

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <ArrowLink href="#contact" variant="outline" className="nav-contact">
          Start a conversation
        </ArrowLink>

        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <Motion.div
            className="mobile-menu"
            initial={reduceMotion ? false : { opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
          >
            <nav aria-label="Mobile navigation">
              {navigation.map((item, index) => (
                <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>
                  <span>0{index + 1}</span>
                  {item.label}
                </a>
              ))}
              <a href="#contact" onClick={() => setMenuOpen(false)}>
                <span>{String(navigation.length + 1).padStart(2, "0")}</span>
                Contact
              </a>
            </nav>
            <p>Precision in every component. Performance in every journey.</p>
          </Motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
