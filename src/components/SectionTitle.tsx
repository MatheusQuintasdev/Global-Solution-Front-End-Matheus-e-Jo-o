interface SectionTitleProps {
  etiqueta?: string;
  titulo: string;
  descricao?: string;
}

export default function SectionTitle({ etiqueta, titulo, descricao }: SectionTitleProps) {
  return (
    <div className="mb-8 max-w-3xl">
      {etiqueta && (
        <p className="mb-2 text-sm font-bold uppercase tracking-widest text-city-700">
          {etiqueta}
        </p>
      )}
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {titulo}
      </h1>
      {descricao && (
        <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">
          {descricao}
        </p>
      )}
    </div>
  );
}
