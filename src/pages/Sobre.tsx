import { Link } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";

export default function Sobre() {
  return (
    <section className="container-site py-12 sm:py-16">
      <SectionTitle
        etiqueta="Sobre a iniciativa"
        titulo="Tecnologia voltada aos problemas de quem vive a cidade"
        descricao="O CidadeAtiva é um projeto acadêmico desenvolvido para a Global Solution 2026/2 da FIAP, dentro do tema CitizenTech."
      />
      <div className="grid gap-6 lg:grid-cols-3">
        <article className="panel lg:col-span-2">
          <h2 className="mb-3 text-xl font-bold">O problema</h2>
          <p className="leading-7 text-slate-600">
            Buracos, descarte irregular, falhas de iluminação e barreiras de acessibilidade
            são situações recorrentes na rotina urbana. A falta de informação centralizada
            pode dificultar o acompanhamento dessas demandas pela comunidade.
          </p>
          <h2 className="mb-3 mt-8 text-xl font-bold">Nossa proposta</h2>
          <p className="leading-7 text-slate-600">
            Criar uma aplicação web em que cidadãos possam cadastrar ocorrências e consultar
            as informações registradas. A solução conecta uma interface em React a uma API
            REST em Java, compartilhada com outras disciplinas do projeto.
          </p>
          <h2 className="mb-3 mt-8 text-xl font-bold">Impacto esperado</h2>
          <p className="leading-7 text-slate-600">
            Facilitar a visualização de problemas locais, incentivar a participação cidadã
            e organizar dados que possam apoiar decisões comunitárias. Não há integração
            oficial com órgãos públicos nesta versão acadêmica.
          </p>
        </article>
        <aside className="panel h-fit bg-city-50">
          <h2 className="text-xl font-bold text-city-900">ODS relacionados</h2>
          <ul className="mt-4 space-y-4 text-slate-700">
            <li><strong>ODS 11:</strong> Cidades e comunidades sustentáveis.</li>
            <li><strong>ODS 10:</strong> Redução das desigualdades.</li>
            <li><strong>ODS 9:</strong> Indústria, inovação e infraestrutura.</li>
          </ul>
          <Link to="/nova-ocorrencia" className="btn-primary mt-8 w-full">Registrar ocorrência</Link>
        </aside>
      </div>
    </section>
  );
}
