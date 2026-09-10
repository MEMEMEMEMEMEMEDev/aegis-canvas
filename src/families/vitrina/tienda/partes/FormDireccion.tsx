import { useState } from "react";
import type { FormEvent } from "react";
import VitrinaBoton from "../../VitrinaBoton/VitrinaBoton";
import VitrinaCampo from "../../VitrinaCampo/VitrinaCampo";
import VitrinaEntrada, { VitrinaSelect } from "../../VitrinaEntrada/VitrinaEntrada";
import VitrinaOpcion from "../../VitrinaOpcion/VitrinaOpcion";
import { REGIONES } from "../datos";
import type { Direccion } from "../datos";

interface Props {
  inicial?: Direccion;
  onGuardar: (d: Direccion) => void;
  onCancelar?: () => void;
  /** La voz del checkout (línea) o la de la cuenta (caja). */
  modo?: "caja" | "linea";
  guardarLabel?: string;
}

type Campos = Omit<Direccion, "id" | "predeterminada">;
type Errores = Partial<Record<keyof Campos, string>>;

const VACIA: Campos = { alias: "", nombre: "", calle: "", numero: "", depto: "", comuna: "", region: "Región Metropolitana", telefono: "" };

function valida(c: Campos): Errores {
  const e: Errores = {};
  if (!c.nombre.trim()) e.nombre = "¿A nombre de quién?";
  if (!c.calle.trim()) e.calle = "Falta la calle";
  if (!c.numero.trim()) e.numero = "Falta el número";
  if (!c.comuna.trim()) e.comuna = "Falta la comuna";
  if (!/^\+?[\d\s]{8,}$/.test(c.telefono.trim())) e.telefono = "Un teléfono válido, con código de área";
  return e;
}

/** El formulario de dirección, compartido por el checkout y la cuenta. */
export default function FormDireccion({ inicial, onGuardar, onCancelar, modo = "caja", guardarLabel = "Guardar dirección" }: Props) {
  const [c, setC] = useState<Campos>(inicial ? { alias: inicial.alias, nombre: inicial.nombre, calle: inicial.calle, numero: inicial.numero, depto: inicial.depto ?? "", comuna: inicial.comuna, region: inicial.region, telefono: inicial.telefono } : VACIA);
  const [pred, setPred] = useState(inicial?.predeterminada ?? false);
  const [errores, setErrores] = useState<Errores>({});
  const pon = (k: keyof Campos) => (e: { target: { value: string } }) => setC((x) => ({ ...x, [k]: e.target.value }));

  function enviar(e: FormEvent) {
    e.preventDefault();
    const err = valida(c);
    setErrores(err);
    if (Object.keys(err).length) return;
    onGuardar({ id: inicial?.id ?? `d-${Date.now()}`, ...c, alias: c.alias.trim() || "Dirección", depto: c.depto?.trim() || undefined, predeterminada: pred });
  }

  return (
    <form className="tienda-form" onSubmit={enviar} noValidate>
      <div className="tienda-form__rejilla">
        <VitrinaCampo modo={modo} label="Alias" hint="Casa, oficina…">
          <VitrinaEntrada modo={modo} value={c.alias} onChange={pon("alias")} placeholder="Casa" />
        </VitrinaCampo>
        <VitrinaCampo modo={modo} label="Quién recibe" required error={errores.nombre}>
          <VitrinaEntrada modo={modo} value={c.nombre} onChange={pon("nombre")} placeholder="Nombre y apellido" autoComplete="name" />
        </VitrinaCampo>
        <VitrinaCampo modo={modo} label="Calle" required error={errores.calle} className="tienda-form__ancho">
          <VitrinaEntrada modo={modo} value={c.calle} onChange={pon("calle")} placeholder="Av. Los Leones" autoComplete="address-line1" />
        </VitrinaCampo>
        <VitrinaCampo modo={modo} label="Número" required error={errores.numero}>
          <VitrinaEntrada modo={modo} value={c.numero} onChange={pon("numero")} placeholder="1234" inputMode="numeric" />
        </VitrinaCampo>
        <VitrinaCampo modo={modo} label="Depto / casa" hint="Opcional">
          <VitrinaEntrada modo={modo} value={c.depto ?? ""} onChange={pon("depto")} placeholder="402" />
        </VitrinaCampo>
        <VitrinaCampo modo={modo} label="Comuna" required error={errores.comuna}>
          <VitrinaEntrada modo={modo} value={c.comuna} onChange={pon("comuna")} placeholder="Providencia" autoComplete="address-level2" />
        </VitrinaCampo>
        <VitrinaCampo modo={modo} label="Región">
          <VitrinaSelect modo={modo} value={c.region} onChange={pon("region")}>
            {REGIONES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </VitrinaSelect>
        </VitrinaCampo>
        <VitrinaCampo modo={modo} label="Teléfono de contacto" required error={errores.telefono} className="tienda-form__ancho">
          <VitrinaEntrada modo={modo} value={c.telefono} onChange={pon("telefono")} placeholder="+56 9 1234 5678" type="tel" autoComplete="tel" />
        </VitrinaCampo>
      </div>
      <VitrinaOpcion tipo="casilla" marco={false} checked={pred} onChange={setPred} label="Usar como dirección predeterminada" />
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
