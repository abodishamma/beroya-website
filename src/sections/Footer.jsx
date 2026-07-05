import { ArrowUpRight, Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import Brand from "../components/Brand";
import { useLanguage } from "../hooks/useLanguage";
import { getRouteHref } from "../utils/routes";

const companyHrefs = [
  getRouteHref("about"),
  getRouteHref("technology"),
  getRouteHref("manufacturing"),
  getRouteHref("quality"),
  getRouteHref("contact"),
];

function mailSubject(subject) {
  return `mailto:info@beroyaauto.com?subject=${encodeURIComponent(subject)}`;
}

function FooterLinks({ title, items }) {
  return (
    <div className="footer__column">
      <h2>{title}</h2>
      {items.map((item) =>
        item.href ? (
          <a href={item.href} key={item.label}>
            {item.label}
          </a>
        ) : (
          <span key={item.label}>{item.label}</span>
        ),
      )}
    </div>
  );
}

export default function Footer() {
  const { content } = useLanguage();

  const companyLinks = content.footer.links.company.map((label, index) => ({
    label,
    href: companyHrefs[index],
  }));

  const productLinks = content.products.items.map(([label], index) => ({
    label,
    href: mailSubject(
      `${content.mailSubjects.productPrefix} ${content.products.items[index][0]} ${content.mailSubjects.productSuffix}`,
    ),
  }));

  const businessLinks = content.footer.links.business.map((label, index) => ({
    label,
    href: [
      mailSubject(content.mailSubjects.portfolio),
      mailSubject(content.mailSubjects.partnership),
      mailSubject(content.mailSubjects.technical),
    ][index],
  }));

  const certificationLinks = content.footer.links.certifications.map((label) => ({
    label,
  }));

  return (
    <footer className="footer">
      <div className="container footer__topline">
        <span>{content.footer.topline[0]}</span>
        <span>{content.footer.topline[1]}</span>
        <a href={getRouteHref("home")}>
          {content.footer.topline[2]}
          <ArrowUpRight aria-hidden="true" size={15} />
        </a>
      </div>

      <div className="container footer__grid">
        <div className="footer__brand">
          <Brand />
          <p>{content.footer.description}</p>
          <div className="footer__socials" aria-label={content.accessibility.social}>
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label={content.accessibility.facebook}>
              <Facebook aria-hidden="true" size={14} />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label={content.accessibility.instagram}>
              <Instagram aria-hidden="true" size={14} />
            </a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label={content.accessibility.linkedin}>
              <Linkedin aria-hidden="true" size={14} />
            </a>
          </div>
        </div>

        <FooterLinks title={content.footer.company} items={companyLinks} />
        <FooterLinks title={content.footer.products} items={productLinks} />
        <FooterLinks title={content.footer.business} items={businessLinks} />
        <FooterLinks title={content.footer.support} items={certificationLinks} />

        <div className="footer__column footer__contact">
          <h2>{content.footer.contact}</h2>
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
            {content.contact.location[1]}
          </a>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>
          © {new Date().getFullYear()} BEROYA Auto Parts. {content.footer.copyright}
        </p>
        <div>
          <span>{content.footer.bottom}</span>
          <a href={`mailto:info@beroyaauto.com?subject=${encodeURIComponent(content.mailSubjects.privacy)}`}>
            {content.footer.privacy}
          </a>
        </div>
      </div>
    </footer>
  );
}
