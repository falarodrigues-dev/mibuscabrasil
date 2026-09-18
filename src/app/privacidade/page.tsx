import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "Política de Privacidade · MiBusca Brasil",
  description: "Como a MiBusca Brasil coleta, usa e protege os dados informados no formulário do site.",
};

export default function PrivacidadePage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
        <h1 className="font-heading text-2xl font-bold text-branco-clareza sm:text-3xl">Política de Privacidade</h1>
        <p className="mt-2 text-sm text-branco-clareza/60">Última atualização: 18 de setembro de 2026</p>

        <div className="prose-invert mt-8 space-y-8 text-sm leading-relaxed text-branco-clareza/85 sm:text-base">
          <section>
            <h2 className="font-heading text-lg font-semibold text-branco-clareza">1. Quem somos</h2>
            <p className="mt-2">
              A MiBusca Brasil ("MiBusca", "nós") presta serviços de gestão estratégica de operações de delivery em
              plataformas como iFood, 99Food e Keeta para negócios do setor alimentício, com base em Salvador/BA e
              atendimento em todo o território nacional. Esta política explica como tratamos os dados pessoais
              informados por você ao preencher o formulário de contato deste site.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-branco-clareza">2. Quais dados coletamos</h2>
            <p className="mt-2">Ao preencher o formulário, coletamos:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Nome completo, WhatsApp e nome da loja (etapa 1);</li>
              <li>
                Cidade/UF, plataformas em que atua, faixa de faturamento aproximado e principal dificuldade relatada
                (etapa 2);
              </li>
              <li>
                Dados técnicos de navegação: páginas e seções visualizadas, profundidade de rolagem, tempo na
                página, origem do acesso (UTMs, cliques em anúncios), tipo de dispositivo e um identificador de
                sessão anônimo salvo em cookie.
              </li>
            </ul>
            <p className="mt-2">
              Não solicitamos CNPJ, e-mail nem informações sobre disposição financeira para investir no formulário
              deste site.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-branco-clareza">3. Finalidade do tratamento</h2>
            <p className="mt-2">Usamos esses dados exclusivamente para:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Entrar em contato pelo WhatsApp informado e apresentar nossos serviços de gestão de delivery;</li>
              <li>Entender o cenário atual da sua loja para preparar diagnóstico e proposta comercial;</li>
              <li>
                Entender, de forma agregada, como os visitantes navegam pela página, para melhorar sua clareza e
                desempenho.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-branco-clareza">4. Base legal</h2>
            <p className="mt-2">
              O tratamento dos dados fornecidos no formulário é realizado com base no seu{" "}
              <strong>consentimento</strong> (art. 7º, I, da LGPD), manifestado ao marcar a caixa "Autorizo a
              MiBusca a entrar em contato pelo WhatsApp informado" antes do envio. Dados técnicos de navegação são
              tratados com base no <strong>legítimo interesse</strong> (art. 7º, IX, da LGPD) em entender e melhorar
              a experiência do site, sempre de forma proporcional e sem uso para finalidade distinta da aqui
              descrita. Não realizamos rastreamento de terceiros (como pixels de anúncios) antes do seu
              consentimento.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-branco-clareza">5. Com quem compartilhamos</h2>
            <p className="mt-2">
              Seus dados não são vendidos. Podem ser acessados pela equipe comercial da MiBusca responsável pelo
              atendimento e por prestadores de infraestrutura (hospedagem e banco de dados) estritamente para
              viabilizar o funcionamento do site e do atendimento, sob obrigação contratual de confidencialidade.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-branco-clareza">6. Retenção</h2>
            <p className="mt-2">
              Mantemos os dados do formulário enquanto durar a negociação/relacionamento comercial e por até 24
              meses após o último contato, para fins de histórico comercial e cumprimento de obrigações legais.
              Dados de navegação vinculados à sessão são mantidos por até 12 meses. Após esses períodos, os dados
              são anonimizados ou excluídos, salvo obrigação legal de retenção por prazo maior.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-branco-clareza">7. Seus direitos</h2>
            <p className="mt-2">
              Você pode, a qualquer momento, solicitar a confirmação da existência de tratamento, acesso,
              correção, anonimização, portabilidade ou exclusão dos seus dados, bem como revogar o consentimento
              dado. Para exercer qualquer desses direitos, entre em contato pelo WhatsApp informado nesta página ou
              pelo Instagram{" "}
              <a
                href="https://www.instagram.com/mibuscabrasil"
                target="_blank"
                rel="noopener noreferrer"
                className="text-laranja-impulso underline underline-offset-2"
              >
                @mibuscabrasil
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-branco-clareza">8. Segurança</h2>
            <p className="mt-2">
              Adotamos medidas técnicas razoáveis para proteger os dados coletados, incluindo conexão criptografada
              (HTTPS), limitação de tentativas de envio do formulário, proteção contra preenchimento automatizado
              (bots) e controle de acesso ao painel administrativo por login e senha.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-branco-clareza">9. Alterações desta política</h2>
            <p className="mt-2">
              Esta política pode ser atualizada periodicamente para refletir melhorias no site ou mudanças legais.
              A data da última atualização está indicada no topo desta página.
            </p>
          </section>
        </div>

        <Link href="/" className="mt-10 inline-block text-sm text-laranja-impulso underline underline-offset-2">
          ← Voltar para a página inicial
        </Link>
      </main>
      <Footer />
    </>
  );
}
