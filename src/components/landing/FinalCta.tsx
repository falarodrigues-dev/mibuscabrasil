"use client";

import { useState } from "react";
import { finalCta } from "@/lib/content";
import { trackEvent } from "@/lib/tracking";
import LeadFormModal from "./LeadFormModal";
import RevealOnScroll from "./RevealOnScroll";

const MOBILE_BREAKPOINT = 768;

export default function FinalCta() {
  const [modalOpen, setModalOpen] = useState(false);

  function handleClick() {
    trackEvent("cta_click", { cta: "final" });

    const isMobile = typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT;
    if (isMobile) {
      setModalOpen(true);
      return;
    }

    document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section id="final" data-section="final" className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <RevealOnScroll>
          <h2 className="text-balance font-heading text-2xl font-bold text-branco-clareza sm:text-3xl lg:text-4xl">
            {finalCta.titulo}
          </h2>
          <p className="mt-4 text-balance text-sm text-branco-clareza/80 sm:text-base">{finalCta.subtitulo}</p>
          <button
            type="button"
            onClick={handleClick}
            className="mt-8 inline-flex min-h-[48px] items-center justify-center rounded-control bg-laranja-impulso px-7 py-3.5 font-heading text-sm font-semibold text-preto-direcao shadow-[0_8px_24px_-8px_rgba(255,100,0,0.6)] transition-transform active:scale-[0.98] hover:brightness-110 sm:text-base"
          >
            {finalCta.cta}
          </button>
        </RevealOnScroll>
      </div>

      <LeadFormModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
