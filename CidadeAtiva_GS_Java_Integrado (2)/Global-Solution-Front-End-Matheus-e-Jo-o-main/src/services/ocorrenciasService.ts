import type {
  Bairro,
  Categoria,
  Cidadao,
  NovaOcorrencia,
  NovaPessoa,
  NovoBairro,
  Ocorrencia,
  StatusOcorrencia,
} from "../types/ocorrencia";

const apiUrl = (import.meta.env.VITE_API_URL || "https://cidadeativa-api-gs2026.onrender.com")
  .trim()
  .replace(/\/+$/, "");

interface OcorrenciaJava {
  id: number;
  cidadaoId: number;
  bairroId: number;
  categoriaId: number;
  descricao: string;
  endereco: string;
  prioridade: number;
  status: StatusOcorrencia;
  data?: string;
}

interface Referencias {
  categorias: Categoria[];
  bairros: Bairro[];
}

async function requisitar<T>(caminho: string, opcoes?: RequestInit): Promise<T> {
  let resposta: Response;

  try {
    resposta = await fetch(`${apiUrl}${caminho}`, {
      ...opcoes,
      headers: {
        Accept: "application/json",
        ...(opcoes?.body ? { "Content-Type": "application/json" } : {}),
        ...opcoes?.headers,
      },
    });
  } catch {
    throw new Error("Não foi possível acessar a API Java. Verifique se ela está ativa e se o CORS permite este site.");
  }

  if (!resposta.ok) {
    let mensagem = `Erro HTTP ${resposta.status} ao acessar ${caminho}.`;

    try {
      const erro = await resposta.json() as {
        message?: string;
        mensagem?: string;
        detail?: string;
      };

      mensagem = erro.message ?? erro.mensagem ?? erro.detail ?? mensagem;
    } catch {
      mensagem = `Erro HTTP ${resposta.status} ao acessar ${caminho}.`;
    }

    throw new Error(mensagem);
  }

  if (resposta.status === 204) {
    return undefined as T;
  }

  return resposta.json() as Promise<T>;
}

export function listarCategorias(): Promise<Categoria[]> {
  return requisitar<Categoria[]>("/categorias");
}

export function listarBairros(): Promise<Bairro[]> {
  return requisitar<Bairro[]>("/bairros");
}

export function listarCidadaos(): Promise<Cidadao[]> {
  return requisitar<Cidadao[]>("/cidadaos");
}

export function cadastrarCidadao(dados: NovaPessoa): Promise<Cidadao> {
  return requisitar<Cidadao>("/cidadaos", {
    method: "POST",
    body: JSON.stringify(dados),
  });
}

export function cadastrarBairro(dados: NovoBairro): Promise<Bairro> {
  return requisitar<Bairro>("/bairros", {
    method: "POST",
    body: JSON.stringify(dados),
  });
}

async function carregarReferencias(): Promise<Referencias> {
  const [categorias, bairros] = await Promise.all([
    listarCategorias(),
    listarBairros(),
  ]);

  return { categorias, bairros };
}

function adaptarOcorrencia(dados: OcorrenciaJava, referencias: Referencias): Ocorrencia {
  const categoria = referencias.categorias.find((item) => item.id === dados.categoriaId);
  const bairro = referencias.bairros.find((item) => item.id === dados.bairroId);
  const separador = " — ";
  const posicaoSeparador = dados.descricao.indexOf(separador);
  const titulo = posicaoSeparador > 0
    ? dados.descricao.slice(0, posicaoSeparador)
    : dados.descricao.slice(0, 70);
  const descricao = posicaoSeparador > 0
    ? dados.descricao.slice(posicaoSeparador + separador.length)
    : dados.descricao;

  return {
    id: dados.id,
    titulo,
    descricao,
    categoria: categoria?.nome ?? `Categoria #${dados.categoriaId}`,
    status: dados.status,
    endereco: dados.endereco,
    bairro: bairro?.nome ?? `Bairro #${dados.bairroId}`,
    cidade: bairro?.cidade ?? "Não informada",
    dataCriacao: dados.data,
    prioridade: dados.prioridade,
    cidadaoId: dados.cidadaoId,
  };
}

export async function listarOcorrencias(): Promise<Ocorrencia[]> {
  const [ocorrencias, referencias] = await Promise.all([
    requisitar<OcorrenciaJava[]>("/ocorrencias"),
    carregarReferencias(),
  ]);

  return ocorrencias.map((item) => adaptarOcorrencia(item, referencias));
}

export async function buscarOcorrencia(id: number): Promise<Ocorrencia> {
  const [ocorrencia, referencias] = await Promise.all([
    requisitar<OcorrenciaJava>(`/ocorrencias/${id}`),
    carregarReferencias(),
  ]);

  return adaptarOcorrencia(ocorrencia, referencias);
}

export async function cadastrarOcorrencia(dados: NovaOcorrencia): Promise<Ocorrencia> {
  const descricao = `${dados.titulo.trim()} — ${dados.descricao.trim()}`;

  const criada = await requisitar<OcorrenciaJava>("/ocorrencias", {
    method: "POST",
    body: JSON.stringify({
      cidadaoId: dados.cidadaoId,
      bairroId: dados.bairroId,
      categoriaId: dados.categoriaId,
      descricao,
      endereco: dados.endereco.trim(),
      prioridade: dados.prioridade,
    }),
  });

  const referencias = await carregarReferencias();
  return adaptarOcorrencia(criada, referencias);
}
