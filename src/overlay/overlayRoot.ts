/**
 * Nodo único [data-ds-overlay-root] como hijo directo de <body>, creado
 * idempotentemente. Framework-agnóstico: cualquier MFE/instancia de React
 * llega al MISMO nodo, y los overlays escapan de ancestros con transform/
 * overflow (el clásico "containing block" que atrapa position:fixed).
 * El tema fluye igual porque las --ds-* viven en :root.
 */
export function getOverlayRoot(): HTMLElement | null {
  if (typeof document === "undefined") return null;
  let node = document.querySelector<HTMLElement>("[data-ds-overlay-root]");
  if (!node) {
    node = document.createElement("div");
    node.setAttribute("data-ds-overlay-root", "");
    document.body.appendChild(node);
  }
  return node;
}
