import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/settings";
import { fillWhatsappTemplate, buildWhatsappLink } from "@/lib/whatsapp";
import { sanitizeText } from "@/lib/utils";
import Logo from "@/components/landing/Logo";
import ObrigadoRedirect from "@/components/landing/ObrigadoRedirect";

export const metadata: Metadata = {
  title: "Recebemos suas informações · MiBusca Brasil",
  robots: { index: false, follow: false },
};

export default async function ObrigadoPage({
  searchParams,
}: {
  searchParams: { lead?: string };
}) {
  const settings = await getSettings();
  const lead = searchParams.lead
    ? await prisma.lead.findUnique({ where: { id: searchParams.lead } })
    : null;

  const message = fillWhatsappTemplate(settings.mensagemTemplate, {
    nome: lead ? sanitizeText(lead.nome, 60) : "",
    loja: lead ? sanitizeText(lead.nomeLoja, 60) : "",
    cidadeUf: lead?.cidadeUf ? sanitizeText(lead.cidadeUf, 60) : "",
  });
  const whatsappLink = buildWhatsappLink(settings.whatsappNumber, message);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
      <Link href="/" className="mb-8 inline-flex" aria-label="MiBusca Brasil">
        <Logo />
      </Link>

      <div className="w-full max-w-md rounded-card border border-laranja-impulso/25 bg-surface p-6 sm:p-8">
        <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-laranja-impulso/15 text-laranja-impulso">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-7 w-7" aria-hidden="true">
            <path d="m5 12.5 4.5 4.5L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h1 className="font-heading text-xl font-semibold text-branco-clareza sm:text-2xl">
          Recebemos suas informações.
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-branco-clareza/75 sm:text-base">
          Um especialista da MiBusca vai falar com você pelo WhatsApp. Se preferir, inicie a conversa agora mesmo.
        </p>

        <div className="mt-6">
          <ObrigadoRedirect whatsappLink={whatsappLink} redirectSeconds={settings.redirectSeconds} />
        </div>
      </div>
    </main>
  );
}
