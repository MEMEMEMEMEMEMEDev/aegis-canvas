// Superficie de marca para las tarjetas de preview de design-sync.
// La marca es DARK-FIRST: los componentes se diseñan sobre
// --ds-surface-base; la tarjeta de preview usa fondo blanco propio, así
// que este wrapper repone la superficie (igual que el canvas de Storybook).
// Solo se exporta vía .design-sync/entry.ts — no es API pública del paquete.
import type { ReactNode } from "react";

export function PreviewSurface({ children }: { children?: ReactNode }) {
  return (
    <div
      style={{
        background: "var(--ds-surface-base)",
        color: "var(--ds-text)",
        padding: "var(--ds-space-lg)",
        borderRadius: 6,
      }}
    >
      {children}
    </div>
  );
}
