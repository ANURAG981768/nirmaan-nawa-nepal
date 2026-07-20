/**
 * A template remounts on every navigation (a layout does not), which makes
 * it the right place for the page transition.
 *
 * The transition is the शिरोरेखा motif in motion: on arrival each band's
 * rule draws across, and its content hangs down beneath it in sequence —
 * the same way Devanagari letters appear under their headline stroke.
 * Motion is CSS-only and respects prefers-reduced-motion.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page">{children}</div>;
}
