import "./demo.scss";

/** La franja que avisa que nada de esto es real (una demo honesta). */
export default function Ficticio({ texto = "Maqueta con datos ficticios · Veterinaria San Bruno" }: { texto?: string }) {
  return <p className="demo-ficticio">{texto}</p>;
}
