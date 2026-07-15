import { useState } from "react";
import Field from "../primitives/Field/Field";
import Input from "../primitives/Input/Input";
import SearchInput from "../primitives/SearchInput/SearchInput";
import Textarea from "../primitives/Textarea/Textarea";
import Select from "../primitives/Select/Select";
import Dropdown from "../primitives/Dropdown/Dropdown";
import Checkbox from "../primitives/Checkbox/Checkbox";
import Radio, { RadioGroup } from "../primitives/Radio/Radio";
import NumberInput from "../primitives/NumberInput/NumberInput";
import Button from "../primitives/Button/Button";
import { useField } from "../forms/useField";
import * as v from "../forms/validators";

export default {
  title: "Foundation/Forms",
  parameters: { layout: "padded" },
};

/**
 * Formulario completo: todos los controles + validación con useField.
 * Cambia el tema en la toolbar — todo se repinta vía el contrato --ds-*.
 */
export const Showcase = {
  render: () => <DemoForm />,
};

function DemoForm() {
  const name = useField({ validators: [v.required(), v.minLength(3)] });
  const email = useField({ validators: [v.required(), v.email()] });
  const password = useField({
    validators: [
      v.required(),
      v.minLength(8, "La contraseña necesita al menos 8 caracteres"),
    ],
  });
  const site = useField({ validators: [v.url()] });
  const bio = useField({ validators: [v.maxLength(140)] });

  const [country, setCountry] = useState("");
  const [visibility, setVisibility] = useState();
  const [plan, setPlan] = useState();
  const [seats, setSeats] = useState(1);
  const [terms, setTerms] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const countryError = submitted && !country ? "Selecciona un país" : null;
  const visibilityError = submitted && !visibility ? "Elige la visibilidad" : null;
  const planError = submitted && !plan ? "Elige un plan" : null;
  const termsError =
    submitted && !terms ? "Debes aceptar los términos" : null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const fieldsOk = [name, email, password, site, bio]
      .map((f) => f.validate())
      .every(Boolean);
    const choicesOk = country && visibility && plan && terms;
    if (!fieldsOk || !choicesOk) return;

    setSending(true);
    setDone(false);
    setTimeout(() => {
      setSending(false);
      setDone(true);
    }, 1500);
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      style={{
        maxWidth: 480,
        display: "grid",
        gap: "var(--ds-space-lg)",
        padding: "var(--ds-space-xl)",
        background: "var(--ds-surface-raised)",
        border: "1px solid var(--ds-border-subtle)",
        borderRadius: "var(--ds-radius-xl)",
        boxShadow: "var(--ds-shadow-md)",
      }}
    >
      <header style={{ display: "grid", gap: "var(--ds-space-2xs)" }}>
        <h2 style={{ margin: 0, font: "var(--ds-font-weight-bold) var(--ds-font-size-xl) var(--ds-font-sans)" }}>
          Crear cuenta
        </h2>
        <p style={{ margin: 0, color: "var(--ds-text-muted)", fontSize: "var(--ds-font-size-sm)" }}>
          Arsenal completo de formularios · cambia el tema en la toolbar ☝
        </p>
      </header>

      <SearchInput placeholder="Buscar en la documentación… (demo)" />

      <Field label="Nombre" required error={name.error}>
        <Input
          value={name.value}
          onChange={name.onChange}
          onBlur={name.onBlur}
          placeholder="Marcelo Huenchupan"
          clearable
          onClear={() => name.setValue("")}
        />
      </Field>

      <Field
        label="Correo electrónico"
        required
        hint="Solo para avisos importantes"
        error={email.error}
      >
        <Input
          type="email"
          value={email.value}
          onChange={email.onChange}
          onBlur={email.onBlur}
          placeholder="tu@correo.com"
        />
      </Field>

      <Field label="Contraseña" required error={password.error}>
        <Input
          type="password"
          value={password.value}
          onChange={password.onChange}
          onBlur={password.onBlur}
          placeholder="Mínimo 8 caracteres"
        />
      </Field>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--ds-space-md)" }}>
        <Field label="País" required error={countryError}>
          <Select
            placeholder="Elige…"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            options={[
              { value: "cl", label: "Chile" },
              { value: "ar", label: "Argentina" },
              { value: "pe", label: "Perú" },
              { value: "uy", label: "Uruguay" },
            ]}
          />
        </Field>

        <Field label="Asientos" hint="1 a 20">
          <NumberInput value={seats} onChange={setSeats} min={1} max={20} />
        </Field>
      </div>

      <Field label="Visibilidad del perfil" required error={visibilityError}>
        <Dropdown
          placeholder="Seleccionar…"
          value={visibility}
          onChange={setVisibility}
          options={[
            { value: "public", label: "Público", description: "Cualquiera puede verlo" },
            { value: "team", label: "Equipo", description: "Solo tu equipo" },
            { value: "private", label: "Privado", description: "Solo tú" },
          ]}
        />
      </Field>

      <Field label="Plan" required error={planError}>
        <RadioGroup label="Plan" value={plan} onChange={setPlan}>
          <Radio value="free" label="Free" description="Para probar" />
          <Radio value="pro" label="Pro" description="$5/mes · proyectos ilimitados" />
        </RadioGroup>
      </Field>

      <Field label="Sitio web" hint="Opcional" error={site.error}>
        <Input
          type="url"
          value={site.value}
          onChange={site.onChange}
          onBlur={site.onBlur}
          placeholder="https://ahroi.com"
          prefix="🌐"
        />
      </Field>

      <Field
        label="Bio"
        hint={`${140 - String(bio.value).length} caracteres restantes`}
        error={bio.error}
      >
        <Textarea
          value={bio.value}
          onChange={bio.onChange}
          onBlur={bio.onBlur}
          autoResize
          rows={2}
          maxRows={5}
          placeholder="Cuéntanos de ti…"
        />
      </Field>

      <Checkbox
        label="Acepto los términos y condiciones"
        description="Incluida la política de privacidad"
        checked={terms}
        onChange={(e) => setTerms(e.target.checked)}
        invalid={Boolean(termsError)}
      />
      {termsError && (
        <p role="alert" style={{ margin: "calc(var(--ds-space-sm) * -1) 0 0", color: "var(--ds-danger)", fontSize: "var(--ds-font-size-xs)" }}>
          {termsError}
        </p>
      )}

      <div style={{ display: "flex", gap: "var(--ds-space-sm)", alignItems: "center" }}>
        <Button type="submit" loading={sending}>
          Crear cuenta
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => {
            [name, email, password, site, bio].forEach((f) => f.reset());
            setCountry("");
            setVisibility(undefined);
            setPlan(undefined);
            setSeats(1);
            setTerms(false);
            setSubmitted(false);
            setDone(false);
          }}
        >
          Limpiar
        </Button>
        {done && (
          <span style={{ color: "var(--ds-success)", fontSize: "var(--ds-font-size-sm)" }}>
            ✓ Cuenta creada
          </span>
        )}
      </div>
    </form>
  );
}
