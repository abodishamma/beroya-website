import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import brandMark from "../assets/beroya-mark-2026-transparent.png";
import Reveal from "../components/Reveal";
import { useLanguage } from "../hooks/useLanguage";

export default function Contact() {
  const { content } = useLanguage();

  return (
    <section className="section contact" id="contact">
      <img className="contact__mark" src={brandMark} alt="" aria-hidden="true" />
      <div className="contact__beam" aria-hidden="true" />

      <div className="container contact__layout">
        <Reveal className="contact__intro">
          <span className="eyebrow eyebrow--light">
            <b>{content.contact.index}</b>
            {content.contact.eyebrow}
          </span>
          <h2>
            {content.contact.title[0]}
            <em>{content.contact.title[1]}</em>
          </h2>
          <p>{content.contact.text}</p>
          <div className="contact__availability">
            <i aria-hidden="true" />
            {content.contact.availability}
          </div>
        </Reveal>

        <Reveal className="contact__actions" delay={0.1}>
          <a
            className="contact__primary"
            href={`mailto:info@beroyaauto.com?subject=${encodeURIComponent(content.mailSubjects.business)}`}
          >
            <span>
              <small>{content.contact.primary[0]}</small>
              <strong>{content.contact.primary[1]}</strong>
            </span>
            <ArrowUpRight aria-hidden="true" />
          </a>

          <div className="contact__channels">
            <a href="tel:+971501234567">
              <Phone aria-hidden="true" />
              <span>
                <small>{content.contact.phone[0]}</small>
                <strong>{content.contact.phone[1]}</strong>
              </span>
              <ArrowUpRight aria-hidden="true" size={17} />
            </a>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Dubai%2C%20United%20Arab%20Emirates"
              target="_blank"
              rel="noreferrer"
            >
              <MapPin aria-hidden="true" />
              <span>
                <small>{content.contact.location[0]}</small>
                <strong>{content.contact.location[1]}</strong>
              </span>
              <ArrowUpRight aria-hidden="true" size={17} />
            </a>
          </div>

          <a
            className="contact__portfolio"
            href={`mailto:info@beroyaauto.com?subject=${encodeURIComponent(content.mailSubjects.portfolio)}`}
          >
            <Mail aria-hidden="true" size={17} />
            {content.contact.portfolio}
            <ArrowUpRight aria-hidden="true" size={16} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
