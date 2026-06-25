import Reveal from "./Reveal";

export default function SectionHeading({
  index,
  eyebrow,
  title,
  accent,
  description,
  align = "left",
}) {
  return (
    <div className={`section-heading ${align === "center" ? "section-heading--center" : ""}`}>
      <Reveal>
        <span className="eyebrow">
          <b>{index}</b>
          {eyebrow}
        </span>
        <h2>
          {title}
          {accent && <em>{accent}</em>}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p>{description}</p>
        </Reveal>
      )}
    </div>
  );
}
