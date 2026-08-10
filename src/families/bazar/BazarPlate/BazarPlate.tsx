import type { ReactNode } from "react";
import { cx } from "../../../utils/cx";
import "../bazar.scss";
import "./BazarPlate.scss";

export interface BazarPlateProps {
  children: ReactNode;
  /** tinta (default) · rosa · morado · papel. */
  tone?: "tinta" | "rosa" | "morado" | "papel";
  size?: "sm" | "md" | "lg";
  className?: string;
}

/** La placa de nombre sesgada: el paralelogramo autoadhesivo de la referencia. */
export default function BazarPlate({
  children,
  tone = "tinta",
  size = "md",
  className,
}: BazarPlateProps) {
  return (
    <span
      className={cx("bazar-placa", `bazar-placa--${tone}`, `bazar-placa--${size}`, className)}
    >
      {children}
    </span>
  );
}
