import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { brand } from '../data/bunandsum'
import { asset } from '../lib/asset'
import { useBranch } from '../state/BranchContext'
import { Arrow } from '../components/Icons'

interface Beat {
  when: string
  title: string
  body: string
  quote?: { text: string; who: string }
  photo?: { src: string; alt: string }
}

// Every line here is from an interview, their own posts or the awards coverage.
const beats: Beat[] = [
  {
    when: 'Summer 2021',
    title: 'Bow, Unit 4',
    body: 'Farbez Uddin, who grew up in Poplar, opens a burger hatch on the Bow Triangle Business Centre off Eleanor Street. His wife came up with the idea, and the name.',
    quote: {
      text: 'The industrial unit actually used to belong to my dad who was downsizing his business, he’s got a catering company… I said I’ll take that industrial unit off him and turn it into a burger shop.',
      who: 'Farbez Uddin, to Eastlondonlines, 2024',
    },
  },
  {
    when: '2021–23',
    title: 'Barrels for tables',
    body: 'No shopfront landlord would take a chance on a new name, so Bow it was. People found it anyway, and ate stood up at the oak barrels outside.',
    quote: {
      text: '…people still go to Bow, people like that vibe, the whole look of it, it being in an industrial estate.',
      who: 'Farbez Uddin, to Eastlondonlines, 2024',
    },
  },
  {
    when: '2022',
    title: 'The Pastrami',
    body: 'Twelve-hour smoked pastrami goes on a smash burger. In their words: “Very recently imitated but never replicated, The Pastrami est 2022.”',
  },
  {
    when: 'February 2024',
    title: 'Burger Chef of the Year',
    body: 'At the National Burger Awards, Farbez wins Burger Chef of the Year with his George Motz Oklahoma Smash. It’s on the menu now as the MOTZ.',
    quote: {
      text: 'We stood right at the back. So, when they announced our name, it took a long time for me to get down to the stage, they thought we had left.',
      who: 'Farbez Uddin, to Eastlondonlines, 2024',
    },
  },
  {
    when: 'February 2024',
    title: 'Hackney Central',
    body: 'A small dine-in on Graham Road, opposite the station: red trays, collection buzzers, hip-hop and R&B, open till 2am.',
    photo: {
      src: 'img/red-tray.webp',
      alt: 'From above: a red tray of burgers in Bun & Sum wrap, with loaded fries, brisket and ribs around it',
    },
    quote: {
      text: 'After moving in we found out we have a lot of customers in Hackney that usually order on UberEats and now they come in rather than ordering.',
      who: 'Farbez Uddin, to Eastlondonlines, 2024',
    },
  },
  {
    when: 'September 2024',
    title: 'Whitechapel',
    body: 'A big sit-down off Mile End Road, with pinball, air hockey, foosball and arcade machines.',
    quote: {
      text: 'Proper classic American games that you would get, so we want it to be a whole different vibe there.',
      who: 'Farbez Uddin on Whitechapel, to Eastlondonlines, 2024',
    },
  },
  {
    when: 'January 2025',
    title: 'Big S’Mac in the final',
    body: 'The Big S’Mac, their riff on the Big Mac with that middle bun, makes the final of the National Burger Awards 2025.',
  },
  {
    when: 'June 2025',
    title: 'Brixton',
    body: 'Into Pop Brixton, south of the river for the first time. Plus a collection kitchen at Chiswick Park out west.',
  },
  {
    when: '27.08.26',
    title: 'Slim Thick drops',
    body: 'National Burger Day 2026: a 180g thick patty for a change, double American cheese, chipotle aioli, drip fries on the side.',
  },
]

export function Story() {
  const reduce = useReducedMotion()
  const line = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: line, offset: ['start 70%', 'end 60%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const { branch } = useBranch()

  return (
    <div className="story-page">
      <section className="story-hero on-ink">
        <div className="wrap story-hero__grid">
          <div>
            <p className="eyebrow">{brand.founded}</p>
            <h1 className="display story-hero__title">
              Started in his dad’s <span>catering unit</span>
            </h1>
            <p className="story-hero__lede">
              Bun &amp; Sum is Farbez and his younger brother Faysal Uddin. LA-style smash burgers, fully halal, no
              fuss, no shortcuts. Here’s how a hatch in Bow turned into five.
            </p>
          </div>
          <img
            className="story-hero__img"
            src={asset('img/brisket-hands-1100.webp')}
            srcSet={`${asset('img/brisket-hands-600.webp')} 600w, ${asset('img/brisket-hands-1100.webp')} 1100w`}
            sizes="(min-width: 900px) 460px, 100vw"
            alt="Two hands holding a brisket smash burger in Bun & Sum wrap paper"
            width="1100"
            height="1375"
          />
        </div>
      </section>

      <section className="on-paper wrapper-print story-line">
        <div className="wrap">
          <ol className="beats" ref={line}>
            <span className="beats__rail" aria-hidden="true">
              <motion.span className="beats__fill" style={{ scaleY: reduce ? 1 : progress }} />
            </span>
            {beats.map((b) => (
              <motion.li
                key={b.title}
                className="beat"
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <span className="beat__patty" aria-hidden="true" />
                <p className="beat__when display">{b.when}</p>
                <h2 className="beat__title">{b.title}</h2>
                <p className="beat__body">{b.body}</p>
                {b.photo && (
                  <img
                    className="beat__photo"
                    src={asset(b.photo.src)}
                    alt={b.photo.alt}
                    width="686"
                    height="652"
                    loading="lazy"
                  />
                )}
                {b.quote && (
                  <blockquote className="quote">
                    <p>“{b.quote.text}”</p>
                    <footer>{b.quote.who}</footer>
                  </blockquote>
                )}
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section className="on-box story-end">
        <div className="wrap story-end__inner">
          <p className="display story-end__title">Now: five branches, one rule.</p>
          <p className="sticker story-end__motto">{brand.motto}</p>
          <div className="story-end__actions">
            <a className="btn" href={branch.orderUrl} target="_blank" rel="noopener">
              Order from {branch.name} <Arrow />
            </a>
            <Link className="btn btn--light" to="/branches">
              See all five
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
