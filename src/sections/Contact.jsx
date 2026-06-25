import { useState } from "react";
import { ArrowRight, Check, Mail, MapPin, Phone } from "lucide-react";
import Reveal from "../components/Reveal";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setForm(initialForm);
    window.setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  return (
    <section className="section contact" id="contact">
      <div className="contact__beam" aria-hidden="true" />
      <div className="container">
        <div className="contact__heading">
          <Reveal>
            <span className="eyebrow eyebrow--light">
              <b>07</b>
              Start a conversation
            </span>
            <h2>
              Let’s engineer
              <em>what comes next.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              Discuss a product requirement, distribution opportunity or manufacturing
              partnership with the BEROYA team.
            </p>
          </Reveal>
        </div>

        <div className="contact__layout">
          <Reveal className="contact__aside">
            <div className="contact__details">
              <article>
                <Mail aria-hidden="true" />
                <div>
                  <span>Global enquiries</span>
                  <p>Corporate email to be confirmed</p>
                </div>
              </article>
              <article>
                <Phone aria-hidden="true" />
                <div>
                  <span>Corporate office</span>
                  <p>Telephone to be confirmed</p>
                </div>
              </article>
              <article>
                <MapPin aria-hidden="true" />
                <div>
                  <span>Global operations</span>
                  <p>Headquarters details to be confirmed</p>
                </div>
              </article>
            </div>

            <div className="contact__map" aria-hidden="true">
              <span />
              <i />
              <b>BEROYA</b>
              <small>Global automotive partnerships</small>
            </div>
          </Reveal>

          <Reveal className="contact-form-wrap" delay={0.12}>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="field-pair">
                <label>
                  <span>Name *</span>
                  <input
                    required
                    autoComplete="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                  />
                </label>
                <label>
                  <span>Work email *</span>
                  <input
                    required
                    type="email"
                    autoComplete="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                  />
                </label>
              </div>
              <div className="field-pair">
                <label>
                  <span>Phone</span>
                  <input
                    type="tel"
                    autoComplete="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+00 000 000 000"
                  />
                </label>
                <label>
                  <span>Company *</span>
                  <input
                    required
                    autoComplete="organization"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Company name"
                  />
                </label>
              </div>
              <label>
                <span>How can we help? *</span>
                <textarea
                  required
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Tell us about your requirement or opportunity..."
                />
              </label>
              <div className="contact-form__footer">
                <p>
                  By submitting, you agree that BEROYA may use your details to respond
                  to this enquiry.
                </p>
                <button className="button button--bronze" type="submit">
                  Send enquiry
                  <ArrowRight aria-hidden="true" size={18} />
                </button>
              </div>
              <div className={`form-success ${submitted ? "form-success--visible" : ""}`} role="status">
                <Check aria-hidden="true" size={18} />
                Your enquiry has been prepared. Connect this form to your preferred
                inbox or CRM before launch.
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
