import { useCountUp } from "../hooks/useCountUp";

export default function Counter({ value, suffix, label }) {
  const { ref, value: current } = useCountUp(value);

  return (
    <article className="metric" ref={ref}>
      <div className="metric__value">
        <span>{current}</span>
        <sup>{suffix}</sup>
      </div>
      <p>{label}</p>
    </article>
  );
}
