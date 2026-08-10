import type { Meta, StoryObj } from "@storybook/react-vite";
import BazarAvatar from "./BazarAvatar/BazarAvatar";
import BazarBanner from "./BazarBanner/BazarBanner";
import BazarBarcode from "./BazarBarcode/BazarBarcode";
import BazarButton from "./BazarButton/BazarButton";
import BazarChrome from "./BazarChrome/BazarChrome";
import BazarComment from "./BazarComment/BazarComment";
import BazarPill from "./BazarPill/BazarPill";
import BazarPlate from "./BazarPlate/BazarPlate";
import BazarRating from "./BazarRating/BazarRating";
import BazarResalte from "./BazarResalte/BazarResalte";
import BazarSpecCard from "./BazarSpecCard/BazarSpecCard";
import BazarSticker from "./BazarSticker/BazarSticker";
import BazarTabs from "./BazarTabs/BazarTabs";
import BazarWindow from "./BazarWindow/BazarWindow";

const meta: Meta = {
  title: "Families/Bazar/Set",
  parameters: { layout: "fullscreen" },
};
export default meta;

// Contenido de muestra deliberadamente parecido al destino real (la sección
// "sobre mí" del portafolio): una trayectoria larga rompe el globo de la
// reseña, y eso hay que verlo aquí y no en producción.
const TABS = [
  { label: "Portada", href: "#" },
  { label: "El agente", href: "#", active: true },
  { label: "Specs", href: "#" },
  { label: "Reseñas", href: "#" },
];

const Pliego = ({ children }: { children: React.ReactNode }) => (
  <div className="bazar-scope" style={{ minHeight: "100vh", padding: "1.2rem" }}>
    <BazarChrome url="portafolio.aaroidev.com">
      <div style={{ padding: "1.4rem", display: "grid", gap: "1.6rem" }}>{children}</div>
    </BazarChrome>
  </div>
);

/** La vista que resume la familia: el portal completo con todas las voces. */
export const Overview: StoryObj = {
  render: () => (
    <Pliego>
      <BazarTabs items={TABS} />
      <BazarBanner
        kicker="Desarrollador Fullstack"
        meta="EST. 2022 · SCL"
        title="El agente"
        note="Escribe el producto y opera la plataforma que lo sirve."
      />
      <div style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap", alignItems: "center" }}>
        <BazarSticker tone="rosa">Disponible</BazarSticker>
        <BazarPill icon="candado">Supply chain firmada</BazarPill>
        <BazarPill icon="mira" tone="linea">
          Santiago · remoto
        </BazarPill>
        <BazarBarcode code="EST 2022" />
      </div>
      <BazarComment
        name="Banca digital"
        detail="2022 · 2025"
        avatar="visor"
        rating={{ value: "3 AÑOS", corazones: 4 }}
        replies={[
          {
            name: "admin996",
            text: "¿Y la web principal? Migrada del monolito a microfrontends, a producción sin incidentes mayores.",
            avatar: "bolsa",
          },
        ]}
      >
        <p>
          Migración del monolito a <BazarResalte>microfrontends</BazarResalte> con Module
          Federation, backend Java sobre <BazarResalte>BFFs</BazarResalte> y extensión del design
          system corporativo para requerimientos pixel-perfect.
        </p>
      </BazarComment>
      <div style={{ display: "grid", gap: "1.4rem", gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))" }}>
        <BazarSpecCard
          title="Frontend"
          sub="Lo que toca el usuario"
          rows={[
            { label: "React 19", value: "PROD" },
            { label: "TypeScript", value: "PROD" },
            { label: "Astro", value: "PROD" },
            { label: "Module Federation", value: "BANCA" },
          ]}
          figure={{ value: "7", prefix: "STACK" }}
        />
        <BazarSpecCard
          title="Infra"
          tone="morado"
          rotate={2}
          sub="Donde corre todo"
          rows={[
            { label: "Kubernetes (K3s)", value: "CASA" },
            { label: "ArgoCD", value: "GITOPS" },
            { label: "Jenkins", value: "CI" },
            { label: "cosign / Kyverno", value: "FIRMA" },
          ]}
          figure={{ value: "146", prefix: "GATES" }}
        />
      </div>
      <div style={{ display: "flex", gap: "1.4rem", flexWrap: "wrap", alignItems: "center" }}>
        <BazarButton href="#">Abrir canal</BazarButton>
        <BazarButton href="#" tone="tinta">
          Ver proyectos
        </BazarButton>
      </div>
    </Pliego>
  ),
};

