import { forwardRef } from "react";
import Input from "../../../primitives/Input/Input";
import { cx } from "../../../utils/cx";
import "./MesoSearchBar.scss";

/**
 * Barra de búsqueda MESOSOICOS: lupa + input (núcleo headless) + hint de
 * atajo. Enter dispara onSearch con el valor actual.
 *
 * @param {object} props
 * @param {(query: string) => void} [props.onSearch]
 * @param {string} [props.shortcutHint="/"]  tecla mostrada como kbd (decorativa)
 */
const MesoSearchBar = forwardRef(function MesoSearchBar(
  { onSearch, shortcutHint = "/", placeholder = "Buscar…", className, onKeyDown, ...rest },
  ref,
) {
  const handleKeyDown = (e) => {
    onKeyDown?.(e);
    if (e.key === "Enter") onSearch?.(e.target.value);
  };

  return (
    <div className={cx("meso-search", className)}>
      <svg
        className="meso-search__icon"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <circle cx="7" cy="7" r="4.5" />
        <path d="M10.5 10.5 14 14" />
      </svg>
      <Input
        ref={ref}
        type="search"
        role="searchbox"
        className="meso-search__input"
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        {...rest}
      />
      {shortcutHint && (
        <kbd className="meso-search__kbd" aria-hidden="true">
          {shortcutHint}
        </kbd>
      )}
    </div>
  );
});

export default MesoSearchBar;
