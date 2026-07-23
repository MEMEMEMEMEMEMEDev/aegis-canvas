import { useId, useRef } from "react";
import type { KeyboardEvent } from "react";
import { useControllableState } from "../../../behaviors/useControllableState";
import { useDisclosure } from "../../../behaviors/useDisclosure";
import { useDismiss } from "../../../behaviors/useDismiss";
import { useListNavigation } from "../../../behaviors/useListNavigation";
import { cx } from "../../../utils/cx";
import "./MesoDropdown.scss";

export interface MesoDropdownOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface MesoDropdownProps {
  options?: MesoDropdownOption[];
  /** Controlado. */
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  /** Obligatorio si no hay <Field>/label externo. */
  ariaLabel?: string;
  disabled?: boolean;
  className?: string;
}

/**
 * Dropdown MESOSOICOS (patrón listbox, todo desde el kernel de behaviors):
 * flechas con wrap saltando disabled, Home/End, typeahead, Enter/Espacio
 * selecciona, Escape/click-fuera cierra y devuelve el foco.
 */
export default function MesoDropdown({
  options = [],
  value,
  defaultValue,
  onChange,
  placeholder = "Seleccionar…",
  ariaLabel,
  disabled = false,
  className,
}: MesoDropdownProps) {
  const baseId = useId();
  const [selected, setSelected] = useControllableState<string>({
    value,
    defaultValue,
    onChange,
  });
  const { isOpen, open, close } = useDisclosure();
  const nav = useListNavigation<MesoDropdownOption>({ items: options });
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

  const selectedOption = options.find((o) => o.value === selected);

  const openAndFocus = () => {
    open();
    const idx = options.findIndex((o) => o.value === selected && !o.disabled);
    if (idx >= 0) nav.setActiveIndex(idx);
    else nav.first();
    requestAnimationFrame(() => listRef.current?.focus());
  };

  const commit = (index: number) => {
    const option = options[index];
    if (!option || option.disabled) return;
    setSelected(option.value);
    close();
    triggerRef.current?.focus();
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
      commit(nav.activeIndex);
    } else if (e.key === "Tab") {
      close();
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
      nav.typeahead(e.key);
    }
  };

  return (
    <div className={cx("meso-dropdown", isOpen && "is-open", className)}>
      <button
        ref={triggerRef}
        type="button"
        className="meso-dropdown__trigger"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
        onClick={() => (isOpen ? close() : openAndFocus())}
        onKeyDown={(e) => {
          if (!isOpen && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
            e.preventDefault();
            openAndFocus();
          }
        }}
      >
        <span
          className={cx(
            "meso-dropdown__value",
            !selectedOption && "meso-dropdown__value--placeholder",
          )}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className="meso-dropdown__caret"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M2.5 4.5 6 8l3.5-3.5" />
        </svg>
      </button>

      {isOpen && (
        <ul
          ref={listRef}
          className="meso-dropdown__menu"
          role="listbox"
          tabIndex={-1}
          aria-label={ariaLabel}
          aria-activedescendant={
            nav.activeIndex >= 0 ? `${baseId}-opt-${nav.activeIndex}` : undefined
          }
          onKeyDown={onKeyDown}
        >
          {options.map((option, i) => (
            <li
              key={option.value}
              id={`${baseId}-opt-${i}`}
              className={cx(
                "meso-dropdown__option",
                nav.activeIndex === i && "is-active",
                option.value === selected && "is-selected",
              )}
              role="option"
              aria-selected={option.value === selected}
              aria-disabled={option.disabled || undefined}
              onPointerEnter={() => !option.disabled && nav.setActiveIndex(i)}
              onClick={() => commit(i)}
            >
              <span className="meso-dropdown__option-label">{option.label}</span>
              {option.description && (
                <span className="meso-dropdown__option-desc">
                  {option.description}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