/** Los banners: las tres tintas, incluida la holográfica del cartel. */
export const Banners: StoryObj = {
  render: () => (
    <Pliego>
      <BazarBanner kicker="Sección" meta="1/4" title="Miembro oro" />
      <BazarBanner tone="morado" kicker="Equipo" title="Trayectoria" note="2022 → hoy, sin huecos." />
      <BazarBanner tone="holo" kicker="Especial" meta="EDICIÓN LIMITADA" title="Laboratorio" />
    </Pliego>
  ),
};

/** Ventanas y ratings: el sistema operativo inventado del portal. */
export const Ventanas: StoryObj = {
  render: () => (
    <Pliego>
      <div style={{ display: "grid", gap: "1.8rem", gridTemplateColumns: "repeat(auto-fit, minmax(16rem, 1fr))" }}>
        <BazarWindow title="Líder del equipo">
          <p style={{ margin: 0 }}>
            El cuerpo de la ventana es papel: cualquier contenido de lectura vive aquí dentro.
          </p>
        </BazarWindow>
        <BazarWindow title="Aviso del sistema" tone="rosa" rotate={1.5}>
          <p style={{ margin: 0 }}>Tono rosa: barra con tinta encima, para avisos con voz alta.</p>
        </BazarWindow>
        <BazarWindow title="Consola" tone="tinta" cerrar={false}>
          <p style={{ margin: 0 }}>Tono tinta, sin el cerrar decorativo.</p>
        </BazarWindow>
      </div>
      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        <BazarRating value="★5" label="Valoración: 5 de 5" />
        <BazarRating value="2022 · 2025" corazones={4} tone="rosa" rotate={-2} />
        <BazarRating value="4 AÑOS" corazones={3} rotate={3} />
      </div>
    </Pliego>
  ),
};

/** La reseña completa, con hilo — la pieza que cuenta la trayectoria. */
export const Resenas: StoryObj = {
  render: () => (
    <Pliego>
      <BazarComment
        name="Consultoría CI/CD"
        detail="cliente · 2025"
        avatar="robo"
        rating={{ value: "★5", tone: "rosa" }}
        replies={[
          { name: "anon_442", text: "¿Sigue tomando proyectos? Pregunto para un amigo.", avatar: "gato" },
          { name: "eridu_001", text: "La plataforma abrió la puerta antes que el CV.", avatar: "bolsa" },
        ]}
      >
        <p>
          Contratado a raíz de la primera versión de la plataforma:{" "}
          <BazarResalte>infraestructura y pipelines CI/CD</BazarResalte> para consultoría, con la
          misma cadena firmada que sirve este portal.
        </p>
      </BazarComment>
    </Pliego>
  ),
};

/** Las piezas sueltas: placas, avatares, stickers, píldoras y botones. */
export const Piezas: StoryObj = {
  render: () => (
    <Pliego>
      <div style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap", alignItems: "center" }}>
        <BazarPlate size="sm">Placa sm</BazarPlate>
        <BazarPlate>Marcelo·H</BazarPlate>
        <BazarPlate size="lg" tone="rosa">
          Placa lg
        </BazarPlate>
        <BazarPlate tone="morado">Morada</BazarPlate>
        <BazarPlate tone="papel">Papel</BazarPlate>
      </div>
      <div style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap", alignItems: "center" }}>
        {(["bolsa", "visor", "gato", "robo"] as const).map((s) => (
          <BazarAvatar key={s} shape={s} size="lg" />
        ))}
        <BazarAvatar shape="visor" tone="rosa" size="md" />
        <BazarAvatar shape="gato" tone="morado" size="sm" />
      </div>
      <div style={{ display: "flex", gap: "1.4rem", flexWrap: "wrap", alignItems: "center" }}>
        <BazarSticker>Re-empaque</BazarSticker>
        <BazarSticker tone="rosa" angle={4}>
          Oferta
        </BazarSticker>
        <BazarSticker tone="tinta" angle={-3}>
          Agente
        </BazarSticker>
        <BazarSticker tone="holo" angle={7}>
          Holo
        </BazarSticker>
        <BazarBarcode code="0810 2025" angle={3} />
      </div>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
        <BazarPill icon="alerta">Leer el manual</BazarPill>
        <BazarPill icon="descarga" tone="linea">
          Descargar CV
        </BazarPill>
        <BazarPill icon="corazon" tone="rosa">
          Favorito
        </BazarPill>
        <BazarPill icon="reciclar" tone="linea">
          Reciclado
        </BazarPill>
      </div>
      <div style={{ display: "flex", gap: "1.4rem", flexWrap: "wrap", alignItems: "center" }}>
        <BazarButton href="#">Abrir canal</BazarButton>
        <BazarButton href="#" tone="tinta">
          Tinta
        </BazarButton>
        <BazarButton href="#" tone="linea" flecha={false}>
          Solo línea
        </BazarButton>
      </div>
    </Pliego>
  ),
};
