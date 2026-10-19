import { motion, useReducedMotion } from 'framer-motion'
import { branches, type BranchId } from '../data/bunandsum'
import type { Point } from '../lib/geo'

// A rough London: just the river, piped in mustard, and the five branches as patties.
const WEST = -0.3
const NORTH = 51.56
const K = 2000 // svg units per degree of latitude
const COS = Math.cos((51.5 * Math.PI) / 180)
const W = Math.round((0.02 - WEST) * COS * K)
const H = Math.round((NORTH - 51.448) * K)

const project = (lng: number, lat: number): [number, number] => [(lng - WEST) * COS * K, (NORTH - lat) * K]

// Bridges and bends along the Thames, west to east
const THAMES: [number, number][] = [
  [-0.3, 51.488],
  [-0.2875, 51.4875],
  [-0.27, 51.4728],
  [-0.247, 51.472],
  [-0.23, 51.488],
  [-0.2135, 51.4668],
  [-0.188, 51.465],
  [-0.172, 51.4818],
  [-0.15, 51.485],
  [-0.127, 51.488],
  [-0.1225, 51.4945],
  [-0.1218, 51.5008],
  [-0.1168, 51.5085],
  [-0.1043, 51.5098],
  [-0.0877, 51.5079],
  [-0.0754, 51.5055],
  [-0.056, 51.504],
  [-0.033, 51.508],
  [-0.022, 51.503],
  [-0.012, 51.489],
  [0.0, 51.4865],
  [0.006, 51.499],
  [0.007, 51.508],
  [0.02, 51.506],
]

function smooth(points: [number, number][]) {
  const p = points.map(([lng, lat]) => project(lng, lat))
  let d = `M${p[0][0].toFixed(1)} ${p[0][1].toFixed(1)}`
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] ?? p[i]
    const p1 = p[i]
    const p2 = p[i + 1]
    const p3 = p[i + 2] ?? p2
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`
  }
  return d
}

const RIVER = smooth(THAMES)

// labels nudged so the three East London ones don't sit on each other
const LABEL: Record<BranchId, { dx: number; dy: number; anchor: 'start' | 'end' | 'middle' }> = {
  brixton: { dx: 0, dy: 26, anchor: 'middle' },
  bow: { dx: 13, dy: 5, anchor: 'start' },
  hackney: { dx: 0, dy: -13, anchor: 'middle' },
  whitechapel: { dx: -12, dy: -4, anchor: 'end' },
  chiswick: { dx: 0, dy: -13, anchor: 'middle' },
}

export function LondonMap({
  current,
  open,
  you,
  onPick,
}: {
  current: BranchId
  open: Record<BranchId, boolean>
  you: Point | null
  onPick: (id: BranchId) => void
}) {
  const reduce = useReducedMotion()
  const youXY = you ? project(you.lng, you.lat) : null
  const youInside = youXY && youXY[0] > 0 && youXY[0] < W && youXY[1] > 0 && youXY[1] < H
  return (
    <svg className="london" viewBox={`0 0 ${W} ${H}`} role="group" aria-label="Map of the five branches">
      <motion.path
        d={RIVER}
        fill="none"
        stroke="var(--mustard)"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: 'easeInOut' }}
      />
      <text x={project(-0.236, 51.453)[0]} y={project(-0.236, 51.453)[1]} className="london__river">
        Thames
      </text>
      {youInside && (
        <g transform={`translate(${youXY![0]} ${youXY![1]})`}>
          <circle r="10" className="london__you-ring" />
          <circle r="4.5" className="london__you" />
        </g>
      )}
      {branches.map((b) => {
        const [x, y] = project(b.lng, b.lat)
        const l = LABEL[b.id]
        const isCurrent = b.id === current
        return (
          <g
            key={b.id}
            className={`london__pin ${isCurrent ? 'is-current' : ''} ${open[b.id] ? 'is-open' : ''}`}
            transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}
            role="button"
            tabIndex={0}
            aria-label={`${b.name}${isCurrent ? ', selected' : ''}`}
            onClick={() => onPick(b.id)}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onPick(b.id))}
          >
            <circle r="16" fill="transparent" />
            <ellipse rx={isCurrent ? 11 : 8} ry={isCurrent ? 6 : 4.5} className="london__patty" />
            <text x={l.dx} y={l.dy} textAnchor={l.anchor} className="london__label">
              {b.name}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
