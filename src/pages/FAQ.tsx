import { useState } from "react";
import { ChevronDown } from "lucide-react";
import SectionTitle from "../components/SectionTitle";

const perguntas = [
  {
    pergunta: "O que é o CidadeAtiva?",
    resposta: "É uma plataforma acadêmica para registrar e acompanhar problemas urbanos. A proposta faz parte da Global Solution da FIAP.",
  },
  {
    pergunta: "Como registrar uma ocorrência?",
    resposta: "Acesse 'Registrar problema', preencha título, categoria, descrição e endereço. O registro é enviado à API Java configurada pelo grupo.",
  },
  {
    pergunta: "Como acompanho um problema cadastrado?",
    resposta: "Entre na lista de ocorrências e selecione 'Detalhes'. A situação exibida é aquela fornecida pela API Java.",
  },
  {
    pergunta: "A plataforma substitui os canais da prefeitura?",
    resposta: "Não. O CidadeAtiva é um protótipo acadêmico, sem vínculo oficial com órgãos públicos. Para riscos imediatos, acione os serviços públicos competentes.",
  },
  {
    pergunta: "Por que algumas ocorrências não aparecem?",
    resposta: "Os dados dependem da API Java. Se ela não estiver configurada ou estiver indisponível, a plataforma mostrará uma mensagem de erro em vez de inventar registros.",
  },
];

export default function FAQ() {
  const [aberta, setAberta] = useState<number | null>(0);

  return (
    <section className="container-site py-12 sm:py-16">
      <SectionTitle etiqueta="Dúvidas frequentes" titulo="Como podemos ajudar?" descricao="Respostas para as principais perguntas sobre a plataforma." />
      <div className="mx-auto max-w-3xl space-y-3">
        {perguntas.map((item, indice) => (
          <article key={item.pergunta} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <h2>
              <button
                type="button"
                aria-expanded={aberta === indice}
                onClick={() => setAberta(aberta === indice ? null : indice)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left font-semibold text-slate-900"
              >
                {item.pergunta}
                <ChevronDown size={20} className={`shrink-0 transition-transform ${aberta === indice ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>
            </h2>
            {aberta === indice && <p className="border-t border-slate-100 px-5 py-5 leading-relaxed text-slate-600">{item.resposta}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}
