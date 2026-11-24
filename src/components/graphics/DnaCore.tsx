import { useId } from "react";

const contacts = [226, 250, 274, 298, 322, 346, 370, 394, 418];
const sideContacts = [190, 214, 238, 262, 286, 310, 334, 358];
const traces = [
  "M31 115H126L184 173H204",
  "M54 178H108L158 228H204",
  "M32 301H113L157 257H204",
  "M70 383H135L183 335H204",
  "M118 451H157L213 395V380",
  "M250 132V92L210 52H144",
  "M322 132V81L352 51H400",
  "M394 132V104L428 70H480",
  "M444 183H482L533 132H593",
  "M444 234H514L551 197H603",
  "M444 286H496L545 335H596",
  "M444 333H478L532 387H615",
  "M370 380V416L415 461H479",
  "M298 380V429L258 469H212",
];
const nodes = [
  [31, 115],
  [54, 178],
  [32, 301],
  [70, 383],
  [118, 451],
  [144, 52],
  [400, 51],
  [480, 70],
  [593, 132],
  [603, 197],
  [596, 335],
  [615, 387],
  [479, 461],
  [212, 469],
];
const helix = Array.from({ length: 23 }, (_, index) => {
  const offset = Math.cos(index * 0.38) * 56;
  return { left: 324 - offset, right: 324 + offset, y: 166 + index * 8.25 };
});

function strand(side: "left" | "right") {
  return helix
    .map(
      (point, index) =>
        `${index === 0 ? "M" : "L"}${point[side].toFixed(1)} ${point.y}`,
    )
    .join(" ");
}

export function DnaCore() {
  const grid = useId();
  return (
    <svg
      className="welcome-core"
      viewBox="0 0 648 520"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern id={grid} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" className="core-grid" fill="none" />
        </pattern>
      </defs>
      <path
        d="M58 102 112 48H534L598 112V410L536 472H110L58 420Z"
        fill={`url(#${grid})`}
      />
      <path
        className="core-frame"
        d="M31 135V88l58-58h68m327 0h78l54 54v54m0 242v53l-59 59h-81m-312 0H91l-60-60v-48M324 0v20m0 479v21M0 260h16m616 0h16"
      />
      <g className="core-orbit">
        <path d="M95 293 142 70 524 85 572 289 510 437 151 449Z" />
        <path d="M95 293 261 214 524 85m48 204-217-22-204 182m-9-379 213 197 155 170" />
        <circle cx="95" cy="293" r="5" />
        <circle cx="261" cy="214" r="7" />
        <circle cx="524" cy="85" r="5" />
        <circle cx="572" cy="289" r="7" />
        <circle cx="510" cy="437" r="4" />
        <circle cx="151" cy="449" r="5" />
      </g>
      <g className="core-traces">
        {traces.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <g className="core-flow">
        {[
          traces[1],
          traces[4],
          traces[6],
          traces[8],
          traces[10],
          traces[13],
        ].map((d) => (
          <path key={d} d={d} pathLength="100" />
        ))}
      </g>
      <g className="core-nodes">
        {nodes.map(([x, y], index) => (
          <rect
            key={x + ":" + y}
            x={x - 3}
            y={y - 3}
            width="6"
            height="6"
            className={index % 3 === 0 ? "core-node-pulse" : undefined}
          />
        ))}
      </g>
      <g className="core-pins">
        {contacts.map((x) => (
          <path key={x} d={`M${x} 140v-17m0 268v-16`} />
        ))}
        {sideContacts.map((y) => (
          <path key={y} d={`M192 ${y}h18m228 0h18`} />
        ))}
      </g>
      <path
        className="core-shadow"
        d="M236 138H425L450 163V361L427 384H226L202 360V172Z"
        transform="translate(6 6)"
      />
      <path
        className="core-chip"
        d="M236 138H425L450 163V361L427 384H226L202 360V172Z"
      />
      <path
        className="core-die"
        d="M244 151H415L436 173V353L418 370H233L216 352V179Z"
      />
      <path
        className="core-frame"
        d="M242 190v-16h18m126 0h23v17m0 137v17h-19m-126 0h-22v-17"
      />
      <g className="core-helix" transform="rotate(34 324 256)">
        <g className="core-rungs">
          {helix
            .filter((_, index) => index % 2 === 0)
            .map(({ left, right, y }) => (
              <path key={y} d={`M${left} ${y}H${right}`} />
            ))}
        </g>
        <path className="core-strand core-strand--a" d={strand("left")} />
        <path className="core-strand core-strand--b" d={strand("right")} />
        {helix
          .filter((_, index) => index % 4 === 0)
          .map(({ left, right, y }) => (
            <g key={y} className="core-helix-points">
              <rect x={left - 3} y={y - 3} width="6" height="6" />
              <rect x={right - 3} y={y - 3} width="6" height="6" />
            </g>
          ))}
      </g>
      <g className="core-pixels">
        <path d="M117 121h9v9h-9zm13 13h5v5h-5zm394 267h9v9h-9zm13 13h5v5h-5zM65 230h5v5h-5zm506 21h7v7h-7zM347 448h5v5h-5z" />
        <path
          d="M52 68h18m-9-9v18m526 380h18m-9-9v18m-45-340h14m-7-7v14"
          className="core-pixel-crosses"
        />
      </g>
    </svg>
  );
}
