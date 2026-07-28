import type { ReactNode } from "react";
import type { CSSProperties } from "react";
import { cx } from "../../../utils/cx";
import "../denki.scss";
import "./DenkiFrame.scss";

export interface DenkiFrameProps {
  /** Visual: img, gradiente, ilustración, canvas… llena el marco. */
  children: ReactNode;
  /** Pie de marco (mono pequeño). */
  caption?: string;
  /** Tachado bermellón en diagonal (el "prohibido palanca" del póster). */
  strike?: boolean;
  ratio?: string;
  className?: string;
}

/**
 * Marco técnico DENKI: la viñeta ilustrada del póster — panel negro con
 * semitono, visual dentro, y tachado bermellón opcional para los "NO".
 */
export default function DenkiFrame({
  children,
  caption,
  strike = false,
  ratio = "4 / 3",
  className,
}: DenkiFrameProps) {
  return (
    <figure className={cx("denki-frame", className)}>
      <div className="denki-frame__stage" style={{ "--df-ratio": ratio } as CSSProperties}>
        <div className="denki-frame__visual">{children}</div>
        {strike && <span className="denki-frame__strike" aria-hidden="true" />}
      </div>
      {caption && <figcaption className="denki-frame__caption">{caption}</figcaption>}
    </figure>
  );
}
