import { Link } from "react-router-dom";

export default function NaoEncontrada() {
  return (
    <section className="container-site py-24 text-center">
      <p className="text-6xl font-extrabold text-city-700">404</p>
      <h1 className="mt-4 text-3xl font-bold">Página não encontrada</h1>
      <p className="mt-3 text-slate-600">Confira o endereço ou retorne para a página inicial.</p>
      <Link to="/" className="btn-primary mt-7">Voltar ao início</Link>
    </section>
  );
}
