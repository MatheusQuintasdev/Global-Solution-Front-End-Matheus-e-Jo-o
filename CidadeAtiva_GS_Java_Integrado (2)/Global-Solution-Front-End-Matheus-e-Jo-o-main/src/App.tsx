import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Contato from "./pages/Contato";
import DetalheOcorrencia from "./pages/DetalheOcorrencia";
import FAQ from "./pages/FAQ";
import Home from "./pages/Home";
import Integrantes from "./pages/Integrantes";
import NaoEncontrada from "./pages/NaoEncontrada";
import NovaOcorrencia from "./pages/NovaOcorrencia";
import Ocorrencias from "./pages/Ocorrencias";
import Sobre from "./pages/Sobre";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/integrantes" element={<Integrantes />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/ocorrencias" element={<Ocorrencias />} />
        <Route path="/nova-ocorrencia" element={<NovaOcorrencia />} />
        <Route path="/ocorrencias/:id" element={<DetalheOcorrencia />} />
        <Route path="*" element={<NaoEncontrada />} />
      </Route>
    </Routes>
  );
}
