import { z } from "zod";

export const PLATAFORMAS = ["ifood", "99food", "keeta", "nenhuma"] as const;

export const FATURAMENTO_OPCOES = [
  "Até R$ 10 mil",
  "R$ 10 mil a R$ 30 mil",
  "R$ 30 mil a R$ 60 mil",
  "R$ 60 mil a R$ 100 mil",
  "Acima de R$ 100 mil",
  "Ainda não faturo",
] as const;

export const DIFICULDADE_OPCOES = [
  "Vender mais",
  "Melhorar o repasse e a margem",
  "Organizar o cardápio",
  "Entender promoções e taxas",
  "Começar a operar nas plataformas",
  "Outro",
] as const;

const whatsappRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;

export const leadStep1Schema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome completo").max(120),
  whatsapp: z
    .string()
    .regex(whatsappRegex, "Informe um WhatsApp válido com DDD"),
  nomeLoja: z.string().trim().min(2, "Informe o nome da loja").max(120),
  sessionId: z.string().uuid(),
  // Campos ocultos de rastreamento
  utmSource: z.string().optional().nullable(),
  utmMedium: z.string().optional().nullable(),
  utmCampaign: z.string().optional().nullable(),
  utmContent: z.string().optional().nullable(),
  utmTerm: z.string().optional().nullable(),
  fbclid: z.string().optional().nullable(),
  gclid: z.string().optional().nullable(),
  referrer: z.string().optional().nullable(),
  pageUrl: z.string().optional().nullable(),
  device: z.string().optional().nullable(),
  // Anti-spam
  honeypot: z.string().max(0).optional().or(z.literal("")),
  formStartedAt: z.number(),
});

export const leadStep2Schema = z.object({
  leadId: z.string().uuid(),
  cidadeUf: z.string().trim().min(2, "Informe cidade/UF").max(120),
  plataformas: z
    .array(z.enum(PLATAFORMAS))
    .min(1, "Selecione ao menos uma opção"),
  faturamentoMensal: z.enum(FATURAMENTO_OPCOES),
  dificuldadePrincipal: z.enum(DIFICULDADE_OPCOES),
  consentimentoWhatsapp: z.literal(true, {
    errorMap: () => ({ message: "É necessário autorizar o contato pelo WhatsApp" }),
  }),
  honeypot: z.string().max(0).optional().or(z.literal("")),
  formStartedAt: z.number(),
});

export const eventSchema = z.object({
  sessionId: z.string().uuid(),
  type: z.enum([
    "page_view",
    "section_view",
    "scroll_depth",
    "form_start",
    "form_step_1_complete",
    "form_submit",
    "whatsapp_click",
    "cta_click",
    "faq_open",
  ]),
  metadata: z.record(z.unknown()).optional(),
  utmSource: z.string().optional().nullable(),
  utmMedium: z.string().optional().nullable(),
  utmCampaign: z.string().optional().nullable(),
  utmContent: z.string().optional().nullable(),
  utmTerm: z.string().optional().nullable(),
  fbclid: z.string().optional().nullable(),
  gclid: z.string().optional().nullable(),
  referrer: z.string().optional().nullable(),
  pageUrl: z.string().optional().nullable(),
  device: z.string().optional().nullable(),
  lastSection: z.string().optional().nullable(),
  maxScrollDepth: z.number().optional().nullable(),
  timeOnPageMs: z.number().optional().nullable(),
});

export const eventsBatchSchema = z.union([eventSchema, z.array(eventSchema)]);
