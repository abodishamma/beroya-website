import { Check } from "lucide-react";
import qualityImage from "../assets/quality-metrology.webp";
import Counter from "../components/Counter";
import Reveal from "../components/Reveal";
import { qualityMetrics } from "../data/siteData";

const controls = [
  "OEM-aligned development discipline",
  "Material and supplier verification",
  "Dimensional process capability",
  "Performance and durability validation",
  "Controlled production traceability",
];

export default function Quality() {
  return (
    <section className="section quality" id="quality">
      <div className="quality__visual">
        <img
          src={qualityImage}
          alt="Coordinate measurement of a precision automotive component"
          width="1536"
          height="1024"
          loading="lazy"
          decoding="async"
        />
        <div className="quality__overlay" />
      </div>

      <div className="container quality__content">
        <Reveal>
          <span className="eyebrow eyebrow--light">
            <b>04</b>
            Quality without compromise
          </span>
          <h2>
            Measured in microns.
            <em>Proven over miles.</em>
          </h2>
          <p className="quality__intro">
            Our quality mindset begins before the first component is made. Critical
            characteristics are defined in engineering, protected in manufacturing,
            and verified through rigorous testing.
          </p>
        </Reveal>

        <Reveal className="quality__controls" delay={0.1}>
          {controls.map((control) => (
            <span key={control}>
              <Check aria-hidden="true" size={16} />
              {control}
            </span>
          ))}
        </Reveal>

        <Reveal className="metrics" delay={0.18}>
          {qualityMetrics.map((metric) => (
            <Counter key={metric.label} {...metric} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
