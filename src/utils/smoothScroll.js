const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function prefersReducedMotion() {
  return window.matchMedia?.(REDUCED_MOTION_QUERY).matches ?? false;
}

function safeDecodeHash(hash) {
  try {
    return decodeURIComponent(hash.slice(1));
  } catch {
    return hash.slice(1);
  }
}

export function getScrollOffset() {
  if (window.innerWidth >= 1101) return 18;

  const header = document.querySelector(".site-header .nav") ?? document.querySelector(".site-header");
  const headerBottom = header?.getBoundingClientRect?.().bottom ?? 88;

  return Math.max(76, Math.ceil(headerBottom + 16));
}

export function getHashTarget(hash) {
  if (!hash || hash === "#") return null;

  const id = safeDecodeHash(hash);
  if (id === "top") return document.getElementById("top") ?? document.body;

  return document.getElementById(id);
}

export function smoothScrollToHash(hash, { replace = false } = {}) {
  if (typeof window === "undefined" || typeof document === "undefined") return false;
  if (!hash?.startsWith("#")) return false;

  const cleanHash = hash.split("?")[0];
  const target = getHashTarget(cleanHash);
  if (!target) return false;

  const top =
    target === document.body
      ? 0
      : Math.max(0, target.getBoundingClientRect().top + window.scrollY - getScrollOffset());

  window.scrollTo({
    top,
    behavior: prefersReducedMotion() ? "auto" : "smooth",
  });

  if (window.location.hash !== cleanHash) {
    const method = replace ? "replaceState" : "pushState";
    window.history[method](null, "", cleanHash);
  }

  return true;
}
