import { useState } from "react";
import { cx } from "../../../utils/cx";
import "../domo.scss";
import "./DomoPrompt.scss";

export interface DomoPromptProps {
  /** Nombre del canal para lectores de pantalla ("preguntar a la AI"). */
  label: string;
  placeholder?: string;
  onSubmit?: (text: string) => void;
  disabled?: boolean;
  className?: string;
}

/**
 * Prompt DOMO: la barra para hablarle a la AI del portafolio — cápsula de
 * instrumento con envío circular. Limpia el campo al enviar.
 */
export default function DomoPrompt({
  label,
  placeholder = "Pregúntale algo a la AI…",
  onSubmit,
  disabled = false,
  className,
}: DomoPromptProps) {
  const [text, setText] = useState("");

  return (
    <form
      className={cx("domo-prompt", className)}
      aria-label={label}
      onSubmit={(e) => {
        e.preventDefault();
        const t = text.trim();
        if (!t) return;
        onSubmit?.(t);
        setText("");
      }}
    >
      <input
        className="domo-prompt__input"
        type="text"
        aria-label={label}
        placeholder={placeholder}
        value={text}
        disabled={disabled}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="submit"
        className="domo-prompt__send"
        aria-label="Enviar"
        disabled={disabled || !text.trim()}
      >
        →
      </button>
    </form>
  );
}
