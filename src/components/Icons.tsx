/**
 * Line icons for the four objectives. Stroke-based, inherit currentColor,
 * so they read as one drawn set and sit on light or dark bands. Kept
 * deliberately simple — a graphic accent, not decoration competing with
 * the type.
 */

export type IconName = "research" | "youth" | "scrutiny" | "society";

export function ObjectiveIcon({ name }: { name: string }) {
  const common = {
    width: 30,
    height: 30,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    focusable: false,
  };

  switch (name) {
    case "research": // open book — study, research, teaching
      return (
        <svg {...common}>
          <path d="M3 5.4c2.6-1 5.2-1 7.8 0v13.2c-2.6-1-5.2-1-7.8 0V5.4z" />
          <path d="M21 5.4c-2.6-1-5.2-1-7.8 0v13.2c2.6-1 5.2-1 7.8 0V5.4z" />
          <path d="M11 5.4v13.2" />
        </svg>
      );
    case "youth": // a group — young people in civic life
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="2.4" />
          <circle cx="16.2" cy="9.2" r="1.9" />
          <path d="M4 18.2c0-2.8 2.2-4.7 5-4.7s5 1.9 5 4.7" />
          <path d="M15.2 13.7c2.3.2 4 1.9 4 4.5" />
        </svg>
      );
    case "scrutiny": // magnifier over lines — scrutiny of government
      return (
        <svg {...common}>
          <circle cx="10.5" cy="10.5" r="6" />
          <path d="M15 15l4.5 4.5" />
          <path d="M8 8.8h5M8 11.2h5M8 13.4h3" strokeWidth={1.2} />
        </svg>
      );
    case "society": // heart — working for a stronger society
      return (
        <svg {...common}>
          <path d="M12 20s-6-3.7-8-7.4C2.7 10 3.6 6.6 6.6 6.6c1.8 0 2.9 1.1 3.5 2 .6-.9 1.7-2 3.5-2 3 0 3.9 3.4 2.5 6-2 3.7-4.1 4.9-4.1 4.9" />
        </svg>
      );
    default:
      return null;
  }
}
