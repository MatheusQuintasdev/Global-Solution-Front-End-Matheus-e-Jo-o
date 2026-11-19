export type CategoriaOcorrencia =
  | "BURACO"
  | "ILUMINACAO"
  | "LIXO"
  | "ENCHENTE"
  | "ACESSIBILIDADE"
  | "OUTROS";

export type StatusOcorrencia = "ABERTA" | "EM_ANDAMENTO" | "RESOLVIDA";

export interface Ocorrencia {
  id: number;
  titulo: string;
  descricao: string;
  categoria: CategoriaOcorrencia;
  status: StatusOcorrencia;
  endereco: string;
  bairro: string;
  cidade: string;
  dataCriacao?: string;
}

export interface NovaOcorrencia {
  titulo: string;
  descricao: string;
  categoria: CategoriaOcorrencia;
  endereco: string;
  bairro: string;
  cidade: string;
}
