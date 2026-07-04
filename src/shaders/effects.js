// =============================================================================
// Monochrome cyberpunk-asian effect library. Every effect paints ONLY with the
// theme uniforms (u_paper / u_ink / u_accent) — the "cyberpunk" reads through
// form + motion (glyph rain, scanlines, circuit pulses), never extra colour.
// Tuned light & smooth: low contrast, soft fades, slow travelling brightness
// waves so motion combines instead of flickering. Output is opaque so a surface
// can sit as a container texture.
// =============================================================================

const HASH = `
float hash21(vec2 p){ p = fract(p * vec2(234.34, 435.345)); p += dot(p, p + 34.23); return fract(p.x * p.y); }`;

// --- Falling glyph rain (katakana/CJK-ish bit blocks), soft + sparse ---------
export const GLYPH_RAIN = `#version 300 es
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_paper;
uniform vec3 u_ink;
out vec4 fragColor;
${HASH}

// pseudo-glyph: a 4x4 block field that *crossfades* between random states
// (smooth, no hard blink) with soft-edged strokes.
float glyph(vec2 cuv, vec2 id, float k){
  vec2 sub = floor(cuv * 4.0);
  float a = step(0.5, hash21(id * 3.7 + sub * 1.31 + floor(k)));
  float b = step(0.5, hash21(id * 3.7 + sub * 1.31 + floor(k) + 1.0));
  float on = mix(a, b, smoothstep(0.25, 0.75, fract(k)));
  vec2 f = fract(cuv * 4.0);
  float stroke =
    smoothstep(0.08, 0.2, f.x) * smoothstep(0.92, 0.8, f.x) *
    smoothstep(0.08, 0.2, f.y) * smoothstep(0.92, 0.8, f.y);
  return on * stroke;
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  uv.y = 1.0 - uv.y;                                  // rain falls downward

  float cols = clamp(floor(u_resolution.x / 30.0), 5.0, 52.0);
  float aspect = u_resolution.x / max(u_resolution.y, 1.0);
  float rows = max(floor(cols / aspect), 4.0);
  vec2 id  = floor(vec2(uv.x * cols, uv.y * rows));
  vec2 cuv = fract(vec2(uv.x * cols, uv.y * rows));

  float seed  = hash21(vec2(id.x, 7.0));
  float on    = smoothstep(0.46, 0.62, seed);         // sparser, soft cutoff
  float speed = 0.05 + seed * 0.2;                     // slower → calmer
  float head  = fract(u_time * speed + seed * 3.0);
  float d     = fract(id.y / rows - head);
  float tail  = pow(1.0 - d, 4.0);                     // soft long tail

  float k = u_time * (1.0 + seed * 2.0) + id.y * 0.6;
  float g = glyph(cuv, id, k);

  // slow travelling brightness wave (time + position combined)
  float wave = 0.55 + 0.45 * sin(u_time * 0.25 + uv.x * 4.0 - uv.y * 2.0);
  // desvanecimiento: fade out near top & bottom edges
  float fade = smoothstep(0.0, 0.18, uv.y) * smoothstep(1.0, 0.82, uv.y);

  float intensity = clamp(on * g * tail * wave * fade * 0.42, 0.0, 1.0);
  fragColor = vec4(mix(u_paper, u_ink, intensity), 1.0);
}`;

// --- HUD scan bar: measurement ticks + a soft sweeping beam ------------------
export const SCAN_BAR = `#version 300 es
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_paper;
uniform vec3 u_ink;
uniform vec3 u_accent;
out vec4 fragColor;

void main(){
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float ticks = smoothstep(0.86, 1.0, fract(uv.x * 48.0));
  float tall  = step(0.8, fract(uv.x * 48.0 / 5.0));
  float tickH = mix(0.18, 0.5, tall);
  ticks *= step(uv.y, tickH) + step(1.0 - tickH, uv.y);

  // eased ping-pong sweep (smoother than a hard wrap)
  float s = 0.5 - 0.5 * cos(u_time * 0.5);
  float beam = smoothstep(0.05, 0.0, abs(uv.x - s));

  vec3 col = mix(u_paper, u_ink, ticks * 0.13);
  col = mix(col, u_accent, beam * 0.22);
  fragColor = vec4(col, 1.0);
}`;

// --- Circuit traces with travelling pulses (container texture) --------------
export const CIRCUIT = `#version 300 es
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_paper;
uniform vec3 u_ink;
uniform vec3 u_accent;
out vec4 fragColor;
${HASH}

void main(){
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float cols = 8.0;
  float id = floor(uv.x * cols);
  float f  = fract(uv.x * cols);

  float trace  = smoothstep(0.08, 0.0, abs(f - 0.5));
  float active = step(0.5, hash21(vec2(id, 1.0)));
  // soft pulse (cosine bump) travelling up each active trace
  float ph = fract(uv.y - u_time * (0.06 + 0.16 * hash21(vec2(id, 5.0))));
  float pulse = smoothstep(0.7, 1.0, ph) * smoothstep(1.0, 0.7, ph);
  float node = step(0.985, hash21(floor(vec2(id, uv.y * 9.0))));

  float base = active * trace * 0.12;
  float live = active * trace * pulse * 0.7;
  float intensity = clamp(base + node * 0.35, 0.0, 0.55);

  vec3 col = mix(u_paper, u_ink, intensity);
  col = mix(col, u_accent, live * 0.45);
  fragColor = vec4(col, 1.0);
}`;

