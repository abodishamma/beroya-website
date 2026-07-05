import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./authContext";

const customersKey = "beroya-customers";
const sessionKey = "beroya-session";
const adminCode = "BEROYA2026";

function readJson(key, fallback) {
  if (typeof window === "undefined") return fallback;

  try {
    const parsed = JSON.parse(window.localStorage.getItem(key) || "null");
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function normalizeEmail(email = "") {
  return email.trim().toLocaleLowerCase();
}

function createCustomerId() {
  return `cus_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

export function AuthProvider({ children }) {
  const [customers, setCustomers] = useState(() => readJson(customersKey, []));
  const [session, setSession] = useState(() => readJson(sessionKey, null));
  const [authMessage, setAuthMessage] = useState("");

  useEffect(() => {
    window.localStorage.setItem(customersKey, JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    if (session) {
      window.localStorage.setItem(sessionKey, JSON.stringify(session));
      return;
    }

    window.localStorage.removeItem(sessionKey);
  }, [session]);

  const registerCustomer = useCallback((fields) => {
    const email = normalizeEmail(fields.email);
    if (!email || !fields.fullName?.trim()) {
      setAuthMessage("missing");
      return { ok: false, reason: "missing" };
    }

    const existing = customers.find((customer) => normalizeEmail(customer.email) === email);
    const customer = existing
      ? { ...existing, ...fields, email, updatedAt: new Date().toISOString() }
      : {
          id: createCustomerId(),
          role: "customer",
          fullName: fields.fullName.trim(),
          email,
          phone: fields.phone?.trim() || "",
          city: fields.city?.trim() || "",
          carBrand: fields.carBrand?.trim() || "",
          carModel: fields.carModel?.trim() || "",
          year: fields.year?.trim() || "",
          vin: fields.vin?.trim() || "",
          createdAt: new Date().toISOString(),
        };

    setCustomers((current) =>
      existing
        ? current.map((item) => (item.id === existing.id ? customer : item))
        : [...current, customer],
    );
    setSession({ role: "customer", customerId: customer.id, email: customer.email });
    setAuthMessage(existing ? "updated" : "registered");
    return { ok: true, customer };
  }, [customers]);

  const loginCustomer = useCallback((email, phone) => {
    const normalizedEmail = normalizeEmail(email);
    const customer = customers.find(
      (item) =>
        normalizeEmail(item.email) === normalizedEmail &&
        (!phone?.trim() || item.phone.replace(/\s+/g, "") === phone.replace(/\s+/g, "")),
    );

    if (!customer) {
      setAuthMessage("notFound");
      return { ok: false, reason: "notFound" };
    }

    setSession({ role: "customer", customerId: customer.id, email: customer.email });
    setAuthMessage("signedIn");
    return { ok: true, customer };
  }, [customers]);

  const loginAdmin = useCallback((email, code) => {
    if (code.trim() !== adminCode) {
      setAuthMessage("adminDenied");
      return { ok: false, reason: "adminDenied" };
    }

    setSession({
      role: "admin",
      email: normalizeEmail(email) || "admin@beroyaauto.com",
      signedInAt: new Date().toISOString(),
    });
    setAuthMessage("adminSignedIn");
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    setSession(null);
    setAuthMessage("signedOut");
  }, []);

  const currentCustomer = useMemo(() => {
    if (session?.role !== "customer") return null;
    return customers.find((customer) => customer.id === session.customerId) || null;
  }, [customers, session]);

  const value = useMemo(
    () => ({
      adminCode,
      authMessage,
      customers,
      currentCustomer,
      isAdmin: session?.role === "admin",
      isCustomer: session?.role === "customer",
      loginAdmin,
      loginCustomer,
      logout,
      registerCustomer,
      session,
    }),
    [
      authMessage,
      customers,
      currentCustomer,
      loginAdmin,
      loginCustomer,
      logout,
      registerCustomer,
      session,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
