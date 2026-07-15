import { useEffect, useId, useMemo, useRef, useState } from "react";
import { cx } from "../../utils/cx";
import { ChevronDown, Check, Search } from "../../utils/icons";
import { useFieldProps } from "../Field/Field";
import "./Dropdown.scss";

/**
 * Custom single-select listbox — for options too rich for a native <select>
 * (icons, descriptions, search). Full keyboard support: ↑/↓, Home/End,
 * Enter/Space, Esc, typeahead by first letters.
 *
 * Controlled: pass `value` + `onChange(nextValue)`.
 *
 * @param {object} props
 * @param {Array<{value:string, label:string, description?:string,
 *                icon?:React.ReactNode, disabled?:boolean}>} props.options
 * @param {string}  [props.value]
 * @param {(value: string) => void} [props.onChange]
 * @param {string}  [props.placeholder="Seleccionar…"]
 * @param {boolean} [props.searchable=false] filter input inside the menu
 * @param {"sm"|"md"|"lg"} [props.size="md"]
 * @param {boolean} [props.invalid]
 */
export default function Dropdown({
  options = [],
  value,
  onChange,
  placeholder = "Seleccionar…",
  searchable = false,
  size = "md",
  invalid,
  disabled,
  required,
  id,
  className = "",
  ...rest
}) {
  const field = useFieldProps({ id, invalid, disabled, required });
  const autoId = useId();
  const baseId = field.id ?? `ds-dropdown-${autoId}`;

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);

  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const listRef = useRef(null);
  const searchRef = useRef(null);
  const typeahead = useRef({ text: "", at: 0 });

  const visible = useMemo(() => {
    if (!searchable || !query) return options;
    const q = query.toLowerCase();
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, searchable, query]);

  const selected = options.find((o) => o.value === value);

  const openMenu = () => {
    if (field.disabled) return;
    const idx = visible.findIndex((o) => o.value === value && !o.disabled);
    setActiveIndex(idx >= 0 ? idx : visible.findIndex((o) => !o.disabled));
    setOpen(true);
  };

  const closeMenu = (refocus = true) => {
    setOpen(false);
    setQuery("");
    if (refocus) triggerRef.current?.focus();
  };

  const commit = (opt) => {
    if (!opt || opt.disabled) return;
    onChange?.(opt.value);
    closeMenu();
  };

  const move = (from, delta) => {
    let i = from;
    for (let step = 0; step < visible.length; step += 1) {
      i = (i + delta + visible.length) % visible.length;
      if (!visible[i]?.disabled) return i;
    }
    return from;
  };

  // focus the right element when the menu opens
  useEffect(() => {
    if (!open) return;
    (searchable ? searchRef.current : listRef.current)?.focus();
  }, [open, searchable]);

  // keep the active option in view
  useEffect(() => {
    if (!open || activeIndex < 0) return;
    document
      .getElementById(`${baseId}-opt-${activeIndex}`)
      ?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex, baseId]);

  // close on outside interaction
  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (e) => {
      if (!rootRef.current?.contains(e.target)) closeMenu(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const handleNavKeys = (e) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => move(i, +1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => move(i, -1));
        break;
      case "Home":
        e.preventDefault();
        setActiveIndex(visible.findIndex((o) => !o.disabled));
        break;
      case "End":
        e.preventDefault();
        setActiveIndex(
          visible.length - 1 - [...visible].reverse().findIndex((o) => !o.disabled),
        );
        break;
      case "Enter":
        e.preventDefault();
        commit(visible[activeIndex]);
        break;
      case "Escape":
        e.preventDefault();
        closeMenu();
        break;
      case "Tab":
        closeMenu(false);
        break;
      default:
        return false;
    }
    return true;
  };

  const handleListKeyDown = (e) => {
    if (handleNavKeys(e)) return;
    if (e.key === " ") {
      e.preventDefault();
      commit(visible[activeIndex]);
      return;
    }
    // typeahead: accumulate letters typed within 600ms
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      const now = Date.now();
      const t = typeahead.current;
      t.text = now - t.at < 600 ? t.text + e.key : e.key;
      t.at = now;
      const q = t.text.toLowerCase();
      const idx = visible.findIndex(
        (o) => !o.disabled && o.label.toLowerCase().startsWith(q),
      );
      if (idx >= 0) setActiveIndex(idx);
    }
  };

  const handleTriggerKeyDown = (e) => {
    if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
      e.preventDefault();
      openMenu();
    }
  };

  return (
    <div
      ref={rootRef}
      className={cx(
        "ds-dropdown",
        `ds-dropdown--${size}`,
        open && "is-open",
        field.invalid && "is-invalid",
        field.disabled && "is-disabled",
        className,
      )}
      {...rest}
    >
      <button
        ref={triggerRef}
        type="button"
        className="ds-dropdown__trigger"
        id={baseId}
        disabled={field.disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-invalid={field.invalid || undefined}
        aria-describedby={field.describedBy}
        aria-required={field.required || undefined}
        onClick={() => (open ? closeMenu() : openMenu())}
        onKeyDown={handleTriggerKeyDown}
      >
        <span
          className={cx(
            "ds-dropdown__value",
            !selected && "ds-dropdown__value--placeholder",
          )}
        >
          {selected?.icon && (
            <span className="ds-dropdown__value-icon">{selected.icon}</span>
          )}
          {selected ? selected.label : placeholder}
        </span>
        <span className="ds-dropdown__chevron" aria-hidden="true">
          <ChevronDown />
        </span>
      </button>

      {open && (
        <div className="ds-dropdown__menu">
          {searchable && (
            <div className="ds-dropdown__search">
              <Search />
              <input
                ref={searchRef}
                type="text"
                value={query}
                placeholder="Filtrar…"
                aria-label="Filtrar opciones"
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={(e) => {
                  if (["ArrowDown", "ArrowUp", "Enter", "Escape"].includes(e.key)) {
                    handleNavKeys(e);
                  }
                }}
              />
            </div>
          )}

          <ul
            ref={listRef}
            role="listbox"
            tabIndex={-1}
            className="ds-dropdown__list"
            aria-labelledby={baseId}
            aria-activedescendant={
              activeIndex >= 0 ? `${baseId}-opt-${activeIndex}` : undefined
            }
            onKeyDown={handleListKeyDown}
          >
            {visible.length === 0 && (
              <li className="ds-dropdown__empty">Sin resultados</li>
            )}
            {visible.map((opt, i) => (
              <li
                key={opt.value}
                id={`${baseId}-opt-${i}`}
                role="option"
                aria-selected={opt.value === value}
                aria-disabled={opt.disabled || undefined}
                className={cx(
                  "ds-dropdown__option",
                  i === activeIndex && "is-active",
                  opt.disabled && "is-disabled",
                )}
                onPointerMove={() => !opt.disabled && setActiveIndex(i)}
                onClick={() => commit(opt)}
              >
                {opt.icon && (
                  <span className="ds-dropdown__option-icon">{opt.icon}</span>
                )}
                <span className="ds-dropdown__option-text">
                  <span className="ds-dropdown__option-label">{opt.label}</span>
                  {opt.description && (
                    <span className="ds-dropdown__option-desc">
                      {opt.description}
                    </span>
                  )}
                </span>
                {opt.value === value && (
                  <span className="ds-dropdown__option-check" aria-hidden="true">
                    <Check />
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
