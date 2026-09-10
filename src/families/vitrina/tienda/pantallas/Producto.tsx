import { useEffect, useRef, useState } from "react";
import VitrinaBoton from "../../VitrinaBoton/VitrinaBoton";
import VitrinaCantidad from "../../VitrinaCantidad/VitrinaCantidad";
import VitrinaCarrusel from "../../VitrinaCarrusel/VitrinaCarrusel";
import VitrinaEstrellas from "../../VitrinaEstrellas/VitrinaEstrellas";
import VitrinaLamina from "../../VitrinaLamina/VitrinaLamina";
import VitrinaPicto from "../../VitrinaPicto/VitrinaPicto";
import VitrinaPrecio from "../../VitrinaPrecio/VitrinaPrecio";
import VitrinaSelector from "../../VitrinaSelector/VitrinaSelector";
import VitrinaSello from "../../VitrinaSello/VitrinaSello";
import VitrinaTitular from "../../VitrinaTitular/VitrinaTitular";
import { espera, relacionados, useCarga } from "../api";
import { CATEGORIA, COLORES, COLOR_MUESTRA, PRODUCTO, VENDEDOR } from "../datos";
import type { ColorId, Producto as ProductoTipo, Talla } from "../datos";
import { entregaEstimada } from "../formato";
import { EsqueletoProducto } from "../partes/Esqueletos";
import TarjetaProducto from "../partes/TarjetaProducto";
import { coloresDe, laminaDe, sellosDe, tallasDe } from "../partes/utiles";
import { useAgregar } from "../partes/useAgregar";
import { useRuta } from "../ruta";
import { esFavorito, useTienda } from "../state";
import ProductoPestanas from "./ProductoPestanas";

