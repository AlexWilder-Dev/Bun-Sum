import { motion, useReducedMotion } from 'framer-motion'
import type { Branch } from '../data/bunandsum'
import { formatTime, statusLine, type LondonNow, type Status } from '../lib/time'
import { SMASH_HIT } from './Smash'

export function directionsUrl(b: Branch) {
  const q = encodeURIComponent(`Bun & Sum ${b.name}, ${b.address}, London ${b.postcode}`)
  return `https://www.google.com/maps/dir/?api=1&destination=${q}&destination_place_id=${b.googlePlaceId}`
}

export const telUrl = (phone: string) => `tel:+44${phone.replace(/\s/g, '').replace(/^0/, '')}`

export function StatusPill({ status, now }: { status: Status; now: LondonNow }) {
  return (
    <span className={`status ${status.open ? 'status--open' : 'status--closed'}`}>
      <span className="status__dot" />
      {statusLine(status, now)}
    </span>
  )
}

export const formatPrice = (n: number) => `£${n.toFixed(2)}`

// Toast only takes scheduled orders at some branches, so a shut branch either
// says "Order ahead" or when ordering opens.
export function orderLabel(b: Branch, status: Status, short = false) {
  if (status.open) return short ? 'Order now' : 'Order for collection'
  if (b.takesOrdersAhead) return 'Order ahead'
  if (status.opensToday && status.opensAt) return `Order from ${formatTime(status.opensAt)}`
  return short ? 'Order online' : 'See the order page'
}

// The branch name gets smashed too: tall and narrow until the spatula lands,
// then flattened out with a bit of bounce.
export function SmashTitle({ name, run }: { name: string; run: number }) {
  const reduce = useReducedMotion()
  const lines = name.toUpperCase().split(' ')
  const longest = Math.max(...lines.map((l) => l.length))
  return (
    <h1 className="smash-title display" style={{ ['--chars' as string]: longest }} aria-label={name}>
      <motion.span
        key={run}
        className="smash-title__inner distressed"
        aria-hidden="true"
        initial={reduce ? false : { scaleX: 0.66, scaleY: 1.32 }}
        animate={reduce ? undefined : { scaleX: [0.66, 0.66, 1.16, 0.97, 1], scaleY: [1.32, 1.32, 0.78, 1.04, 1] }}
        transition={{
          duration: SMASH_HIT + 0.45,
          times: [0, SMASH_HIT / (SMASH_HIT + 0.45), 0.8, 0.92, 1],
          ease: 'easeOut',
        }}
      >
        {lines.map((l) => (
          <span key={l} className="smash-title__line">
            {l}
          </span>
        ))}
      </motion.span>
    </h1>
  )
}
