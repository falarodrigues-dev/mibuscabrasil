import { about } from "@/lib/content";
import RevealOnScroll from "./RevealOnScroll";

export default function About() {
  return (
    <section id="sobre" data-section="sobre" className="px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <RevealOnScroll>
          <h2 className="text-balance font-heading text-2xl font-semibold text-branco-clareza sm:text-3xl">
            {about.titulo}
          </h2>
          <p className="mt-5 text-balance text-sm leading-relaxed text-branco-clareza/80 sm:text-base">
            {about.texto}
          </p>
          <p className="mt-6 inline-flex flex-wrap items-center justify-center gap-x-2 text-sm font-medium text-laranja-impulso">
            {about.credibilidade}
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
