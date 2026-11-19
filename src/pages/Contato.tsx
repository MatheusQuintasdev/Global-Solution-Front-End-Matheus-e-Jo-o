import { useState, type FormEvent } from "react";
import SectionTitle from "../components/SectionTitle";
import Feedback from "../components/Feedback";

interface ContatoDados {
  nome: string;
  email: string;
  mensagem: string;
}

export default function Contato() {
  const [dados, setDados] = useState<ContatoDados>({ nome: "", email: "", mensagem: "" });
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setErro("");
    setSucesso("");

    if (dados.nome.trim().length < 3 || dados.mensagem.trim().length < 10) {
      setErro("Informe um nome com pelo menos 3 caracteres e uma mensagem com pelo menos 10.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email)) {
      setErro("Informe um e-mail válido.");
      return;
    }

    setSucesso("Dados validados. Este formulário é demonstrativo e não envia mensagens; a equipe ainda precisa configurar um serviço de contato.");
  }

  return (
    <section className="container-site py-12 sm:py-16">
      <SectionTitle etiqueta="Contato" titulo="Fale com a equipe" descricao="Use este formulário para demonstrar as validações de campos. O envio de mensagens ainda não está conectado a um serviço." />
      <div className="panel mx-auto max-w-2xl">
        <form onSubmit={enviar} noValidate className="space-y-5">
          <div>
            <label className="label-field" htmlFor="nome">Nome *</label>
            <input className="field" id="nome" value={dados.nome} onChange={(evento) => setDados({ ...dados, nome: evento.target.value })} autoComplete="name" required />
          </div>
          <div>
            <label className="label-field" htmlFor="email">E-mail *</label>
            <input className="field" id="email" type="email" value={dados.email} onChange={(evento) => setDados({ ...dados, email: evento.target.value })} autoComplete="email" required />
          </div>
          <div>
            <label className="label-field" htmlFor="mensagem">Mensagem *</label>
            <textarea className="field min-h-36" id="mensagem" value={dados.mensagem} onChange={(evento) => setDados({ ...dados, mensagem: evento.target.value })} required />
          </div>
          {erro && <Feedback tipo="erro" mensagem={erro} />}
          {sucesso && <Feedback tipo="sucesso" mensagem={sucesso} />}
          <button type="submit" className="btn-primary">Validar mensagem</button>
        </form>
      </div>
    </section>
  );
}
