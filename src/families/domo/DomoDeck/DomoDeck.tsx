import { Children, isValidElement, useEffect, useRef } from "react";
import type { ReactElement, ReactNode } from "react";
import { useControllableState } from "../../../behaviors/useControllableState";
import { cx } from "../../../utils/cx";
import "../domo.scss";
import "./DomoDeck.scss";

export interface DomoSlideProps {
  /** Nombre del slide (marcadores y lectores de pantalla). */
  title?: string;
  className?: string;
  children?: ReactNode;
}

/** Un slide del deck; solo el activo se monta. */
export function DomoSlide({ className, children }: DomoSlideProps) {
  return <div className={cx("domo-slide", className)}>{children}</div>;
}

export interface DomoDeckProps {
  /** Nombre del carrusel para lectores de pantalla ("portafolio"). */
  label: string;
  /** Índice controlado (undefined = no controlado). */
  index?: number;
  defaultIndex?: number;
  onIndexChange?: (next: number) => void;
  className?: string;
  /** Hijos DomoSlide. */
  children?: ReactNode;
}

/**
 * Deck DOMO: navegación de UNA vista a la vez — flechas, marcadores de
 * rombo ◆/◇ y contador, nada de scroll. Teclado ← → cuando el foco está
 * dentro. Controlable desde fuera: la AI del portafolio puede llevarte
 * al slide que está narrando.
 */
export default function DomoDeck({
  label,
  index,
  defaultIndex = 0,
  onIndexChange,
  className,
  children,
}: DomoDeckProps) {
  const slides = Children.toArray(children).filter(isValidElement) as ReactElement<DomoSlideProps>[];
  const count = slides.length;

  const [current = 0, setCurrent] = useControllableState<number>({
    value: index,
    defaultValue: defaultIndex,
    onChange: onIndexChange,
  });

  // Índice anterior YA pintado → decide desde qué lado entra el nuevo slide.
  const prevRef = useRef(current);
  const forward = current >= prevRef.current;
  useEffect(() => {
    prevRef.current = current;
  }, [current]);

  if (count === 0) return null;

  const go = (i: number) => setCurrent(Math.min(count - 1, Math.max(0, i)));
  const active = slides[Math.min(current, count - 1)];
  const activeTitle = active?.props.title;

  return (
    <section
      className={cx("domo-deck", className)}
      role="group"
      aria-roledescription="carrusel"
      aria-label={label}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          go(current + 1);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          go(current - 1);
        }
      }}
    >
      <div className="domo-deck__viewport">
        <div
          key={current}
          className={cx("domo-deck__frame", forward ? "is-fwd" : "is-back")}
          role="group"
          aria-roledescription="diapositiva"
          aria-label={`${current + 1} de ${count}${activeTitle ? `: ${activeTitle}` : ""}`}
        >
          {active}
        </div>
      </div>

      <div className="domo-deck__rail">
        <button
          type="button"
          className="domo-deck__arrow"
          aria-label="Anterior"
          disabled={current === 0}
          onClick={() => go(current - 1)}
        >
          ←
        </button>

        <div className="domo-deck__markers">
          {slides.map((slide, i) => (
            <button
              key={i}
              type="button"
              className={cx("domo-deck__marker", i === current && "is-active")}
              aria-label={`Ir a ${slide.props.title ?? `slide ${i + 1}`}`}
              aria-current={i === current || undefined}
              onClick={() => go(i)}
            >
              {i === current ? "◆" : "◇"}
            </button>
          ))}
        </div>

        <span className="domo-deck__counter" aria-hidden="true">
          {String(current + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </span>

        <button
          type="button"
          className="domo-deck__arrow"
          aria-label="Siguiente"
          disabled={current === count - 1}
          onClick={() => go(current + 1)}
        >
          →
        </button>
      </div>
    </section>
  );
}
