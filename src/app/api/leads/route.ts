import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { leadStep1Schema, leadStep2Schema } from "@/lib/validation";
import { sanitizeText, detectDevice } from "@/lib/utils";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";

const MIN_FILL_TIME_MS = 1500; // anti-bot: bloqueia envios "instantâneos"

const step1Body = leadStep1Schema.extend({ step: z.literal(1) });
const step2Body = leadStep2Schema.extend({ step: z.literal(2) });
const bodySchema = z.union([step1Body, step2Body]);

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  if (isRateLimited(`leads:${ip}`, 10, 60_000)) {
    return NextResponse.json({ error: "Muitas tentativas. Tente novamente em instantes." }, { status: 429 });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Dados inválidos", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const data = parsed.data;

  // Honeypot + tempo mínimo de preenchimento (anti-bot)
  if (data.honeypot) {
    return NextResponse.json({ ok: true, leadId: "ignored" }); // resposta neutra para não alertar bots
  }
  if (Date.now() - data.formStartedAt < MIN_FILL_TIME_MS) {
    return NextResponse.json({ error: "Envio muito rápido, tente novamente." }, { status: 400 });
  }

  const device = detectDevice(req.headers.get("user-agent"));

  if (data.step === 1) {
    const session = await prisma.session.findUnique({ where: { id: data.sessionId } });
    if (!session) {
      return NextResponse.json({ error: "Sessão inválida" }, { status: 400 });
    }

    const lead = await prisma.lead.create({
      data: {
        nome: sanitizeText(data.nome, 120),
        whatsapp: data.whatsapp,
        nomeLoja: sanitizeText(data.nomeLoja, 120),
        parcial: true,
        sessionId: data.sessionId,
        utmSource: data.utmSource ?? session.utmSource,
        utmMedium: data.utmMedium ?? session.utmMedium,
        utmCampaign: data.utmCampaign ?? session.utmCampaign,
        utmContent: data.utmContent ?? session.utmContent,
        utmTerm: data.utmTerm ?? session.utmTerm,
        fbclid: data.fbclid ?? session.fbclid,
        gclid: data.gclid ?? session.gclid,
        referrer: data.referrer ?? session.referrer,
        pageUrl: data.pageUrl ?? session.pageUrl,
        device: data.device ?? device,
      },
    });

    await prisma.event.create({
      data: { sessionId: data.sessionId, type: "form_step_1_complete", metadata: { leadId: lead.id } },
    });

    return NextResponse.json({ ok: true, leadId: lead.id });
  }

  // step === 2
  const existing = await prisma.lead.findUnique({ where: { id: data.leadId } });
  if (!existing) {
    return NextResponse.json({ error: "Lead não encontrado" }, { status: 404 });
  }

  const duplicado = await prisma.lead.findFirst({
    where: { whatsapp: existing.whatsapp, id: { not: existing.id } },
    select: { id: true },
  });

  const lead = await prisma.lead.update({
    where: { id: data.leadId },
    data: {
      cidadeUf: sanitizeText(data.cidadeUf, 120),
      plataformas: data.plataformas,
      faturamentoMensal: data.faturamentoMensal,
      dificuldadePrincipal: data.dificuldadePrincipal,
      consentimentoWhatsapp: data.consentimentoWhatsapp,
      parcial: false,
      duplicado: Boolean(duplicado),
    },
  });

  if (existing.sessionId) {
    await prisma.event.create({
      data: { sessionId: existing.sessionId, type: "form_submit", metadata: { leadId: lead.id } },
    });
  }

  return NextResponse.json({ ok: true, leadId: lead.id });
}
