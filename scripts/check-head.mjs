// Checks the built page has every link-preview tag, with absolute URLs, and a usable og.jpg.
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const html = fs.readFileSync(path.join(root, 'dist/index.html'), 'utf8')
const head = html.slice(0, html.indexOf('</head>'))
const SITE = 'https://alexwilder-dev.github.io/Bun-Sum/'

const meta = (attr, key) => {
  const m = head.match(new RegExp(`<meta[^>]*${attr}="${key}"[^>]*content="([^"]*)"`))
  return m?.[1]
}
const checks = [
  ['<title>', /<title>[^<]+<\/title>/.test(head)],
  ['description', meta('name', 'description')],
  ['og:type = website', meta('property', 'og:type') === 'website'],
  ['og:site_name', meta('property', 'og:site_name')],
  ['og:title', meta('property', 'og:title')],
  ['og:description', meta('property', 'og:description')],
  ['og:url absolute', meta('property', 'og:url') === SITE],
  ['og:image absolute', meta('property', 'og:image') === `${SITE}og.jpg`],
  ['og:image:width 1200', meta('property', 'og:image:width') === '1200'],
  ['og:image:height 630', meta('property', 'og:image:height') === '630'],
  ['og:image:alt', meta('property', 'og:image:alt')],
  ['twitter:card', meta('name', 'twitter:card') === 'summary_large_image'],
  ['twitter:title', meta('name', 'twitter:title')],
  ['twitter:description', meta('name', 'twitter:description')],
  ['twitter:image absolute', meta('name', 'twitter:image') === `${SITE}og.jpg`],
  ['favicon absolute', new RegExp(`rel="icon"[^>]*href="${SITE}favicon-32.png"`).test(head)],
  ['apple-touch-icon absolute', new RegExp(`rel="apple-touch-icon"[^>]*href="${SITE}apple-touch-icon.png"`).test(head)],
  ['no relative or %BASE_URL% preview URLs', !/(content|href)="(\.\/|\/(?!\/)|%BASE_URL%)[^"]*\.(jpg|png)"/.test(head)],
  ['ping script before </body>', /ntfy\.sh[\s\S]*<\/script>\s*<\/body>/.test(html)],
]

const og = path.join(root, 'dist/og.jpg')
const m = await sharp(og).metadata()
const kb = fs.statSync(og).size / 1024
checks.push([`og.jpg ${m.width}x${m.height} ${m.format} ${kb.toFixed(0)}KB`, m.width === 1200 && m.height === 630 && m.format === 'jpeg' && kb < 300])
for (const icon of ['favicon-32.png', 'apple-touch-icon.png', 'icon-192.png']) {
  checks.push([`dist/${icon}`, fs.existsSync(path.join(root, 'dist', icon))])
}

let failed = 0
for (const [name, ok] of checks) {
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${name}`)
  if (!ok) failed++
}
process.exit(failed ? 1 : 0)
