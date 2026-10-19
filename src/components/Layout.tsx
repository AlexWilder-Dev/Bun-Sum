import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { brand } from '../data/bunandsum'
import { useBranch } from '../state/BranchContext'
import { BranchSheet } from './BranchSheet'
import { orderLabel, StatusPill } from './BranchBits'
import { Chevron, External, Instagram, TikTok, YouTube } from './Icons'
import { asset } from '../lib/asset'

const SheetCtx = createContext<() => void>(() => {})
export const useOpenSheet = () => useContext(SheetCtx)

export function Layout({ children }: { children: ReactNode }) {
  const [sheet, setSheet] = useState(false)
  const openSheet = useCallback(() => setSheet(true), [])
  const closeSheet = useCallback(() => setSheet(false), [])
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])

  return (
    <SheetCtx.Provider value={openSheet}>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <TopBar />
      <main id="main">{children}</main>
      <SignOff />
      <Dock />
      <BranchSheet open={sheet} onClose={closeSheet} />
    </SheetCtx.Provider>
  )
}

function TopBar() {
  const { branch, status, now } = useBranch()
  const openSheet = useOpenSheet()
  return (
    <header className="topbar on-ink">
      <div className="topbar__row wrap">
        <NavLink to="/" className="topbar__logo" aria-label="Bun & Sum, home">
          <img src={asset('brand/wordmark-on-dark.svg')} alt="" width="44" height="54" />
        </NavLink>
        <nav className="topbar__nav" aria-label="Main">
          <NavLink to="/menu">Menu</NavLink>
          <NavLink to="/branches">Branches</NavLink>
          <NavLink to="/story">Story</NavLink>
        </nav>
        <button className="branch-chip" onClick={openSheet} aria-haspopup="dialog">
          <span className="branch-chip__name">{branch.name}</span>
          <StatusPill status={status} now={now} />
          <Chevron className="branch-chip__chev" width={18} height={18} />
        </button>
      </div>
    </header>
  )
}

function Dock() {
  const { branch, status } = useBranch()
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 520)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  // on a big screen the home page already has its order button up top
  const quiet = pathname === '/' && !scrolled
  return (
    <nav className={`dock on-ink ${quiet ? 'is-quiet' : ''}`} aria-label="Quick">
      <NavLink to="/menu" className="dock__link">
        Menu
      </NavLink>
      <NavLink to="/branches" className="dock__link">
        Branches
      </NavLink>
      <a
        className={`dock__order ${status.open ? '' : 'is-closed'}`}
        href={branch.orderUrl}
        target="_blank"
        rel="noopener"
      >
        <span className="dock__order-label">{orderLabel(branch, status, true)}</span>
        <span className="dock__order-branch">{branch.name}</span>
      </a>
    </nav>
  )
}

function SignOff() {
  return (
    <footer className="signoff on-ink">
      <div className="wrap signoff__inner">
        <img
          className="signoff__logo"
          src={asset('brand/wordmark-on-dark.svg')}
          alt="Bun & Sum"
          width="160"
          height="197"
        />
        <p className="signoff__motto sticker">{brand.motto}</p>
        <ul className="signoff__social">
          <li>
            <a href={brand.instagram} target="_blank" rel="noopener">
              <Instagram /> Instagram
            </a>
          </li>
          <li>
            <a href={brand.tiktok} target="_blank" rel="noopener">
              <TikTok /> TikTok
            </a>
          </li>
          <li>
            <a href={brand.youtube} target="_blank" rel="noopener">
              <YouTube /> YouTube
            </a>
          </li>
          <li>
            <a href={brand.rewards.url} target="_blank" rel="noopener">
              <External /> Join {brand.rewards.name}
            </a>
          </li>
        </ul>
        <p className="signoff__small">
          Fully halal · {brand.handle} everywhere · Orders go through Bun &amp; Sum’s own Toast ordering
        </p>
        <p className="signoff__credit">Site by AlexWilder-Dev</p>
      </div>
    </footer>
  )
}
