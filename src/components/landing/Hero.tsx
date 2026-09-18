import Icon from "@/components/icons/Icon";
import { hero } from "@/lib/content";
import CtaButton from "./CtaButton";
import LeadForm from "./LeadForm";
import RevealOnScroll from "./RevealOnScroll";

export default function Hero() {
  return (
    <section
      id="abertura"
      data-section="abertura"
      className="relative overflow-hidden px-4 pb-14 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:pb-28 lg:pt-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-[-10%] h-[420px] w-[420px] rounded-full bg-laranja-impulso/10 blur-3xl"
      />
      <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <RevealOnScroll>
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-laranja-impulso sm:text-sm">
            {hero.etiqueta}
          </p>
          <h1 className="text-balance font-heading text-3xl font-bold leading-[1.15] text-branco-clareza sm:text-4xl lg:text-5xl">
            Sua loja vende. Mas <span className="text-laranja-impulso">quanto realmente entra</span> no fim do mês?
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-branco-clareza/80 sm:text-lg">
            {hero.subtitulo}
          </p>

          <ul className="mt-7 space-y-3.5">
            {hero.beneficios.map((b) => (
              <li key={b.texto} className="flex items-start gap-3 text-sm sm:text-base">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-laranja-impulso/15 text-laranja-impulso">
                  <Icon name={b.icon} className="h-4.5 w-4.5" />
                </span>
                <span className="pt-1 text-branco-clareza/90">{b.texto}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <CtaButton ctaId="hero_principal">{hero.ctaPrincipal}</CtaButton>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delayMs={150} className="lg:justify-self-end lg:pt-2">
          <LeadForm />
        </RevealOnScroll>
      </div>
    </section>
  );
}
