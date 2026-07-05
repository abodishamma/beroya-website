import { motion as Motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Boxes, CircleDollarSign, LogOut, PackageCheck, ShieldCheck, TrendingUp } from "lucide-react";
import { useState } from "react";
import { productCatalog } from "../data/shopProducts";
import { useAuth } from "../hooks/useAuth";
import { useCommerce } from "../hooks/useCommerce";
import { useLanguage } from "../hooks/useLanguage";
import { formatPrice } from "../utils/formatters";

const statusOptions = ["inquiry", "paymentPending", "processing", "paid", "fulfilled", "cancelled"];

export default function AdminPage() {
  const { content, language } = useLanguage();
  const { adminCode, authMessage, isAdmin, loginAdmin, logout } = useAuth();
  const { adjustStock, inventory, metrics, orders, resetCommerceDemo, updateOrderStatus, updateStock } = useCommerce();
  const reduceMotion = useReducedMotion();
  const [credentials, setCredentials] = useState({ email: "admin@beroyaauto.com", code: "" });

  const updateCredential = (field, value) => {
    setCredentials((current) => ({ ...current, [field]: value }));
  };

  const handleLogin = (event) => {
    event.preventDefault();
    loginAdmin(credentials.email, credentials.code);
  };

  const productCopies = content.shop.products;
  const locale = language === "ar" ? "ar-AE" : "en-US";

  return (
    <section className="admin-page" id="admin" aria-labelledby="admin-title">
      <div className="container admin-page__inner">
        <Motion.div
          className="admin-hero"
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-kicker">{content.admin.kicker}</span>
          <h1 id="admin-title">{content.admin.title}</h1>
          <p>{content.admin.description}</p>
        </Motion.div>

        {!isAdmin ? (
          <form className="admin-login" onSubmit={handleLogin}>
            <div>
              <ShieldCheck aria-hidden="true" size={26} />
              <strong>{content.admin.loginTitle}</strong>
              <p>{content.admin.loginDescription}</p>
            </div>

            <label>
              <span>{content.admin.fields.email}</span>
              <input
                type="email"
                value={credentials.email}
                required
                onChange={(event) => updateCredential("email", event.target.value)}
              />
            </label>

            <label>
              <span>{content.admin.fields.code}</span>
              <input
                value={credentials.code}
                required
                placeholder={content.admin.placeholders.code}
                onChange={(event) => updateCredential("code", event.target.value)}
              />
            </label>

            <p className="admin-login__hint">{content.admin.demoAccess.replace("{code}", adminCode)}</p>

            {authMessage && content.account.messages[authMessage] && (
              <p className="account-form__message">{content.account.messages[authMessage]}</p>
            )}

            <button className="button button--gold" type="submit">
              {content.admin.signIn}
              <ArrowRight aria-hidden="true" size={15} />
            </button>
          </form>
        ) : (
          <>
            <div className="admin-toolbar">
              <div>
                <span>{content.admin.signedIn}</span>
                <strong>{content.admin.secureWorkspace}</strong>
              </div>
              <div>
                <button className="button button--outline" type="button" onClick={resetCommerceDemo}>
                  {content.admin.resetDemo}
                </button>
                <button className="button button--outline" type="button" onClick={logout}>
                  <LogOut aria-hidden="true" size={15} />
                  {content.account.logout}
                </button>
              </div>
            </div>

            <div className="admin-metrics">
              <article>
                <CircleDollarSign aria-hidden="true" size={22} />
                <span>{content.admin.metrics.revenue}</span>
                <strong>{formatPrice(metrics.revenue, language)}</strong>
              </article>
              <article>
                <PackageCheck aria-hidden="true" size={22} />
                <span>{content.admin.metrics.orders}</span>
                <strong>{metrics.orders}</strong>
              </article>
              <article>
                <Boxes aria-hidden="true" size={22} />
                <span>{content.admin.metrics.lowStock}</span>
                <strong>{metrics.lowStock}</strong>
              </article>
              <article>
                <TrendingUp aria-hidden="true" size={22} />
                <span>{content.admin.metrics.unitsSold}</span>
                <strong>{metrics.unitsSold}</strong>
              </article>
            </div>

            <div className="admin-grid">
              <section className="admin-panel">
                <div className="admin-panel__top">
                  <span>{content.admin.inventory}</span>
                  <small>{productCatalog.length}</small>
                </div>

                <div className="admin-table admin-table--inventory">
                  <div className="admin-table__head">
                    <span>{content.admin.table.product}</span>
                    <span>{content.admin.table.available}</span>
                    <span>{content.admin.table.reserved}</span>
                    <span>{content.admin.table.sold}</span>
                    <span>{content.admin.table.stock}</span>
                  </div>

                  {productCatalog.map((product) => {
                    const item = inventory[product.id];
                    const available = Math.max(0, (item?.stock || 0) - (item?.reserved || 0));
                    const low = available <= (item?.reorderLevel || 0);

                    return (
                      <div className={low ? "is-low" : ""} key={product.id}>
                        <span>
                          <strong>{productCopies[product.id]?.name}</strong>
                          <small>{product.sku}</small>
                        </span>
                        <span>{available}</span>
                        <span>{item?.reserved || 0}</span>
                        <span>{item?.sold || 0}</span>
                        <span className="admin-stock-control">
                          <button type="button" onClick={() => adjustStock(product.id, -1)}>
                            -
                          </button>
                          <input
                            value={item?.stock || 0}
                            inputMode="numeric"
                            aria-label={`${content.admin.table.stock} ${productCopies[product.id]?.name}`}
                            onChange={(event) => updateStock(product.id, event.target.value)}
                          />
                          <button type="button" onClick={() => adjustStock(product.id, 1)}>
                            +
                          </button>
                        </span>
                      </div>
                    );
                  })}
                </div>
              </section>

              <section className="admin-panel">
                <div className="admin-panel__top">
                  <span>{content.admin.sales}</span>
                  <small>{orders.length}</small>
                </div>

                <div className="admin-orders">
                  {orders.map((order) => (
                    <article className="admin-order" key={order.id}>
                      <div className="admin-order__top">
                        <div>
                          <strong>{order.number}</strong>
                          <span>
                            {order.customerName} / {order.city}
                          </span>
                        </div>
                        <strong>{formatPrice(order.totalAmount, language)}</strong>
                      </div>

                      <p>
                        {new Date(order.createdAt).toLocaleDateString(locale)} ·{" "}
                        {order.items
                          .map((item) => `${productCopies[item.productId]?.name || item.name} × ${item.quantity}`)
                          .join(" / ")}
                      </p>

                      <div className="admin-order__actions">
                        <select
                          value={order.status}
                          aria-label={`${content.admin.table.status} ${order.number}`}
                          onChange={(event) => updateOrderStatus(order.id, event.target.value)}
                        >
                          {statusOptions.map((status) => (
                            <option value={status} key={status}>
                              {content.admin.status[status]}
                            </option>
                          ))}
                        </select>
                        <span>{content.admin.payment[order.paymentMethod] || order.paymentMethod}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
