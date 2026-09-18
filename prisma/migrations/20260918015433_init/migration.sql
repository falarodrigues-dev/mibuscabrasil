-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('Novo', 'Em_contato', 'Qualificado', 'Fechado', 'Perdido', 'Fora_do_perfil');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('page_view', 'section_view', 'scroll_depth', 'form_start', 'form_step_1_complete', 'form_submit', 'whatsapp_click', 'cta_click', 'faq_open');

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastSection" TEXT,
    "maxScrollDepth" INTEGER NOT NULL DEFAULT 0,
    "timeOnPageMs" INTEGER NOT NULL DEFAULT 0,
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    "utmContent" TEXT,
    "utmTerm" TEXT,
    "fbclid" TEXT,
    "gclid" TEXT,
    "referrer" TEXT,
    "pageUrl" TEXT,
    "device" TEXT,
    "userAgent" TEXT,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "EventType" NOT NULL,
    "metadata" JSONB,
    "sessionId" TEXT NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leads" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "LeadStatus" NOT NULL DEFAULT 'Novo',
    "parcial" BOOLEAN NOT NULL DEFAULT true,
    "nome" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "nomeLoja" TEXT NOT NULL,
    "cidadeUf" TEXT,
    "plataformas" JSONB,
    "faturamentoMensal" TEXT,
    "dificuldadePrincipal" TEXT,
    "consentimentoWhatsapp" BOOLEAN NOT NULL DEFAULT false,
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    "utmContent" TEXT,
    "utmTerm" TEXT,
    "fbclid" TEXT,
    "gclid" TEXT,
    "referrer" TEXT,
    "pageUrl" TEXT,
    "device" TEXT,
    "sessionId" TEXT,
    "anotacoes" TEXT,
    "duplicado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "leads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "settings" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "whatsappNumber" TEXT NOT NULL,
    "mensagemTemplate" TEXT NOT NULL DEFAULT 'Olá! Sou {nome}, da loja {loja}, em {cidade_uf}. Preenchi o formulário no site e quero falar sobre a gestão do meu delivery.',
    "redirectSeconds" INTEGER NOT NULL DEFAULT 3,
    "numerosRotacao" JSONB,
    "rotacaoAtiva" BOOLEAN NOT NULL DEFAULT false,
    "metaPixelId" TEXT,
    "ga4Id" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "events_sessionId_idx" ON "events"("sessionId");

-- CreateIndex
CREATE INDEX "events_type_idx" ON "events"("type");

-- CreateIndex
CREATE INDEX "leads_status_idx" ON "leads"("status");

-- CreateIndex
CREATE INDEX "leads_whatsapp_idx" ON "leads"("whatsapp");

-- CreateIndex
CREATE INDEX "leads_createdAt_idx" ON "leads"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "admin_users_email_key" ON "admin_users"("email");

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "sessions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
