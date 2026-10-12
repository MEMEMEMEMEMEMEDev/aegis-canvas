// Datos de muestra compartidos por las historias. Todo es FICTICIO —
// personas, RUT, patentes y teléfonos inventados — y la demo lo dice en
// pantalla. Los nombres del Figma del cliente se cambiaron a propósito.

export interface Trabajador {
  id: string;
  nombre: string;
  rut: string;
  cargo: string;
  empresa: string;
  base: string;
  camion: string;
  patente: string;
  estado: "activa" | "bloqueada";
  sangre: string;
  alergias: string;
  peso: number;
  condiciones: string;
  medicamentos: string;
  indicaciones: string;
}

export const TRABAJADORES: Trabajador[] = [
  {
    id: "SOS-0412", nombre: "Tomás Fuentes Rojas", rut: "11.111.111-1", cargo: "Conductor",
    empresa: "Transportes Demo", base: "Puente Alto", camion: "N° 27", patente: "XX-DE-27",
    estado: "activa", sangre: "O+", alergias: "Penicilina", peso: 82,
    condiciones: "Hipertensión, diabetes tipo 2", medicamentos: "Metformina 850 mg, Losartán 50 mg",
    indicaciones: "Diabético: si está confuso, medir glicemia.",
  },
  {
    id: "SOS-0413", nombre: "Valentina Soto Pérez", rut: "22.222.222-2", cargo: "Peoneta",
    empresa: "Transportes Demo", base: "Puente Alto", camion: "N° 27", patente: "XX-DE-27",
    estado: "activa", sangre: "A−", alergias: "Ninguna conocida", peso: 64,
    condiciones: "Asma leve", medicamentos: "Salbutamol (inhalador)", indicaciones: "Lleva inhalador en la mochila.",
  },
  {
    id: "SOS-0418", nombre: "Ignacio Mora Díaz", rut: "33.333.333-3", cargo: "Conductor",
    empresa: "Transportes Demo", base: "Quilicura", camion: "N° 31", patente: "XX-DE-31",
    estado: "activa", sangre: "B+", alergias: "AINEs", peso: 90,
    condiciones: "—", medicamentos: "—", indicaciones: "—",
  },
  {
    id: "SOS-0420", nombre: "Camila Reyes Núñez", rut: "44.444.444-4", cargo: "Operadora",
    empresa: "Transportes Demo", base: "Quilicura", camion: "—", patente: "—",
    estado: "bloqueada", sangre: "O−", alergias: "Látex", peso: 58,
    condiciones: "—", medicamentos: "—", indicaciones: "—",
  },
];

export const CONTACTOS = {
  jefe: { rol: "Jefe de base", nombre: "Marcelo Ibarra", telefono: "+56900000001" },
  prevencion: { rol: "Prevencionista de riesgos", nombre: "Rodrigo Lagos", telefono: "+56900000002" },
};

export interface Activacion {
  id: string;
  fecha: string;
  trabajador: string;
  tarjeta: string;
  base: string;
  patente: string;
  origen: "QR" | "Botón" | "Viaje";
  medicosVistos: boolean;
  respuesta: { atendida: false } | { atendida: true; en: string };
}

export const ACTIVACIONES: Activacion[] = [
  { id: "a3", fecha: "4/10 13:31", trabajador: "Tomás Fuentes Rojas", tarjeta: "SOS-0412", base: "Puente Alto", patente: "XX-DE-27", origen: "QR", medicosVistos: false, respuesta: { atendida: false } },
  { id: "a2", fecha: "3/10 08:02", trabajador: "Ignacio Mora Díaz", tarjeta: "SOS-0418", base: "Quilicura", patente: "XX-DE-31", origen: "Viaje", medicosVistos: false, respuesta: { atendida: true, en: "4:12" } },
  { id: "a1", fecha: "1/10 17:45", trabajador: "Valentina Soto Pérez", tarjeta: "SOS-0413", base: "Puente Alto", patente: "XX-DE-27", origen: "Botón", medicosVistos: true, respuesta: { atendida: true, en: "0:07" } },
];

/** Un QR de mentira: patrón fijo con los tres ojos, para maquetar. No se escanea. */
export function QrMuestra() {
  const celdas: [number, number][] = [];
  let s = 7;
  for (let y = 0; y < 21; y++)
    for (let x = 0; x < 21; x++) {
      const ojo = (x < 8 && y < 8) || (x > 12 && y < 8) || (x < 8 && y > 12);
      s = (s * 9301 + 49297) % 233280;
      if (!ojo && s / 233280 > 0.52) celdas.push([x, y]);
    }
  const ojo = (x: number, y: number) => (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y} width="7" height="7" fill="currentColor" />
      <rect x={x + 1} y={y + 1} width="5" height="5" fill="#fff" />
      <rect x={x + 2} y={y + 2} width="3" height="3" fill="currentColor" />
    </g>
  );
  return (
    <svg viewBox="0 0 21 21" role="img" aria-label="Código QR de muestra" shapeRendering="crispEdges" style={{ color: "#131311" }}>
      <rect width="21" height="21" fill="#fff" />
      {celdas.map(([x, y]) => <rect key={`${x}.${y}`} x={x} y={y} width="1" height="1" fill="currentColor" />)}
      {ojo(0, 0)}{ojo(14, 0)}{ojo(0, 14)}
    </svg>
  );
}
