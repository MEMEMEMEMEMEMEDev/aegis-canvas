import type { Cupon, Direccion, Preferencias, Sesion, Tarjeta } from "./tipos";

// La cuenta demo: cualquier correo + contraseña de 6+ entra, y se convierte
// en Camila. Es una demo publicada a propósito con credenciales de mentira.
export const USUARIO_DEMO: Sesion = {
  id: "u-camila",
  nombre: "Camila",
  apellido: "Riquelme",
  email: "camila.riquelme@correo.cl",
  telefono: "+56 9 8765 4321",
  desde: "2024-03-12",
};

export const DIRECCIONES_SEMILLA: Direccion[] = [
  { id: "d-casa", alias: "Casa", nombre: "Camila Riquelme", calle: "Av. Los Leones", numero: "1234", depto: "402", comuna: "Providencia", region: "Región Metropolitana", telefono: "+56 9 8765 4321", predeterminada: true },
  { id: "d-oficina", alias: "Oficina", nombre: "Camila Riquelme", calle: "Blanco Encalada", numero: "2120", comuna: "Santiago Centro", region: "Región Metropolitana", telefono: "+56 2 2345 6789", predeterminada: false },
];

export const TARJETAS_SEMILLA: Tarjeta[] = [
  { id: "t-visa", marca: "visa", ultimos4: "4242", titular: "CAMILA RIQUELME", vence: "08/28", predeterminada: true },
  { id: "t-mc", marca: "mastercard", ultimos4: "8810", titular: "CAMILA RIQUELME", vence: "01/27", predeterminada: false },
];

export const PREFERENCIAS_INICIALES: Preferencias = {
  notificaciones: { ofertas: true, pedidos: true, novedades: false },
  tema: "claro",
};

export const CUPONES: Record<string, Cupon> = {
  BIENVENIDO10: { codigo: "BIENVENIDO10", porcentaje: 10 },
  FERRETERIA15: { codigo: "FERRETERIA15", porcentaje: 15, soloCategoria: "ferreteria" },
};

export const REGIONES = ["Región Metropolitana", "Valparaíso", "Biobío", "La Araucanía", "Los Lagos", "Los Ríos", "Antofagasta", "Coquimbo", "Maule", "O'Higgins"];
