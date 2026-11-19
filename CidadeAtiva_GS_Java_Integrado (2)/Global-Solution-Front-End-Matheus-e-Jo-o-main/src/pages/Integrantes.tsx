import SectionTitle from "../components/SectionTitle";
import { integrantes } from "../data/integrantes";

export default function Integrantes() {
  return (
    <section className="container-site py-12 sm:py-16">
      <SectionTitle
        etiqueta="Equipe"
        titulo="Quem está desenvolvendo o CidadeAtiva"
        descricao="Integrantes do grupo da Global Solution 2026/2 da FIAP."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {integrantes.map((integrante) => (
          <article className="panel" key={integrante.rm}>
            <div aria-hidden="true" className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-city-100 text-xl font-bold text-city-700">
              {integrante.nome.split(" ").slice(0, 2).map((parte) => parte[0]).join("")}
            </div>
            <h2 className="text-lg font-bold text-slate-900">{integrante.nome}</h2>
            <p className="mt-1 text-sm font-semibold text-city-700">RM {integrante.rm}</p>
            <p className="mt-4 text-sm text-slate-600">{integrante.atribuicao}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
