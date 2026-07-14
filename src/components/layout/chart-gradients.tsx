export interface GradientStop {
  offset: string
  color: string
}

// Header glow + main line chart — cyan through magenta.
export const HEADER_GRADIENT_STOPS: GradientStop[] = [
  { offset: "0%", color: "#00EAFF" },
  { offset: "30%", color: "#269BF9" },
  { offset: "45%", color: "#5B5DF9" },
  { offset: "65%", color: "#AF28F9" },
  { offset: "100%", color: "#DF11EE" },
]

// Stat-card sparklines + bar chart — green into cyan.
export const ACCENT_GRADIENT_STOPS: GradientStop[] = [
  { offset: "0%", color: "#92FE9D" },
  { offset: "50%", color: "#00C9FF" },
  { offset: "100%", color: "#00C9FF" },
]

/** Renders an SVG <linearGradient> def from a stop list — drop inside a chart's <defs>. */
export function SvgLinearGradient({
  id,
  stops,
  x1 = "0%",
  y1 = "0%",
  x2 = "100%",
  y2 = "0%",
}: {
  id: string
  stops: GradientStop[]
  x1?: string
  y1?: string
  x2?: string
  y2?: string
}) {
  return (
    <linearGradient id={id} x1={x1} y1={y1} x2={x2} y2={y2}>
      {stops.map((stop) => (
        <stop key={stop.offset} offset={stop.offset} stopColor={stop.color} />
      ))}
    </linearGradient>
  )
}

/** Builds a CSS `linear-gradient(...)` string from the same stop list, for plain DOM backgrounds. */
export function toCssGradient(stops: GradientStop[], angle = "90deg") {
  return `linear-gradient(${angle}, ${stops.map((s) => `${s.color} ${s.offset}`).join(", ")})`
}