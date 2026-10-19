import { branches, type BranchId } from '../data/bunandsum'
import { formatDistance } from '../lib/geo'
import { hoursSummary } from '../lib/time'
import { useBranch } from '../state/BranchContext'
import { directionsUrl, StatusPill, telUrl } from '../components/BranchBits'
import { LondonMap } from '../components/LondonMap'
import { Arrow, Bag, Locate, Phone, Pin } from '../components/Icons'

export function Branches() {
  const { branch: current, statusOf, now, choose, distanceTo, you, findNearest, locateState } = useBranch()

  const open = Object.fromEntries(branches.map((b) => [b.id, statusOf(b).open])) as Record<BranchId, boolean>
  const list = you ? [...branches].sort((a, b) => (distanceTo(a) ?? 0) - (distanceTo(b) ?? 0)) : branches

  const pick = (id: BranchId) => {
    choose(id)
    document.getElementById(`b-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const nearMe = async () => {
    const found = await findNearest()
    if (found) pick((found.nearestOpen ?? found.nearest).id)
  }

  return (
    <div className="branches-page">
      <section className="branches-hero on-ink">
        <div className="wrap">
          <p className="eyebrow">Bow, 2021. Then four more.</p>
          <h1 className="display branches-hero__title">Five Bun &amp; Sums</h1>
          <p className="branches-hero__lede">
            A hatch on an industrial estate, a late-night dine-in, an arcade, a counter at Pop Brixton and a collection
            kitchen. Same smash, different vibe.
          </p>
          <LondonMap current={current.id} open={open} you={you} onPick={pick} />
          <button className="btn btn--light btn--small" onClick={nearMe} disabled={locateState === 'locating'}>
            <Locate /> {locateState === 'locating' ? 'Finding you…' : 'Sort by nearest to me'}
          </button>
          {(locateState === 'denied' || locateState === 'unavailable') && (
            <p className="branches-hero__note">Couldn’t get your location. They’re listed oldest first instead.</p>
          )}
        </div>
      </section>

      <section className="on-paper branches-list">
        <ul className="wrap tickets">
          {list.map((b) => {
            const status = statusOf(b)
            const km = distanceTo(b)
            const isCurrent = b.id === current.id
            return (
              <li key={b.id} id={`b-${b.id}`} className={`ticket ${isCurrent ? 'is-current' : ''}`}>
                <div className="ticket__head">
                  <h2 className="display ticket__name">{b.name}</h2>
                  {isCurrent ? (
                    <span className="ticket__mine sticker">Your pick</span>
                  ) : (
                    <button className="ticket__choose" onClick={() => choose(b.id)}>
                      Make this mine
                    </button>
                  )}
                </div>
                <p className="ticket__kind">{b.kind}</p>
                <p className="ticket__about">{b.about}</p>
                <blockquote className="ticket__heard">
                  <p>“{b.overheard.text}”</p>
                  <footer>{b.overheard.who}</footer>
                </blockquote>
                <div className="ticket__status">
                  <StatusPill status={status} now={now} />
                  {km !== null && <span className="ticket__dist">{formatDistance(km)} away</span>}
                </div>
                <dl className="ticket__hours" aria-label={`${b.name} opening hours`}>
                  {hoursSummary(b).map((row) => (
                    <div key={row.days} className={row.dayIdx.includes(now.day) ? 'is-today' : ''}>
                      <dt>{row.days}</dt>
                      <dd>{row.time}</dd>
                    </div>
                  ))}
                </dl>
                <p className="ticket__addr">
                  {b.address}, London {b.postcode}
                  {b.phone && (
                    <>
                      <br />
                      <a href={telUrl(b.phone)}>{b.phone}</a>
                    </>
                  )}
                </p>
                <div className="ticket__actions">
                  <a className="btn btn--small" href={b.orderUrl} target="_blank" rel="noopener">
                    <Bag /> Order <Arrow />
                  </a>
                  <a className="btn btn--light btn--small" href={directionsUrl(b)} target="_blank" rel="noopener">
                    <Pin /> Directions
                  </a>
                  {b.phone && (
                    <a className="btn btn--light btn--small" href={telUrl(b.phone)}>
                      <Phone /> Call
                    </a>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
