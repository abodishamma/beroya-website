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
        width="534"
        height="178"
        fetchPriority={priority ? "high" : "auto"}
      />
    </a>
  );
}
