import type { Meta, StoryObj } from "@storybook/react-vite";
import Tienda from "./tienda/Tienda";

// =============================================================================
// VITRINA · Tienda → Completo.
//
// La vista real de la familia: un marketplace entero, con estado y
// persistencia. Recorrido sugerido: inicio → una categoría → una ficha →
// añadir (la lámina vuela) → cajón → ir a pagar → entrar (cualquier correo,
// contraseña de 6+) o seguir como invitado → cuatro pasos → confirmación →
// Mis compras, donde el pedido aparece con su seguimiento.
//
// Persiste en localStorage: recargar conserva la cesta, la sesión y los
// pedidos. «Reiniciar la demo» está en Cuenta → Preferencias.
// =============================================================================

const meta: Meta = {
  title: "Families/Vitrina/Tienda",
  parameters: { layout: "fullscreen" },
};
export default meta;

export const Completo: StoryObj = {
  render: () => <Tienda />,
};

export const Movil: StoryObj = {
  globals: { viewport: { value: "mobile1", isRotated: false } },
  render: () => <Tienda />,
};
