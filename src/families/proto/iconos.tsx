// Íconos de la familia: trazo de 1,75 sobre 24, esquinas redondas.
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

// La huella: el único ícono con relleno, porque es la marca.
export const IconoHuella = ({ tamano = 20, ...rest }: P) => (
  <svg viewBox="0 0 24 24" width={tamano} height={tamano} fill="currentColor" aria-hidden="true" focusable="false" {...rest}>
    <ellipse cx="5.5" cy="10" rx="2.2" ry="2.8" />
    <ellipse cx="9.5" cy="5.5" rx="2.2" ry="2.9" />
    <ellipse cx="14.5" cy="5.5" rx="2.2" ry="2.9" />
    <ellipse cx="18.5" cy="10" rx="2.2" ry="2.8" />
    <path d="M12 11.5c-3 0-6 4-6 6.5 0 1.8 1.4 2.8 3 2.8 1.2 0 2-.6 3-.6s1.8.6 3 .6c1.6 0 3-1 3-2.8 0-2.5-3-6.5-6-6.5z" />
  </svg>
);

export const IconoCalendario = (p: P) => <Base {...p}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></Base>;
export const IconoReloj = (p: P) => <Base {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Base>;
export const IconoCheck = (p: P) => <Base {...p}><path d="m5 12.5 4.5 4.5L19 7.5" /></Base>;
export const IconoCerrar = (p: P) => <Base {...p}><path d="M6 6l12 12M18 6 6 18" /></Base>;
export const IconoFlecha = (p: P) => <Base {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Base>;
export const IconoVolver = (p: P) => <Base {...p}><path d="M19 12H5M11 6l-6 6 6 6" /></Base>;
export const IconoAlerta = (p: P) => <Base {...p}><path d="M12 3 2 20h20z" /><path d="M12 10v4.5M12 17.5v.01" /></Base>;
export const IconoMensaje = (p: P) => <Base {...p}><path d="M4 5h16v11H9l-5 4z" /></Base>;
export const IconoCaja = (p: P) => <Base {...p}><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M3 11h18M8 7V5h8v2" /></Base>;
export const IconoBolsa = (p: P) => <Base {...p}><path d="M5 8h14l-1 12H6zM9 8V6a3 3 0 0 1 6 0v2" /></Base>;
export const IconoJeringa = (p: P) => <Base {...p}><path d="m18 3 3 3M16 5l3 3M7 14l-4 4M17.5 6.5 8 16l-3-3 9.5-9.5zM10 11l1.5 1.5M12.5 8.5 14 10" /></Base>;
export const IconoCama = (p: P) => <Base {...p}><path d="M3 18V7M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5" /><circle cx="7" cy="11" r="2" /></Base>;
export const IconoUbicacion = (p: P) => <Base {...p}><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></Base>;
export const IconoTelefono = (p: P) => <Base {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></Base>;
export const IconoCandado = (p: P) => <Base {...p}><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></Base>;
export const IconoMicrofono = (p: P) => <Base {...p}><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></Base>;
export const IconoPersona = (p: P) => <Base {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></Base>;
export const IconoGrafico = (p: P) => <Base {...p}><path d="M3 20h18M6 16v-4M11 16V8M16 16v-6M21 16V5" /></Base>;
export const IconoEquipo = (p: P) => <Base {...p}><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18.5 14.5a6.5 6.5 0 0 1 3 5.5" /></Base>;
export const IconoNota = (p: P) => <Base {...p}><path d="M5 3h10l4 4v14H5z" /><path d="M15 3v4h4M8.5 12h7M8.5 16h5" /></Base>;
export const IconoChincheta = (p: P) => <Base {...p}><path d="M9 3h6l-1 5 3 3v2H7v-2l3-3zM12 13v8" /></Base>;
export const IconoOjo = (p: P) => <Base {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></Base>;
export const IconoExamen = (p: P) => <Base {...p}><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3" /><path d="M7.5 15h9" /></Base>;
// «Más»: los tres puntos de la barra del celular.
export const IconoMas = (p: P) => <Base {...p}><circle cx="5" cy="12" r="1.25" fill="currentColor" /><circle cx="12" cy="12" r="1.25" fill="currentColor" /><circle cx="19" cy="12" r="1.25" fill="currentColor" /></Base>;
// El blog: un libro abierto (consejos y noticias de la clínica).
export const IconoLibro = (p: P) => <Base {...p}><path d="M12 6.5c-1.6-1.4-4-1.9-7.5-1.5v13.5c3.5-.4 5.9.1 7.5 1.5 1.6-1.4 4-1.9 7.5-1.5V5c-3.5-.4-5.9.1-7.5 1.5Z" /><path d="M12 6.5V20" /></Base>;
