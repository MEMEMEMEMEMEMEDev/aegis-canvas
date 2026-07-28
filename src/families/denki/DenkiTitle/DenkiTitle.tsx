import type { ElementType } from "react";
import { cx } from "../../../utils/cx";
import "../denki.scss";
import "./DenkiTitle.scss";

export interface DenkiTitleProps {
  /** Línea latina condensed ("FIGHT KING PRO"). */
  latin: string;
  /** Línea katakana gigante debajo ("ファイトキング"). */
  kana?: string;
  /** Subtítulo bermellón ("LEVERLESS EDITION"). */
  sub?: string;
  /** Corona bermellón sobre la línea latina (como la referencia). */
  crown?: boolean;
  size?: "hero" | "card";
  as?: ElementType;
  className?: string;
}

/**
 * Título DENKI: la doble voz del póster — latín condensed arriba, katakana
 * enorme debajo y edición en bermellón. El katakana es decorativo para
 * lectores de pantalla (el latín ya nombra la cosa).
 */
export default function DenkiTitle({
  latin,
  kana,
  sub,
  crown = false,
  size = "hero",
  as: Tag = "h2",
  className,
}: DenkiTitleProps) {
  return (
    <Tag className={cx("denki-title", `denki-title--${size}`, className)}>
      <span className="denki-title__latin">
        {crown && (
          <span className="denki-title__crown" aria-hidden="true">
            ♛
          </span>
        )}
        {latin}
      </span>
      {kana && (
        <span className="denki-title__kana" aria-hidden="true">
          {kana}
        </span>
      )}
      {sub && <span className="denki-title__sub">{sub}</span>}
    </Tag>
  );
}
