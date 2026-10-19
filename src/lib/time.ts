import type { Branch, Hours, Interval } from '../data/bunandsum'

export const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const SHORT_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// Every branch is in London, so status is always worked out on London time,
// whatever timezone the visitor's phone is set to.
const londonParts = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/London',
  weekday: 'short',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
})

export interface LondonNow {
  day: number
  minutes: number
}

export function londonNow(date = new Date()): LondonNow {
  const parts = londonParts.formatToParts(date)
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ''
  return {
    day: SHORT_DAYS.indexOf(get('weekday')),
    minutes: Number(get('hour')) * 60 + Number(get('minute')),
  }
}

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

// A close time at or before the open time means the shift runs past midnight.
const span = (iv: Interval) => {
  const open = toMinutes(iv.open)
  let close = toMinutes(iv.close)
  if (close <= open) close += 24 * 60
  return { open, close }
}

export function formatTime(hhmm: string) {
  const mins = toMinutes(hhmm) % (24 * 60)
  if (mins === 0) return 'midnight'
  const h = Math.floor(mins / 60)
  const m = mins % 60
  const suffix = h < 12 ? 'am' : 'pm'
  const h12 = h % 12 === 0 ? 12 : h % 12
  return m ? `${h12}:${String(m).padStart(2, '0')}${suffix}` : `${h12}${suffix}`
}

export interface Status {
  open: boolean
  /** minutes until close, when open */
  closesIn?: number
  closesAt?: string
  opensAt?: string
  opensDay?: number
  /** true when it opens later today */
  opensToday?: boolean
}

export function branchStatus(hours: Hours, now: LondonNow): Status {
  const yesterday = (now.day + 6) % 7
  for (const iv of hours[yesterday]) {
    const { close } = span(iv)
    if (close > 24 * 60 && now.minutes < close - 24 * 60) {
      return { open: true, closesAt: iv.close, closesIn: close - 24 * 60 - now.minutes }
    }
  }
  for (const iv of hours[now.day]) {
    const { open, close } = span(iv)
    if (now.minutes >= open && now.minutes < close) {
      return { open: true, closesAt: iv.close, closesIn: close - now.minutes }
    }
  }
  for (let offset = 0; offset < 8; offset++) {
    const day = (now.day + offset) % 7
    const next = hours[day]
      .map((iv) => ({ iv, open: toMinutes(iv.open) }))
      .filter(({ open }) => offset > 0 || open > now.minutes)
      .sort((a, b) => a.open - b.open)[0]
    if (next) return { open: false, opensAt: next.iv.open, opensDay: day, opensToday: offset === 0 }
  }
  return { open: false }
}

export function statusLine(status: Status, now: LondonNow) {
  if (status.open) {
    if (status.closesIn !== undefined && status.closesIn <= 45) {
      return `Closing soon · ${formatTime(status.closesAt!)}`
    }
    return `Open till ${formatTime(status.closesAt!)}`
  }
  if (!status.opensAt) return 'Closed'
  if (status.opensToday) return `Opens ${formatTime(status.opensAt)} today`
  const tomorrow = (now.day + 1) % 7
  const when = status.opensDay === tomorrow ? 'tomorrow' : DAY_NAMES[status.opensDay!]
  return `Opens ${when} ${formatTime(status.opensAt)}`
}

export function hoursSummary(branch: Branch) {
  // Collapse runs of identical days, Monday first: "Mon–Wed 12pm–11pm".
  const order = [1, 2, 3, 4, 5, 6, 0]
  const label = (d: number) =>
    branch.hours[d].length
      ? branch.hours[d].map((iv) => `${formatTime(iv.open)}–${formatTime(iv.close)}`).join(', ')
      : 'Closed'
  const rows: { days: string; time: string; dayIdx: number[] }[] = []
  let run: number[] = []
  order.forEach((d, i) => {
    run.push(d)
    const next = order[i + 1]
    if (next === undefined || label(next) !== label(d)) {
      const first = SHORT_DAYS[run[0]]
      const last = SHORT_DAYS[run[run.length - 1]]
      const days = run.length === 7 ? 'Every day' : run.length === 1 ? first : `${first}–${last}`
      rows.push({ days, time: label(d), dayIdx: run })
      run = []
    }
  })
  return rows
}
