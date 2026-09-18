import type { Metadata } from "next";
import { Poppins, Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-poppins",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-montserrat",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mibusca.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "MiBusca Brasil · Gestão de iFood, 99Food e Keeta",
  description:
    "A MiBusca assume a gestão das suas operações no iFood, 99Food e Keeta para aumentar pedidos, organizar preços e proteger o valor que é repassado para a sua loja.",
  openGraph: {
    title: "MiBusca Brasil · Gestão de iFood, 99Food e Keeta",
    description:
      "A MiBusca assume a gestão das suas operações no iFood, 99Food e Keeta para aumentar pedidos, organizar preços e proteger o valor que é repassado para a sua loja.",
    url: siteUrl,
    siteName: "MiBusca Brasil",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/images/og-mibusca.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MiBusca Brasil · Gestão de iFood, 99Food e Keeta",
    description:
      "A MiBusca assume a gestão das suas operações no iFood, 99Food e Keeta para aumentar pedidos, organizar preços e proteger o valor que é repassado para a sua loja.",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MiBusca Brasil",
  url: siteUrl,
  logo: `${siteUrl}/images/logo.png`,
  sameAs: ["https://www.instagram.com/mibuscabrasil"],
  areaServed: "BR",
  description: "Gestão estratégica de operações de delivery no iFood, 99Food e Keeta.",
};

const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const ga4Id = process.env.NEXT_PUBLIC_GA4_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${poppins.variable} ${montserrat.variable}`}>
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="font-body antialiased bg-preto-direcao text-branco-clareza">
        <Script id="datalayer-init" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];`}
        </Script>

        {ga4Id ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`} strategy="afterInteractive" />
            <Script id="ga4-init" strategy="afterInteractive">
              {`function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${ga4Id}');`}
            </Script>
          </>
        ) : null}

        {metaPixelId ? (
          <Script id="meta-pixel-init" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
              n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
              document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${metaPixelId}');
              fbq('track', 'PageView');
            `}
          </Script>
        ) : null}

        {children}
      </body>
    </html>
  );
}
