import { motion as Motion, useReducedMotion } from "framer-motion";
import { ArrowRight, LogOut, ShieldCheck, UserRound } from "lucide-react";
import { useMemo, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useCommerce } from "../hooks/useCommerce";
import { useLanguage } from "../hooks/useLanguage";
import { formatPrice } from "../utils/formatters";
import { getRouteHref } from "../utils/routes";

const emptyCustomer = {
  fullName: "",
  phone: "",
  email: "",
  city: "",
  carBrand: "",
  carModel: "",
  year: "",
  vin: "",
};

export default function AccountPage() {
  const { content, language } = useLanguage();
  const { authMessage, currentCustomer, hasAuthBackend, loginCustomer, logout, registerCustomer } = useAuth();
  const { orders } = useCommerce();
  const reduceMotion = useReducedMotion();
  const [mode, setMode] = useState("register");
  const [fields, setFields] = useState(emptyCustomer);

  const customerOrders = useMemo(() => {
    if (!currentCustomer) return [];
    return orders
      .filter((order) => order.customerEmail === currentCustomer.email)
      .slice(0, 5);
  }, [currentCustomer, orders]);

  const updateField = (field, value) => {
    setFields((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (mode === "login") {
      await loginCustomer(fields.email);
      return;
    }

    await registerCustomer(fields);
  };

  return (
    <section className="account-page" id="account" aria-labelledby="account-title">
      <div className="container account-page__inner">
        <Motion.div
          className="account-hero"
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-kicker">{content.account.kicker}</span>
          <h1 id="account-title">{content.account.title}</h1>
          <p>{content.account.description}</p>
        </Motion.div>

        {currentCustomer ? (
          <div className="account-dashboard">
            <article className="account-panel account-panel--profile">
              <div className="account-panel__top">
                <span>
                  <UserRound aria-hidden="true" size={19} />
                  {content.account.profile}
                </span>
                <button className="button button--outline" type="button" onClick={logout}>
                  <LogOut aria-hidden="true" size={15} />
                  {content.account.logout}
                </button>
              </div>

              <div className="account-profile-card">
                <strong>{currentCustomer.fullName}</strong>
                <span>{currentCustomer.email}</span>
                <span>{currentCustomer.phone || content.account.notProvided}</span>
                <small>
                  {[currentCustomer.carBrand, currentCustomer.carModel, currentCustomer.year]
                    .filter(Boolean)
                    .join(" ") || content.account.noVehicle}
                </small>
              </div>

              <div className="account-actions">
                <a className="button button--gold" href={getRouteHref("shop")}>
                  {content.account.shopNow}
                  <ArrowRight aria-hidden="true" size={15} />
                </a>
                <a className="button button--outline" href={getRouteHref("admin")}>
                  <ShieldCheck aria-hidden="true" size={15} />
                  {content.account.adminAccess}
                </a>
              </div>
            </article>

            <article className="account-panel">
              <div className="account-panel__top">
                <span>{content.account.orders}</span>
                <small>{customerOrders.length}</small>
              </div>

              {!customerOrders.length && <p className="account-empty">{content.account.noOrders}</p>}

              <div className="account-orders">
                {customerOrders.map((order) => (
                  <div className="account-order" key={order.id}>
                    <div>
                      <strong>{order.number}</strong>
                      <span>{new Date(order.createdAt).toLocaleDateString(language === "ar" ? "ar-AE" : "en-US")}</span>
                    </div>
                    <div>
                      <span>{content.admin.status[order.status]}</span>
                      <strong>{formatPrice(order.totalAmount, language)}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        ) : (
          <div className="account-auth">
            <div className="account-auth__switch">
              <button
                className={mode === "register" ? "is-active" : ""}
                type="button"
                onClick={() => setMode("register")}
              >
                {content.account.createAccount}
              </button>
              <button
                className={mode === "login" ? "is-active" : ""}
                type="button"
                onClick={() => setMode("login")}
              >
                {content.account.signIn}
              </button>
            </div>

            <form className="account-form" onSubmit={handleSubmit}>
              {!hasAuthBackend && content.account.messages.backendMissing && (
                <p className="account-form__message">{content.account.messages.backendMissing}</p>
              )}

              <label>
                <span>{content.account.fields.email}</span>
                <input
                  type="email"
                  value={fields.email}
                  required
                  placeholder={content.account.placeholders.email}
                  onChange={(event) => updateField("email", event.target.value)}
                />
              </label>

              {mode === "register" && (
                <>
                  <label>
                    <span>{content.account.fields.phone}</span>
                    <input
                      value={fields.phone}
                      placeholder={content.account.placeholders.phone}
                      onChange={(event) => updateField("phone", event.target.value)}
                    />
                  </label>
                  <label>
                    <span>{content.account.fields.fullName}</span>
                    <input
                      value={fields.fullName}
                      required
                      placeholder={content.account.placeholders.fullName}
                      onChange={(event) => updateField("fullName", event.target.value)}
                    />
                  </label>
                  <label>
                    <span>{content.account.fields.city}</span>
                    <input
                      value={fields.city}
                      placeholder={content.account.placeholders.city}
                      onChange={(event) => updateField("city", event.target.value)}
                    />
                  </label>
                  <label>
                    <span>{content.account.fields.carBrand}</span>
                    <input
                      value={fields.carBrand}
                      placeholder={content.account.placeholders.carBrand}
                      onChange={(event) => updateField("carBrand", event.target.value)}
                    />
                  </label>
                  <label>
                    <span>{content.account.fields.carModel}</span>
                    <input
                      value={fields.carModel}
                      placeholder={content.account.placeholders.carModel}
                      onChange={(event) => updateField("carModel", event.target.value)}
                    />
                  </label>
                  <label>
                    <span>{content.account.fields.year}</span>
                    <input
                      value={fields.year}
                      placeholder={content.account.placeholders.year}
                      onChange={(event) => updateField("year", event.target.value)}
                    />
                  </label>
                  <label>
                    <span>{content.account.fields.vin}</span>
                    <input
                      value={fields.vin}
                      placeholder={content.account.placeholders.vin}
                      onChange={(event) => updateField("vin", event.target.value)}
                    />
                  </label>
                </>
              )}

              {authMessage && content.account.messages[authMessage] && (
                <p className="account-form__message">{content.account.messages[authMessage]}</p>
              )}

              <button className="button button--gold" type="submit" disabled={!hasAuthBackend}>
                {mode === "register" ? content.account.createAccount : content.account.signIn}
                <ArrowRight aria-hidden="true" size={15} />
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
