import VitrinaBoton from "../../VitrinaBoton/VitrinaBoton";
import VitrinaOpcion, { VitrinaOpcionGrupo } from "../../VitrinaOpcion/VitrinaOpcion";
import { CATEGORIAS, VENDEDORES } from "../datos";
import type { CategoriaId, Filtros, VendedorId } from "../datos";

export const FILTROS_VACIOS: Filtros = { categorias: [], vendedores: [], soloOferta: false, envioGratis: false };

export const hayFiltros = (f: Filtros): boolean => f.categorias.length > 0 || f.vendedores.length > 0 || f.precioMax !== undefined || f.soloOferta || f.envioGratis || f.valoracionMin !== undefined;

const PRECIOS: Array<[number | undefined, string]> = [
  [undefined, "Cualquiera"],
  [10000, "Hasta $10.000"],
  [30000, "Hasta $30.000"],
  [60000, "Hasta $60.000"],
  [100000, "Hasta $100.000"],
];

/** El panel de filtros: en la barra lateral (≥lg) o dentro de un cajón (teléfono). */
export default function CatalogoFiltros({ filtros, onChange, onLimpiar }: { filtros: Filtros; onChange: (f: Filtros) => void; onLimpiar: () => void }) {
  const toggle = <T extends string>(lista: T[], x: T): T[] => (lista.includes(x) ? lista.filter((y) => y !== x) : [...lista, x]);

  return (
    <div className="tienda-filtros">
      <VitrinaOpcionGrupo leyenda="Categoría" pegadas={false}>
        {CATEGORIAS.map((c) => (
          <VitrinaOpcion key={c.id} tipo="casilla" marco={false} checked={filtros.categorias.includes(c.id)} onChange={() => onChange({ ...filtros, categorias: toggle<CategoriaId>(filtros.categorias, c.id) })} label={c.nombre} />
        ))}
      </VitrinaOpcionGrupo>

      <VitrinaOpcionGrupo leyenda="Precio" pegadas={false}>
        {PRECIOS.map(([max, label]) => (
          <VitrinaOpcion key={label} tipo="radio" marco={false} name="precio" checked={filtros.precioMax === max} onChange={() => onChange({ ...filtros, precioMax: max })} label={label} />
        ))}
      </VitrinaOpcionGrupo>

      <VitrinaOpcionGrupo leyenda="Vendedor" pegadas={false}>
        {VENDEDORES.map((v) => (
          <VitrinaOpcion key={v.id} tipo="casilla" marco={false} checked={filtros.vendedores.includes(v.id)} onChange={() => onChange({ ...filtros, vendedores: toggle<VendedorId>(filtros.vendedores, v.id) })} label={v.nombre} detalle={v.ciudad} />
        ))}
      </VitrinaOpcionGrupo>

      <VitrinaOpcionGrupo leyenda="Valoración" pegadas={false}>
        {[undefined, 4, 3].map((min) => (
          <VitrinaOpcion key={String(min)} tipo="radio" marco={false} name="valoracion" checked={filtros.valoracionMin === min} onChange={() => onChange({ ...filtros, valoracionMin: min })} label={min ? `${min} estrellas o más` : "Cualquiera"} />
        ))}
      </VitrinaOpcionGrupo>

      <VitrinaOpcionGrupo leyenda="Más" pegadas={false}>
        <VitrinaOpcion tipo="interruptor" marco={false} checked={filtros.soloOferta} onChange={(v) => onChange({ ...filtros, soloOferta: v })} label="Solo ofertas" />
        <VitrinaOpcion tipo="interruptor" marco={false} checked={filtros.envioGratis} onChange={(v) => onChange({ ...filtros, envioGratis: v })} label="Envío gratis" />
      </VitrinaOpcionGrupo>

      {hayFiltros(filtros) && (
        <VitrinaBoton variant="outline" ancho onClick={onLimpiar}>
          Quitar filtros
        </VitrinaBoton>
      )}
    </div>
  );
}
