import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="container-site flex flex-col justify-between gap-4 py-8 text-sm text-slate-600 sm:flex-row sm:items-center">
        <div>
          <p className="font-bold text-city-900">CidadeAtiva</p>
          <p>Projeto acadêmico - Global Solution 2026/2 - FIAP</p>
        </div>
        <div className="flex flex-wrap gap-5">
          <Link to="/sobre" className="hover:text-city-700">Sobre</Link>
          <Link to="/integrantes" className="hover:text-city-700">Integrantes</Link>
          <Link to="/contato" className="hover:text-city-700">Contato</Link>
        </div>
      </div>
    </footer>
  );
}
