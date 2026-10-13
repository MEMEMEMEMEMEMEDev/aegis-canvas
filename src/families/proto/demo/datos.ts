// DATOS FICTICIOS. Ninguna persona ni mascota de aquí existe; la pantalla
// lo dice (una demo honesta). Cuando la clínica traiga los suyos —sus
// servicios, precios y horarios reales— se reemplazan aquí y en nada más.

/** Pesos chilenos a mano: las imágenes de aegis traen ICU reducido y
 *  toLocaleString("es-CL") no es confiable dentro del contenedor. */
export function pesos(n: number): string {
  const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `$${s}`;
}

export interface Servicio {
  id: string;
  nombre: string;
  detalle: string;
  minutos: number;
  precio: number;
  /** Se agenda sólo después de una evaluación: no se ofrece en línea. */
  conEvaluacion?: boolean;
}

export const SERVICIOS: Servicio[] = [
  { id: "consulta", nombre: "Consulta general", detalle: "Revisión completa, para cuando algo no anda bien", minutos: 30, precio: 18000 },
  { id: "vacuna", nombre: "Vacunación", detalle: "Incluye revisión y registro en su carnet", minutos: 20, precio: 12000 },
  { id: "control", nombre: "Control", detalle: "Seguimiento de un tratamiento o una cirugía", minutos: 20, precio: 10000 },
  { id: "cirugia", nombre: "Cirugía programada", detalle: "Primero una evaluación: así sabemos qué necesita", minutos: 120, precio: 0, conEvaluacion: true },
];

export const DIAS = [
  { id: "lun13", corto: "Lun 13", largo: "Lunes 13 de octubre" },
  { id: "mar14", corto: "Mar 14", largo: "Martes 14 de octubre" },
  { id: "mie15", corto: "Mié 15", largo: "Miércoles 15 de octubre" },
  { id: "jue16", corto: "Jue 16", largo: "Jueves 16 de octubre" },
  { id: "vie17", corto: "Vie 17", largo: "Viernes 17 de octubre" },
];

const HORAS = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"];

/** Ocupación ficticia, distinta por día, para que el horario se vea vivo. */
export function bloquesDel(dia: string) {
  const semilla = dia.charCodeAt(3) + dia.charCodeAt(4);
  return HORAS.map((hora, i) => ({ hora, libre: (i * 7 + semilla) % 3 !== 0 }));
}

export const EQUIPO = {
  directora: "Dra. Paula Soto",
  vet1: "Dra. Valentina Rojas",
  vet2: "Dr. Tomás Fuentes",
  recepcion: "Camila Pérez",
  tecnico: "Javier Muñoz",
};
