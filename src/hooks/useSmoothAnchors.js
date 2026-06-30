import { useEffect } from "react";
import { getHashTarget, smoothScrollToHash } from "../utils/smoothScroll";

export function useSmoothAnchors() {
  useEffect(() => {
    const handleAnchorClick = (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const anchor = event.target.closest?.('a[href^="#"]');
      if (!anchor || anchor.target || anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#" || !getHashTarget(href)) return;

      event.preventDefault();
      smoothScrollToHash(href);
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);
}
