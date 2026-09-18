"use client";

const SESSION_COOKIE = "mb_session";
const SESSION_MAX_AGE_DAYS = 180;

type EventType =
  | "page_view"
  | "section_view"
  | "scroll_depth"
  | "form_start"
  | "form_step_1_complete"
  | "form_submit"
  | "whatsapp_click"
  | "cta_click"
  | "faq_open";

type EventPayload = {
  sessionId: string;
  type: EventType;
  metadata?: Record<string, unknown>;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  utmContent?: string | null;
  utmTerm?: string | null;
  fbclid?: string | null;
  gclid?: string | null;
  referrer?: string | null;
  pageUrl?: string | null;
  device?: string | null;
  lastSection?: string | null;
  maxScrollDepth?: number | null;
  timeOnPageMs?: number | null;
};

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]!) : null;
}

function writeCookie(name: string, value: string, days: number) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function createUuid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function getOrCreateSessionId(): string {
  const existing = readCookie(SESSION_COOKIE);
  if (existing) return existing;
  const id = createUuid();
  writeCookie(SESSION_COOKIE, id, SESSION_MAX_AGE_DAYS);
  return id;
}

function detectDevice(): "mobile" | "tablet" | "desktop" {
  if (typeof navigator === "undefined") return "desktop";
  const ua = navigator.userAgent.toLowerCase();
  if (/ipad|tablet/.test(ua)) return "tablet";
  if (/mobi|android|iphone/.test(ua)) return "mobile";
  return "desktop";
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "gclid"] as const;
const UTM_STORAGE_KEY = "mb_utm";

export function getAcquisitionParams() {
  if (typeof window === "undefined") {
    return {
      utmSource: null,
      utmMedium: null,
      utmCampaign: null,
      utmContent: null,
      utmTerm: null,
      fbclid: null,
      gclid: null,
      referrer: null,
      pageUrl: null,
      device: null,
    };
  }

  const params = new URLSearchParams(window.location.search);
  const hasAnyUtm = UTM_KEYS.some((k) => params.has(k));

  let stored: Record<string, string> = {};
  try {
    const raw = window.sessionStorage.getItem(UTM_STORAGE_KEY);
    if (raw) stored = JSON.parse(raw);
  } catch {
    // ignore
  }

  if (hasAnyUtm) {
    stored = Object.fromEntries(UTM_KEYS.map((k) => [k, params.get(k) ?? ""]).filter(([, v]) => v));
    try {
      window.sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(stored));
    } catch {
      // ignore
    }
  }

  return {
    utmSource: stored.utm_source ?? null,
    utmMedium: stored.utm_medium ?? null,
    utmCampaign: stored.utm_campaign ?? null,
    utmContent: stored.utm_content ?? null,
    utmTerm: stored.utm_term ?? null,
    fbclid: stored.fbclid ?? null,
    gclid: stored.gclid ?? null,
    referrer: document.referrer || null,
    pageUrl: window.location.href,
    device: detectDevice(),
  };
}

let queue: EventPayload[] = [];
let flushTimer: ReturnType<typeof setTimeout> | null = null;
const FLUSH_DELAY_MS = 700;

function sendPayload(events: EventPayload[], useBeacon = false) {
  if (events.length === 0) return;
  const body = JSON.stringify(events.length === 1 ? events[0] : events);

  if (useBeacon && typeof navigator !== "undefined" && navigator.sendBeacon) {
    const blob = new Blob([body], { type: "application/json" });
    navigator.sendBeacon("/api/events", blob);
    return;
  }

  fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {
    // eventos de rastreamento não devem quebrar a experiência do usuário
  });
}

function scheduleFlush() {
  if (flushTimer) return;
  flushTimer = setTimeout(() => {
    flushTimer = null;
    const toSend = queue;
    queue = [];
    sendPayload(toSend);
  }, FLUSH_DELAY_MS);
}

export function flushNow(useBeacon = false) {
  if (flushTimer) {
    clearTimeout(flushTimer);
    flushTimer = null;
  }
  const toSend = queue;
  queue = [];
  sendPayload(toSend, useBeacon);
}

let pageStartedAt = Date.now();
let lastSection = "";
let maxScrollDepth = 0;

export function trackEvent(type: EventType, metadata?: Record<string, unknown>) {
  const sessionId = getOrCreateSessionId();
  const acquisition = getAcquisitionParams();

  queue.push({
    sessionId,
    type,
    metadata,
    ...acquisition,
    lastSection: lastSection || null,
    maxScrollDepth,
    timeOnPageMs: Date.now() - pageStartedAt,
  });

  scheduleFlush();
}

export function setLastSection(section: string) {
  lastSection = section;
}

export function setMaxScrollDepth(depth: number) {
  if (depth > maxScrollDepth) maxScrollDepth = depth;
}

export function resetPageTimer() {
  pageStartedAt = Date.now();
}
