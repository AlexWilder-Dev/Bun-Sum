# Bun & Sum

A demo website for Bun & Sum, the halal LA-style smash burger spot that started in a Bow industrial unit in 2021. Made to show the owners.

It's a front end only. There's no ordering backend, no CMS and no forms. Every "Order" button goes to that branch's own Toast ordering page on bunandsum.com.

## What's in it

- **Your branch, everywhere.** Pick a branch, or tap "Find my nearest", and the top bar, order dock, menu, prices, hours, phone and directions all follow it. The site remembers it and starts on Brixton. Open or closed is worked out on London time, including Hackney's 2am finish.
- **The smash.** A ball of beef lands on the griddle and gets smashed into a crispy-edged patty, and the branch name squashes with it. It plays on load and on every branch change, and turns off for reduced motion.
- **Menus per branch.** Names, descriptions and prices exactly as each branch lists them on Toast. Bow and Whitechapel charge differently.
- **The rest.** The story from 2021 to now, the Burger Chef of the Year award, halal info, a map of the branches, and links to Instagram, TikTok and YouTube.

## Editing the content

Branches, hours, phone numbers, order links, offers and menus are all in [`src/data/bunandsum.ts`](src/data/bunandsum.ts).

The research behind it, including sources, photos and what was left out and why, is in [`research/notes.md`](research/notes.md).

## Running it

```sh
npm install
npm run dev          # local dev server
npm run build        # production build into dist/
npm run check:head   # checks link-preview tags and og.jpg in dist/
```

One-off asset scripts, already run, with output committed in `public/`:

```sh
npm run images   # web images from research/photos, the wrap-print tile and the worn-print mask
npm run og       # public/og.jpg (1200×630) plus the favicon and home-screen icons
```

## Deploying

The site builds for GitHub Pages at `https://alexwilder-dev.github.io/bun-and-sum/` (Vite `base` is `/bun-and-sum/`, and routing uses the URL hash). `.github/workflows/pages.yml` builds and deploys on every push to `main`. Turn on Pages with "GitHub Actions" as the source.

The visit ping at the bottom of `index.html` posts to ntfy.sh. Replace `YOUR-NTFY-TOPIC` with your topic. Add `?v=name` to a link to tag who opened it. Open the site once with `#me` to stop your own visits pinging.

---

Site by AlexWilder-Dev
