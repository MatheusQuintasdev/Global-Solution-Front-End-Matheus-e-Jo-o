export type StatusOcorrencia = "PENDENTE" | "EM_ANALISE" | "RESOLVIDA";

export interface Categoria {
  id: number;
  nome: string;
  descricao?: string;
}

export interface Bairro {
  id: number;
  nome: string;
  cidade: string;
}

export interface Cidadao {
  id: number;
  nome: string;
}

export interface Ocorrencia {
  id: number;
  titulo: string;
  descricao: string;
  categoria: string;
  status: StatusOcorrencia;
  endereco: string;
  bairro: string;
  cidade: string;
  dataCriacao?: string;
  prioridade: number;
  cidadaoId: number;
}

export interface NovaOcorrencia {
  titulo: string;
  descricao: string;
  categoriaId: number;
  bairroId: number;
  cidadaoId: number;
  endereco: string;
  prioridade: number;
}

export interface NovaPessoa {
  nome: string;
  email: string;
}

export interface NovoBairro {
  nome: string;
  cidade: string;
}
