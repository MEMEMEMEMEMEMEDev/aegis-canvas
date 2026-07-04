import { useState } from "react";
import Modal from "./Modal";
import Button from "../Button/Button";

export default {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export const Default = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Abrir modal</Button>
        <Modal open={open} onClose={() => setOpen(false)} title="COMM_LINK">
          <p style={{ color: "var(--ds-text-muted)" }}>
            Modal centrado, con backdrop, Esc para cerrar, scroll-lock y focus
            trap. Todo estilizado con el contrato de tema.
          </p>
          <div style={{ marginTop: "var(--ds-space-lg)", display: "flex", gap: "var(--ds-space-sm)", justifyContent: "flex-end" }}>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={() => setOpen(false)}>Confirmar</Button>
          </div>
        </Modal>
      </>
    );
  },
};

export const Fullscreen = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Abrir fullscreen</Button>
        <Modal open={open} onClose={() => setOpen(false)} title="AEGIS // FULLSCREEN" fullscreen>
          <p style={{ color: "var(--ds-text-muted)" }}>
            Cubre todo el viewport. Ideal para experiencias inmersivas lanzadas
            desde cualquier MFE.
          </p>
        </Modal>
      </>
    );
  },
};

/**
 * The key demo: a deeply "trapped" parent (transform + overflow:hidden + small
 * box) — exactly the Scotiabank situation. A naive `position:fixed` modal would
 * be anchored to this box and clipped. The Portal modal escapes to the viewport.
 */
export const EscapesTrappedParent = {
  name: "Escapa de un padre atrapado",
  render: () => {
    const [portalOpen, setPortalOpen] = useState(false);
    const [naiveOpen, setNaiveOpen] = useState(false);
    return (
      <div
        style={{
          // The trap: any of these would break a naive fixed modal.
          transform: "translateZ(0) scale(1)",
          filter: "saturate(1)",
          overflow: "hidden",
          width: "320px",
          height: "220px",
          padding: "var(--ds-space-lg)",
          border: "1px dashed var(--ds-border-strong)",
          borderRadius: "var(--ds-radius-lg)",
          background: "var(--ds-surface-sunken)",
          position: "relative",
        }}
      >
        <p style={{ fontSize: "var(--ds-font-size-sm)", color: "var(--ds-text-muted)", marginBottom: "var(--ds-space-md)" }}>
          Soy un MFE hijo con <code>transform</code> + <code>overflow:hidden</code>.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--ds-space-sm)" }}>
          <Button size="sm" onClick={() => setPortalOpen(true)}>✓ Modal con Portal (escapa)</Button>
          <Button size="sm" variant="outline" onClick={() => setNaiveOpen(true)}>
            ✗ Modal naive (atrapado)
          </Button>
        </div>

        {/* Correct: portals out, covers the real viewport. */}
        <Modal open={portalOpen} onClose={() => setPortalOpen(false)} title="Portal → viewport completo" fullscreen>
          <p style={{ color: "var(--ds-text-muted)" }}>
            Aunque me lanzaron desde una caja de 320×220 con transform y overflow
            hidden, cubro toda la pantalla. Eso es el overlay root.
          </p>
        </Modal>

        {/* Broken on purpose: fixed inside the trapped parent. */}
        {naiveOpen && (
          <div
            onClick={() => setNaiveOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "var(--ds-backdrop)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--ds-text)",
              fontSize: "var(--ds-font-size-xs)",
              textAlign: "center",
              padding: "var(--ds-space-sm)",
            }}
          >
            Naive: anclado a la caja, recortado. (click para cerrar)
          </div>
        )}
      </div>
    );
  },
};
