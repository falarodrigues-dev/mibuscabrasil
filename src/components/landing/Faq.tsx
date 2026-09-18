"use client";

import { useState } from "react";
import { faq } from "@/lib/content";
import { trackEvent } from "@/lib/tracking";
import Icon from "@/components/icons/Icon";
import RevealOnScroll from "./RevealOnScroll";
import { cn } from "@/lib/utils";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number, pergunta: string) {
    setOpenIndex((current) => {
      const next = current === index ? null : index;
      if (next !== null) {
        trackEvent("faq_open", { question: pergunta });
      }
      return next;
    });
  }

  return (
    <section
      id="faq"
      data-section="faq"
      className="border-y border-white/10 bg-surface px-4 py-14 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-3xl">
        <RevealOnScroll>
          <h2 className="text-balance text-center font-heading text-2xl font-semibold text-branco-clareza sm:text-3xl">
            {faq.titulo}
          </h2>
        </RevealOnScroll>

        <div className="mt-8 divide-y divide-white/10 rounded-card border border-white/10 bg-preto-direcao/60">
          {faq.perguntas.map((item, i) => {
            const isOpen = openIndex === i;
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-button-${i}`;
            return (
              <div key={item.pergunta}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(i, item.pergunta)}
                    className="flex min-h-[48px] w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-branco-clareza sm:text-base"
                  >
                    {item.pergunta}
                    <Icon
                      name="chevron"
                      className={cn("h-5 w-5 shrink-0 text-laranja-impulso transition-transform", isOpen && "rotate-180")}
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="px-5 pb-4 text-sm leading-relaxed text-branco-clareza/75 sm:text-base"
                >
                  {item.resposta}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
