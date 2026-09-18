import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.settings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      // Número real informado para a Fase 1 (landing page). Editável pelo
      // painel administrativo assim que a Fase 2 for construída.
      whatsappNumber: "5571993827236",
      mensagemTemplate:
        "Olá! Sou {nome}, da loja {loja}, em {cidade_uf}. Preenchi o formulário no site e quero falar sobre a gestão do meu delivery.",
      redirectSeconds: 3,
    },
  });

  console.log("Seed concluído: settings (WhatsApp) criado/atualizado.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
