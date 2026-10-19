import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { branches, DEFAULT_BRANCH, type Branch, type BranchId } from '../data/bunandsum'
import { branchStatus, londonNow, type LondonNow, type Status } from '../lib/time'
import { distanceKm, locate, type Point } from '../lib/geo'

const STORAGE_KEY = 'bunandsum:branch'

type LocateState = 'idle' | 'locating' | 'found' | 'denied' | 'unavailable'
/** why this branch is showing: shapes the line above the branch name */
export type Reason = 'default' | 'remembered' | 'picked' | 'nearest'

interface BranchState {
  branch: Branch
  status: Status
  now: LondonNow
  statusOf: (b: Branch) => Status
  choose: (id: BranchId, reason?: Reason) => void
  reason: Reason
  /** bumps whenever the branch changes, so the smash can replay */
  changeCount: number
  you: Point | null
  locateState: LocateState
  distanceTo: (b: Branch) => number | null
  findNearest: () => Promise<{ nearest: Branch; nearestOpen: Branch | null } | null>
}

const Ctx = createContext<BranchState | null>(null)

function readStored(): BranchId | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (v && branches.some((b) => b.id === v)) return v as BranchId
  } catch {
    /* storage blocked: fall back to the default */
  }
  return null
}

export function BranchProvider({ children }: { children: ReactNode }) {
  const [stored] = useState(readStored)
  const [id, setId] = useState<BranchId>(stored ?? DEFAULT_BRANCH)
  const [reason, setReason] = useState<Reason>(stored ? 'remembered' : 'default')
  const [now, setNow] = useState(() => londonNow())
  const [changeCount, setChangeCount] = useState(0)
  const [you, setYou] = useState<Point | null>(null)
  const [locateState, setLocateState] = useState<LocateState>('idle')

  useEffect(() => {
    const t = window.setInterval(() => setNow(londonNow()), 30_000)
    return () => window.clearInterval(t)
  }, [])

  const current = useRef(id)
  current.current = id
  const choose = useCallback((next: BranchId, why: Reason = 'picked') => {
    setReason(why)
    // a fresh "near me" replays the smash even when it lands on the same branch
    if (current.current !== next || why === 'nearest') setChangeCount((c) => c + 1)
    setId(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* not remembered this time */
    }
  }, [])

  const statusOf = useCallback((b: Branch) => branchStatus(b.hours, now), [now])
  const distanceTo = useCallback((b: Branch) => (you ? distanceKm(you, b) : null), [you])

  const findNearest = useCallback(async () => {
    setLocateState('locating')
    try {
      const point = await locate()
      setYou(point)
      setLocateState('found')
      const byDistance = [...branches].sort((a, b) => distanceKm(point, a) - distanceKm(point, b))
      const current = londonNow()
      const nearestOpen = byDistance.find((b) => branchStatus(b.hours, current).open) ?? null
      return { nearest: byDistance[0], nearestOpen }
    } catch (err) {
      const denied = (err as GeolocationPositionError)?.code === 1
      setLocateState(denied ? 'denied' : 'unavailable')
      return null
    }
  }, [])

  const branch = branches.find((b) => b.id === id) ?? branches[0]
  const value = useMemo<BranchState>(
    () => ({
      branch,
      status: branchStatus(branch.hours, now),
      now,
      statusOf,
      choose,
      reason,
      changeCount,
      you,
      locateState,
      distanceTo,
      findNearest,
    }),
    [branch, now, statusOf, choose, reason, changeCount, you, locateState, distanceTo, findNearest],
  )
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useBranch() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useBranch outside BranchProvider')
  return ctx
}
