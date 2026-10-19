// One-off: builds public/og.jpg (1200x630) for link previews.
// Their MOTZ shot (the award burger, with the Burger Chef of the Year card behind it)
// on the right, their own logo on the left.
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const W = 1200
const H = 630
const INK = '#111010'

const photo = await sharp(path.join(root, 'research/photos/menu/motz.jpg'))
  .resize(630, 630, { fit: 'cover' })
  .toBuffer()

const wordmark = await sharp(path.join(root, 'public/brand/wordmark-on-dark.svg'), { density: 200 })
  .resize({ height: 400 })
  .png()
  .toBuffer()
const wm = await sharp(wordmark).metadata()

const bottle = await sharp(path.join(root, 'public/brand/bottle.svg'), { density: 200 })
  .resize({ width: 150 })
  .png()
  .toBuffer()

const panelW = W - 630
const line = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${panelW}" height="${H}">
  <text x="${panelW / 2}" y="560" text-anchor="middle" font-family="DejaVu Sans, Arial, sans-serif"
    font-weight="700" font-size="23" letter-spacing="2.5" fill="#F8C850">HALAL · LA STYLE · SMASH BURGERS</text>
</svg>`)

await sharp({ create: { width: W, height: H, channels: 3, background: INK } })
  .composite([
    { input: photo, left: panelW, top: 0 },
    { input: wordmark, left: Math.round((panelW - wm.width) / 2), top: 70 },
    { input: bottle, left: panelW - 175, top: 22 },
    { input: line, left: 0, top: 0 },
  ])
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(path.join(root, 'public/og.jpg'))

const meta = await sharp(path.join(root, 'public/og.jpg')).metadata()
const size = fs.statSync(path.join(root, 'public/og.jpg')).size
console.log(`og.jpg ${meta.width}x${meta.height} ${meta.format} ${(size / 1024).toFixed(0)}KB`)
if (meta.width !== W || meta.height !== H || size > 300 * 1024) process.exit(1)

// Favicon and home-screen icons: the stacked wordmark from their logo on black.
for (const [file, size, pad] of [
  ['favicon-32.png', 32, 2],
  ['icon-192.png', 192, 22],
  ['apple-touch-icon.png', 180, 20],
]) {
  const mark = await sharp(path.join(root, 'public/brand/wordmark-on-dark.svg'), { density: 300 })
    .resize({ width: size - pad * 2, height: size - pad * 2, fit: 'inside' })
    .png()
    .toBuffer()
  const m = await sharp(mark).metadata()
  await sharp({ create: { width: size, height: size, channels: 4, background: INK } })
    .composite([{ input: mark, left: Math.round((size - m.width) / 2), top: Math.round((size - m.height) / 2) }])
    .png()
    .toFile(path.join(root, 'public', file))
}
console.log('icons written')
