"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/tracking";
import { pushContactEvent } from "@/lib/pixel";

export default function ObrigadoRedirect({
  whatsappLink,
  redirectSeconds,
}: {
  whatsappLink: string;
  redirectSeconds: number;
}) {
  const [secondsLeft, setSecondsLeft] = useState(redirectSeconds);
  const [redirected, setRedirected] = useState(false);

  useEffect(() => {
    if (redirectSeconds <= 0 || redirected) return;

    if (secondsLeft <= 0) {
      setRedirected(true);
      trackEvent("whatsapp_click", { origin: "auto_redirect" });
      pushContactEvent();
      window.location.href = whatsappLink;
      return;
    }

    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft, redirectSeconds, redirected, whatsappLink]);

  function handleManualClick() {
    trackEvent("whatsapp_click", { origin: "manual_click" });
    pushContactEvent();
  }

  return (
    <div className="space-y-4">
      {redirectSeconds > 0 && !redirected && (
        <p className="text-sm text-branco-clareza/60" role="status" aria-live="polite">
          Redirecionando para o WhatsApp em {secondsLeft}s...
        </p>
      )}
      <a
        href={whatsappLink}
        onClick={handleManualClick}
        className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-control bg-laranja-impulso px-7 py-3.5 font-heading text-base font-semibold text-preto-direcao shadow-[0_8px_24px_-8px_rgba(255,100,0,0.6)] transition-transform active:scale-[0.98] hover:brightness-110 sm:w-auto"
      >
        Falar agora com o atendimento
      </a>
    </div>
  );
}
