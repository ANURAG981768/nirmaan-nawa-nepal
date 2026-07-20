/**
 * A quiet topographic backdrop for the hero — thin contour lines that
 * evoke Nepal's terrain and echo the site's hairline language (the rules
 * and ticks). It drifts slowly and seamlessly, and holds still for anyone
 * who prefers reduced motion. Deliberately faint: depth, not decoration.
 *
 * The paths are deterministic (no random) so server and client render the
 * same markup. The viewBox is 2400 wide and repeats every 1200 units, so a
 * -50% translate loops without a seam.
 */

const WIDTH = 2400;
const HEIGHT = 600;
const WAVELENGTH = 600; // 1200 (half) is a whole number of waves → seamless
const STEP = 20;

function wave(baseY: number, amp: number, phase: number): string {
  let d = `M 0 ${(baseY + amp * Math.sin(phase)).toFixed(1)}`;
  for (let x = STEP; x <= WIDTH; x += STEP) {
    const y = baseY + amp * Math.sin((2 * Math.PI * x) / WAVELENGTH + phase);
    d += ` L ${x} ${y.toFixed(1)}`;
  }
  return d;
}

const LINES = Array.from({ length: 11 }, (_, i) => {
  const baseY = 30 + i * 54;
  const amp = 12 + ((i * 37) % 22); // 12–33, varied but fixed
  const phase = (i * 1.37) % (Math.PI * 2);
  return wave(baseY, amp, phase);
});

export default function ContourField() {
  return (
    <div className="hero-bg" aria-hidden="true">
      <svg
        className="contours"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1">
          {LINES.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
      </svg>
    </div>
  );
}
