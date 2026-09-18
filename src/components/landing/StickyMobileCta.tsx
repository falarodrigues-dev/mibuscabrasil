"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/tracking";
import { stickyMobileCta } from "@/lib/content";
import { cn } from "@/lib/utils";

export default function StickyMobileCta() {
  const [pastFirstFold, setPastFirstFold] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setPastFirstFold(window.scrollY > window.innerHeight * 0.85);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const formEl = document.getElementById("formulario");
    let observer: IntersectionObserver | null = null;
    if (formEl) {
      observer = new IntersectionObserver(([entry]) => setFormVisible(Boolean(entry?.isIntersecting)), {
        threshold: 0.15,
      });
      observer.observe(formEl);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
    };
  }, []);

  const visible = pastFirstFold && !formVisible;

  function handleClick() {
    trackEvent("cta_click", { cta: "sticky_mobile" });
    document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 px-4 pb-[calc(env(safe-area-inset-bottom)+12px)] pt-3 transition-transform duration-300 sm:hidden",
        "bg-gradient-to-t from-preto-direcao via-preto-direcao/95 to-transparent",
        visible ? "translate-y-0" : "translate-y-full"
      )}
      aria-hidden={!visible}
    >
      <button
        type="button"
        onClick={handleClick}
        tabIndex={visible ? 0 : -1}
        className="min-h-[48px] w-full rounded-control bg-laranja-impulso font-heading text-sm font-semibold text-preto-direcao shadow-[0_8px_24px_-8px_rgba(255,100,0,0.7)]"
      >
        {stickyMobileCta}
      </button>
    </div>
  );
}
