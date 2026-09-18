import { socialProof } from "@/lib/content";
import RevealOnScroll from "./RevealOnScroll";

export default function SocialProof() {
  return (
    <section
      id="prova-social"
      data-section="prova-social"
      className="border-y border-white/10 bg-surface px-4 py-14 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <RevealOnScroll>
          <h2 className="text-balance text-center font-heading text-2xl font-semibold text-branco-clareza sm:text-3xl">
            {socialProof.titulo}
          </h2>
        </RevealOnScroll>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {socialProof.numeros.map((item, i) => (
            <RevealOnScroll key={item.detalhe} delayMs={i * 100}>
              <div className="h-full rounded-card border border-white/10 bg-preto-direcao/60 p-6 text-center">
                <p className="font-heading text-4xl font-bold text-laranja-impulso sm:text-5xl">{item.valor}</p>
                <p className="mt-3 text-sm font-medium text-branco-clareza/95 sm:text-base">{item.rotulo}</p>
                <p className="mt-2 text-xs text-branco-clareza/60 sm:text-sm">{item.detalhe}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-branco-clareza/60 sm:text-sm">{socialProof.rodape}</p>
      </div>
    </section>
  );
}
