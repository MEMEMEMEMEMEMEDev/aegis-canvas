/**
 * Internal icon set — tiny inline SVGs used by the form primitives.
 * NOT part of the public API (consumers bring their own icon library);
 * kept minimal on purpose: 1em, currentColor, stroke-based.
 */
const base = {
  width: "1em",
  height: "1em",
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
};

export const ChevronDown = (props) => (
  <svg {...base} {...props}>
    <path d="M3.5 6l4.5 4.5L12.5 6" />
  </svg>
);

export const Check = (props) => (
  <svg {...base} {...props}>
    <path d="M3 8.5l3.2 3.2L13 5" />
  </svg>
);

export const Minus = (props) => (
  <svg {...base} {...props}>
    <path d="M3.5 8h9" />
  </svg>
);

export const Plus = (props) => (
  <svg {...base} {...props}>
    <path d="M8 3.5v9M3.5 8h9" />
  </svg>
);

export const Cross = (props) => (
  <svg {...base} {...props}>
    <path d="M4 4l8 8M12 4l-8 8" />
  </svg>
);

export const Search = (props) => (
  <svg {...base} {...props}>
    <circle cx="7" cy="7" r="4.2" />
    <path d="M10.2 10.2l3.3 3.3" />
  </svg>
);

export const Eye = (props) => (
  <svg {...base} {...props}>
    <path d="M1.8 8s2.4-4.4 6.2-4.4S14.2 8 14.2 8s-2.4 4.4-6.2 4.4S1.8 8 1.8 8z" />
    <circle cx="8" cy="8" r="2" />
  </svg>
);

export const EyeOff = (props) => (
  <svg {...base} {...props}>
    <path d="M1.8 8s2.4-4.4 6.2-4.4S14.2 8 14.2 8s-2.4 4.4-6.2 4.4S1.8 8 1.8 8z" />
    <circle cx="8" cy="8" r="2" />
    <path d="M2.5 13.5l11-11" />
  </svg>
);
