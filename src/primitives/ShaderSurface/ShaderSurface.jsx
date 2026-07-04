import { useRef } from "react";
import { cx } from "../../utils/cx";
import { useShader } from "../../shaders/useShader";
import "./ShaderSurface.scss";

/**
 * A fragment shader painted into a container, as a texture layer. Fills its
 * positioned parent (give the parent `position: relative; overflow: hidden`),
 * is non-interactive, and re-skins with the theme. Decorative → aria-hidden.
 *
 * @param {object} props
 * @param {string} props.frag        GLSL ES 3.00 fragment source (see shaders/effects)
 * @param {boolean} [props.animate=true]  false → render a single static frame
 * @param {object} [props.uniforms]  custom uniforms pushed every frame
 *                                   (number → 1f, array → 1fv)
 */
export default function ShaderSurface({ frag, animate = true, uniforms, className = "", ...rest }) {
  const ref = useRef(null);
  useShader(ref, { frag, animate, uniforms });
  return <canvas ref={ref} className={cx("ds-shader", className)} aria-hidden="true" {...rest} />;
}
