import Image from "next/image";
import { cn } from "@/lib/utils";

// Ativos oficiais da marca (enviados pelo cliente), com proporção original preservada.
const ICON = { src: "/images/logo-icon.webp", width: 400, height: 431 }; // 469x505 original, reduzido
const FULL_DARK = { src: "/images/logo-full-dark.webp", width: 747, height: 182 };
const FULL_LIGHT = { src: "/images/logo-full-light.webp", width: 747, height: 182 };

type LogoProps = {
  variant?: "full" | "icon";
  /** Fundo sobre o qual a logo será exibida — escolhe a variante de contraste correta. */
  background?: "dark" | "light";
  className?: string;
  priority?: boolean;
};

export default function Logo({ variant = "full", background = "dark", className, priority = false }: LogoProps) {
  if (variant === "icon") {
    return (
      <span className={cn("inline-flex shrink-0", className)}>
        <Image
          src={ICON.src}
          width={ICON.width}
          height={ICON.height}
          alt="MiBusca Brasil"
          priority={priority}
          className="h-8 w-auto sm:h-9"
        />
      </span>
    );
  }

  const full = background === "light" ? FULL_LIGHT : FULL_DARK;

  return (
    <span className={cn("inline-flex", className)}>
      <Image
        src={full.src}
        width={full.width}
        height={full.height}
        alt="MiBusca Brasil — Gestão que gera resultados"
        priority={priority}
        className="h-8 w-auto sm:h-9"
      />
    </span>
  );
}
