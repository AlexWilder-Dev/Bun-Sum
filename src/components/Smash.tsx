import { motion, useReducedMotion, type Transition } from 'framer-motion'

// The smash, side on: a ball of beef lands on the griddle, the spatula comes down,
// and it spreads into a thin patty with lacy, crispy edges that browns and steams.
// `run` changes every time the branch does, so the whole thing replays.

export const SMASH_HIT = 0.62 // seconds in, when the spatula lands; the title squashes on this beat

const RAW = '#c95c5f'
const COOKED = '#6a3a22'
const CRUST = '#3a2114'

// the ball, then the patty that replaces it the instant the spatula hits
const PATTY =
  'M88 94 L94 91 L91 88 L99 87 L103 84 L112 86 L130 83 L160 82 L190 83 L208 85 L217 83 L221 87 L229 86 L227 89 L233 91 L228 94 L222 96 L212 95 L196 97 L160 97 L124 97 L108 95 L98 97 Z'
const LACE =
  'M84 93 L88 90 L86 87 L91 86 M232 92 L236 89 L233 86 M96 98 L92 100 M224 98 L229 100 M100 86 L97 82 M220 84 L224 81'

const steam = [118, 160, 200]

export function Smash({ run, waiting = false }: { run: number; waiting?: boolean }) {
  const reduce = useReducedMotion()

  if (reduce) {
    return (
      <svg className="smash" viewBox="0 0 320 112" aria-hidden="true">
        <Griddle />
        <path d={PATTY} fill={COOKED} stroke={CRUST} strokeWidth="2" strokeLinejoin="round" />
      </svg>
    )
  }

  const t = (delay: number, duration: number, extra: Transition = {}): Transition => ({ delay, duration, ...extra })

  return (
    <svg className="smash" viewBox="0 0 320 112" aria-hidden="true" key={run}>
      <Griddle />

      {/* the ball: drops, settles, then squashes flat under the spatula */}
      <motion.g
        style={{ originX: '160px', originY: '96px' }}
        initial={{ y: -120, scaleX: 1, scaleY: 1, opacity: 1 }}
        animate={
          waiting
            ? { y: [0, -6, 0], scaleX: [1, 0.96, 1], scaleY: [1, 1.05, 1], opacity: 1 }
            : {
                y: [-120, 0, -8, 0, 0],
                scaleX: [1, 1.12, 0.96, 1, 2.6],
                scaleY: [1, 0.86, 1.04, 1, 0.22],
                opacity: [1, 1, 1, 1, 0],
              }
        }
        transition={
          waiting
            ? { duration: 0.7, repeat: Infinity, ease: 'easeInOut' }
            : t(0, SMASH_HIT + 0.06, { times: [0, 0.38, 0.55, 0.88, 1], ease: 'easeIn' })
        }
      >
        <circle cx="160" cy="70" r="26" fill={RAW} />
        {/* marbling */}
        <circle cx="150" cy="62" r="4" fill="#e9a3a0" />
        <circle cx="168" cy="58" r="3" fill="#e9a3a0" />
        <circle cx="172" cy="75" r="4.5" fill="#e9a3a0" />
        <circle cx="152" cy="80" r="3" fill="#e9a3a0" />
        <circle cx="161" cy="69" r="2.5" fill="#e9a3a0" />
        <path d="M140 60 Q146 50 156 47" stroke="#f3c9c6" strokeWidth="3" fill="none" strokeLinecap="round" />
      </motion.g>

      {!waiting && (
        <>
          {/* the patty: appears flat on impact, then browns */}
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={t(SMASH_HIT, 0.01)}>
            <motion.path
              d={PATTY}
              strokeWidth="2"
              strokeLinejoin="round"
              initial={{ fill: RAW, stroke: '#9b3a3c' }}
              animate={{ fill: COOKED, stroke: CRUST }}
              transition={t(SMASH_HIT + 0.15, 1.1, { ease: 'easeOut' })}
            />
            <motion.path
              d={LACE}
              fill="none"
              stroke={CRUST}
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={t(SMASH_HIT + 0.35, 0.6)}
            />
          </motion.g>

          {/* spatter on impact */}
          {[
            [-58, -26, '#7a4128'],
            [-40, -40, '#f8c850'],
            [-70, -10, '#3a2114'],
            [52, -30, '#7a4128'],
            [68, -14, '#f8c850'],
            [36, -44, '#3a2114'],
          ].map(([dx, dy, c], i) => (
            <motion.circle
              key={i}
              cx="160"
              cy="90"
              r={i % 2 ? 2.2 : 3}
              fill={c as string}
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{ x: [0, dx as number], y: [0, dy as number, (dy as number) + 30], opacity: [1, 1, 0] }}
              transition={t(SMASH_HIT, 0.6, { ease: 'easeOut' })}
            />
          ))}

          {/* steam */}
          {steam.map((x, i) => (
            <motion.path
              key={x}
              d={`M${x} 80 q-8 -10 0 -20 q8 -10 0 -20`}
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: [0, 0.45, 0], y: [6, -10, -24] }}
              transition={{ delay: SMASH_HIT + 0.5 + i * 0.35, duration: 2.2, repeat: 2, ease: 'easeOut' }}
            />
          ))}
        </>
      )}

      {/* the spatula: comes in from above, slams down, lifts away */}
      {!waiting && (
        <motion.g
          initial={{ y: -150, x: 10, rotate: -6 }}
          animate={{ y: [-150, -48, 0, 0, -160], x: [10, 4, 0, 0, 30], rotate: [-6, -2, 0, 0, -10] }}
          transition={t(0.15, 1.45, {
            times: [0, 0.22, 0.32, 0.5, 1],
            ease: ['easeOut', 'easeIn', 'linear', 'easeIn'],
          })}
        >
          <rect x="96" y="76" width="128" height="7" rx="2" fill="#c9c6c1" />
          <rect x="96" y="76" width="128" height="2" fill="#efede9" />
          <path d="M214 76 L246 30 L254 34 L224 78 Z" fill="#9d9a95" />
          <rect x="240" y="6" width="16" height="40" rx="5" transform="rotate(34 248 26)" fill="#2b2826" />
        </motion.g>
      )}
    </svg>
  )
}

function Griddle() {
  return (
    <g>
      <rect x="0" y="97" width="320" height="9" rx="2" fill="#2b2826" />
      <rect x="0" y="97" width="320" height="2" fill="#57534f" />
    </g>
  )
}
