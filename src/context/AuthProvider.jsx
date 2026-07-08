import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./authContext";

const sessionKey = "beroya-auth-session";
const adminCode = "BEROYA2026";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const hasAuthBackend = Boolean(supabaseUrl && supabaseAnonKey);

function normalizeEmail(email = "") {
  return email.trim().toLocaleLowerCase();
}

function readSession() {
  if (typeof window === "undefined") return null;

  try {
    return JSON.parse(window.localStorage.getItem(sessionKey) || "null");
  } catch {
    return null;
  }
}

function storeSession(nextSession) {
  if (typeof window === "undefined") return;

  if (nextSession) {
    window.localStorage.setItem(sessionKey, JSON.stringify(nextSession));
    return;
  }

  window.localStorage.removeItem(sessionKey);
}

function getAuthHeaders(token = supabaseAnonKey) {
  return {
    apikey: supabaseAnonKey,
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

async function requestEmailVerification(email, metadata = {}) {
  if (!hasAuthBackend) {
    return { ok: false, reason: "backendMissing" };
  }

  const redirectTo = `${window.location.origin}/#/account`;
  const response = await fetch(
    `${supabaseUrl}/auth/v1/otp?redirect_to=${encodeURIComponent(redirectTo)}`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        email,
        create_user: true,
        data: metadata,
      }),
    },
  );

  if (!response.ok) {
    return { ok: false, reason: "authFailed" };
  }

  return { ok: true };
}

async function getVerifiedUser(accessToken) {
  const response = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: getAuthHeaders(accessToken),
  });

  if (!response.ok) return null;
  return response.json();
}

export function AuthProvider({ children }) {
  const [session, setSessionState] = useState(() => readSession());
  const [authMessage, setAuthMessage] = useState("");

  const setSession = useCallback((nextSession) => {
    setSessionState(nextSession);
    storeSession(nextSession);
  }, []);

  useEffect(() => {
    if (!hasAuthBackend || typeof window === "undefined") return;

    const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    const accessToken = hashParams.get("access_token");

    if (!accessToken) return;

    getVerifiedUser(accessToken).then((user) => {
      if (!user) {
        setAuthMessage("authFailed");
        return;
      }

      setSession({ role: "customer", accessToken, user });
      setAuthMessage("signedIn");
      window.history.replaceState(null, "", "#/account");
    });
  }, [setSession]);

  const registerCustomer = useCallback(async (fields) => {
    const email = normalizeEmail(fields.email);
    if (!email || !fields.fullName?.trim()) {
      setAuthMessage("missing");
      return { ok: false, reason: "missing" };
    }

    const result = await requestEmailVerification(email, {
      role: "customer",
      fullName: fields.fullName.trim(),
      phone: fields.phone?.trim() || "",
      city: fields.city?.trim() || "",
      carBrand: fields.carBrand?.trim() || "",
      carModel: fields.carModel?.trim() || "",
      year: fields.year?.trim() || "",
      vin: fields.vin?.trim() || "",
    });

    setAuthMessage(result.ok ? "verificationSent" : result.reason);
    return result;
  }, []);

  const loginCustomer = useCallback(async (email) => {
    const normalizedEmail = normalizeEmail(email);
    if (!normalizedEmail) {
      setAuthMessage("missing");
      return { ok: false, reason: "missing" };
    }

    const result = await requestEmailVerification(normalizedEmail);
    setAuthMessage(result.ok ? "verificationSent" : result.reason);
    return result;
  }, []);

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
  }, [setSession]);

  const logout = useCallback(() => {
    setSession(null);
    setAuthMessage("signedOut");
  }, [setSession]);

  const currentCustomer = useMemo(() => {
    if (session?.role !== "customer" || !session.user) return null;

    const metadata = session.user.user_metadata || {};
    return {
      id: session.user.id,
      role: "customer",
      fullName: metadata.fullName || session.user.email,
      email: session.user.email,
      phone: metadata.phone || "",
      city: metadata.city || "",
      carBrand: metadata.carBrand || "",
      carModel: metadata.carModel || "",
      year: metadata.year || "",
      vin: metadata.vin || "",
    };
  }, [session]);

  const value = useMemo(
    () => ({
      adminCode,
      authMessage,
      currentCustomer,
      hasAuthBackend,
      isAdmin: session?.role === "admin",
      isCustomer: Boolean(currentCustomer),
      loginAdmin,
      loginCustomer,
      logout,
      registerCustomer,
      session,
    }),
    [
      authMessage,
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
