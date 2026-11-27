import { useEffect, useState } from "react";
import "@/lib/analytics"; // declares window.gtag

// Google Consent Mode v2. index.html starts GA with analytics_storage
// "denied" (cookieless pings) unless this key already says "granted";
// this banner asks once and stores the answer.
export const CONSENT_KEY = "cd_cookie_consent";
export const OPEN_COOKIE_SETTINGS = "cd:open-cookie-settings";

type Choice = "granted" | "denied";

function readChoice(): Choice | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

/** Removes the GA cookies set while consent was granted. */
function clearGaCookies() {
  const host = location.hostname;
  const domains = ["", host, `.${host}`, `.${host.replace(/^www\./, "")}`];
  for (const c of document.cookie.split(";")) {
    const name = c.split("=")[0].trim();
    if (!name.startsWith("_ga")) continue;
    for (const d of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ""}`;
    }
  }
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS));
}

export default function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (readChoice() === null) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_COOKIE_SETTINGS, reopen);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS, reopen);
  }, []);

  const choose = (choice: Choice) => {
    try {
      localStorage.setItem(CONSENT_KEY, choice);
    } catch {
      // storage blocked: the choice holds for this page only
    }
    window.gtag?.("consent", "update", { analytics_storage: choice });
    if (choice === "denied") clearGaCookies();
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      data-track-skip
      className="fixed inset-x-3 bottom-3 z-[100] sm:left-auto sm:right-4 sm:bottom-4 sm:max-w-sm rounded-xl border border-white/10 bg-gray-950/95 backdrop-blur p-4 shadow-2xl text-sm text-gray-300"
    >
      <p>
        We'd like to use Google Analytics cookies to see which pages are useful. The CoolDesk
        app and extension never use cookies.{" "}
        <a href="/privacy-details#cookies" className="underline text-white hover:text-gray-200">
          Details
        </a>
      </p>
      <div className="mt-3 flex gap-2 justify-end">
        <button
          type="button"
          onClick={() => choose("denied")}
          className="px-3 py-1.5 rounded-lg border border-white/15 text-gray-200 hover:bg-white/5"
        >
          Decline
        </button>
        <button
          type="button"
          onClick={() => choose("granted")}
          className="px-3 py-1.5 rounded-lg bg-white text-gray-900 font-medium hover:bg-gray-200"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
