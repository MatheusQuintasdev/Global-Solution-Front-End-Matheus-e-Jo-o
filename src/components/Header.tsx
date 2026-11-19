import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Building2, Menu, X } from "lucide-react";

const links = [
  { destino: "/", texto: "Início" },
  { destino: "/ocorrencias", texto: "Ocorrências" },
  { destino: "/sobre", texto: "Sobre" },
  { destino: "/faq", texto: "FAQ" },
  { destino: "/integrantes", texto: "Equipe" },
  { destino: "/contato", texto: "Contato" },
];

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);

  function fecharMenu() {
    setMenuAberto(false);
  }

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="container-site flex min-h-20 items-center justify-between gap-4" aria-label="Navegação principal">
        <Link to="/" className="flex items-center gap-2 font-extrabold text-city-900" onClick={fecharMenu}>
          <span className="rounded-lg bg-city-100 p-2 text-city-700"><Building2 size={22} aria-hidden="true" /></span>
          <span className="text-xl">CidadeAtiva</span>
        </Link>

        <div className="hidden items-center gap-5 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.destino}
              to={link.destino}
              end={link.destino === "/"}
              className={({ isActive }) =>
                `text-sm font-semibold transition hover:text-city-700 ${isActive ? "text-city-700" : "text-slate-600"}`
              }
            >
              {link.texto}
            </NavLink>
          ))}
          <Link to="/nova-ocorrencia" className="btn-primary py-2.5 text-sm">Registrar problema</Link>
        </div>

        <button
          type="button"
          className="rounded-lg border border-slate-300 p-2 lg:hidden"
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuAberto}
          aria-controls="menu-mobile"
          onClick={() => setMenuAberto(!menuAberto)}
        >
          {menuAberto ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {menuAberto && (
        <div id="menu-mobile" className="border-t border-slate-200 bg-white lg:hidden">
          <div className="container-site flex flex-col gap-1 py-3">
            {links.map((link) => (
              <NavLink
                key={link.destino}
                to={link.destino}
                end={link.destino === "/"}
                className="rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-city-50"
                onClick={fecharMenu}
              >
                {link.texto}
              </NavLink>
            ))}
            <Link to="/nova-ocorrencia" className="btn-primary mt-2" onClick={fecharMenu}>
              Registrar problema
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
