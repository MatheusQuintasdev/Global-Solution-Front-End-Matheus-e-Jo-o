import { AlertCircle, CheckCircle2, LoaderCircle } from "lucide-react";

type TipoFeedback = "erro" | "sucesso" | "carregando" | "vazio";

interface FeedbackProps {
  tipo: TipoFeedback;
  mensagem: string;
}

export default function Feedback({ tipo, mensagem }: FeedbackProps) {
  if (tipo === "carregando") {
    return (
      <div role="status" className="panel flex items-center gap-3 text-slate-600">
        <LoaderCircle className="animate-spin text-city-600" size={20} aria-hidden="true" />
        {mensagem}
      </div>
    );
  }

  const classes = tipo === "erro"
    ? "border-red-200 bg-red-50 text-red-800"
    : tipo === "sucesso"
      ? "border-green-200 bg-green-50 text-green-800"
      : "border-slate-200 bg-white text-slate-600";

  return (
    <div role={tipo === "erro" ? "alert" : "status"} className={`flex items-start gap-3 rounded-xl border p-4 ${classes}`}>
      {tipo === "sucesso" ? <CheckCircle2 size={20} aria-hidden="true" /> : <AlertCircle size={20} aria-hidden="true" />}
      <span>{mensagem}</span>
    </div>
  );
}
