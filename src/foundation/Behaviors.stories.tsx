import { useRef } from "react";
import type { KeyboardEvent } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useDisclosure } from "../behaviors/useDisclosure";
import { useDismiss } from "../behaviors/useDismiss";
import { useListNavigation } from "../behaviors/useListNavigation";

const meta: Meta = {
  title: "Foundation/Behaviors",
  parameters: { layout: "centered" },
};
export default meta;

interface KernelItem {
  value: string;
  label: string;
  disabled?: boolean;
}

const ITEMS: KernelItem[] = [
  { value: "deploy", label: "Deploy" },
  { value: "logs", label: "Ver logs" },
  { value: "rollback", label: "Rollback", disabled: true },
  { value: "scale", label: "Escalar réplicas" },
  { value: "secrets", label: "Rotar secrets" },
];

/**
 * Prueba de fuego del kernel: un menú SIN una sola línea de CSS que ya tiene
 * comportamiento completo — flechas con wrap saltando disabled, Home/End,
 * typeahead (escribe "es"…), Enter selecciona, Escape/click-fuera cierra.
 * La estética que se le ponga encima (la que sea de rara) hereda esto gratis.
 */
export const MenuKernel: StoryObj = {
  render: () => <KernelDemo />,
};

function KernelDemo() {
  const { isOpen, toggle, close } = useDisclosure();
  const nav = useListNavigation<KernelItem>({ items: ITEMS });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useDismiss({
    active: isOpen,
    refs: [triggerRef, listRef],
    onDismiss: () => {
      close();
      triggerRef.current?.focus();
    },
  });

  const select = (i: number) => {
    const item = ITEMS[i];
    if (!item || item.disabled) return;
    close();
    triggerRef.current?.focus();
    // eslint-disable-next-line no-alert
    alert(`Seleccionado: ${item.label}`);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      nav.move(1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      nav.move(-1);
    } else if (e.key === "Home") {
      e.preventDefault();
      nav.first();
    } else if (e.key === "End") {
      e.preventDefault();
      nav.last();
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      select(nav.activeIndex);
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
      nav.typeahead(e.key);
    }
  };

  return (
    <div style={{ minHeight: 260 }}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => {
          toggle();
          if (!isOpen) nav.first();
        }}
        onKeyDown={isOpen ? onKeyDown : undefined}
      >
        Acciones {isOpen ? "▴" : "▾"}
      </button>

      {isOpen && (
        <ul
          ref={listRef}
          role="listbox"
          tabIndex={-1}
          aria-activedescendant={
            nav.activeIndex >= 0 ? `kernel-opt-${nav.activeIndex}` : undefined
          }
          onKeyDown={onKeyDown}
          style={{ listStyle: "none", padding: 4, margin: "4px 0", border: "1px solid" }}
        >
          {ITEMS.map((item, i) => (
            <li
              key={item.value}
              id={`kernel-opt-${i}`}
              role="option"
              aria-selected={nav.activeIndex === i}
              aria-disabled={item.disabled || undefined}
              onPointerEnter={() => !item.disabled && nav.setActiveIndex(i)}
              onClick={() => select(i)}
              style={{
                padding: "2px 8px",
                outline: nav.activeIndex === i ? "2px solid" : "none",
                opacity: item.disabled ? 0.4 : 1,
                cursor: item.disabled ? "not-allowed" : "pointer",
              }}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
      <p style={{ maxWidth: 380, fontSize: 12, opacity: 0.7 }}>
        Sin CSS del sistema: flechas (con wrap, salta disabled), Home/End,
        typeahead escribiendo letras, Enter/Espacio selecciona, Escape o click
        fuera cierra y devuelve el foco.
      </p>
    </div>
  );
}
