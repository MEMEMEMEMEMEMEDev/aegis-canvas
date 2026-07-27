import { cx } from "../../../utils/cx";
import "../telar.scss";
import "./TelarStripe.scss";

export interface TelarStripeProps {
  /** Alto en px. Default: 6. */
  height?: number;
  /** El tejido avanza en loop (como hilo corriendo). Default: false. */
  animated?: boolean;
  className?: string;
}

/** Franja tejida TELAR: los cinco hilados como divisor; animable. */
export default function TelarStripe({ height = 6, animated = false, className }: TelarStripeProps) {
  return (
    <span
      className={cx("telar-stripe", animated && "telar-stripe--animated", className)}
      style={{ height }}
      aria-hidden="true"
    />
  );
}
