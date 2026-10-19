import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { branches, type BranchId } from '../data/bunandsum'
import { formatDistance } from '../lib/geo'
import { useBranch } from '../state/BranchContext'
import { StatusPill } from './BranchBits'
import { Close, Locate } from './Icons'

export function BranchSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { branch, choose, statusOf, now, distanceTo, findNearest, locateState, you } = useBranch()
  const [note, setNote] = useState<string | null>(null)
  const panel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    setNote(null)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    panel.current?.focus()
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
    }
  }, [open, onClose])

  const pick = (id: BranchId) => {
    choose(id)
    onClose()
  }

  const nearMe = async () => {
    const found = await findNearest()
    if (!found) return
    const { nearest, nearestOpen } = found
    if (nearestOpen && nearestOpen.id !== nearest.id) {
      setNote(`${nearest.name} is closest but shut right now, so here’s ${nearestOpen.name}.`)
      choose(nearestOpen.id, 'nearest')
    } else {
      choose((nearestOpen ?? nearest).id, 'nearest')
      onClose()
    }
  }

  // nearest first once we know where you are, otherwise open ones first
  const list = [...branches].sort((a, b) => {
    const da = distanceTo(a)
    const db = distanceTo(b)
    if (da !== null && db !== null) return da - db
    return Number(statusOf(b).open) - Number(statusOf(a).open)
  })

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="sheet"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            ref={panel}
            className="sheet__panel on-paper"
            role="dialog"
            aria-modal="true"
            aria-labelledby="sheet-title"
            tabIndex={-1}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 420, damping: 38 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sheet__head">
              <h2 id="sheet-title" className="display sheet__title">
                Pick your Bun&nbsp;&amp;&nbsp;Sum
              </h2>
              <button className="icon-btn" onClick={onClose} aria-label="Close">
                <Close />
              </button>
            </div>

            <button className="btn btn--light sheet__near" onClick={nearMe} disabled={locateState === 'locating'}>
              <Locate />
              {locateState === 'locating' ? 'Finding you…' : you ? 'Find my nearest again' : 'Find my nearest open one'}
            </button>
            {locateState === 'denied' && (
              <p className="sheet__note">Location’s blocked on this browser. Pick from the list instead.</p>
            )}
            {locateState === 'unavailable' && (
              <p className="sheet__note">Couldn’t get your location. Pick from the list.</p>
            )}
            {note && <p className="sheet__note">{note}</p>}

            <ul className="sheet__list">
              {list.map((b) => {
                const km = distanceTo(b)
                const current = b.id === branch.id
                return (
                  <li key={b.id}>
                    <button
                      className={`sheet__item ${current ? 'is-current' : ''}`}
                      onClick={() => pick(b.id)}
                      aria-current={current ? 'true' : undefined}
                    >
                      <span className="sheet__name display">{b.name}</span>
                      <span className="sheet__kind">{b.kind}</span>
                      <span className="sheet__meta">
                        <StatusPill status={statusOf(b)} now={now} />
                        {km !== null && <span className="sheet__dist">{formatDistance(km)}</span>}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
