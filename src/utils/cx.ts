export type ClassValue = string | number | null | undefined | false | ClassValue[];

/**
 * Une clases condicionalmente: cx("ds-x", isOpen && "is-open", className).
 * Acepta strings, falsy (se ignoran) y arrays anidados.
 */
export function cx(...parts: ClassValue[]): string {
  const out: string[] = [];
  const walk = (part: ClassValue): void => {
    if (Array.isArray(part)) part.forEach(walk);
    else if (part) out.push(String(part));
  };
  parts.forEach(walk);
  return out.join(" ");
}
