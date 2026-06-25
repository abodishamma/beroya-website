import logo from "../assets/beroya-logo.jpg";

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
        width="1063"
        height="591"
        fetchPriority={priority ? "high" : "auto"}
      />
    </a>
  );
}
