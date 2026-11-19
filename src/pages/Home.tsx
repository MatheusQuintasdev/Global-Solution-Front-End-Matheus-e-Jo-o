import { ArrowRight, ClipboardList, MapPinned, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";

const etapas = [
  {
    titulo: "Registre",
    descricao: "Conte o que aconteceu, informe o endereço e escolha uma categoria.",
    icone: ClipboardList,
  },
  {
    titulo: "Acompanhe",
    descricao: "Veja os registros cadastrados e consulte a situação de cada problema.",
    icone: MapPinned,
  },
  {
    titulo: "Participe",
    descricao: "Informação organizada ajuda a comunidade a dar visibilidade às demandas.",
    icone: ShieldCheck,
  },
];

export default function Home() {
  return (
    <>
      <section className="bg-gradient-to-br from-city-900 via-city-700 to-city-600 py-16 text-white sm:py-24">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-widest text-teal-100">Global Solution 2026/2 · CitizenTech</p>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Uma cidade melhor começa com a participação de todos.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-teal-50">
              Registre problemas do seu bairro e acompanhe ocorrências urbanas em um só lugar.
              Tecnologia para aproximar pessoas e necessidades reais.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/nova-ocorrencia" className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 font-bold text-city-900 hover:bg-teal-50">
                Registrar ocorrência <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link to="/ocorrencias" className="inline-flex items-center rounded-lg border border-white/60 px-5 py-3 font-bold text-white hover:bg-white/10">
                Ver ocorrências
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/10 p-7 shadow-xl backdrop-blur-sm">
            <p className="mb-4 text-sm font-bold uppercase tracking-widest text-teal-100">O que podemos melhorar?</p>
            <div className="grid grid-cols-2 gap-3">
              {["Buracos nas ruas", "Iluminação", "Lixo acumulado", "Enchentes", "Acessibilidade", "Outros problemas"].map((tema) => (
                <div key={tema} className="rounded-lg border border-white/20 bg-white/10 px-4 py-5 text-sm font-semibold">
                  {tema}
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm text-teal-100">A plataforma organiza registros; não é um canal oficial de atendimento público.</p>
          </div>
        </div>
      </section>

      <section className="container-site py-16">
        <SectionTitle
          etiqueta="Como funciona"
          titulo="Simples para quem vive a cidade"
          descricao="Três passos para dar visibilidade a problemas que fazem parte do nosso dia a dia."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {etapas.map((etapa, indice) => {
            const Icone = etapa.icone;

            return (
              <div className="panel" key={etapa.titulo}>
                <div className="mb-5 flex items-center justify-between">
                  <span className="rounded-lg bg-city-50 p-3 text-city-700"><Icone size={26} aria-hidden="true" /></span>
                  <span className="text-3xl font-bold text-slate-200">0{indice + 1}</span>
                </div>
                <h2 className="text-xl font-bold">{etapa.titulo}</h2>
                <p className="mt-2 leading-relaxed text-slate-600">{etapa.descricao}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-city-50 py-14">
        <div className="container-site flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold text-city-900">Conheça o projeto CidadeAtiva</h2>
            <p className="mt-2 max-w-xl text-slate-600">Uma proposta acadêmica conectada ao ODS 11: cidades e comunidades sustentáveis.</p>
          </div>
          <Link to="/sobre" className="btn-secondary">Saiba mais <ArrowRight size={18} aria-hidden="true" /></Link>
        </div>
      </section>
    </>
  );
}
