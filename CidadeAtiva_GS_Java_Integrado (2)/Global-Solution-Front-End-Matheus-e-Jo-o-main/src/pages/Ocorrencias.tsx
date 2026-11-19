import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Feedback from "../components/Feedback";
import OcorrenciaCard from "../components/OcorrenciaCard";
import SectionTitle from "../components/SectionTitle";
import { listarCategorias, listarOcorrencias } from "../services/ocorrenciasService";
import type { Ocorrencia } from "../types/ocorrencia";


export default function Ocorrencias() {
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("TODAS");
  const [categorias, setCategorias] = useState<string[]>([]);

  const carregar = useCallback(async () => {
    setCarregando(true);
    setErro("");

    try {
      const resultado = await listarOcorrencias();

      if (!Array.isArray(resultado)) {
        throw new Error("Formato inválido da API: era esperada uma lista de ocorrências.");
      }

      setOcorrencias(resultado);
    } catch (error) {
      setErro(error instanceof Error ? error.message : "Erro ao consultar as ocorrências.");
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    void carregar();

    listarCategorias()
      .then((resultado) => setCategorias(resultado.map((item) => item.nome)))
      .catch(() => setCategorias([]));
  }, [carregar]);

  const filtradas = useMemo(() => {
    return ocorrencias.filter((ocorrencia) => {
      const texto = `${ocorrencia.titulo} ${ocorrencia.bairro} ${ocorrencia.cidade}`.toLowerCase();
      const correspondeBusca = texto.includes(busca.trim().toLowerCase());
      const correspondeCategoria = categoria === "TODAS" || ocorrencia.categoria === categoria;

      return correspondeBusca && correspondeCategoria;
    });
  }, [ocorrencias, busca, categoria]);

  return (
    <section className="container-site py-12 sm:py-16">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
        <SectionTitle etiqueta="Acompanhe sua cidade" titulo="Ocorrências urbanas" descricao="Consulte informações vindas diretamente da API Java do projeto." />
        <Link to="/nova-ocorrencia" className="btn-primary shrink-0">Nova ocorrência</Link>
      </div>
      <div className="panel mb-7 grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="busca" className="label-field">Buscar por título ou localização</label>
          <input id="busca" className="field" value={busca} onChange={(evento) => setBusca(evento.target.value)} placeholder="Ex.: iluminação na Vila Mariana" />
        </div>
        <div>
          <label htmlFor="categoria" className="label-field">Categoria</label>
          <select id="categoria" className="field" value={categoria} onChange={(evento) => setCategoria(evento.target.value)}>
            <option value="TODAS">Todas as categorias</option>
            {categorias.map((nome) => <option key={nome} value={nome}>{nome}</option>)}
          </select>
        </div>
      </div>
      {carregando && <Feedback tipo="carregando" mensagem="Consultando ocorrências na API Java..." />}
      {!carregando && erro && (
        <div className="space-y-3">
          <Feedback tipo="erro" mensagem={erro} />
          <button type="button" onClick={() => void carregar()} className="btn-secondary">Tentar novamente</button>
        </div>
      )}
      {!carregando && !erro && filtradas.length === 0 && (
        <Feedback tipo="vazio" mensagem={ocorrencias.length === 0 ? "Nenhuma ocorrência cadastrada na API." : "Nenhuma ocorrência corresponde aos filtros."} />
      )}
      {!carregando && !erro && filtradas.length > 0 && (
        <>
          <p className="mb-4 text-sm text-slate-500" role="status">{filtradas.length} ocorrência(s) encontrada(s)</p>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtradas.map((ocorrencia) => <OcorrenciaCard key={ocorrencia.id} ocorrencia={ocorrencia} />)}
          </div>
        </>
      )}
    </section>
  );
}
