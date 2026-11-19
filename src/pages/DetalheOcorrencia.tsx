import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Feedback from "../components/Feedback";
import SectionTitle from "../components/SectionTitle";
import { buscarOcorrencia } from "../services/ocorrenciasService";
import type { Ocorrencia } from "../types/ocorrencia";
import { formatarData, nomeCategoria, nomeStatus } from "../utils/ocorrencias";

export default function DetalheOcorrencia() {
  const { id } = useParams<{ id: string }>();
  const [ocorrencia, setOcorrencia] = useState<Ocorrencia | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const identificador = Number(id);

    if (!Number.isInteger(identificador) || identificador <= 0) {
      setErro("Identificador inválido.");
      setCarregando(false);
      return;
    }

    let ativo = true;

    async function carregar() {
      try {
        const resultado = await buscarOcorrencia(identificador);

        if (ativo) setOcorrencia(resultado);
      } catch (error) {
        if (ativo) setErro(error instanceof Error ? error.message : "Falha ao carregar detalhes.");
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    void carregar();

    return () => {
      ativo = false;
    };
  }, [id]);

  return (
    <section className="container-site py-12 sm:py-16">
      <Link to="/ocorrencias" className="mb-7 inline-block font-semibold text-city-700 hover:underline">← Voltar para ocorrências</Link>
      <SectionTitle etiqueta="Detalhes da ocorrência" titulo={`Registro #${id ?? ""}`} descricao="Informações obtidas diretamente da API Java." />
      {carregando && <Feedback tipo="carregando" mensagem="Carregando detalhes da ocorrência..." />}
      {!carregando && erro && <Feedback tipo="erro" mensagem={erro} />}
      {!carregando && !erro && !ocorrencia && <Feedback tipo="vazio" mensagem="Ocorrência não encontrada." />}
      {!carregando && !erro && ocorrencia && (
        <article className="panel max-w-3xl space-y-6">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-city-50 px-3 py-1 text-sm font-semibold text-city-700">{nomeCategoria(ocorrencia.categoria)}</span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">{nomeStatus(ocorrencia.status)}</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">{ocorrencia.titulo}</h2>
          <p className="whitespace-pre-wrap leading-relaxed text-slate-700">{ocorrencia.descricao}</p>
          <dl className="grid gap-5 border-t border-slate-200 pt-6 sm:grid-cols-2">
            <div><dt className="text-sm text-slate-500">Endereço</dt><dd className="mt-1 font-semibold">{ocorrencia.endereco}</dd></div>
            <div><dt className="text-sm text-slate-500">Bairro</dt><dd className="mt-1 font-semibold">{ocorrencia.bairro}</dd></div>
            <div><dt className="text-sm text-slate-500">Cidade</dt><dd className="mt-1 font-semibold">{ocorrencia.cidade}</dd></div>
            <div><dt className="text-sm text-slate-500">Prioridade</dt><dd className="mt-1 font-semibold">{ocorrencia.prioridade}/5</dd></div>
            <div><dt className="text-sm text-slate-500">Data do registro</dt><dd className="mt-1 font-semibold">{formatarData(ocorrencia.dataCriacao)}</dd></div>
          </dl>
        </article>
      )}
    </section>
  );
}
