import { motion as Motion, useReducedMotion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";
import { regions } from "../data/siteData";

export default function GlobalPresence() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section global" id="global">
      <div className="container">
        <SectionHeading
          index="05"
          eyebrow="Global perspective"
          title="Engineered locally."
          accent="Ready for the world."
          description="BEROYA is being built for international partnerships, diverse vehicle platforms and the supply expectations of modern automotive markets."
        />

        <div className="global-map">
          <div className="global-map__meta">
            <span>Global capability network</span>
            <strong>06</strong>
            <small>Strategic market regions</small>
          </div>

          <svg
            viewBox="0 0 1000 470"
            role="img"
            aria-label="Stylized map showing BEROYA's global market regions"
          >
            <g className="map-grid" aria-hidden="true">
              {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((x) => (
                <line key={`x-${x}`} x1={x} x2={x} y1="0" y2="470" />
              ))}
              {[94, 188, 282, 376].map((y) => (
                <line key={`y-${y}`} x1="0" x2="1000" y1={y} y2={y} />
              ))}
            </g>
            <g className="map-land" aria-hidden="true">
              <path d="M72 111 125 73l83 8 48 35 38 4 34 47-22 42-55 7-25 42-42-8-25-51-58-16-29-72Z" />
              <path d="m243 257 43 23 32 68-4 72-31 39-22-50-17-57-26-42 25-53Z" />
              <path d="m433 92 68-29 65 16 25 34 62-8 39 35-18 31-58 4-23 26-63-11-32-32-47-14-18-52Z" />
              <path d="m483 208 68-4 51 39-10 67-40 85-42-12-20-65-35-46 28-64Z" />
              <path d="m618 171 77-25 87 14 61 38 66 12 36 44-39 28-55-6-46 28-57-19-35-43-68 3-27-74Z" />
              <path d="m819 335 58-24 59 27-13 45-54 17-47-28-3-37Z" />
            </g>

            {regions.map((region, index) => (
              <Motion.g
                className="map-point"
                key={region.name}
                initial={reduceMotion ? false : { opacity: 0, scale: 0 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 + index * 0.09, duration: 0.5 }}
                style={{ transformOrigin: `${region.x}% ${region.y}%` }}
              >
                <circle cx={`${region.x}%`} cy={`${region.y}%`} r="16" />
                <circle cx={`${region.x}%`} cy={`${region.y}%`} r="4" />
              </Motion.g>
            ))}
          </svg>

          <div className="global-map__legend">
            {regions.map((region, index) => (
              <span key={region.name}>
                <b>{String(index + 1).padStart(2, "0")}</b>
                {region.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
