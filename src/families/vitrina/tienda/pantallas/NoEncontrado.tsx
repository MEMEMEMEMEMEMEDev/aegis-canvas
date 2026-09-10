import VitrinaVacio from "../../VitrinaVacio/VitrinaVacio";
import { useRuta } from "../ruta";

export default function NoEncontrado({ intento }: { intento?: string }) {
  const { ir, volver, puedeVolver } = useRuta();
  return (
    <VitrinaVacio
      tono="404"
      alto="pantalla"
      titulo="Esto no está en la vitrina"
      texto={intento ? `No encontramos «${intento}». Puede que el producto ya no exista o que el enlace esté roto.` : "Puede que el enlace esté roto o que la página ya no exista."}
      accion={{ label: "Volver al inicio", onClick: () => ir({ v: "inicio" }) }}
      secundaria={puedeVolver ? { label: "Volver atrás", onClick: volver } : { label: "Ver ofertas", onClick: () => ir({ v: "catalogo", filtros: { soloOferta: true } }) }}
    />
  );
}
