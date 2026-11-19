import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import Feedback from "../components/Feedback";
import SectionTitle from "../components/SectionTitle";
import {
  cadastrarBairro,
  cadastrarCidadao,
  cadastrarOcorrencia,
  listarBairros,
  listarCategorias,
  listarCidadaos,
} from "../services/ocorrenciasService";
import type { Bairro, Categoria, Cidadao, NovaOcorrencia } from "../types/ocorrencia";

const inicial: NovaOcorrencia = {
  titulo: "",
  descricao: "",
  categoriaId: 0,
  bairroId: 0,
  cidadaoId: 0,
  endereco: "",
  prioridade: 3,
};

export default function NovaOcorrencia() {
  const [dados, setDados] = useState<NovaOcorrencia>(inicial);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [bairros, setBairros] = useState<Bairro[]>([]);
  const [cidadaos, setCidadaos] = useState<Cidadao[]>([]);
  const [novoCidadao, setNovoCidadao] = useState(false);
  const [novoBairro, setNovoBairro] = useState(false);
  const [nomeCidadao, setNomeCidadao] = useState("");
  const [emailCidadao, setEmailCidadao] = useState("");
  const [nomeBairro, setNomeBairro] = useState("");
  const [cidadeBairro, setCidadeBairro] = useState("São Paulo");
  const [erroApi, setErroApi] = useState("");
  const [idCriado, setIdCriado] = useState<number | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    let ativo = true;

    Promise.all([listarCategorias(), listarBairros(), listarCidadaos()])
      .then(([listaCategorias, listaBairros, listaCidadaos]) => {
        if (!ativo) return;

        setCategorias(listaCategorias);
        setBairros(listaBairros);
        setCidadaos(listaCidadaos);
        setNovoCidadao(listaCidadaos.length === 0);
        setNovoBairro(listaBairros.length === 0);
      })
      .catch((erro) => {
        if (ativo) setErroApi(erro instanceof Error ? erro.message : "Erro ao carregar os cadastros da API.");
      })
      .finally(() => {
        if (ativo) setCarregando(false);
      });

    return () => {
      ativo = false;
    };
  }, []);

  async function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setErroApi("");
    setIdCriado(null);

    if (!dados.categoriaId) {
      setErroApi("Selecione uma categoria cadastrada na API Java.");
      return;
    }

    if (dados.titulo.trim().length < 5 || dados.descricao.trim().length < 15) {
      setErroApi("O título precisa ter pelo menos 5 caracteres e a descrição pelo menos 15.");
      return;
    }

    if (`${dados.titulo.trim()} — ${dados.descricao.trim()}`.length > 1000) {
      setErroApi("Título e descrição juntos não podem exceder 1000 caracteres.");
      return;
    }

    if (dados.endereco.trim().length < 5) {
      setErroApi("Informe um endereço com pelo menos 5 caracteres.");
      return;
    }

    if (!novoCidadao && !dados.cidadaoId) {
      setErroApi("Selecione um cidadão ou cadastre um novo.");
      return;
    }

    if (!novoBairro && !dados.bairroId) {
      setErroApi("Selecione um bairro ou cadastre um novo.");
      return;
    }

    if (novoCidadao && (!nomeCidadao.trim() || !/^\S+@\S+\.\S+$/.test(emailCidadao.trim()))) {
      setErroApi("Informe o nome e um e-mail válido do novo cidadão.");
      return;
    }

    if (novoBairro && (!nomeBairro.trim() || !cidadeBairro.trim())) {
      setErroApi("Informe o nome do bairro e a cidade.");
      return;
    }

    setEnviando(true);

    try {
      let cidadaoId = dados.cidadaoId;
      let bairroId = dados.bairroId;

      if (novoCidadao) {
        const cidadao = await cadastrarCidadao({
          nome: nomeCidadao.trim(),
          email: emailCidadao.trim(),
        });
        cidadaoId = cidadao.id;
        setCidadaos((anteriores) => [...anteriores, cidadao]);
        setDados((anteriores) => ({ ...anteriores, cidadaoId: cidadao.id }));
        setNovoCidadao(false);
      }

      if (novoBairro) {
        const bairro = await cadastrarBairro({
          nome: nomeBairro.trim(),
          cidade: cidadeBairro.trim(),
        });
        bairroId = bairro.id;
        setBairros((anteriores) => [...anteriores, bairro]);
        setDados((anteriores) => ({ ...anteriores, bairroId: bairro.id }));
        setNovoBairro(false);
      }

      const criada = await cadastrarOcorrencia({ ...dados, cidadaoId, bairroId });
      setIdCriado(criada.id);
      setDados(inicial);
    } catch (erro) {
      setErroApi(erro instanceof Error ? erro.message : "Não foi possível cadastrar a ocorrência.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section className="container-site py-12 sm:py-16">
      <SectionTitle
        etiqueta="Participação cidadã"
        titulo="Registrar um problema urbano"
        descricao="Os dados são enviados diretamente à API Java do CidadeAtiva."
      />
      <div className="mx-auto max-w-3xl">
        {idCriado !== null && (
          <div className="mb-6 space-y-3">
            <Feedback tipo="sucesso" mensagem={`Ocorrência #${idCriado} cadastrada com sucesso na API.`} />
            <Link to={`/ocorrencias/${idCriado}`} className="font-bold text-city-700 hover:underline">
              Visualizar ocorrência cadastrada
            </Link>
          </div>
        )}
        {erroApi && <div className="mb-6"><Feedback tipo="erro" mensagem={erroApi} /></div>}
        {carregando ? (
          <Feedback tipo="carregando" mensagem="Carregando categorias, bairros e cidadãos..." />
        ) : (
          <form onSubmit={(evento) => void enviar(evento)} className="panel space-y-5">
            <div>
              <label htmlFor="titulo" className="label-field">Título do problema *</label>
              <input id="titulo" className="field" maxLength={120} required value={dados.titulo}
                onChange={(evento) => setDados({ ...dados, titulo: evento.target.value })} />
            </div>
            <div>
              <label htmlFor="categoria" className="label-field">Categoria cadastrada na API *</label>
              <select id="categoria" className="field" required value={dados.categoriaId}
                onChange={(evento) => setDados({ ...dados, categoriaId: Number(evento.target.value) })}>
                <option value={0}>Selecione uma categoria</option>
                {categorias.map((item) => <option key={item.id} value={item.id}>{item.nome}</option>)}
              </select>
              {categorias.length === 0 && <p className="mt-2 text-sm text-amber-700">Não há categorias no banco. Cadastre pelo Insomnia antes de registrar uma ocorrência.</p>}
            </div>
            <div>
              <label htmlFor="descricao" className="label-field">Descrição *</label>
              <textarea id="descricao" className="field min-h-32" required value={dados.descricao}
                onChange={(evento) => setDados({ ...dados, descricao: evento.target.value })}
                placeholder="Explique o problema e como afeta a região" />
            </div>
            <div>
              <label htmlFor="endereco" className="label-field">Endereço *</label>
              <input id="endereco" className="field" maxLength={200} required value={dados.endereco}
                onChange={(evento) => setDados({ ...dados, endereco: evento.target.value })} />
            </div>
            <div>
              <label htmlFor="prioridade" className="label-field">Prioridade (1 = baixa, 5 = alta) *</label>
              <select id="prioridade" className="field" value={dados.prioridade}
                onChange={(evento) => setDados({ ...dados, prioridade: Number(evento.target.value) })}>
                {[1, 2, 3, 4, 5].map((numero) => <option key={numero} value={numero}>{numero}</option>)}
              </select>
            </div>
            <fieldset className="space-y-3 rounded-lg border border-slate-200 p-4">
              <legend className="px-2 font-bold">Bairro da ocorrência</legend>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={novoBairro} onChange={(evento) => setNovoBairro(evento.target.checked)} />
                Cadastrar um novo bairro
              </label>
              {novoBairro ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="novo-bairro" className="label-field">Bairro *</label>
                    <input id="novo-bairro" className="field" maxLength={100} required value={nomeBairro}
                      onChange={(evento) => setNomeBairro(evento.target.value)} />
                  </div>
                  <div>
                    <label htmlFor="cidade" className="label-field">Cidade *</label>
                    <input id="cidade" className="field" maxLength={100} required value={cidadeBairro}
                      onChange={(evento) => setCidadeBairro(evento.target.value)} />
                  </div>
                </div>
              ) : (
                <select aria-label="Bairro" className="field" required value={dados.bairroId}
                  onChange={(evento) => setDados({ ...dados, bairroId: Number(evento.target.value) })}>
                  <option value={0}>Selecione um bairro</option>
                  {bairros.map((item) => <option key={item.id} value={item.id}>{item.nome} — {item.cidade}</option>)}
                </select>
              )}
            </fieldset>
            <fieldset className="space-y-3 rounded-lg border border-slate-200 p-4">
              <legend className="px-2 font-bold">Cidadão responsável</legend>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={novoCidadao} onChange={(evento) => setNovoCidadao(evento.target.checked)} />
                Cadastrar um novo cidadão
              </label>
              {novoCidadao ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="nome" className="label-field">Nome *</label>
                    <input id="nome" className="field" maxLength={120} required value={nomeCidadao}
                      onChange={(evento) => setNomeCidadao(evento.target.value)} />
                  </div>
                  <div>
                    <label htmlFor="email" className="label-field">E-mail *</label>
                    <input id="email" type="email" className="field" maxLength={160} required value={emailCidadao}
                      onChange={(evento) => setEmailCidadao(evento.target.value)} />
                  </div>
                </div>
              ) : (
                <select aria-label="Cidadão" className="field" required value={dados.cidadaoId}
                  onChange={(evento) => setDados({ ...dados, cidadaoId: Number(evento.target.value) })}>
                  <option value={0}>Selecione um cidadão</option>
                  {cidadaos.map((item) => <option key={item.id} value={item.id}>{item.nome} (#{item.id})</option>)}
                </select>
              )}
            </fieldset>
            <p className="text-sm text-slate-500">* Campos obrigatórios. Não envie informações pessoais sensíveis na descrição.</p>
            <div className="flex flex-wrap gap-3">
              <button type="submit" disabled={enviando || categorias.length === 0} className="btn-primary">
                {enviando ? "Enviando para a API..." : "Cadastrar ocorrência"}
              </button>
              <Link to="/ocorrencias" className="btn-secondary">Cancelar</Link>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
