import { ArrowUpRight } from "lucide-react";

export default function ArrowLink({
  href,
  children,
  variant = "light",
  className = "",
}) {
  return (
    <a className={`arrow-link arrow-link--${variant} ${className}`} href={href}>
      <span>{children}</span>
      <ArrowUpRight aria-hidden="true" size={18} />
    </a>
  );
}
