import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { brand, branches, highlights, menus, type Branch, type MenuItem } from '../data/bunandsum'
import { asset, menuPhoto } from '../lib/asset'
import { formatDistance } from '../lib/geo'
import { formatTime } from '../lib/time'
import { useBranch } from '../state/BranchContext'
import { directionsUrl, formatPrice, orderLabel, SmashTitle, StatusPill, telUrl } from '../components/BranchBits'
import { Smash } from '../components/Smash'
import { useOpenSheet } from '../components/Layout'
import { Arrow, Bag, Locate, Phone, Pin, TikTok, Instagram, YouTube } from '../components/Icons'
import { Drizzle } from '../components/Drizzle'

export function Home() {
  return (
    <>
      <Hero />
      <Award />
      <Halal />
      <FiveBranches />
      <Channels />
    </>
  )
}

function todayHours(b: Branch, day: number) {
  const ivs = b.hours[day]
  if (!ivs.length) return 'Closed today'
  return `Today ${ivs.map((iv) => `${formatTime(iv.open)}–${formatTime(iv.close)}`).join(', ')}`
}

function Hero() {
  const { branch, status, now, changeCount, reason, findNearest, locateState, choose, distanceTo } = useBranch()
  const openSheet = useOpenSheet()
  const [note, setNote] = useState<string | null>(null)
  const km = distanceTo(branch)

  const nearMe = async () => {
    setNote(null)
    const found = await findNearest()
    if (!found) {
      setNote('Couldn’t get your location, so pick one from the list.')
      return
    }
    const target = found.nearestOpen ?? found.nearest
    if (found.nearestOpen && found.nearestOpen.id !== found.nearest.id) {
      setNote(`${found.nearest.name} is closer but shut right now.`)
    }
    choose(target.id, 'nearest')
  }

  const eyebrow = {
    default: 'Bun & Sum in',
    remembered: 'Your usual',
    picked: 'You picked',
    nearest: status.open ? 'Nearest open to you' : 'Nearest to you',
  }[reason]

  const direct = branch.offers.find((o) => o.startsWith('20% off £15+'))
  const [postArea, postUnit] = branch.postcode.split(' ')

  return (
    <section className="hero on-box" aria-labelledby="hero-branch">
      <div className="wrap hero__inner">
        <p className="eyebrow hero__eyebrow" id="hero-branch">
          {eyebrow}
          {km !== null && <> · {formatDistance(km)}</>}
        </p>

        <div className="hero__griddle">
          <Smash run={changeCount} waiting={locateState === 'locating'} />
        </div>
        <SmashTitle name={branch.name} run={changeCount} />

        <p className="hero__where">
          <strong>{branch.kind}</strong>
          <span>
            {branch.address}, {postArea}&nbsp;{postUnit}
          </span>
        </p>

        <div className="hero__status">
          <StatusPill status={status} now={now} />
          <span className="hero__today">{todayHours(branch, now.day)}</span>
        </div>

        <div className="hero__actions">
          <a className="btn hero__order" href={branch.orderUrl} target="_blank" rel="noopener">
            <Bag />
            {orderLabel(branch, status)}
            <Arrow />
          </a>
          <a
            className="btn btn--light btn--icon"
            href={directionsUrl(branch)}
            target="_blank"
            rel="noopener"
            aria-label={`Directions to ${branch.name}`}
          >
            <Pin />
          </a>
          {branch.phone && (
            <a
              className="btn btn--light btn--icon"
              href={telUrl(branch.phone)}
              aria-label={`Call ${branch.name} on ${branch.phone}`}
            >
              <Phone />
            </a>
          )}
        </div>

        <div className="hero__switch">
          <button className="link-btn" onClick={nearMe} disabled={locateState === 'locating'}>
            <Locate /> {locateState === 'locating' ? 'Finding you…' : 'Find my nearest'}
          </button>
          <button className="link-btn" onClick={openSheet}>
            All five branches <Arrow />
          </button>
        </div>
        {note && <p className="hero__note">{note}</p>}
        {direct && (
          <p className="hero__offer">
            <strong>Order direct:</strong> 20% off £15+ at {branch.name}, applied at checkout.
          </p>
        )}

        <img
          className="hero__photo"
          src={asset('img/brisket-hands-600.webp')}
          srcSet={`${asset('img/brisket-hands-600.webp')} 600w, ${asset('img/brisket-hands-1100.webp')} 1100w`}
          sizes="360px"
          alt=""
          width="600"
          height="750"
        />
        <motion.span
          className="sticker hero__sticker"
          initial={{ rotate: -8, scale: 0.6, opacity: 0 }}
          animate={{ rotate: -8, scale: 1, opacity: 1 }}
          transition={{ delay: 1.2, type: 'spring', stiffness: 300, damping: 14 }}
        >
          Always order two
        </motion.span>
      </div>
      <Picks />
    </section>
  )
}

function pickItems(b: Branch) {
  const all = menus[b.id].flatMap((s) => s.items)
  return highlights
    .map((h) => ({ ...h, found: all.find((i) => i.name.toUpperCase() === h.item.toUpperCase()) }))
    .filter((h): h is typeof h & { found: MenuItem } => Boolean(h.found))
    .slice(0, 4)
}

