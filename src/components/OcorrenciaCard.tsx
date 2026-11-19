import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import type { Ocorrencia } from "../types/ocorrencia";
import { formatarData, nomeCategoria, nomeStatus } from "../utils/ocorrencias";

interface OcorrenciaCardProps {
  ocorrencia: Ocorrencia;
}

export default function OcorrenciaCard({ ocorrencia }: OcorrenciaCardProps) {
  return (
    <article className="panel flex h-full flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="rounded-full bg-city-50 px-3 py-1 font-bold text-city-700">
          {nomeCategoria(ocorrencia.categoria)}
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-700">
          {nomeStatus(ocorrencia.status)}
        </span>
      </div>
      <h2 className="text-lg font-bold text-slate-900">{ocorrencia.titulo}</h2>
      <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600">{ocorrencia.descricao}</p>
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <MapPin size={16} aria-hidden="true" />
        <span>{ocorrencia.bairro}, {ocorrencia.cidade}</span>
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-3 text-sm">
        <span className="text-slate-500">{formatarData(ocorrencia.dataCriacao)}</span>
        <Link to={`/ocorrencias/${ocorrencia.id}`} className="inline-flex items-center gap-1 font-bold text-city-700 hover:underline">
          Detalhes <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
