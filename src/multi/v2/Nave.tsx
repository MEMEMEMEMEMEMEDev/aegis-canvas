// =============================================================================
// MULTI V2 — la nave AEGIS (mismo trazo que V1, pero ahora el casco SIENTE).
// Si viene onClick, el SVG va dentro de un botón: tres toques al casco
// despiertan el logro secreto "manos-en-el-casco".
// =============================================================================

export interface NaveProps {
  size?: number;
  viajando?: boolean;
  /** La turbulencia de protesta cuando le tocan el casco. */
  molesta?: boolean;
  onClick?: () => void;
}

function Casco({ size, viajando, molesta }: { size: number; viajando: boolean; molesta: boolean }) {
  return (
    <svg
      viewBox="0 0 130 60"
      width={size}
      className={[
        "mv2-nave",
        viajando && "mv2-nave--viajando",
        molesta && "mv2-nave--molesta",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
    >
      <polygon className="mv2-nave__flama" points="16,30 -6,22 2,30 -6,38" fill="#d13a1e" />
      <polygon
        points="14,30 74,10 122,30 74,50"
        fill="#e7e4d8"
        stroke="#0a0c11"
        strokeWidth="2.5"
      />
      <circle cx="80" cy="30" r="6.5" fill="#12151c" />
      <polygon points="42,19 58,14 58,24" fill="#12151c" opacity="0.35" />
      <polygon points="42,41 58,46 58,36" fill="#12151c" opacity="0.35" />
    </svg>
  );
}

export default function Nave({
  size = 150,
  viajando = false,
  molesta = false,
  onClick,
}: NaveProps) {
  if (!onClick) return <Casco size={size} viajando={viajando} molesta={molesta} />;
  return (
    <button
      type="button"
      className="mv2-nave-boton"
      aria-label="casco de la nave AEGIS"
      onClick={onClick}
    >
      <Casco size={size} viajando={viajando} molesta={molesta} />
    </button>
  );
}
