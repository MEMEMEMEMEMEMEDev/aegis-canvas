import Input from "../Input/Input";
import { Search } from "../../utils/icons";

/**
 * Thin preset over <Input>: search icon, clearable, Enter fires `onSearch`.
 *
 * @param {object} props
 * @param {(query: string) => void} [props.onSearch] called on Enter with the value
 */
export default function SearchInput({
  onSearch,
  onKeyDown,
  placeholder = "Buscar…",
  ...rest
}) {
  return (
    <Input
      type="search"
      role="searchbox"
      prefix={<Search />}
      clearable
      placeholder={placeholder}
      onKeyDown={(e) => {
        if (e.key === "Enter") onSearch?.(e.target.value);
        onKeyDown?.(e);
      }}
      {...rest}
    />
  );
}
