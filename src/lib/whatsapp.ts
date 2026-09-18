export function fillWhatsappTemplate(
  template: string,
  data: { nome: string; loja: string; cidadeUf: string; plataformas?: string }
): string {
  return template
    .replaceAll("{nome}", data.nome)
    .replaceAll("{loja}", data.loja)
    .replaceAll("{cidade_uf}", data.cidadeUf)
    .replaceAll("{plataformas}", data.plataformas ?? "");
}

export function buildWhatsappLink(whatsappNumber: string, message: string): string {
  const digitsOnly = whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${digitsOnly}?text=${encodeURIComponent(message)}`;
}
