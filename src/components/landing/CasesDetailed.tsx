import Image from "next/image";
import { cases, casesAviso } from "@/lib/content";
import RevealOnScroll from "./RevealOnScroll";

function CaseCard({ item }: { item: (typeof cases.lista)[number] }) {
  return (
    <div className="flex h-full flex-col rounded-card border border-white/10 bg-surface p-6">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-laranja-impulso">{item.tipo}</p>
        <h3 className="mt-1 font-heading text-lg font-semibold text-branco-clareza sm:text-xl">{item.nome}</h3>
        <p className="mt-1 text-xs text-branco-clareza/60">
          Início da parceria: {item.inicioParceria} · Métrica: {item.metrica}
        </p>
      </div>

      {"situacaoInicial" in item && item.situacaoInicial && (
        <p className="mb-4 rounded-control bg-preto-direcao/60 p-3 text-xs text-branco-clareza/75">
          <strong className="text-branco-clareza">Contexto inicial:</strong> {item.situacaoInicial}
        </p>
      )}

      <dl className="space-y-3 border-t border-white/10 pt-4">
        {item.linhas.map((linha) => (
          <div key={linha.rotulo} className="flex items-baseline justify-between gap-3 text-sm">
            <dt className="text-branco-clareza/65">{linha.rotulo}</dt>
            <dd className="text-right font-heading font-semibold text-branco-clareza">
              {linha.valor}
              {"destaque" in linha && linha.destaque && (
                <span className="ml-1.5 text-laranja-impulso">{linha.destaque}</span>
              )}
            </dd>
          </div>
        ))}
      </dl>

      {"observacao" in item && item.observacao && (
        <p className="mt-4 text-xs italic text-branco-clareza/55">Observação: {item.observacao}</p>
      )}

      {item.oQueFoiFeito && (
        <p className="mt-4 border-t border-white/10 pt-4 text-sm text-branco-clareza/80">
          <strong className="text-branco-clareza">O que foi feito:</strong> {item.oQueFoiFeito}
        </p>
      )}
    </div>
  );
}

export default function CasesDetailed() {
  return (
    <section id="cases" data-section="cases" className="px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <RevealOnScroll>
          <h2 className="text-balance text-center font-heading text-2xl font-semibold text-branco-clareza sm:text-3xl">
            {cases.titulo}
          </h2>
        </RevealOnScroll>

        <p className="mx-auto mt-5 max-w-3xl rounded-control border border-white/10 bg-white/5 p-3 text-center text-xs leading-relaxed text-branco-clareza/70 sm:text-sm">
          {casesAviso}
        </p>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {cases.lista.map((item, i) => (
            <RevealOnScroll key={item.nome} delayMs={i * 100}>
              <CaseCard item={item} />
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delayMs={150}>
          <div className="mt-10 grid items-center gap-6 rounded-card border border-laranja-impulso/20 bg-surface p-6 sm:p-8 lg:grid-cols-[320px_1fr]">
            <div className="overflow-hidden rounded-control border border-white/10">
              <Image
                src={cases.depoimento.imagem}
                alt={`Print de conversa de WhatsApp com depoimento de ${cases.depoimento.autor}`}
                width={760}
                height={429}
                loading="lazy"
                className="h-auto w-full"
              />
            </div>
            <div>
              <p className="text-balance font-heading text-xl font-semibold leading-snug text-branco-clareza sm:text-2xl">
                &ldquo;{cases.depoimento.citacao}&rdquo;
              </p>
              <p className="mt-4 text-sm font-medium text-laranja-impulso">— {cases.depoimento.autor}</p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
