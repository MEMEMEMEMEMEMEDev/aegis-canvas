import { useEffect, useState } from "react";

/**
 * prefers-reduced-motion, SSR-safe. Lo que en CSS resuelve la media query,
 * en JS lo resuelve esto: sin vuelo al carrito, sin view transitions, sin
 * scroll suave. La información se sigue moviendo; la decoración no.
 */
export function useReposo(): boolean {
  const [reposo, setReposo] = useState(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setReposo(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reposo;
}
