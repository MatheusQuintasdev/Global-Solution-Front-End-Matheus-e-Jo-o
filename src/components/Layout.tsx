import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-3">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo" className="flex-1"><Outlet /></main>
      <Footer />
    </div>
  );
}
