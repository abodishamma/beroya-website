import logo from "../assets/beroya-logo-2026.png";

export default function Brand({ className = "", priority = false }) {
  return (
    <a
      className={`brand-lockup ${className}`}
      href="#top"
      aria-label="BEROYA Auto Parts — back to top"
    >
      <img
        src={logo}
        alt="BEROYA Auto Parts"
        width="853"
        height="665"
        fetchPriority={priority ? "high" : "auto"}
      />
    </a>
  );
}
