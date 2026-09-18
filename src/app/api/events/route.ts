import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { eventsBatchSchema } from "@/lib/validation";
import { detectDevice } from "@/lib/utils";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  if (isRateLimited(`events:${ip}`, 120, 60_000)) {
    return NextResponse.json({ error: "Muitas requisições" }, { status: 429 });
  }

  let json: unknown;
  try {
    // sendBeacon costuma enviar text/plain; o body ainda é um JSON string.
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const parsed = eventsBatchSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  const events = Array.isArray(parsed.data) ? parsed.data : [parsed.data];
  if (events.length === 0) {
    return NextResponse.json({ ok: true });
  }

  const device = detectDevice(req.headers.get("user-agent"));
  const sessionId = events[0]!.sessionId;
  const first = events[0]!;

  await prisma.session.upsert({
    where: { id: sessionId },
    create: {
      id: sessionId,
      utmSource: first.utmSource ?? undefined,
      utmMedium: first.utmMedium ?? undefined,
      utmCampaign: first.utmCampaign ?? undefined,
      utmContent: first.utmContent ?? undefined,
      utmTerm: first.utmTerm ?? undefined,
      fbclid: first.fbclid ?? undefined,
      gclid: first.gclid ?? undefined,
      referrer: first.referrer ?? undefined,
      pageUrl: first.pageUrl ?? undefined,
      device: first.device ?? device,
      userAgent: req.headers.get("user-agent") ?? undefined,
      lastSection: first.lastSection ?? undefined,
      maxScrollDepth: first.maxScrollDepth ?? 0,
      timeOnPageMs: first.timeOnPageMs ?? 0,
    },
    update: {
      lastSection: events.at(-1)?.lastSection ?? undefined,
      maxScrollDepth: Math.max(...events.map((e) => e.maxScrollDepth ?? 0)),
      timeOnPageMs: Math.max(...events.map((e) => e.timeOnPageMs ?? 0)),
    },
  });

  await prisma.event.createMany({
    data: events.map((e) => ({
      sessionId: e.sessionId,
      type: e.type,
      metadata: (e.metadata as any) ?? undefined,
    })),
  });

  return NextResponse.json({ ok: true });
}
