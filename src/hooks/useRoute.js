import { useEffect, useState } from "react";
import { parseRouteHash } from "../utils/routes";

export function useRoute() {
  const [route, setRoute] = useState(() => parseRouteHash(window.location.hash));

  useEffect(() => {
    const updateRoute = () => {
      setRoute(parseRouteHash(window.location.hash));
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
      });
    };

    window.addEventListener("hashchange", updateRoute);
    return () => window.removeEventListener("hashchange", updateRoute);
  }, []);

  return route;
}
