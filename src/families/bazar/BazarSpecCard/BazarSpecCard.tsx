import type { ElementType, ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../bazar.scss";
import "./BazarSpecCard.scss";

export interface BazarSpecRow {
  label: string;
  value?: string;
}

export interface BazarSpecCardProps {
  title: string;
  /** Etiqueta del título: "h3" cuando la ficha es una subsección. */
  as?: ElementType;
  /** Micro-línea bajo la barra del título. */
  sub?: string;
  /** Las filas de la boleta: concepto a la izquierda, dato a la derecha. */
  rows: readonly BazarSpecRow[];
  /** La cifra grande del pie, con su prefijo/sufijo chico (como el precio). */
  figure?: { value: string; prefix?: string; sufijo?: string };
  /** rosa (default) · morado — el color del dato y la cifra. */
  tone?: "rosa" | "morado";
  /** Grados de rotación de la tarjeta. */
  rotate?: number;
  /** Contenido extra bajo las filas (nota, botón…). */
  children?: ReactNode;
  className?: string;
}

/**
 * La ficha de producto del cartel: barra de título con la mira de
 * registro, filas de boleta y la cifra grande del pie. En el portal, el
 * producto son las specs de quien lo atiende.
 */
export default function BazarSpecCard({
  title,
  as: Title = "p",
  sub,
  rows,
  figure,
  tone = "rosa",
  rotate = -2,
  children,
  className,
}: BazarSpecCardProps) {
  return (
    <article
      className={cx("bazar-ficha", `bazar-ficha--${tone}`, className)}
      style={rotate ? { transform: `rotate(${rotate}deg)` } : undefined}
    >
      <header className="bazar-ficha__cabecera">
        <Title className="bazar-ficha__titulo">{title}</Title>
        <svg className="bazar-ficha__mira" viewBox="0 0 16 16" aria-hidden="true">
          <path
            d="M8 1.5v3M8 11.5v3M1.5 8h3M11.5 8h3M8 5.2A2.8 2.8 0 1 1 8 10.8 2.8 2.8 0 0 1 8 5.2z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      </header>

      {sub && <p className="bazar-ficha__sub">{sub}</p>}

      <div className="bazar-ficha__cuerpo">
        <ul className="bazar-ficha__filas">
          {rows.map((row) => (
            <li key={row.label}>
              <span className="bazar-ficha__concepto">{row.label}</span>
              {row.value && <span className="bazar-ficha__dato">{row.value}</span>}
            </li>
          ))}
        </ul>

        {figure && (
          <p className="bazar-ficha__cifra">
            {figure.prefix && <span>{figure.prefix}</span>}
            {figure.value}
            {figure.sufijo && <span>{figure.sufijo}</span>}
          </p>
        )}

        {children}
      </div>
    </article>
  );
}
