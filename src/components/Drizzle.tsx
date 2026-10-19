import { motion, useReducedMotion } from 'framer-motion'

// A line of mustard, piped from the squeeze bottle in their logo. Draws itself
// the first time it scrolls into view.
export function Drizzle({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion()
  return (
    <svg className={`drizzle ${className}`} viewBox="0 0 240 24" aria-hidden="true" preserveAspectRatio="none">
      <motion.path
        d="M2 14 C 22 2, 34 22, 54 12 S 86 4, 104 14 S 138 22, 158 10 S 196 4, 214 14 S 232 18, 238 12"
        fill="none"
        stroke="var(--mustard)"
        strokeWidth="6"
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      />
    </svg>
  )
}
