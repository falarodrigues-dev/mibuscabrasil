import { cn } from "@/lib/utils";

const PATHS: Record<string, React.ReactNode> = {
  price: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 12.5c0 1.1 1 2 2.5 2 1.3 0 2.5-.7 2.5-1.8 0-2.4-5-1-5-3.4 0-1.1 1.2-1.8 2.5-1.8 1.5 0 2.5.9 2.5 2M12 6.5V8M12 16v1.5" />
    </>
  ),
  menu: (
    <>
      <path d="M4 6h16M4 12h16M4 18h10" />
    </>
  ),
  chart: (
    <>
      <path d="M4 19h16" />
      <rect x="6" y="12" width="3" height="7" />
      <rect x="11" y="8" width="3" height="11" />
      <rect x="16" y="4" width="3" height="15" />
    </>
  ),
  store: (
    <>
      <path d="M4 9.5 5.2 4h13.6L20 9.5" />
      <path d="M4 9.5a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0" />
      <path d="M5 9.8V20h14V9.8" />
      <path d="M10 20v-5.5a2 2 0 0 1 4 0V20" />
    </>
  ),
  tag: (
    <>
      <path d="M20 12.5 12.5 20 4 11.5V4h7.5L20 12.5Z" />
      <circle cx="8.2" cy="8.2" r="1.3" />
    </>
  ),
  percent: (
    <>
      <path d="M5 19 19 5" />
      <circle cx="7.5" cy="7.5" r="2.5" />
      <circle cx="16.5" cy="16.5" r="2.5" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.8" fill="currentColor" stroke="none" />
    </>
  ),
  star: (
    <>
      <path d="m12 4 2.4 5.1 5.6.6-4.2 3.8 1.2 5.5L12 16l-5 3 1.2-5.5-4.2-3.8 5.6-.6L12 4Z" />
    </>
  ),
  activity: (
    <>
      <path d="M3 12h4l2.5-7L14 19l2.5-7H21" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M6.5 17.5 4 20l2.6-2.3A8.5 8.5 0 1 0 4.2 12.3 8.4 8.4 0 0 0 6.5 17.5Z" />
      <path d="M9 9.7c0-.6.5-1.1 1-1.1s.7.3 1 .8.7 1.3.3 1.8-.7.6-.4 1.1a5 5 0 0 0 2.7 2.1c.5.2.7-.2 1-.5s.9-.5 1.3-.2.8.8.8 1.2-.6 1.1-1.2 1.3c-1 .3-2.6-.1-4.3-1.7S9 11.4 9 9.7Z" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  layers: (
    <>
      <path d="m12 4 8 4.2-8 4.2-8-4.2L12 4Z" />
      <path d="m4 12.7 8 4.2 8-4.2" />
      <path d="m4 16.7 8 4.2 8-4.2" />
    </>
  ),
  clipboard: (
    <>
      <rect x="6" y="4.5" width="12" height="16" rx="1.5" />
      <path d="M9 4.5V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v.5" />
      <path d="M9 11h6M9 14.5h6M9 17.5h3.5" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="9" r="3" />
      <path d="M3.5 19c0-3 2.5-5.2 5.5-5.2S14.5 16 14.5 19" />
      <circle cx="17" cy="9.5" r="2.4" />
      <path d="M16 13.8c2.4.3 4 2.3 4 5.2" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m19.5 19.5-4.3-4.3" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 3v4M12 17v4M4 12h4M16 12h4" />
      <path d="m6.5 6.5 2 2M15.5 15.5l2 2M17.5 6.5l-2 2M8.5 15.5l-2 2" />
    </>
  ),
  chevron: (
    <>
      <path d="m6 9 6 6 6-6" />
    </>
  ),
  check: (
    <>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </>
  ),
  arrowRight: (
    <>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </>
  ),
  building: (
    <>
      <path d="M6 20V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v14" />
      <path d="M12 10.5h5a1 1 0 0 1 1 1V20" />
      <path d="M8.5 8h.01M8.5 11.5h.01M8.5 15h.01" />
      <path d="M3 20h18" />
    </>
  ),
};

export type IconName = keyof typeof PATHS;

export default function Icon({
  name,
  className,
  strokeWidth = 1.8,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6", className)}
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