// === CHARTS (data → shader) =================================================
// Data arrays arrive normalised to 0..1 in a fixed-size uniform array; u_count
// is the real length. All paint in theme colours and reveal on mount via the
// per-surface local u_time.

const SAMPLE = `
float sampleData(float x){
  float n = u_count - 1.0;
  float idx = clamp(x, 0.0, 1.0) * n;
  float i0 = floor(idx);
  float i1 = min(i0 + 1.0, n);
  float f = smoothstep(0.0, 1.0, fract(idx));
  return mix(u_data[int(i0)], u_data[int(i1)], f);
}`;

// --- Area + line chart (with grid, glow, sweep-in reveal) -------------------
export const CHART_AREA = `#version 300 es
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_paper;
uniform vec3 u_ink;
uniform vec3 u_accent;
uniform float u_data[64];
uniform float u_count;
out vec4 fragColor;
${SAMPLE}

void main(){
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float reveal = smoothstep(0.0, 1.1, u_time);     // left→right wipe on mount
  float shown = smoothstep(0.012, 0.0, uv.x - reveal);

  float gx = smoothstep(0.99, 1.0, fract(uv.x * 8.0));
  float gy = smoothstep(0.99, 1.0, fract(uv.y * 4.0));
  float grid = max(gx, gy) * 0.07;

  float v = sampleData(uv.x);
  float px = 1.4 / u_resolution.y;                 // ~constant line weight
  float d = abs(uv.y - v);
  float line = smoothstep(2.5 * px, 0.0, d);
  float area = smoothstep(0.0, 0.02, v - uv.y) * 0.13;
  float glow = smoothstep(0.07, 0.0, d) * 0.10;

  vec3 col = u_paper;
  col = mix(col, u_ink, grid);
  col = mix(col, u_accent, (area + glow) * shown);
  col = mix(col, u_ink, line * shown);

  // bright dot riding the reveal edge
  float edge = smoothstep(0.016, 0.0, abs(uv.x - reveal)) * step(reveal, 0.999);
  col = mix(col, u_accent, edge * 0.6);
  fragColor = vec4(col, 1.0);
}`;

// --- Bars (grow from baseline, staggered) -----------------------------------
export const CHART_BARS = `#version 300 es
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_paper;
uniform vec3 u_ink;
uniform vec3 u_accent;
uniform float u_data[64];
uniform float u_count;
out vec4 fragColor;

void main(){
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float n = u_count;
  float bi = floor(uv.x * n);
  float fx = fract(uv.x * n);
  float v = u_data[int(bi)];

  float gap = 0.22;
  float inBar = smoothstep(gap * 0.5 - 0.02, gap * 0.5, fx) *
                smoothstep(1.0 - gap * 0.5 + 0.02, 1.0 - gap * 0.5, fx);

  float grow = clamp(u_time * 1.4 - (bi / n) * 0.5, 0.0, 1.0); // staggered
  float bh = v * grow;                              // bar height from the bottom
  float fill = smoothstep(bh, bh - 0.012, uv.y);    // 1 below the bar top
  float cap = smoothstep(0.02, 0.0, abs(uv.y - bh)); // bright cap line

  vec3 col = u_paper;
  col = mix(col, u_accent, inBar * fill * 0.78);
  col = mix(col, u_ink, inBar * cap * 0.5);
  col = mix(col, u_ink, smoothstep(0.018, 0.0, uv.y) * 0.35); // baseline
  fragColor = vec4(col, 1.0);
}`;

// --- Sparkline (minimal line + faint area, for KPI cards) -------------------
export const SPARKLINE = `#version 300 es
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_paper;
uniform vec3 u_ink;
uniform vec3 u_accent;
uniform float u_data[64];
uniform float u_count;
out vec4 fragColor;
${SAMPLE}

void main(){
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float reveal = smoothstep(0.0, 0.9, u_time);
  float shown = smoothstep(0.02, 0.0, uv.x - reveal);

  float v = mix(0.18, 0.86, sampleData(uv.x));     // pad vertically
  float px = 1.3 / u_resolution.y;
  float d = abs(uv.y - v);
  float line = smoothstep(2.5 * px, 0.0, d);
  float area = smoothstep(0.0, 0.03, v - uv.y) * 0.1;

  vec3 col = u_paper;
  col = mix(col, u_accent, area * shown);
  col = mix(col, u_ink, line * shown);
  fragColor = vec4(col, 1.0);
}`;

// --- Plate scan: very subtle texture for a DARK panel (base ink) -------------
// Drifting scanlines + a slow diagonal sheen. Painted ink→paper so it reads as
// faint light detail on a dark surface.
export const PLATE_SCAN = `#version 300 es
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_paper;
uniform vec3 u_ink;
out vec4 fragColor;

void main(){
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float lines = 0.5 + 0.5 * sin(uv.y * u_resolution.y * 0.4 - u_time * 1.0);
  lines = smoothstep(0.6, 1.0, lines) * 0.04;
  float grid = smoothstep(0.98, 1.0, fract(uv.x * 26.0)) * 0.04;
  float sheen = (0.5 + 0.5 * sin(u_time * 0.3 + uv.x * 3.0 + uv.y * 2.0)) * 0.035;
  float intensity = lines + grid + sheen;
  fragColor = vec4(mix(u_ink, u_paper, intensity), 1.0);
}`;
