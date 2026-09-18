// TODO(logo-real): Este é um placeholder reconstruído a partir da descrição do
// manual de marca ("M" com seta ascendente integrada + seta ao final do nome).
// Assim que o arquivo SVG oficial da MiBusca for enviado, substitua o <svg> do
// ícone abaixo pelo arquivo real (mantendo o viewBox e o uso de currentColor
// onde fizer sentido para permitir a variante clara/escura).
import { cn } from "@/lib/utils";

type LogoProps = {
  variant?: "full" | "icon";
  className?: string;
  monochrome?: "light" | "dark" | null;
};

export default function Logo({ variant = "full", className, monochrome = null }: LogoProps) {
  const accent = monochrome ? "currentColor" : "#FF6400";
  const wordColor = monochrome === "dark" ? "#0C0C0C" : "#F9F9F9";

  const icon = (
    <svg
      width="36"
      height="36"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M4 32V10.5C4 9.4 5.3 8.8 6.1 9.6L14 17.5C14.6 18.1 15.5 18.1 16.1 17.5L19.4 14.2"
        stroke={monochrome ? wordColor : "#F9F9F9"}
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 32V17L27.8 22.8C28.4 23.4 29.3 23.4 29.9 22.8L36 16.7"
        stroke={accent}
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M29 8L36.5 8.4C37 8.4 37.4 8.9 37.3 9.4L36 16.7"
        stroke={accent}
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  if (variant === "icon") {
    return <span className={cn("inline-flex", className)}>{icon}</span>;
  }

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      {icon}
      <span className="flex items-baseline font-heading font-bold tracking-tight text-lg sm:text-xl" style={{ color: wordColor }}>
        mibusca
        <span style={{ color: accent }}>brasil</span>
      </span>
    </span>
  );
}
