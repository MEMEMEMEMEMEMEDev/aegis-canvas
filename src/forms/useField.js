import { useCallback, useMemo, useRef, useState } from "react";

/**
 * useField — minimal controlled-field state + validation.
 *
 * Errors only show after the field is touched (blur) or after `validate()`
 * is forced (e.g. on submit), so users aren't yelled at while typing.
 *
 *   const name = useField({ validators: [required()] });
 *   <Field label="Nombre" error={name.error}>
 *     <Input value={name.value} onChange={name.onChange} onBlur={name.onBlur} />
 *   </Field>
 *   // on submit:  if (!name.validate()) return;
 *
 * @param {object}   [options]
 * @param {any}      [options.initial=""]    initial value
 * @param {Array<(v:any)=>string|null>} [options.validators=[]]
 * @returns {{
 *   value:any, setValue:(v:any)=>void,
 *   onChange:(eventOrValue:any)=>void, onBlur:()=>void,
 *   error:string|null, invalid:boolean, touched:boolean,
 *   validate:()=>boolean, reset:()=>void,
 * }}
 */
export function useField({ initial = "", validators = [] } = {}) {
  const [value, setValue] = useState(initial);
  const [touched, setTouched] = useState(false);
  // keep the rules stable without forcing consumers to memoize the array
  const rulesRef = useRef(validators);
  rulesRef.current = validators;

  const rawError = useMemo(() => {
    for (const rule of rulesRef.current) {
      const error = rule(value);
      if (error) return error;
    }
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, touched]);

  const onChange = useCallback((eventOrValue) => {
    setValue(
      eventOrValue && typeof eventOrValue === "object" && "target" in eventOrValue
        ? eventOrValue.target.value
        : eventOrValue,
    );
  }, []);

  const onBlur = useCallback(() => setTouched(true), []);

  const validate = useCallback(() => {
    setTouched(true);
    for (const rule of rulesRef.current) {
      if (rule(value)) return false;
    }
    return true;
  }, [value]);

  const reset = useCallback(() => {
    setValue(initial);
    setTouched(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    value,
    setValue,
    onChange,
    onBlur,
    error: touched ? rawError : null,
    invalid: touched && rawError !== null,
    touched,
    validate,
    reset,
  };
}

export default useField;
