export default {
  title: "Foundation/Welcome",
  parameters: { layout: "centered" },
};

/**
 * Placeholder de la reconstrucción v2. Mantiene Storybook operativo
 * mientras el sistema se rediseña desde cero, capa por capa.
 */
export const Reset = {
  render: () => (
    <div style={{ maxWidth: 520, fontFamily: "system-ui, sans-serif", lineHeight: 1.6 }}>
      <h1 style={{ marginTop: 0 }}>aegis-canvas · v2</h1>
      <p>
        Reconstrucción desde cero. La estructura y las convenciones se
        conservan; cada capa se diseña de nuevo en este orden:
      </p>
      <ol>
        <li><strong>tokens/</strong> — escalas primitivas (maps SCSS)</li>
        <li><strong>themes/</strong> — contrato semántico <code>--ds-*</code></li>
        <li><strong>base/</strong> — reset + globales sobre el contrato</li>
        <li><strong>functions/ + mixins/</strong> — herramientas de autoría</li>
        <li><strong>primitives/</strong> — componentes universales</li>
        <li><strong>families/</strong> — lenguajes visuales</li>
      </ol>
    </div>
  ),
};
