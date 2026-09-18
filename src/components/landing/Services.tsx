import Icon from "@/components/icons/Icon";
import { services } from "@/lib/content";
import CtaButton from "./CtaButton";
import RevealOnScroll from "./RevealOnScroll";

export default function Services() {
  return (
    <section
      id="servicos"
      data-section="servicos"
      className="border-y border-white/10 bg-surface px-4 py-14 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <RevealOnScroll>
          <h2 className="text-balance text-center font-heading text-2xl font-semibold text-branco-clareza sm:text-3xl">
            {services.titulo}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-balance text-center text-sm text-branco-clareza/75 sm:text-base">
            {services.subtitulo}
          </p>
        </RevealOnScroll>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.cards.map((card, i) => (
            <RevealOnScroll key={card.titulo} delayMs={(i % 4) * 80}>
              <div className="h-full rounded-card border border-white/10 bg-preto-direcao/60 p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-laranja-impulso/15 text-laranja-impulso">
                  <Icon name={card.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-heading text-sm font-semibold text-branco-clareza sm:text-base">
                  {card.titulo}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-branco-clareza/70 sm:text-sm">{card.texto}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <CtaButton ctaId="servicos_secundario">{services.ctaSecundario}</CtaButton>
        </div>
      </div>
    </section>
  );
}
