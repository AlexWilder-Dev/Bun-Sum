// One-off: turns the photos saved in research/ into web-sized files in public/img.
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const src = path.join(root, 'research/photos')
const out = path.join(root, 'public/img')

const jobs = []
const menuDir = path.join(src, 'menu')
for (const f of fs.readdirSync(menuDir)) {
  const name = f.replace(/\.(jpg|png)$/, '')
  jobs.push({ from: path.join(menuDir, f), to: `menu/${name}`, widths: [360, 720], square: true })
}
jobs.push({ from: path.join(src, 'toast-Hero.jpg'), to: 'spread', widths: [800, 1600] })
jobs.push({ from: path.join(src, 'popbrixton-3.webp'), to: 'red-tray', widths: [800] })
jobs.push({ from: path.join(src, 'menu/motz.jpg'), to: 'motz-award', widths: [900] })
jobs.push({ from: path.join(src, 'popbrixton-traders-brisket.jpg'), to: 'brisket-hands', widths: [600, 1100] })
for (const id of ['DMInPlhxQUo', 'sSW1X_8pDUI']) {
  jobs.push({ from: path.join(src, `youtube/l_${id}.jpg`), to: `yt-${id}`, widths: [640] })
}

for (const job of jobs) {
  fs.mkdirSync(path.dirname(path.join(out, job.to)), { recursive: true })
  for (const w of job.widths) {
    let img = sharp(job.from).rotate()
    img = job.square
      ? img.resize(w, w, { fit: 'cover', position: 'centre' })
      : img.resize({ width: w, withoutEnlargement: true })
    const file = path.join(out, job.widths.length > 1 || job.square ? `${job.to}-${w}.webp` : `${job.to}.webp`)
    await img.webp({ quality: 74 }).toFile(file)
  }
}
// The print on their wraps and bowls: wordmark, squeeze bottle and splat repeated in black.
// Rebuilt from the logo pieces as one faint tile for the menu background.
const piece = (file, width, rotate = 0) =>
  sharp(path.join(root, 'public/brand', file), { density: 160 })
    .resize({ width })
    .rotate(rotate, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer()
const tile = 300
await sharp({ create: { width: tile, height: tile, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
  .composite([
    { input: await piece('wordmark.svg', 64, -8), left: 18, top: 16 },
    { input: await piece('bottle.svg', 58, 0), left: 196, top: 40 },
    { input: await piece('splat.svg', 70, 20), left: 150, top: 168 },
    { input: await piece('wordmark.svg', 52, 10), left: 40, top: 186 },
  ])
  .webp({ quality: 80, alphaQuality: 80 })
  .toFile(path.join(out, 'wrap-tile.webp'))

// A worn-print mask for the big type, like the scuffed letters in their logo:
// opaque everywhere except scattered specks and a few scuffs. Seeded so it never changes.
{
  const S = 420
  const px = new Uint8Array(S * S).fill(255)
  let seed = 2021
  const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647
  const hole = (cx, cy, r) => {
    for (let y = Math.floor(cy - r); y <= cy + r; y++)
      for (let x = Math.floor(cx - r); x <= cx + r; x++) {
        if ((x - cx) ** 2 + (y - cy) ** 2 > r * r) continue
        px[((y + S) % S) * S + ((x + S) % S)] = 0
      }
  }
  for (let i = 0; i < 520; i++) hole(rand() * S, rand() * S, 0.4 + rand() ** 4 * 1.8)
  for (let i = 0; i < 34; i++) {
    let x = rand() * S
    let y = rand() * S
    const dx = rand() * 2 - 1
    const dy = (rand() * 2 - 1) * 0.3
    for (let k = 0; k < 8 + rand() * 26; k++) hole((x += dx * 1.3), (y += dy), 0.4 + rand() * 0.8)
  }
  const rgba = Buffer.alloc(S * S * 4)
  for (let i = 0; i < S * S; i++) rgba.set([0, 0, 0, px[i]], i * 4)
  await sharp(rgba, { raw: { width: S, height: S, channels: 4 } })
    .png()
    .toFile(path.join(out, 'distress.png'))
}

console.log(`wrote ${jobs.length} images, wrap tile and distress mask`)
