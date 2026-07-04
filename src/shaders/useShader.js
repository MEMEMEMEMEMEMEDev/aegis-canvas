import { useEffect, useRef } from "react";
import { registerDrawer } from "./runtime.js";
import { themeColor } from "./themeColors.js";

// Fullscreen-quad vertex shader shared by every effect.
const VERT = `#version 300 es
in vec2 a_position;
void main() { gl_Position = vec4(a_position, 0.0, 1.0); }`;

const QUAD = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
const MAX_DPR = 2; // cap retina cost: a 3× phone would otherwise do 9× the work

function compile(gl, type, src) {
  const sh = gl.createShader(type);
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

/**
 * Bind a fragment shader to a <canvas>, wired into the foundation runtime:
 * shared RAF clock, DPR-capped ResizeObserver sizing, IntersectionObserver
 * pause when offscreen, reduced-motion → single static frame, and theme
 * colours fed in as u_paper / u_ink / u_accent uniforms.
 *
 * Available uniforms in any effect: u_time, u_resolution, u_mouse,
 * u_paper, u_ink, u_accent. `u_time` is LOCAL to each surface (starts at 0 on
 * mount) so reveal/entrance animations are reproducible.
 *
 * `opts.uniforms` pushes custom uniforms every frame: number → 1f,
 * number[]/Float32Array → 1fv (e.g. chart data arrays). Read live from a ref,
 * so updating the object (or mutating an array in place) animates without a
 * shader rebuild.
 */
export function useShader(canvasRef, { frag, animate = true, uniforms } = {}) {
  const uniformsRef = useRef(uniforms);
  uniformsRef.current = uniforms;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: false,
      premultipliedAlpha: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, frag);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, QUAD, gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    // Setting a null uniform location is a silent no-op, so we can always push
    // every uniform even if a given effect doesn't declare it.
    const u = {
      time: gl.getUniformLocation(program, "u_time"),
      res: gl.getUniformLocation(program, "u_resolution"),
      mouse: gl.getUniformLocation(program, "u_mouse"),
      paper: gl.getUniformLocation(program, "u_paper"),
      ink: gl.getUniformLocation(program, "u_ink"),
      accent: gl.getUniformLocation(program, "u_accent"),
    };

    let w = 1;
    let h = 1;
    let lastT = 0;
    let t0 = null; // per-surface time origin
    const mouse = [0.5, 0.5];

    // Custom-uniform location cache + type-dispatched setter.
    const customLocs = new Map();
    const setCustom = (name, value) => {
      let loc = customLocs.get(name);
      if (loc === undefined) {
        loc = gl.getUniformLocation(program, name);
        customLocs.set(name, loc);
      }
      if (loc === null) return;
      if (typeof value === "number") gl.uniform1f(loc, value);
      else if (value && value.length !== undefined) gl.uniform1fv(loc, value);
    };

    const draw = (t) => {
      if (t0 === null) t0 = t;
      const lt = t - t0;
      lastT = lt;
      gl.useProgram(program);
      gl.bindVertexArray(vao);
      gl.uniform1f(u.time, lt);
      gl.uniform2f(u.res, w, h);
      gl.uniform2f(u.mouse, mouse[0], mouse[1]);
      gl.uniform3fv(u.paper, themeColor("--ds-surface-base", [0.91, 0.92, 0.87]));
      gl.uniform3fv(u.ink, themeColor("--ds-text", [0.11, 0.11, 0.09]));
      gl.uniform3fv(u.accent, themeColor("--ds-accent", [0.11, 0.11, 0.09]));
      const cu = uniformsRef.current;
      if (cu) for (const name in cu) setCustom(name, cu[name]);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isAnimated = animate && !reduce;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      w = Math.max(1, Math.round((canvas.clientWidth || 1) * dpr));
      h = Math.max(1, Math.round((canvas.clientHeight || 1) * dpr));
      if (canvas.width !== w) canvas.width = w;
      if (canvas.height !== h) canvas.height = h;
      gl.viewport(0, 0, w, h);
      if (!isAnimated) draw(lastT); // static effects redraw on resize only
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    let visible = true;
    let unregister = () => {};
    const startLoop = () => {
      if (isAnimated && visible && unregister === noop) {
        unregister = registerDrawer(draw);
      }
    };
    const stopLoop = () => {
      unregister();
      unregister = noop;
    };
    function noop() {}
    unregister = noop;

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting;
        if (visible) startLoop();
        else stopLoop();
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    if (!isAnimated) draw(0);

    return () => {
      stopLoop();
      ro.disconnect();
      io.disconnect();
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
      gl.deleteVertexArray(vao);
    };
  }, [frag, animate]);
}
