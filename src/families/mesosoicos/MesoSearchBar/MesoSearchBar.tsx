import { forwardRef } from "react";
import type { KeyboardEvent } from "react";
import Input from "../../../primitives/Input/Input";
import type { InputProps } from "../../../primitives/Input/Input";
import { cx } from "../../../utils/cx";
import "./MesoSearchBar.scss";

export interface MesoSearchBarProps extends InputProps {
  /** Enter dispara onSearch con el valor actual. */
  onSearch?: (query: string) => void;
  /** Tecla mostrada como kbd (decorativa). */
  shortcutHint?: string;
}

/**
 * Barra de búsqueda MESOSOICOS: lupa + input (núcleo headless) + hint de
 * atajo.
 */
const MesoSearchBar = forwardRef<HTMLInputElement, MesoSearchBarProps>(
  function MesoSearchBar(
    {
      onSearch,
      shortcutHint = "/",
      placeholder = "Buscar…",
      className,
      onKeyDown,
      ...rest
    },
    ref,
  ) {
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(e);
      if (e.key === "Enter") onSearch?.(e.currentTarget.value);
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
  },
);

export default MesoSearchBar;
