import { ArrowUpRight, Check } from "lucide-react";
import qualityImage from "../assets/quality-metrology.webp";
import Counter from "../components/Counter";
import Reveal from "../components/Reveal";
import { useLanguage } from "../hooks/useLanguage";
import { qualityMetrics } from "../data/siteData";

export default function Quality() {
  const { content } = useLanguage();

  return (
    <section className="section quality" id="quality">
      <div className="quality__visual">
        <img
          src={qualityImage}
          alt={content.accessibility.qualityImage}
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
            <b>{content.quality.index}</b>
            {content.quality.eyebrow}
          </span>
          <h2>
            {content.quality.title[0]}
            <em>{content.quality.title[1]}</em>
          </h2>
          <p className="quality__intro">{content.quality.text}</p>
        </Reveal>

        <Reveal className="quality__controls" delay={0.1}>
          {content.quality.controls.map((control) => (
            <span key={control}>
              <Check aria-hidden="true" size={16} />
              {control}
            </span>
          ))}
        </Reveal>

        <Reveal className="metrics" delay={0.18}>
          {qualityMetrics.map((metric, index) => (
            <Counter key={metric.value} {...metric} label={content.quality.metrics[index]} />
          ))}
        </Reveal>

        <Reveal className="quality__action" delay={0.24}>
          <a href={`mailto:info@beroyaauto.com?subject=${encodeURIComponent(content.mailSubjects.quality)}`}>
            {content.quality.cta}
            <ArrowUpRight aria-hidden="true" size={17} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
