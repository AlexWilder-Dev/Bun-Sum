import { useEffect, useRef, useState } from 'react'
import { menus } from '../data/bunandsum'
import { menuPhoto } from '../lib/asset'
import { useBranch } from '../state/BranchContext'
import { formatPrice, StatusPill } from '../components/BranchBits'
import { useOpenSheet } from '../components/Layout'
import { Arrow, Bag, Chevron } from '../components/Icons'

const sectionId = (name: string) => `m-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

export function Menu() {
  const { branch, status, now } = useBranch()
  const openSheet = useOpenSheet()
  const sections = menus[branch.id]
  const [active, setActive] = useState<string | undefined>(sections[0]?.name)
  const chips = useRef<HTMLDivElement>(null)

  // highlight the section you're in
  useEffect(() => {
    const els = sections.map((s) => document.getElementById(sectionId(s.name))).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.getAttribute('data-name') ?? undefined)
      },
      { rootMargin: '-140px 0px -60% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [sections])

  useEffect(() => {
    const chip = chips.current?.querySelector<HTMLElement>(`[data-chip="${active}"]`)
    chip?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
  }, [active])

  return (
    <div className="menu-page on-paper wrapper-print">
      <header className="menu-head wrap">
        <p className="eyebrow">The menu at</p>
        <button className="menu-head__branch" onClick={openSheet} aria-haspopup="dialog">
          <span className="display">{branch.name}</span>
          <Chevron width={26} height={26} />
        </button>
        <div className="menu-head__meta">
          <StatusPill status={status} now={now} />
          <span>Prices and items as {branch.name} lists them. Other branches differ a little.</span>
        </div>
      </header>

      <div className="menu-chips" ref={chips} role="navigation" aria-label="Menu sections">
        {sections.map((s) => (
          <a
            key={s.name}
            data-chip={s.name}
            href={`#${sectionId(s.name)}`}
            onClick={(e) => {
              e.preventDefault()
              document.getElementById(sectionId(s.name))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
            className={`menu-chip ${active === s.name ? 'is-active' : ''}`}
          >
            {s.name}
          </a>
        ))}
      </div>

      <div className="wrap menu-body">
        {sections.map((s) => (
          <section
            key={s.name}
            id={sectionId(s.name)}
            data-name={s.name}
            className="menu-section"
            aria-labelledby={`${sectionId(s.name)}-t`}
          >
            <h2 id={`${sectionId(s.name)}-t`} className="display menu-section__title">
              {s.name}
            </h2>
            <ul className="menu-items">
              {s.items.map((item) => (
                <li key={item.name} className="menu-item">
                  {item.photo ? (
                    <img
                      className="menu-item__img"
                      src={menuPhoto(item.photo, 360)}
                      alt=""
                      width="360"
                      height="360"
                      loading="lazy"
                    />
                  ) : (
                    <span className="menu-item__img menu-item__img--none" aria-hidden="true" />
                  )}
                  <div className="menu-item__text">
                    <div className="menu-item__top">
                      <h3 className="menu-item__name">{item.name}</h3>
                      <span className="price">{formatPrice(item.price)}</span>
                    </div>
                    {item.description && <p className="menu-item__desc">{item.description}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <div className="menu-foot">
          <p className="sticker menu-foot__sticker">Remember; always order two</p>
          <a className="btn" href={branch.orderUrl} target="_blank" rel="noopener">
            <Bag /> Order from {branch.name} <Arrow />
          </a>
        </div>
      </div>
    </div>
  )
}
