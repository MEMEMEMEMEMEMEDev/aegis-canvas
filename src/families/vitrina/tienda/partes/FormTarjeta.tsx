import { useState } from "react";
import type { FormEvent } from "react";
import VitrinaBoton from "../../VitrinaBoton/VitrinaBoton";
import VitrinaCampo from "../../VitrinaCampo/VitrinaCampo";
import VitrinaEntrada from "../../VitrinaEntrada/VitrinaEntrada";
import VitrinaOpcion from "../../VitrinaOpcion/VitrinaOpcion";
import VitrinaPicto from "../../VitrinaPicto/VitrinaPicto";
import VitrinaSello from "../../VitrinaSello/VitrinaSello";
import type { Tarjeta } from "../datos";

interface Props {
  onGuardar: (t: Tarjeta) => void;
  onCancelar?: () => void;
  modo?: "caja" | "linea";
  guardarLabel?: string;
}

const marcaDe = (n: string): Tarjeta["marca"] => (n.startsWith("3") ? "amex" : n.startsWith("5") || n.startsWith("2") ? "mastercard" : "visa");
const MARCA_LABEL = { visa: "Visa", mastercard: "Mastercard", amex: "Amex" } as const;

const formateaNumero = (v: string) => v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
const formateaVence = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
};

/**
 * El formulario de tarjeta. Nada se envía a ningún sitio: se guardan la
 * marca (por el primer dígito), los últimos 4, el titular y el vencimiento.
 * El CVV se pide porque un checkout sin CVV no parece un checkout, y se tira.
 */
export default function FormTarjeta({ onGuardar, onCancelar, modo = "caja", guardarLabel = "Guardar tarjeta" }: Props) {
  const [numero, setNumero] = useState("");
  const [titular, setTitular] = useState("");
  const [vence, setVence] = useState("");
  const [cvv, setCvv] = useState("");
  const [pred, setPred] = useState(false);
  const [err, setErr] = useState<Record<string, string>>({});
  const digitos = numero.replace(/\s/g, "");
  const marca = digitos ? marcaDe(digitos) : null;

  function enviar(e: FormEvent) {
    e.preventDefault();
    const x: Record<string, string> = {};
    if (digitos.length < 15) x.numero = "El número tiene 15 o 16 dígitos";
    if (!titular.trim()) x.titular = "El nombre tal cual va en la tarjeta";
    const [mm, aa] = vence.split("/");
    if (!mm || !aa || Number(mm) < 1 || Number(mm) > 12 || aa.length !== 2) x.vence = "MM/AA";
    if (cvv.replace(/\D/g, "").length < 3) x.cvv = "3 o 4 dígitos";
    setErr(x);
    if (Object.keys(x).length) return;
    onGuardar({ id: `t-${Date.now()}`, marca: marca ?? "visa", ultimos4: digitos.slice(-4), titular: titular.trim().toUpperCase(), vence, predeterminada: pred });
  }

  return (
    <form className="tienda-form" onSubmit={enviar} noValidate>
      <div className="tienda-form__rejilla">
        <VitrinaCampo modo={modo} label="Número de tarjeta" required error={err.numero} className="tienda-form__ancho">
          <VitrinaEntrada modo={modo} value={numero} onChange={(e) => setNumero(formateaNumero(e.target.value))} placeholder="4242 4242 4242 4242" inputMode="numeric" autoComplete="cc-number" icono={<VitrinaPicto name="tarjeta" />} accion={marca ? { icono: <VitrinaSello pequeno>{MARCA_LABEL[marca]}</VitrinaSello>, label: MARCA_LABEL[marca], onClick: () => {} } : undefined} />
        </VitrinaCampo>
        <VitrinaCampo modo={modo} label="Titular" required error={err.titular} className="tienda-form__ancho">
          <VitrinaEntrada modo={modo} value={titular} onChange={(e) => setTitular(e.target.value)} placeholder="Como aparece en la tarjeta" autoComplete="cc-name" />
        </VitrinaCampo>
        <VitrinaCampo modo={modo} label="Vence" required error={err.vence}>
          <VitrinaEntrada modo={modo} value={vence} onChange={(e) => setVence(formateaVence(e.target.value))} placeholder="MM/AA" inputMode="numeric" autoComplete="cc-exp" />
        </VitrinaCampo>
        <VitrinaCampo modo={modo} label="CVV" required error={err.cvv} hint="No se guarda">
          <VitrinaEntrada modo={modo} value={cvv} onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))} placeholder="123" inputMode="numeric" type="password" autoComplete="cc-csc" />
        </VitrinaCampo>
      </div>
      <VitrinaOpcion tipo="casilla" marco={false} checked={pred} onChange={setPred} label="Usar como medio de pago predeterminado" />
      <div className="tienda-form__acciones">
        {onCancelar && (
          <VitrinaBoton variant="outline" type="button" onClick={onCancelar}>
            Cancelar
          </VitrinaBoton>
        )}
        <VitrinaBoton type="submit">{guardarLabel}</VitrinaBoton>
      </div>
    </form>
  );
}
