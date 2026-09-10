import VitrinaHueso, { VitrinaHuesoGrupo, VitrinaHuesoLinea, VitrinaHuesoTarjeta } from "../../VitrinaHueso/VitrinaHueso";

// Cada esqueleto mide más o menos lo que su pantalla real: sin salto de
// layout cuando llega lo de verdad.

export function EsqueletoInicio() {
  return (
    <VitrinaHuesoGrupo label="Cargando la tienda">
      <VitrinaHueso forma="bloque" alto="min(30rem, 70vh)" className="tienda-hueso-hero" />
      <div className="tienda-rejilla tienda-rejilla--losetas">
        {[0, 1, 2, 3].map((i) => (
          <VitrinaHueso key={i} forma="bloque" alto="9rem" />
        ))}
      </div>
      <div className="tienda-rejilla">
        {[0, 1, 2, 3].map((i) => (
          <VitrinaHuesoTarjeta key={i} />
        ))}
      </div>
    </VitrinaHuesoGrupo>
  );
}

export function EsqueletoCatalogo() {
  return (
    <VitrinaHuesoGrupo label="Buscando productos">
      <div className="tienda-fila">
        {[0, 1, 2, 3].map((i) => (
          <VitrinaHueso key={i} forma="bloque" ancho="6rem" alto="36px" />
        ))}
      </div>
      <div className="tienda-rejilla">
        {Array.from({ length: 8 }, (_, i) => (
          <VitrinaHuesoTarjeta key={i} />
        ))}
      </div>
    </VitrinaHuesoGrupo>
  );
}

export function EsqueletoProducto() {
  return (
    <VitrinaHuesoGrupo label="Cargando la ficha">
      <div className="tienda-producto__grid">
        <VitrinaHueso forma="lamina" className="tienda-hueso-galeria" />
        <div className="tienda-columna">
          <VitrinaHueso forma="linea" ancho="30%" alto="0.6rem" />
          <VitrinaHueso forma="linea" lineas={2} alto="1.4rem" />
          <VitrinaHueso forma="linea" ancho="40%" alto="1.6rem" />
          <VitrinaHueso forma="bloque" />
          <VitrinaHueso forma="bloque" />
          <VitrinaHueso forma="linea" lineas={4} />
        </div>
      </div>
    </VitrinaHuesoGrupo>
  );
}

export function EsqueletoLineas({ n = 3 }: { n?: number }) {
  return (
    <VitrinaHuesoGrupo label="Cargando">
      {Array.from({ length: n }, (_, i) => (
        <VitrinaHuesoLinea key={i} />
      ))}
    </VitrinaHuesoGrupo>
  );
}

export function EsqueletoCuenta() {
  return (
    <VitrinaHuesoGrupo label="Cargando tu cuenta">
      <div className="tienda-columna">
        <VitrinaHueso forma="linea" ancho="40%" alto="1.6rem" />
        <div className="tienda-rejilla tienda-rejilla--losetas">
          {[0, 1, 2].map((i) => (
            <VitrinaHueso key={i} forma="bloque" alto="7rem" />
          ))}
        </div>
      </div>
    </VitrinaHuesoGrupo>
  );
}

export function EsqueletoPedido() {
  return (
    <VitrinaHuesoGrupo label="Cargando el pedido">
      <div className="tienda-columna">
        <VitrinaHueso forma="linea" ancho="50%" alto="1.6rem" />
        <VitrinaHueso forma="linea" ancho="30%" />
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="tienda-fila">
            <VitrinaHueso forma="circulo" ancho="24px" alto="24px" />
            <VitrinaHueso forma="linea" ancho="40%" />
          </div>
        ))}
      </div>
    </VitrinaHuesoGrupo>
  );
}
