# MiBusca Brasil — Landing Page + Painel Admin

Implementação do prompt "Prompt de construção — Landing Page + Painel Admin | MiBusca Brasil".

**Status atual: Fase 1 concluída** — landing page pública, página de
obrigado, política de privacidade e as APIs de captação de leads/eventos.
O **painel administrativo (`/admin`) é a Fase 2** e ainda não foi
construído (ver seção "Roadmap / Fase 2" abaixo).

## Stack

- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- Prisma + Postgres (Supabase ou Neon em produção)
- Zod para validação de formulário/API

## Rodando localmente

```bash
npm install
cp .env.example .env
# edite .env com sua DATABASE_URL (Postgres) e demais variáveis
npx prisma migrate dev --name init
npm run db:seed
npm run dev
```

Acesse `http://localhost:3000`.

### Banco de dados local para desenvolvimento

O `schema.prisma` está configurado com `provider = "postgresql"`, como pede
o prompt. Se você não tiver um Postgres à mão para testar localmente, é
possível trocar temporariamente o provider para `"sqlite"` e usar
`DATABASE_URL="file:./dev.db"` só para desenvolvimento — lembre de reverter
para `"postgresql"` antes de rodar a migração contra Supabase/Neon e de
fazer commit. Em produção, use sempre Postgres (Supabase ou Neon).

## Estrutura de pastas

```
prisma/
  schema.prisma      # leads, events, sessions, settings, admin_users
  seed.ts            # cria a linha de configurações (WhatsApp, etc.)
src/
  app/
    page.tsx          # landing page ( / )
    obrigado/         # página de agradecimento + redirecionamento
    privacidade/       # política de privacidade (LGPD)
    api/leads/         # POST — captação de leads (etapa 1 e 2)
    api/events/        # POST — eventos de navegação (tracking)
  components/
    landing/           # seções da landing page
    icons/              # ícones SVG inline
  lib/
    content.ts          # copy oficial da página (extraída do prompt)
    prisma.ts            # client Prisma singleton
    settings.ts           # leitura das configurações (WhatsApp etc.)
    tracking.ts            # rastreamento client-side (sessão, eventos)
    validation.ts            # schemas Zod (leads e eventos)
    whatsapp.ts                # geração do link wa.me
    pixel.ts                    # eventos Meta Pixel / GA4 (Lead, Contact)
    rate-limit.ts                # rate limiting simples em memória
    utils.ts                      # máscara de telefone, sanitização, etc.
```

## Variáveis de ambiente

Veja `.env.example`. Resumo:

- `DATABASE_URL` — connection string Postgres (Supabase/Neon).
- `NEXT_PUBLIC_SITE_URL` — usada em metadata, OG e sitemap.
- `WHATSAPP_NUMBER_DEFAULT` — valor de bootstrap gravado na tabela
  `settings` apenas se ela ainda estiver vazia. O número de WhatsApp real
  usado pela página **sempre vem do banco**, nunca do código-fonte.
- `NEXT_PUBLIC_META_PIXEL_ID` / `NEXT_PUBLIC_GA4_ID` — opcionais; se
  vazios, os scripts de Meta Pixel e GA4 não são carregados.
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` / `ADMIN_SESSION_SECRET` — reservadas
  para a Fase 2 (painel administrativo).

## Decisões tomadas para pontos ambíguos do prompt

Conforme instrução do próprio prompt ("Se algum ponto ficar ambíguo,
implemente a opção mais simples que atenda ao requisito e registre a
decisão no README"):

1. **Logo**: os arquivos oficiais (PNG, com transparência) foram enviados
   pelo cliente e estão em `public/images/logo-icon.webp` (ícone "M" +
   seta, cor cheia), `public/images/logo-full-dark.webp` (logotipo
   completo para fundo escuro, usado no header/footer) e
   `public/images/logo-full-light.webp` (variante para fundo claro,
   reservada para uso futuro fora do site). `src/components/landing/Logo.tsx`
   renderiza esses arquivos via `next/image`. O favicon (`src/app/icon.png`)
   e a imagem usada no JSON-LD (`public/images/logo.png`) foram gerados a
   partir do ícone oficial sobre um fundo arredondado `#0C0C0C`.
