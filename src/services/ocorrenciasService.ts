import type { NovaOcorrencia, Ocorrencia } from "../types/ocorrencia";

const baseUrl = (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");
const path = import.meta.env.VITE_API_OCORRENCIAS_PATH ?? "/api/ocorrencias";

function obterUrl(sufixo = ""): string {
  if (!baseUrl) {
    throw new Error("API não configurada. Defina VITE_API_URL no arquivo .env ou na Vercel.");
  }

  return `${baseUrl}${path}${sufixo}`;
}

async function requisitar<T>(url: string, opcoes?: RequestInit): Promise<T> {
  let resposta: Response;

  try {
    resposta = await fetch(url, {
      ...opcoes,
      headers: {
        "Content-Type": "application/json",
        ...opcoes?.headers,
      },
    });
  } catch {
    throw new Error("Não foi possível conectar à API Java. Verifique a URL, o servidor e o CORS.");
  }

  if (!resposta.ok) {
    let mensagem = `A API retornou o erro HTTP ${resposta.status}.`;

    try {
      const erro = await resposta.json() as { message?: string; mensagem?: string };
      mensagem = erro.message ?? erro.mensagem ?? mensagem;
    } catch {
      // Mantém a mensagem padrão quando o servidor não envia JSON.
    }

    throw new Error(mensagem);
  }

  if (resposta.status === 204) {
    return undefined as T;
  }

  return resposta.json() as Promise<T>;
}

export function listarOcorrencias(): Promise<Ocorrencia[]> {
  return requisitar<Ocorrencia[]>(obterUrl());
}

export function buscarOcorrencia(id: number): Promise<Ocorrencia> {
  return requisitar<Ocorrencia>(obterUrl(`/${id}`));
}

export function cadastrarOcorrencia(dados: NovaOcorrencia): Promise<Ocorrencia> {
  return requisitar<Ocorrencia>(obterUrl(), {
    method: "POST",
    body: JSON.stringify(dados),
  });
}