// What's good, inside the first screen so it peeks up above the dock.
function Picks() {
  const { branch } = useBranch()
  const picks = pickItems(branch)
  return (
    <div className="picks" aria-labelledby="picks-title">
      <div className="wrap picks__head">
        <h2 id="picks-title" className="eyebrow">
          What’s good at {branch.name}
        </h2>
        <Link to="/menu" className="picks__all">
          Full menu <Arrow width={16} height={16} />
        </Link>
      </div>
      <ul className="picks__rail">
        {picks.map(({ found, line }) => (
          <li key={found.name} className="pick">
            <Link to="/menu" className="pick__link">
              <img
                className="pick__img"
                src={menuPhoto(found.photo ?? 'motz', 360)}
                srcSet={`${menuPhoto(found.photo ?? 'motz', 360)} 360w, ${menuPhoto(found.photo ?? 'motz', 720)} 720w`}
                sizes="(min-width: 900px) 250px, 60vw"
                alt=""
                width="360"
                height="360"
              />
              <span className="pick__body">
                <span className="pick__row">
                  <span className="pick__name display">{found.name}</span>
                  <span className="price">{formatPrice(found.price)}</span>
                </span>
                <span className="pick__line">{line}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Award() {
  const { branch } = useBranch()
  const motz = menus[branch.id].flatMap((s) => s.items).find((i) => i.name === 'MOTZ')
  return (
    <section className="award on-paper" aria-labelledby="award-title">
      <div className="wrap award__grid">
        <figure className="award__photo">
          <img
            src={asset('img/motz-award.webp')}
            alt="The MOTZ in front of the National Burger Awards ‘Winner, Burger Chef of the Year’ card"
            width="900"
            height="900"
            loading="lazy"
          />
        </figure>
        <div className="award__text">
          <p className="eyebrow">National Burger Awards 2024</p>
          <h2 id="award-title" className="display award__title">
            Burger Chef <span>of the Year</span>
          </h2>
          <p>
            Farbez Uddin took it with his George Motz Oklahoma Smash: onions sliced thin and smashed straight into the
            patties, then American cheese. It’s on the menu as the <strong>MOTZ</strong>
            {motz ? `, ${formatPrice(motz.price)} at ${branch.name}.` : '.'}
          </p>
          <blockquote className="quote">
            <p>
              “It’s an amazing thing to do for the Muslim community by showing that our burgers are also now on the
              map.”
            </p>
            <footer>Farbez Uddin, to Feed the Lion, February 2024</footer>
          </blockquote>
          <div className="award__press">
            <span className="award__press-num" aria-hidden="true">
              1
            </span>
            <p>
              <strong>No.1 in The Infatuation’s London Smashburger Power Rankings</strong> (2026):{' '}
              <q>Ronald McDonald would approve of Bun &amp; Sum’s smashburger take on the Big Mac.</q>
            </p>
          </div>
          <Link className="btn btn--small" to="/story">
            How Bow became five <Arrow />
          </Link>
        </div>
      </div>
    </section>
  )
}

function Halal() {
  return (
    <section className="halal on-ink" aria-labelledby="halal-title">
      <div className="wrap halal__inner">
        <h2 id="halal-title" className="display halal__title">
          <span>Fully halal.</span>
          <span>Muslim-owned.</span>
          <span>No alcohol.</span>
        </h2>
        <p className="halal__body">
          It’s the first word of their own bio: <q>{brand.line}</q>. And from the owners:{' '}
          <q>Everything on our menu is Halal.</q>
        </p>
      </div>
    </section>
  )
}

function FiveBranches() {
  const { branch: current, statusOf, now, choose, distanceTo } = useBranch()
  const pick = (b: Branch) => {
    choose(b.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return (
    <section className="five on-paper" aria-labelledby="five-title">
      <div className="wrap">
        <div className="section-head">
          <h2 id="five-title" className="display section-title">
            Five very different Bun &amp; Sums
          </h2>
          <Drizzle />
        </div>
        <ul className="five__list">
          {branches.map((b) => {
            const km = distanceTo(b)
            return (
              <li key={b.id} className={`five__row ${b.id === current.id ? 'is-current' : ''}`}>
                <button className="five__pick" onClick={() => pick(b)}>
                  <span className="five__name display">{b.name}</span>
                  <span className="five__kind">{b.kind}</span>
                  <span className="five__meta">
                    <StatusPill status={statusOf(b)} now={now} />
                    {km !== null && <span className="five__dist">{formatDistance(km)}</span>}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
        <Link className="btn btn--small five__all" to="/branches">
          Hours, addresses and directions <Arrow />
        </Link>
      </div>
    </section>
  )
}

function Channels() {
  return (
    <section className="channels on-ink" aria-labelledby="channels-title">
      <div className="wrap">
        <div className="section-head">
          <h2 id="channels-title" className="display section-title">
            {brand.handle}
          </h2>
          <Drizzle />
        </div>
        <p className="channels__lede">
          POVs from the griddle, new drops and the odd Taylor Swift singalong. Plus <em>Behind The Grill</em> on
          YouTube.
        </p>
        <ul className="channels__videos">
          {brand.videos.map((v) => (
            <li key={v.id}>
              <a href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener" className="video">
                <img src={asset(`img/yt-${v.id}.webp`)} alt="" width="640" height="360" loading="lazy" />
                <span className="video__title">{v.title}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="channels__links">
          <a className="btn btn--light btn--small" href={brand.instagram} target="_blank" rel="noopener">
            <Instagram /> Instagram
          </a>
          <a className="btn btn--light btn--small" href={brand.tiktok} target="_blank" rel="noopener">
            <TikTok /> TikTok
          </a>
          <a className="btn btn--light btn--small" href={brand.youtube} target="_blank" rel="noopener">
            <YouTube /> YouTube
          </a>
        </div>
      </div>
    </section>
  )
}
