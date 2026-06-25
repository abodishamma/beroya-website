import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Brand from "../components/Brand";

const companyLinks = [
  { label: "About BEROYA", href: "#about" },
  { label: "Our Technology", href: "#technology" },
  { label: "Quality Philosophy", href: "#quality" },
  { label: "Contact", href: "#contact" },
];

const productLinks = [
  "Braking System",
  "Suspension Parts",
  "Engine Mounts",
  "Filtration",
  "Steering Parts",
  "Drivetrain Parts",
].map((label) => ({
  label,
  href: `mailto:info@beroyaauto.com?subject=${encodeURIComponent(`BEROYA ${label} Enquiry`)}`,
}));

const businessLinks = [
  {
    label: "Request Product Portfolio",
    href: "mailto:info@beroyaauto.com?subject=BEROYA%20Product%20Portfolio%20Request",
  },
  {
    label: "Distribution Partnerships",
    href: "mailto:info@beroyaauto.com?subject=BEROYA%20Distribution%20Partnership",
  },
  {
    label: "Careers",
    href: "mailto:info@beroyaauto.com?subject=Careers%20at%20BEROYA",
  },
];

function FooterLinks({ title, items }) {
  return (
    <div className="footer__column">
      <h2>{title}</h2>
      {items.map((item) => (
        <a href={item.href} key={item.label}>
          {item.label}
        </a>
      ))}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__topline">
        <span>BEROYA Auto Parts</span>
        <span>Precision components for global mobility</span>
        <a href="#top">
          Back to top
          <ArrowUpRight aria-hidden="true" size={15} />
        </a>
      </div>

      <div className="container footer__grid">
        <div className="footer__brand">
          <Brand />
          <p>
            Premium automotive components shaped by engineering discipline,
            manufacturing precision and an uncompromising approach to reliability.
          </p>
        </div>

        <FooterLinks title="Company" items={companyLinks} />
        <FooterLinks title="Product Systems" items={productLinks} />
        <FooterLinks title="Business" items={businessLinks} />

        <div className="footer__column footer__contact">
          <h2>Corporate Office</h2>
          <a href="tel:+971501234567">
            <Phone aria-hidden="true" size={15} />
            +971 50 123 4567
          </a>
          <a href="mailto:info@beroyaauto.com">
            <Mail aria-hidden="true" size={15} />
            info@beroyaauto.com
          </a>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Dubai%2C%20United%20Arab%20Emirates"
            target="_blank"
            rel="noreferrer"
          >
            <MapPin aria-hidden="true" size={16} />
            Dubai, United Arab Emirates
          </a>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>© {new Date().getFullYear()} BEROYA Auto Parts. All rights reserved.</p>
        <div>
          <span>Automotive component manufacturer</span>
          <a href="mailto:info@beroyaauto.com?subject=BEROYA%20Privacy%20Enquiry">
            Privacy enquiries
          </a>
        </div>
      </div>
    </footer>
  );
}
