"use client";

// dataLayer para GA4 e Meta Pixel — só dispara efeito se os scripts tiverem
// sido carregados (IDs configurados via env). Ver src/app/layout.tsx.
declare global {
  interface Window {
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export function pushLeadEvent() {
  if (typeof window === "undefined") return;
  window.dataLayer?.push({ event: "Lead" });
  window.fbq?.("track", "Lead");
  window.gtag?.("event", "generate_lead");
}

export function pushContactEvent() {
  if (typeof window === "undefined") return;
  window.dataLayer?.push({ event: "Contact" });
  window.fbq?.("track", "Contact");
  window.gtag?.("event", "contact");
}
