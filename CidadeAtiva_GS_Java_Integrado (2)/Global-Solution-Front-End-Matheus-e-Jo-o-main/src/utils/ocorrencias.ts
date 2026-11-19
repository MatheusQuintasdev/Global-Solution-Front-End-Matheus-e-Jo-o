import type { StatusOcorrencia } from "../types/ocorrencia";

export function nomeCategoria(categoria: string): string {
  return categoria;
}

export function nomeStatus(status: StatusOcorrencia): string {
  const nomes: Record<StatusOcorrencia, string> = {
    PENDENTE: "Pendente",
    EM_ANALISE: "Em análise",
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
