import Icon from "@/components/icons/Icon";
import { painPoints } from "@/lib/content";
import RevealOnScroll from "./RevealOnScroll";

export default function PainPoints() {
  return (
    <section id="dores" data-section="dores" className="px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <RevealOnScroll>
          <h2 className="text-balance text-center font-heading text-2xl font-semibold text-branco-clareza sm:text-3xl">
            {painPoints.titulo}
          </h2>
        </RevealOnScroll>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {painPoints.cards.map((card, i) => (
            <RevealOnScroll key={card.texto} delayMs={(i % 3) * 90}>
              <div className="flex h-full items-start gap-3.5 rounded-card border border-white/10 bg-surface p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-laranja-impulso/15 text-laranja-impulso">
                  <Icon name={card.icon} className="h-5 w-5" />
                </span>
                <p className="pt-1.5 text-sm leading-relaxed text-branco-clareza/90 sm:text-base">{card.texto}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delayMs={200}>
          <p className="mx-auto mt-10 max-w-2xl text-balance text-center text-sm font-medium text-branco-clareza/85 sm:text-base">
            {painPoints.fechamento}
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
