"use client";

import { trackEvent } from "@/lib/tracking";
import { cn } from "@/lib/utils";

type CtaButtonProps = {
  ctaId: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
  onBeforeScroll?: () => boolean | void; // retornar false cancela o scroll (ex.: abrir modal)
};

export default function CtaButton({ ctaId, children, className, variant = "primary", onBeforeScroll }: CtaButtonProps) {
  function handleClick() {
    trackEvent("cta_click", { cta: ctaId });

    if (onBeforeScroll) {
      const shouldContinue = onBeforeScroll();
      if (shouldContinue === false) return;
    }

    const form = document.getElementById("formulario");
    form?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const base =
    "inline-flex items-center justify-center gap-2 rounded-control px-6 py-3.5 text-sm sm:text-base font-heading font-semibold transition-transform duration-150 active:scale-[0.98] min-h-[48px]";
  const styles =
    variant === "primary"
      ? "bg-laranja-impulso text-preto-direcao hover:brightness-110 shadow-[0_8px_24px_-8px_rgba(255,100,0,0.6)]"
      : "bg-transparent border border-laranja-impulso text-branco-clareza hover:bg-laranja-impulso/10";

  return (
    <button type="button" onClick={handleClick} className={cn(base, styles, className)}>
      {children}
    </button>
  );
}
