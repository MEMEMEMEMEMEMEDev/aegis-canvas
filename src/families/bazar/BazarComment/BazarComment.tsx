import type { ElementType, ReactNode } from "react";
import { cx } from "../../../utils/cx";
import BazarAvatar, { type BazarAvatarShape } from "../BazarAvatar/BazarAvatar";
import BazarRating from "../BazarRating/BazarRating";
import "../bazar.scss";
import "./BazarComment.scss";

export interface BazarReplyItem {
  name: string;
  text: string;
  avatar?: BazarAvatarShape;
}

export interface BazarCommentProps {
  /** Quién firma. Va en la placa entintada. */
  name: string;
  /** Etiqueta de la placa: "h3" cuando la reseña es una entrada del índice. */
  as?: ElementType;
  /** Rótulo sobre la placa (p. ej. "cliente" o el rol). */
  detail?: string;
  avatar?: BazarAvatarShape;
  /**
   * La ventanita de valoración, pegada al borde de la firma. Se pide con
   * DATOS y no con JSX: un consumidor Astro no puede pasar un nodo React
   * como prop (solo como children), y esta forma sirve a los dos mundos.
   */
  rating?: {
    value: string;
    label?: string;
    tone?: "morado" | "rosa";
    corazones?: number;
    rotate?: number;
  };
  /** Hilo de respuestas bajo la reseña. */
  replies?: readonly BazarReplyItem[];
  /** El cuerpo de la reseña. Resaltar con <BazarResalte> — el panel es oscuro. */
  children: ReactNode;
  className?: string;
}

/**
 * La reseña del foro: avatar anónimo, globo entintado con el texto, placa
 * de firma, rating opcional y respuestas anidadas. La pieza que convierte
 * cualquier historia en "lo que dicen de esto".
 */
export default function BazarComment({
  name,
  as: Name = "span",
  detail,
  avatar = "bolsa",
  rating,
  replies,
  children,
  className,
}: BazarCommentProps) {
  return (
    <article className={cx("bazar-resena", className)}>
      <span className="bazar-resena__cerrar" aria-hidden="true">
        ✕
      </span>

      <div className="bazar-resena__principal">
        <BazarAvatar shape={avatar} size="lg" className="bazar-resena__avatar" />
        <div className="bazar-resena__globo">{children}</div>
      </div>

      <footer className="bazar-resena__firma">
        <div className="bazar-resena__quien">
          {detail && <span className="bazar-resena__rol">{detail}</span>}
          <Name className="bazar-resena__placa">{name}</Name>
        </div>
        {rating && (
          <div className="bazar-resena__rating">
            <BazarRating {...rating} />
          </div>
        )}
      </footer>

      {replies && replies.length > 0 && (
        <ul className="bazar-resena__hilo">
          {replies.map((reply) => (
            <li key={reply.name + reply.text.slice(0, 12)}>
              <BazarAvatar shape={reply.avatar ?? "visor"} size="sm" />
              <div className="bazar-resena__respuesta">
                <span className="bazar-resena__nombre">{reply.name}:</span>
                <p>{reply.text}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
