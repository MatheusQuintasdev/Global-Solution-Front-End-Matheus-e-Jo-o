import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "react-router-dom";
import Feedback from "../components/Feedback";
import SectionTitle from "../components/SectionTitle";
import { cadastrarOcorrencia } from "../services/ocorrenciasService";
import type { CategoriaOcorrencia, NovaOcorrencia } from "../types/ocorrencia";
import { categorias } from "../utils/ocorrencias";

const inicial: NovaOcorrencia = {
  titulo: "",
  descricao: "",
  categoria: "BURACO",
  endereco: "",
  bairro: "",
  cidade: "São Paulo",
};

export default function NovaOcorrencia() {
  const [dados, setDados] = useState<NovaOcorrencia>(inicial);
  const [erros, setErros] = useState<Partial<Record<keyof NovaOcorrencia, string>>>({});
  const [erroApi, setErroApi] = useState("");
  const [idCriado, setIdCriado] = useState<number | null>(null);
  const [enviando, setEnviando] = useState(false);

  function atualizar(evento: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const campo = evento.target.name as keyof NovaOcorrencia;
    setDados((anterior) => ({ ...anterior, [campo]: evento.target.value }));
    setErros((anterior) => ({ ...anterior, [campo]: undefined }));
  }

  function validar(): boolean {
    const encontrados: Partial<Record<keyof NovaOcorrencia, string>> = {};

    if (dados.titulo.trim().length < 5) encontrados.titulo = "Informe ao menos 5 caracteres.";
    if (dados.descricao.trim().length < 15) encontrados.descricao = "Descreva o problema com ao menos 15 caracteres.";
    if (dados.endereco.trim().length < 5) encontrados.endereco = "Informe um endereço com ao menos 5 caracteres.";
    if (dados.bairro.trim().length < 2) encontrados.bairro = "Informe o bairro.";
    if (dados.cidade.trim().length < 2) encontrados.cidade = "Informe a cidade.";
    if (!categorias.some((item) => item.valor === dados.categoria)) encontrados.categoria = "Selecione uma categoria válida.";

    setErros(encontrados);
    return Object.keys(encontrados).length === 0;
  }

  async function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setErroApi("");
    setIdCriado(null);

    if (!validar()) return;

    setEnviando(true);

    try {
      const criada = await cadastrarOcorrencia({
        titulo: dados.titulo.trim(),
        descricao: dados.descricao.trim(),
        categoria: dados.categoria,
        endereco: dados.endereco.trim(),
        bairro: dados.bairro.trim(),
        cidade: dados.cidade.trim(),
      });

      if (!criada || typeof criada.id !== "number") {
        throw new Error("A API respondeu sem o ID da ocorrência criada. Confira o contrato do backend.");
      }

      setIdCriado(criada.id);
      setDados(inicial);
    } catch (error) {
      setErroApi(error instanceof Error ? error.message : "Não foi possível cadastrar a ocorrência.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section className="container-site py-12 sm:py-16">
      <SectionTitle etiqueta="Participação cidadã" titulo="Registrar um problema urbano" descricao="Descreva a ocorrência. Os dados serão enviados para a API Java do grupo." />
      <div className="mx-auto max-w-3xl">
        {idCriado !== null && (
          <div className="mb-6 space-y-3">
            <Feedback tipo="sucesso" mensagem={`Ocorrência #${idCriado} cadastrada com sucesso na API.`} />
            <Link to={`/ocorrencias/${idCriado}`} className="inline-block font-bold text-city-700 hover:underline">Visualizar ocorrência cadastrada</Link>
          </div>
        )}
        {erroApi && <div className="mb-6"><Feedback tipo="erro" mensagem={erroApi} /></div>}
        <form noValidate onSubmit={(evento) => void enviar(evento)} className="panel space-y-5">
          <div>
            <label htmlFor="titulo" className="label-field">Título do problema *</label>
            <input id="titulo" name="titulo" className="field" value={dados.titulo} onChange={atualizar} placeholder="Ex.: Poste de luz apagado" aria-invalid={Boolean(erros.titulo)} aria-describedby={erros.titulo ? "erro-titulo" : undefined} required />
            {erros.titulo && <p id="erro-titulo" className="mt-1 text-sm text-red-700">{erros.titulo}</p>}
          </div>
          <div>
            <label htmlFor="categoria" className="label-field">Categoria *</label>
            <select id="categoria" name="categoria" className="field" value={dados.categoria} onChange={atualizar}>
              {categorias.map((item) => <option key={item.valor} value={item.valor}>{item.nome}</option>)}
            </select>
            {erros.categoria && <p className="mt-1 text-sm text-red-700">{erros.categoria}</p>}
          </div>
          <div>
            <label htmlFor="descricao" className="label-field">Descrição *</label>
            <textarea id="descricao" name="descricao" className="field min-h-32" value={dados.descricao} onChange={atualizar} placeholder="Explique o problema e como ele afeta a região" aria-invalid={Boolean(erros.descricao)} aria-describedby={erros.descricao ? "erro-descricao" : undefined} required />
            {erros.descricao && <p id="erro-descricao" className="mt-1 text-sm text-red-700">{erros.descricao}</p>}
          </div>
          <div>
            <label htmlFor="endereco" className="label-field">Endereço ou ponto de referência *</label>
            <input id="endereco" name="endereco" className="field" value={dados.endereco} onChange={atualizar} placeholder="Ex.: Rua das Flores, 100" aria-invalid={Boolean(erros.endereco)} required />
            {erros.endereco && <p className="mt-1 text-sm text-red-700">{erros.endereco}</p>}
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="bairro" className="label-field">Bairro *</label>
              <input id="bairro" name="bairro" className="field" value={dados.bairro} onChange={atualizar} aria-invalid={Boolean(erros.bairro)} required />
              {erros.bairro && <p className="mt-1 text-sm text-red-700">{erros.bairro}</p>}
            </div>
            <div>
              <label htmlFor="cidade" className="label-field">Cidade *</label>
              <input id="cidade" name="cidade" className="field" value={dados.cidade} onChange={atualizar} aria-invalid={Boolean(erros.cidade)} required />
              {erros.cidade && <p className="mt-1 text-sm text-red-700">{erros.cidade}</p>}
            </div>
          </div>
          <p className="text-sm text-slate-500">* Campos obrigatórios. Evite inserir dados pessoais sensíveis.</p>
          <div className="flex flex-wrap gap-3">
            <button type="submit" disabled={enviando} className="btn-primary">{enviando ? "Enviando para a API..." : "Cadastrar ocorrência"}</button>
            <Link to="/ocorrencias" className="btn-secondary">Cancelar</Link>
          </div>
        </form>
      </div>
    </section>
  );
}
