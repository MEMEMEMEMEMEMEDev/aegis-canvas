// Íconos de la familia: trazo de 1,75 sobre 24, esquinas redondas, sin
// relleno salvo donde el relleno ES el significado (el punto de la alerta).
// Decorativos por omisión (aria-hidden): el texto de al lado los nombra.
import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement> & { tamano?: number };

const Base = ({ tamano = 20, children, ...rest }: P) => (
  <svg
    viewBox="0 0 24 24"
    width={tamano}
    height={tamano}
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    {children}
  </svg>
);

export const IconoInicio = (p: P) => <Base {...p}><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" /></Base>;
export const IconoRuta = (p: P) => <Base {...p}><circle cx="6" cy="19" r="2" /><circle cx="18" cy="5" r="2" /><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16" /></Base>;
export const IconoFicha = (p: P) => <Base {...p}><rect x="4" y="3" width="16" height="18" rx="2" /><circle cx="12" cy="10" r="3" /><path d="M7.5 17.5a5 5 0 0 1 9 0" /></Base>;
export const IconoTelefono = (p: P) => <Base {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></Base>;
export const IconoUbicacion = (p: P) => <Base {...p}><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></Base>;
export const IconoCandado = (p: P) => <Base {...p}><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></Base>;
export const IconoCheck = (p: P) => <Base {...p}><path d="m5 12.5 4.5 4.5L19 7.5" /></Base>;
export const IconoAlerta = (p: P) => <Base {...p}><path d="M12 3 2 20h20z" /><path d="M12 10v4.5M12 17.5v.01" /></Base>;
export const IconoSinSenal = (p: P) => <Base {...p}><path d="M2 8.8a15 15 0 0 1 4.2-2.6M10.7 5.1A15 15 0 0 1 22 8.8M5 12.4a10 10 0 0 1 4.3-2.3M15.6 10.5A10 10 0 0 1 19 12.4M8.6 16a5 5 0 0 1 6.8 0M12 20h.01M3 3l18 18" /></Base>;
export const IconoQr = (p: P) => <Base {...p}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><path d="M14 14h3v3h-3zM20 14v.01M14 20h.01M17 20h4v-3" /></Base>;
export const IconoReloj = (p: P) => <Base {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Base>;
export const IconoCamion = (p: P) => <Base {...p}><path d="M2 6h11v10H2zM13 9h4l4 4v3h-8z" /><circle cx="6" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /></Base>;
export const IconoPersonas = (p: P) => <Base {...p}><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18.5 14.5a6.5 6.5 0 0 1 3 5.5" /></Base>;
export const IconoEscudo = (p: P) => <Base {...p}><path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6z" /><path d="m8.5 12 2.5 2.5 4.5-5" /></Base>;
export const IconoCerrar = (p: P) => <Base {...p}><path d="M6 6l12 12M18 6 6 18" /></Base>;
export const IconoLupa = (p: P) => <Base {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></Base>;
export const IconoMas = (p: P) => <Base {...p}><path d="M12 5v14M5 12h14" /></Base>;
export const IconoModulos = (p: P) => <Base {...p}><rect x="3" y="3" width="8" height="8" rx="1.5" /><rect x="13" y="3" width="8" height="8" rx="1.5" /><rect x="3" y="13" width="8" height="8" rx="1.5" /><rect x="13" y="13" width="8" height="8" rx="1.5" /></Base>;
export const IconoConexion = (p: P) => <Base {...p}><path d="M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M12 19.5h.01M2 9a15 15 0 0 1 20 0" /></Base>;
export const IconoFlecha = (p: P) => <Base {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Base>;
