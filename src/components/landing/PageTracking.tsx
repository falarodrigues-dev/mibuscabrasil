"use client";

import { useEffect } from "react";
import { trackEvent, setLastSection, setMaxScrollDepth, flushNow, resetPageTimer } from "@/lib/tracking";

const SCROLL_THRESHOLDS = [25, 50, 75, 100];

export default function PageTracking() {
  useEffect(() => {
    resetPageTimer();
    trackEvent("page_view");

    const seenSections = new Set<string>();
    const sectionEls = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const name = entry.target.getAttribute("data-section");
          if (!name) continue;
          setLastSection(name);
          if (!seenSections.has(name)) {
            seenSections.add(name);
            trackEvent("section_view", { section: name });
          }
        }
      },
      { threshold: 0.5 }
    );
    sectionEls.forEach((el) => observer.observe(el));

    const reachedDepths = new Set<number>();
    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
      setMaxScrollDepth(percent);
      for (const threshold of SCROLL_THRESHOLDS) {
        if (percent >= threshold && !reachedDepths.has(threshold)) {
          reachedDepths.add(threshold);
          trackEvent("scroll_depth", { depth: threshold });
        }
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    function onVisibilityChange() {
      if (document.visibilityState === "hidden") {
        flushNow(true);
      }
    }
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("beforeunload", () => flushNow(true));

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return null;
}
