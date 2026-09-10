import VitrinaCarrusel from "../../VitrinaCarrusel/VitrinaCarrusel";
import VitrinaCartel, { VitrinaCartelFranja } from "../../VitrinaCartel/VitrinaCartel";
import VitrinaCuenta from "../../VitrinaCuenta/VitrinaCuenta";
import VitrinaLamina from "../../VitrinaLamina/VitrinaLamina";
import VitrinaLoseta from "../../VitrinaLoseta/VitrinaLoseta";
import VitrinaPrecio from "../../VitrinaPrecio/VitrinaPrecio";
import VitrinaTitular from "../../VitrinaTitular/VitrinaTitular";
import { enFlash, espera, masVendidos, novedades, useCarga } from "../api";
import { CATEGORIAS } from "../datos";
import { EsqueletoInicio } from "../partes/Esqueletos";
import TarjetaProducto from "../partes/TarjetaProducto";
import { laminaDe } from "../partes/utiles";
import { useRuta } from "../ruta";

export default function Inicio() {
  const { ir } = useRuta();
  const { datos, cargando } = useCarga(async () => {
    await espera();
    return { novedades: novedades(8), vendidos: masVendidos(6), flash: enFlash() };
  }, "inicio");

  if (cargando || !datos) return <EsqueletoInicio />;
  const flash = datos.flash[0];

  return (
    <>
      <VitrinaCartel
        alto="hero"
        sobre="Trending ahora"
        titulo="Descubre lo que vas a querer"
        texto="Tecnología, hogar, ferretería y moda de seis tiendas chilenas, en un solo carrito y con un solo envío."
        accion={{ label: "Comprar ahora", onClick: () => ir({ v: "catalogo" }) }}
        secundaria={{ label: "Ver novedades", onClick: () => ir({ v: "catalogo", orden: "nuevo" }) }}
        pie="Más de 50.000 clientes en todo Chile"
        flotantes={datos.vendidos.slice(0, 4).map((p) => (
          <button key={p.id} type="button" className="tienda-flotante" onClick={() => ir({ v: "producto", id: p.id })} tabIndex={-1}>
            <VitrinaLamina {...laminaDe(p, p.variantes[0]?.color)} tamano="mini" ratio="3/2" />
            <span className="tienda-flotante__nombre">{p.nombre}</span>
            <VitrinaPrecio valor={p.precio} tamano="sm" />
          </button>
        ))}
      />

      <VitrinaCartelFranja
        items={[
          { picto: "envio", titulo: "Envío gratis", texto: "En compras sobre $39.990" },
          { picto: "seguro", titulo: "Pago seguro", texto: "Checkout 100 % protegido" },
          { picto: "devoluciones", titulo: "Devolución fácil", texto: "30 días para cambiar de idea" },
          { picto: "soporte", titulo: "Soporte 24/7", texto: "Siempre hay alguien" },
        ]}
      />

      <section className="tienda-seccion">
        <VitrinaTitular tamano="seccion" accion={{ label: "Ver todas", onClick: () => ir({ v: "catalogo" }) }}>
          Compra por categoría
        </VitrinaTitular>
        <div className="tienda-rejilla tienda-rejilla--losetas">
          {CATEGORIAS.map((c) => (
            <VitrinaLoseta key={c.id} nombre={c.nombre} picto={c.picto} matiz={c.matiz} sub="Ver productos" onClick={() => ir({ v: "catalogo", categoria: c.id })} />
          ))}
        </div>
      </section>

      <section className="tienda-seccion">
        <VitrinaTitular tamano="seccion" accion={{ label: "Ver novedades", onClick: () => ir({ v: "catalogo", orden: "nuevo" }) }}>
          Novedades
        </VitrinaTitular>
        <div className="tienda-rejilla">
          {datos.novedades.map((p, i) => (
            <TarjetaProducto key={p.id} producto={p} indice={i} />
          ))}
        </div>
      </section>

      <section className="tienda-seccion">
        <VitrinaTitular tamano="seccion" accion={{ label: "Ver todos", onClick: () => ir({ v: "catalogo", orden: "valoracion" }) }}>
          Más vendidos
        </VitrinaTitular>
        <VitrinaCarrusel label="Más vendidos" ancho="min(84vw, 22rem)" puntos>
          {datos.vendidos.map((p) => (
            <TarjetaProducto key={p.id} producto={p} variante="horizontal" />
          ))}
        </VitrinaCarrusel>
      </section>

      <div className="tienda-rejilla tienda-rejilla--banners">
        {flash?.flashHasta && (
          <VitrinaCartel
            tono="coral"
            sobre="Venta flash"
            titulo="Hasta 70 % dcto."
            texto={`${flash.nombre} y más, solo hasta que se acabe el reloj o el stock.`}
            accion={{ label: "Ver ofertas flash", onClick: () => ir({ v: "catalogo", filtros: { soloOferta: true } }) }}
            derecha={<VitrinaCuenta hasta={flash.flashHasta} label="Termina la venta flash" />}
          />
        )}
        <VitrinaCartel
          tono="bloque"
          sobre="Nueva colección"
          titulo="Primavera 2026"
          texto="Lo nuevo de moda y deporte, con envío gratis toda la semana."
          accion={{ label: "Ver colección", onClick: () => ir({ v: "catalogo", categoria: "moda", orden: "nuevo" }) }}
          derecha={<VitrinaLamina picto="moda" matiz="#efe1ea" tamano="galeria" ratio="4/5" className="tienda-banner-lamina" />}
        />
      </div>

      <VitrinaCartelFranja
        items={[
          { picto: "escudo", titulo: "Calidad garantizada", texto: "Vendedores verificados" },
          { picto: "camion", titulo: "Entrega rápida", texto: "Express en 24 horas" },
          { picto: "tarjeta", titulo: "Paga como quieras", texto: "Tarjeta, transferencia, cuotas" },
          { picto: "estrella", titulo: "4,7 de 5", texto: "Según 9.600 opiniones" },
        ]}
      />
    </>
  );
}
