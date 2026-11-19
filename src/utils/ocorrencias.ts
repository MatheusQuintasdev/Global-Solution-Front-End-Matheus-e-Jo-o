import type { CategoriaOcorrencia, StatusOcorrencia } from "../types/ocorrencia";

export const categorias: { valor: CategoriaOcorrencia; nome: string }[] = [
  { valor: "BURACO", nome: "Buracos nas vias" },
  { valor: "ILUMINACAO", nome: "Iluminação pública" },
  { valor: "LIXO", nome: "Lixo e descarte" },
  { valor: "ENCHENTE", nome: "Enchentes" },
  { valor: "ACESSIBILIDADE", nome: "Acessibilidade" },
  { valor: "OUTROS", nome: "Outros" },
];

export function nomeCategoria(categoria: CategoriaOcorrencia): string {
  return categorias.find((item) => item.valor === categoria)?.nome ?? categoria;
}

export function nomeStatus(status: StatusOcorrencia): string {
  const nomes: Record<StatusOcorrencia, string> = {
    ABERTA: "Aberta",
    EM_ANDAMENTO: "Em andamento",
    RESOLVIDA: "Resolvida",
  };

  return nomes[status] ?? status;
}

export function formatarData(valor?: string): string {
  if (!valor) {
    return "Data não informada";
  }

  const data = new Date(valor);

  if (Number.isNaN(data.getTime())) {
    return "Data não informada";
  }

  return data.toLocaleDateString("pt-BR");
}
