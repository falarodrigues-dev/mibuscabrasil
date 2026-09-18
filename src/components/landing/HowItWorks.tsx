import { howItWorks } from "@/lib/content";
import RevealOnScroll from "./RevealOnScroll";

export default function HowItWorks() {
  return (
    <section
      id="como-funciona"
      data-section="como-funciona"
      className="border-y border-white/10 bg-surface px-4 py-14 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-5xl">
        <RevealOnScroll>
          <h2 className="text-balance text-center font-heading text-2xl font-semibold text-branco-clareza sm:text-3xl">
            {howItWorks.titulo}
          </h2>
        </RevealOnScroll>

        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.passos.map((passo, i) => (
            <RevealOnScroll key={passo.titulo} as="li" delayMs={i * 100}>
              <div className="h-full rounded-card border border-white/10 bg-preto-direcao/60 p-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-laranja-impulso font-heading text-sm font-bold text-preto-direcao">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-heading text-sm font-semibold text-branco-clareza sm:text-base">
                  {passo.titulo}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-branco-clareza/70 sm:text-sm">{passo.texto}</p>
              </div>
            </RevealOnScroll>
          ))}
        </ol>
      </div>
    </section>
  );
}