2. **Print do depoimento**: a imagem enviada foi salva em
   `public/images/depoimento-valeria-dom-paolo.webp` (convertida para
   WebP, conforme requisito técnico de performance) e usada na Seção 5,
   junto com a citação também em HTML (texto real, não apenas imagem),
   como pedido no prompt.
3. **Número de WhatsApp**: `71 99382-7236` (formato E.164 salvo:
   `5571993827236`), gravado via seed na tabela `settings`. Ele não está
   escrito em nenhum componente — todos os pontos que precisam dele (rodapé
   de página de obrigado, link `wa.me`) leem de `getSettings()`.
4. **Botões de CTA do header e o botão fixo mobile**: o prompt lista, na
   seção 5, que o número de WhatsApp "alimenta... o botão do header, o
   botão fixo mobile [e] a página de obrigado", o que sugeriria link direto
   para o WhatsApp nesses dois pontos. Porém a seção 8 (regras não
   negociáveis) afirma que "todos os CTAs levam ao mesmo lugar: o
   formulário". Priorizei a regra não negociável: o CTA do header e o
   botão fixo mobile fazem *scroll* até o formulário (`#formulario`), e não
   abrem o WhatsApp diretamente. Apenas a página `/obrigado` usa o link
   `wa.me` direto, como está explícito na Seção 5 do prompt.
5. **CTA da Seção 9 em mobile**: implementado exatamente como descrito —
   no desktop rola até o formulário; no mobile abre o formulário dentro de
   um modal acessível (`LeadFormModal.tsx`), sem duplicar o `id="formulario"`
   no DOM.
6. **Rate limiting**: implementado em memória (por IP), suficiente para uma
   única instância/processo. Para múltiplas instâncias simultâneas em
   produção (ex.: várias regiões na Vercel), trocar por um store
   compartilhado (Redis/Upstash) — comentado no próprio arquivo
   `src/lib/rate-limit.ts`.
7. **Imagem do depoimento antes da primeira dobra**: como ela está na
   Seção 5 (bem abaixo da dobra inicial), foi carregada com `loading="lazy"`,
   conforme requisito técnico.

## Rastreamento implementado

- `session_id` (UUID) gerado no primeiro acesso e persistido em cookie de
  primeira parte (`mb_session`, 180 dias).
- Eventos registrados: `page_view`, `section_view` (uma vez por seção, via
  `IntersectionObserver` a 50%), `scroll_depth` (25/50/75/100%),
  `form_start`, `form_step_1_complete`, `form_submit`, `whatsapp_click`,
  `cta_click` (com identificação do CTA), `faq_open` (com a pergunta).
- Envio via `POST /api/events` com debounce (~700ms) e fallback para
  `navigator.sendBeacon` em `visibilitychange`/`beforeunload`, para não
  perder a última seção visualizada.
- Lead parcial (`parcial = true`) é salvo assim que a etapa 1 é concluída;
  a etapa 2 atualiza o mesmo registro e marca `parcial = false`.
- Duplicados são marcados (`duplicado = true`) quando já existe outro lead
  com o mesmo telefone.

## Segurança e conformidade

- Honeypot (`website`/`website2`) + tempo mínimo de preenchimento
  (1.5s) contra bots.
- Rate limiting nas rotas `/api/leads` e `/api/events`.
- Sanitização de entradas de texto livre (`sanitizeText`).
- `/obrigado` marcada como `noindex`; `/admin` (Fase 2) será bloqueada via
  `robots.ts` — já incluído preventivamente em `src/app/robots.ts`.
- Nenhum rastreamento de terceiros (Meta Pixel/GA4) é carregado sem os IDs
  configurados via variável de ambiente.
- LGPD: consentimento explícito no formulário (checkbox obrigatório) e
  política de privacidade real em `/privacidade`.

## Roadmap / Fase 2 (ainda não implementada)

- `/admin` protegido por login (cookie httpOnly), com:
  - Dashboard: métricas, funil visual, gráfico "onde o visitante parou",
    origem dos leads.
  - Tela de leads: tabela paginada/ordenável, busca, filtros, anotações,
    timeline de eventos por sessão, exportação CSV, marcação de
    duplicados.
  - Configurações: número de WhatsApp (editável), template de mensagem,
    tempo de redirecionamento, rodízio opcional de números, troca de senha.
- Seed de dados de exemplo (leads/eventos) para popular o painel.
