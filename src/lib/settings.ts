import { prisma } from "@/lib/prisma";

/**
 * Busca a linha única de configurações. Se ainda não existir (primeira
 * execução antes do seed), cria a partir de variáveis de ambiente — isso
 * garante que a página nunca tenha o número de WhatsApp escrito no código,
 * apenas um valor inicial de bootstrap vindo do .env.
 */
export async function getSettings() {
  const existing = await prisma.settings.findUnique({ where: { id: "default" } });
  if (existing) return existing;

  return prisma.settings.create({
    data: {
      id: "default",
      whatsappNumber: process.env.WHATSAPP_NUMBER_DEFAULT ?? "5571993827236",
      metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || null,
      ga4Id: process.env.NEXT_PUBLIC_GA4_ID || null,
    },
  });
}