export default function Producto({ id }: { id: string }) {
  const { state, dispatch } = useTienda();
  const { ir } = useRuta();
  const agregar = useAgregar();
  const lamina = useRef<HTMLSpanElement>(null);

  const { datos, cargando } = useCarga(async () => {
    await espera();
    const p = PRODUCTO[id];
    return p ? { p, rel: relacionados(p) } : null;
  }, id);

  const p: ProductoTipo | undefined = datos?.p;
  const colores = p ? coloresDe(p) : [];
  const tallas = p ? tallasDe(p) : [];
  const [color, setColor] = useState<ColorId | undefined>(undefined);
  const [talla, setTalla] = useState<Talla | undefined>(undefined);
  const [cantidad, setCantidad] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setColor(colores[0]);
    setTalla(undefined);
    setCantidad(1);
    setError(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, datos]);

  if (cargando || !datos || !p) return <EsqueletoProducto />;

  const variante = p.variantes.find((v) => (colores.length ? v.color === color : true) && (tallas.length ? v.talla === talla : true));
  const stockDe = (c?: ColorId, t?: Talla) => p.variantes.filter((v) => (c ? v.color === c : true) && (t ? v.talla === t : true)).reduce((s, v) => s + v.stock, 0);
  const stock = variante?.stock ?? 0;
  const faltaTalla = tallas.length > 0 && !talla;
  const vendedor = VENDEDOR[p.vendedor];
  const favorito = esFavorito(state, p.id);

  const validar = (): boolean => {
    if (faltaTalla) {
      setError("Elige una talla");
      document.getElementById("selector-talla")?.scrollIntoView({ block: "center", behavior: "smooth" });
      return false;
    }
    if (!variante || stock === 0) {
      setError("Esta combinación está agotada");
      return false;
    }
    setError(null);
    return true;
  };

  const anadir = () => {
    if (validar() && variante) agregar(p, variante.id, cantidad, lamina.current);
  };
  const comprarAhora = () => {
    if (validar() && variante) {
      dispatch({ type: "agregar", productoId: p.id, varianteId: variante.id, cantidad });
      ir({ v: "checkout", paso: "datos" });
    }
  };

  return (
    <>
      <nav className="tienda-miga" aria-label="Estás en">
        <button type="button" onClick={() => ir({ v: "inicio" })}>Inicio</button>
        <span aria-hidden="true">›</span>
        <button type="button" onClick={() => ir({ v: "catalogo", categoria: p.categoria })}>{CATEGORIA[p.categoria].nombre}</button>
        <span aria-hidden="true">›</span>
        <span aria-current="page">{p.nombre}</span>
      </nav>

      <div className="tienda-producto__grid">
        <div className="tienda-producto__galeria">
          <VitrinaLamina ref={lamina} {...laminaDe(p, color)} tamano="galeria" ratio="4/5" label={`${p.nombre}${color ? `, ${COLORES[color].nombre}` : ""}`} etiqueta={color ? COLORES[color].nombre : undefined} />
          {colores.length > 1 && (
            <div className="tienda-producto__miniaturas" aria-hidden="true">
              {colores.map((c) => (
                <button key={c} type="button" className={`tienda-producto__miniatura${c === color ? " is-activa" : ""}`} onClick={() => setColor(c)} tabIndex={-1}>
                  <VitrinaLamina {...laminaDe(p, c)} tamano="mini" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="tienda-producto__ficha">
          <div className="tienda-producto__sellos">
            {sellosDe(p).map((s) => (
              <VitrinaSello key={s.texto} tono={s.tono}>
                {s.texto}
              </VitrinaSello>
            ))}
            {stock > 0 && stock <= 3 && !faltaTalla && (
              <VitrinaSello tono="aviso">Solo quedan {stock}</VitrinaSello>
            )}
          </div>
          <VitrinaTitular tamano="pagina" sobre={vendedor.nombre}>
            {p.nombre}
          </VitrinaTitular>
          <button type="button" className="tienda-producto__estrellas" onClick={() => document.getElementById("opiniones")?.scrollIntoView({ behavior: "smooth", block: "start" })}>
            <VitrinaEstrellas valor={p.valoracion} cantidad={p.resenas} />
            <span className="tienda-producto__ver-opiniones">Ver opiniones</span>
          </button>
          <VitrinaPrecio valor={p.precio} antes={p.precioAntes} tamano="lg" />

          {colores.length > 0 && <VitrinaSelector tipo="color" label="Color" value={color} onChange={(c) => { setColor(c as ColorId); setError(null); }} opciones={colores.map((c) => ({ id: c, label: COLORES[c].nombre, color: COLOR_MUESTRA[c], agotada: stockDe(c, talla) === 0 }))} />}
          {tallas.length > 0 && (
            <div id="selector-talla">
              <VitrinaSelector label="Talla" value={talla} onChange={(t) => { setTalla(t as Talla); setError(null); }} accion={{ label: "Guía de tallas", onClick: () => {} }} opciones={tallas.map((t) => ({ id: t, label: t, agotada: stockDe(color, t) === 0 }))} error={error && faltaTalla ? error : null} />
            </div>
          )}

          <div className="tienda-producto__compra">
            <VitrinaCantidad label={`Cantidad de ${p.nombre}`} value={cantidad} onChange={setCantidad} min={1} max={Math.max(1, stock || 1)} disabled={faltaTalla || stock === 0} />
            <VitrinaBoton tono="coral" size="lg" icono={<VitrinaPicto name="carrito" />} onClick={anadir} disabled={!faltaTalla && stock === 0}>
              Añadir a la cesta
            </VitrinaBoton>
          </div>
          <div className="tienda-producto__compra2">
            <VitrinaBoton variant="outline" size="lg" onClick={comprarAhora} disabled={!faltaTalla && stock === 0}>
              Comprar ahora
            </VitrinaBoton>
            <VitrinaBoton variant="ghost" size="lg" icono={<VitrinaPicto name={favorito ? "corazon-lleno" : "corazon"} />} onClick={() => dispatch({ type: "favorito", productoId: p.id })} aria-pressed={favorito}>
              {favorito ? "Guardado" : "Guardar"}
            </VitrinaBoton>
          </div>
          {error && !faltaTalla && (
            <p className="tienda-producto__error" role="alert">
              {error}
            </p>
          )}

          <ul className="tienda-producto__datos">
            <li>
              <VitrinaPicto name="camion" size={20} />
              <span>
                <strong>{p.envio.gratis ? "Envío gratis" : "Envío desde $2.990"}</strong> · {entregaEstimada(p.envio.dias)}
              </span>
            </li>
            <li>
              <VitrinaPicto name="devolucion" size={20} />
              <span>30 días para devolver, sin preguntas</span>
            </li>
            <li>
              <VitrinaPicto name="escudo" size={20} />
              <span>
                Vendido por <strong>{vendedor.nombre}</strong>, {vendedor.ciudad} · {vendedor.valoracion.toFixed(1).replace(".", ",")} ★ · desde {vendedor.desde}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <ProductoPestanas producto={p} />

      {datos.rel.length > 0 && (
        <section className="tienda-seccion">
          <VitrinaTitular tamano="seccion" accion={{ label: `Más de ${CATEGORIA[p.categoria].nombre.split(" ")[0]}`, onClick: () => ir({ v: "catalogo", categoria: p.categoria }) }}>
            También te puede interesar
          </VitrinaTitular>
          <VitrinaCarrusel label="Productos relacionados" ancho="min(70vw, 14rem)">
            {datos.rel.map((r) => (
              <TarjetaProducto key={r.id} producto={r} />
            ))}
          </VitrinaCarrusel>
        </section>
      )}
    </>
  );
}
