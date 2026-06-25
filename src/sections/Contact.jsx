import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import brandMark from "../assets/beroya-mark-2026.png";
import Reveal from "../components/Reveal";

export default function Contact() {
  return (
    <section className="section contact" id="contact">
      <img className="contact__mark" src={brandMark} alt="" aria-hidden="true" />
      <div className="contact__beam" aria-hidden="true" />

      <div className="container contact__layout">
        <Reveal className="contact__intro">
          <span className="eyebrow eyebrow--light">
            <b>05</b>
            Start a conversation
          </span>
          <h2>
            Let’s engineer
            <em>what comes next.</em>
          </h2>
          <p>
            Discuss a product requirement, distribution opportunity or manufacturing
            partnership directly with the BEROYA team.
          </p>
          <div className="contact__availability">
            <i aria-hidden="true" />
            Business enquiries open
          </div>
        </Reveal>

        <Reveal className="contact__actions" delay={0.1}>
          <a
            className="contact__primary"
            href="mailto:info@beroyaauto.com?subject=BEROYA%20Business%20Enquiry"
          >
            <span>
              <small>Corporate enquiries</small>
              <strong>info@beroyaauto.com</strong>
            </span>
            <ArrowUpRight aria-hidden="true" />
          </a>

          <div className="contact__channels">
            <a href="tel:+971501234567">
              <Phone aria-hidden="true" />
              <span>
                <small>Speak with us</small>
                <strong>+971 50 123 4567</strong>
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
                <small>Corporate location</small>
                <strong>Dubai, United Arab Emirates</strong>
              </span>
              <ArrowUpRight aria-hidden="true" size={17} />
            </a>
          </div>

          <a
            className="contact__portfolio"
            href="mailto:info@beroyaauto.com?subject=BEROYA%20Product%20Portfolio%20Request"
          >
            <Mail aria-hidden="true" size={17} />
            Request the BEROYA product portfolio
            <ArrowUpRight aria-hidden="true" size={16} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
