import Logo from "./Logo";
import { brand, footer } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center">
        <Logo />
        <p className="text-sm font-medium text-laranja-impulso">{brand.assinatura}</p>
        <p className="max-w-md text-xs text-branco-clareza/60 sm:text-sm">{footer.linhaDescritiva}</p>
        <div className="flex items-center gap-4 text-xs text-branco-clareza/70 sm:text-sm">
          <a href="/privacidade" className="underline decoration-laranja-impulso/50 underline-offset-2">
            Política de privacidade
          </a>
          <span aria-hidden="true">·</span>
          <a
            href="https://www.instagram.com/mibuscabrasil"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-laranja-impulso/50 underline-offset-2"
          >
            Instagram
          </a>
        </div>
        <p className="mt-4 text-xs text-branco-clareza/40">{footer.copyright}</p>
      </div>
    </footer>
  );
}
