import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import SocialProof from "@/components/landing/SocialProof";
import PainPoints from "@/components/landing/PainPoints";
import Services from "@/components/landing/Services";
import CasesDetailed from "@/components/landing/CasesDetailed";
import HowItWorks from "@/components/landing/HowItWorks";
import About from "@/components/landing/About";
import Faq from "@/components/landing/Faq";
import FinalCta from "@/components/landing/FinalCta";
import Footer from "@/components/landing/Footer";
import StickyMobileCta from "@/components/landing/StickyMobileCta";
import PageTracking from "@/components/landing/PageTracking";
import { faq } from "@/lib/content";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.perguntas.map((item) => ({
    "@type": "Question",
    name: item.pergunta,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.resposta,
    },
  })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PageTracking />
      <Header />
      <main>
        <Hero />
        <SocialProof />
        <PainPoints />
        <Services />
        <CasesDetailed />
        <HowItWorks />
        <About />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  );
}
