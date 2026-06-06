"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __portfolioVisitTracked?: boolean;
  }
}

function getVisitorId() {
  const key = "portfolio_visitor_id";
  const existing = window.localStorage.getItem(key);

  if (existing) {
    return existing;
  }

  const next =
    typeof window.crypto?.randomUUID === "function"
      ? window.crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  window.localStorage.setItem(key, next);
  return next;
}

export function VisitorTracker() {
  useEffect(() => {
    if (window.__portfolioVisitTracked || navigator.doNotTrack === "1") {
      return;
    }

    window.__portfolioVisitTracked = true;

    const url = new URL(window.location.href);
    const payload = {
      visitorId: getVisitorId(),
      path: `${url.pathname}${url.search}`,
      referrer: document.referrer,
      utmSource: url.searchParams.get("utm_source"),
      utmMedium: url.searchParams.get("utm_medium"),
      utmContent: url.searchParams.get("utm_content"),
      trackedAt: new Date().toISOString(),
    };

    const body = JSON.stringify(payload);

    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        "/api/analytics/visit",
        new Blob([body], { type: "application/json" })
      );
      return;
    }

    fetch("/api/analytics/visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => undefined);
  }, []);

  return null;
}
