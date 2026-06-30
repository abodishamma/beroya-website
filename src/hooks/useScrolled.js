import { useEffect, useState } from "react";

export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    let current = window.scrollY > threshold;

    const update = () => {
      frame = 0;
      const next = window.scrollY > threshold;

      if (next !== current) {
        current = next;
        setScrolled(next);
      }
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    setScrolled(current);
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [threshold]);

  return scrolled;
}
