import { useState } from "react";
import type { FormEvent } from "react";
import VitrinaBoton from "../../../VitrinaBoton/VitrinaBoton";
import VitrinaCampo from "../../../VitrinaCampo/VitrinaCampo";
import VitrinaEntrada from "../../../VitrinaEntrada/VitrinaEntrada";
import { espera } from "../../api";
import { useAvisos } from "../../avisos";
import { useTienda } from "../../state";

export default function Perfil() {
  const { state, dispatch } = useTienda();
  const { avisar } = useAvisos();
  const s = state.sesion;
  const [nombre, setNombre] = useState(s?.nombre ?? "");
  const [apellido, setApellido] = useState(s?.apellido ?? "");
  const [email, setEmail] = useState(s?.email ?? "");
  const [telefono, setTelefono] = useState(s?.telefono ?? "");
  const [cargando, setCargando] = useState(false);
  const [err, setErr] = useState<Record<string, string>>({});

  async function guardar(e: FormEvent) {
    e.preventDefault();
    const x: Record<string, string> = {};
    if (!nombre.trim()) x.nombre = "¿Cómo te llamas?";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) x.email = "Escribe un correo válido";
    setErr(x);
    if (Object.keys(x).length) return;
    setCargando(true);
    await espera(600);
    dispatch({ type: "perfil", parcial: { nombre: nombre.trim(), apellido: apellido.trim(), email: email.trim(), telefono: telefono.trim() || undefined } });
    setCargando(false);
    avisar("ok", "Datos guardados");
  }

  return (
    <form className="tienda-form tienda-form--estrecho" onSubmit={guardar} noValidate>
      <div className="tienda-form__rejilla">
        <VitrinaCampo label="Nombre" required error={err.nombre}>
          <VitrinaEntrada value={nombre} onChange={(e) => setNombre(e.target.value)} autoComplete="given-name" />
        </VitrinaCampo>
        <VitrinaCampo label="Apellido">
          <VitrinaEntrada value={apellido} onChange={(e) => setApellido(e.target.value)} autoComplete="family-name" />
        </VitrinaCampo>
        <VitrinaCampo label="Correo" required error={err.email} className="tienda-form__ancho">
          <VitrinaEntrada type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
        </VitrinaCampo>
        <VitrinaCampo label="Teléfono" hint="Para avisarte del reparto" className="tienda-form__ancho">
          <VitrinaEntrada type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="+56 9 1234 5678" autoComplete="tel" />
        </VitrinaCampo>
      </div>
      <div className="tienda-form__acciones">
        <VitrinaBoton type="submit" loading={cargando}>
          Guardar cambios
        </VitrinaBoton>
      </div>
      <p className="tienda-chica">Para cambiar la contraseña, usa «¿Olvidaste tu contraseña?» al entrar: te mandamos un código.</p>
    </form>
  );
}
