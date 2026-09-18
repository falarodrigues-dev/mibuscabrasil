import Logo from "./Logo";
import CtaButton from "./CtaButton";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-preto-direcao/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="/" className="flex items-center" aria-label="MiBusca Brasil">
          <Logo />
        </a>
        <CtaButton ctaId="header" className="!px-4 !py-2.5 text-xs sm:!px-6 sm:!py-3 sm:text-sm">
          Falar com especialista
        </CtaButton>
      </div>
    </header>
  );
}
