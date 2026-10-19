# Bun & Sum: research notes

Checked 19 October 2026. Everything on the site comes from the sources below. Anything I couldn't confirm is listed under "Left out".

## Where this came from

- **Their own channels:** bunandsum.com (Toast ordering, all six order pages, read through a reader service because Cloudflare blocks automated browsers), linktr.ee/bunandsum, TikTok @bunandsum (bio, 16.6k followers), YouTube @BunandSum (48 latest Shorts and the two *Behind The Grill* episodes).
- **Other sites:** popbrixton.org (the trader page and the traders list).
- **Press:** Eastlondonlines (Farbez interview, Apr 2024), Time Out (2024 awards and 2025 finalists), Feed the Lion (2023–24, some pieces sponsored), The Infatuation (Bow review 2023, Hackney review 2024, London Smashburger Power Rankings 2026), Hot Dinners, Secret London, Tower Hamlets Slice, HalalXplorer.
- **Listings and registers:** Google Maps (limited no-login view, first five reviews per branch), FSA hygiene ratings, Companies House, Zabihah, Halal Joints.
- **Couldn't reach:** Instagram (login wall), Uber Eats, TripAdvisor, Just Eat, Deliveroo, the Wayback Machine.

## Branches

| Branch | What it is | Status | Hours used (London) | Phone |
|---|---|---|---|---|
| Bow, Unit 4 Bow Triangle Business Centre, Eleanor St, E3 4UR | The original, July 2021. A production kitchen and takeaway hatch in an industrial unit (his dad's old catering unit), with a smoker on site. People eat at oak barrels outside; parking is tight. | Trading (Google, Toast, FSA 4 in Mar 2026) | 11am–11pm daily (all sources agree) | 020 3976 7158 (every source) |
| Hackney Central, 224 Graham Road, E8 1BP | Small dine-in opposite the station, opened 28 Feb 2024. About 16 stools, red trays, collection buzzers, a hip-hop/R&B playlist, queues. | Trading (Google, recent reviews) | 5pm–2am; Monday 5pm–12:30am | 020 4539 4472 (every source) |
| Whitechapel, 27a Mile End Road, E1 4TP | Dine-in set back from the road, opened Sept 2024. Pinball, air hockey, foosball, arcade machines. | Trading (Google, FSA 5) | 11am–11pm daily | 020 3337 7444 (Toast, Google) |
| Brixton, Unit S19 Pop Brixton, 49 Brixton Station Rd, SW9 8PQ | Takeaway counter in the Pop Brixton containers, opened 12 June 2025. Walk-ins and click and collect. | Trading (Google, Pop Brixton traders list, FSA 5) | Mon–Wed and Sun 12pm–11pm; Thu–Sat 12pm–midnight | Left out |
| Chiswick, Encore Kitchens, 6a Chiswick Park, Greenock Road, W3 8DU | A delivery (dark) kitchen with collection; Uber Eats calls it "Acton". No seating. Probably opened late 2025. | Trading (Google) | 11am–11pm daily | Left out |
| ~~Camden, WY-26 Camden Lock Market~~ | Was a market stall in the West Yard. | **Closed.** Google shows "Permanently closed". Bun & Sum Camden Ltd was dissolved on 12 May 2026. There's no FSA record. Toast still lists it, with online ordering switched off. **Dropped from the site.** | – | – |

Order pages are `bunandsum.com/order/<slug>`, with these slugs: `bunandsumbow`, `bunandsumhackney`, `bunandsumwhitechapel`, `bunandsumbrixton` and `bun-and-sum-chiswick-encore-kitchens-6a-chiswick-park-greenock-road`.

Notes on hours and phones:

- **Where the hours come from.** Toast's own schedule for 19–25 Oct, checked against Google.
- **Hackney.** Toast says 2am on Monday too; Google says 12:30am. The site uses the earlier time.
- **Brixton.** Pop Brixton's venue hours say the venue is shut on Mondays and Tuesdays and opens at 4pm on Wednesdays and Thursdays. That conflicts with Toast and Google. The site follows Toast and Google.
- **020 3971 6448.** Toast gives this number for Brixton and Camden; Google gives it for Chiswick. It's not confirmed for any one branch, so it's left off.
- **Chiswick's other number.** Toast lists 07771 234567, which is a placeholder.
- **Online ordering.** At the time of checking, Toast had online ordering switched off for Brixton and Whitechapel ("Currently not accepting online orders"). Bow, Hackney and Chiswick take orders ahead.
- **Bad map pin.** Toast puts Camden's pin in Beckton.
- **Hatfield.** There is an Uber Eats-only "Bun & Sum (Hatfield)". It's not on Toast, so it's not part of this site.

Company changes don't mean a branch has closed:

- The Hackney, Whitechapel and Brixton limited companies were dissolved or struck off in 2026. Hackney and Whitechapel are clearly still trading.
- A new company, B&S Whitechapel Ltd, was set up in Dec 2025.
- Brixton's company shows a compulsory strike-off dated 20 Oct 2026. Watch this one.

## Menu

The menu is transcribed exactly from each branch's Toast page and kept in `menus-all-branches-toast.json`. The sections are Special, Family Box, Combo Meals, Burgers, Sides, Dunks, Dips, Sweet and Drinks.

How the branches differ:

- **Bow:** REGULAR BURGER £6.00 and MOTZ £6.75 (Brixton: £5.75 and £6.50). The combo descriptions are worded slightly differently ("Your Fave Classic Burgers…"). It lists "WATER" rather than "DRIP WATER", and has a "NO DIP" option with no price, which is left off.
- **Whitechapel:** Buddy Box £13.99 and Quad Box £19.99 (elsewhere £15.99 and £21.99). It spells it "*NEW*CHEESEBURGER FRIES", and puts "CHEESE DIP" under Dunks.
- **Hackney:** the Quad Box description adds "and some dips". It has "CHEESE DIP" rather than "QUESO CHEESE DIP".
- **Chiswick:** same prices as Brixton; otherwise it matches Bow.
- **Camden (closed):** had a shorter menu with no Special, boxes or combos, and "2 x 2oz" wording.

Stock status is ignored.

Current offers on Toast:

- Bow, Hackney, Brixton and Chiswick: "20% off £15+" and "20% off your first order of £15+".
- Hackney and Brixton also: "Buy a Regular, Get £5 off Motz".
- Loyalty scheme: "The Bun & Sum Cliq".

## The award

Time Out says: "Burger chef of the year went to Farbez Uddin of Bun & Sum… for his 'George Motz Oklahoma Smash'" (National Burger Awards, 20 Feb 2024).

The MOTZ on the menu is that burger:

- The menu describes it as "Double smash patty, Mustard, thinly sliced onions smashed into the patty, american cheese".
- Feed the Lion says the Motz was "named after the famous American foodie, George Motz".
- Their own MOTZ photo is shot in front of the "WINNER Burger Chef of the Year" card.

Other recognition:

- 2025: the Big S'Mac was a National Burger Awards finalist (it didn't win).
- 2026: Bun & Sum (Bow) is No.1 in The Infatuation's London Smashburger Power Rankings, with the line "Ronald McDonald would approve of Bun & Sum's smashburger take on the Big Mac."

## Story

These are confirmed in the Eastlondonlines interview unless noted.

- Founded in July 2021 by Farbez Uddin, who grew up in Poplar.
- Before that he ran a property business, which closed because of COVID.
- His wife came up with the idea and the name.
- The Bow unit was his dad's catering unit.
- They opened in Bow because no shopfront landlord would rent to a new name.
- His younger brother Faysal runs it with him; both are directors of Bun & Sum Group Ltd.
- The Big S'Mac and the Bow Dip are the two best-sellers. The Bow Dip is named after Bow.
- The Pastrami dates from 2022, from their own caption.
- Slim Thick launched on National Burger Day, 27.08.26, from their own Shorts.

## Halal

Sources:

- TikTok bio: "Halal LA Style Smash Cheeseburgers".
- Feed the Lion: "Fully Halal" and "Alcohol Free" for Hackney and Whitechapel.
- Thatsup: "fully halal".
- Zabihah: "Fully halal", "No alcohol allowed".
- Owner statement on Halal Joints: "Everything on our menu is Halal."
- Farbez: "the only Halal Muslim competitor" at the 2024 awards.

What's not settled:

- Not HMC-certified, according to Halal Joints. The site says nothing about certification.
- The Infatuation tags Bow "BYOB". Nobody says alcohol is sold.

## Brand look

**Logo.** "BUN" stacked over "SUM" in heavy, condensed, distressed capitals.

- Letters are black with a mustard outline and speckle.
- A mustard splat "&" sits between the words.
- A mustard squeeze bottle squirts in from the top right, and a black ink splat sits bottom left.
- The black is about #111010. The mustard was sampled at #F8C850.
- Toast has the full logo (`Logo.jpg`), an outline version, and Linktree has a transparent PNG.

**Packaging.**

- White wrap paper and bowls printed all over in black with the wordmark, bottle and splat.
- Bright yellow cardboard Buddy and Quad boxes, printed black.
- Red plastic trays at Hackney.

**Signage.** One storefront in their Shorts has "BUN & SUM" in white condensed capitals with a yellow "&", on a dark front with a black-and-white chequered floor inside. Which branch it is isn't confirmed.

**Their digital look.**

- Toast theme: brand colour #F3ED2F on a #0D0D0D dark surface, headings in Bangers, body in Poppins.
- Linktree: #FEE808 background, #E3AD16 buttons with a hard black offset shadow.
- Shorts use comic-style stickers ("National Burger Day Drop") and brush lettering ("Behind The Grill").

**Photos.** Dark, warm studio food shots on wooden tables, from a commissioned shoot (the EXIF says FoodPhotographyLondon Ltd), used on their own Toast pages. Plus phone footage from the griddle: blue gloves, steam, balls of beef being smashed.

## How they talk

They write in Title Case with trailing "…", then emoji strings and hashtags. It's cheeky, London and pop-culture heavy.

- **"POV:" captions:** "POV: Jammin To Taylor on the Griddle…", "POV: Chefs Mood on a Friday…".
- **Pop references:** Taylor Swift, NSYNC, Bieber, Macklemore, Wolf of Wall Street, Nike ("Come Grab a Burger, dont think about it, Just Do It").
- **Slang:** "If you dunno, Get to Know…", "Jammin n Munchin…", "Cheecky Little Friday Discount", "Not Here to Apologise for Anything…".
- **Heritage lines:** "Bun & Sum est 2021", "Very recently imitated but never replicated, The Pastrami est 2022", "The Real Smash Burger Joint, No fuss…".
- **Toast description:** "built on one simple rule: always order two", "No fuss, no shortcuts, just great food done right", "Remember; ALWAYS ORDER TWO".
- **Menu jokes:** "with that middle bun", "Care For A Slice of Pie", "Water, What else do you wasn't know about it?", "Has a bit of a kick!", "SHTICKY RIBS", "Slim Thick", "Drip" fries and water.

## Who comes, and when

- **Students and freshers:** HALALFEST26 £10-off code, student-discount posts.
- **The Muslim community:** Farbez says winning put "our burgers… on the map" for it.
- **Families:** a Whitechapel reviewer came with family.
- **Late-night and weekend crowd at Hackney:** 5pm–2am, an hour's wait at peak, a "hypebeast crowd" collecting takeaway (Infatuation), busy Sundays.
- **Lunch and solo diners at Bow:** Infatuation tags. Evenings and weekends are busy there; at weekends, call ahead.
- **Delivery is big:** constant Uber Eats promos (40% off boxes). Farbez says Hackney customers who used to order on Uber Eats now come in.

## What reviewers praise and complain about

**Ratings:**

- Google: Bow 3.6 (1,135 reviews), Hackney 3.5 (309), Whitechapel 3.7 (301), Brixton 3.9 (46), Chiswick 2.4 (17).
- Uber Eats: about 4.0–4.2 (search snippets).
- The Infatuation: 8.1 for Bow and for Hackney.

**Praise:**

- Crispy, caramelised edges ("the edges of these patties had a literal crunch!", HalalXplorer).
- The Big S'Mac, the Bow Dip with au jus, the MOTZ, and the 12-hour pastrami and brisket.
- Beef-tallow fries.
- Friendly staff.

**Complaints:**

- Small burgers for the price; several reviewers only thought it worth it on 50%-off deals.
- A £5 Mexican Coke.
- Delivered food arriving cold or soggy.
- Ignored customisations and missing items.
- Uneven quality between branches (Chiswick is the weakest).
- Long waits at Hackney, and parking at Bow.

## Photos (all from their own channels, saved in `photos/`)

- **`toast-Hero.jpg`:** the bunandsum.com hero and og:image. A table spread of burgers, loaded fries in branded bowls, ribs, shakes, Jarritos and Tropical Fantasy, with the "WINNER Burger Chef of the Year" card in the middle. Studio shoot, no branch. Not used, because the site shows the dishes one by one instead.
- **`menu/*.jpg` (38):** every Toast menu photo (originals from Toast's S3, resized). Mostly dark wood studio shots; the boxes are shot on yellow. MOTZ and Green Chilli Cheeseburger are shot in front of the award card. No branch.
  - Used: all the menu thumbnails, the home "What's good" cards, and the award section (MOTZ).
  - Used: `og.jpg` (MOTZ).
- **`popbrixton-traders-brisket.jpg`:** from the Pop Brixton traders page, and the same shot as their own "Camera Roll ATM" Short (credit: Nu Marketing). Two hands holding a brisket cheeseburger in branded wrap. No branch.
  - Used: the Story page hero and the desktop home hero.
- **`popbrixton-3.webp`:** overhead red tray with wrapped burgers in branded paper, loaded fries, brisket, ribs and tots. Red trays point to Hackney, but that's not confirmed.
  - Used: the Story page's Hackney beat (red trays).
- **`popbrixton-1.webp`:** three milkshakes. Not used, because shakes aren't on any current Toast menu.
- **`popbrixton-2.webp`:** a customer's face behind a stacked brisket burger, in an unknown venue. Not used.
- **`youtube/`:**
  - `l_*.jpg`: the two *Behind The Grill* thumbnails. Used in the home channels section.
  - `s_*.jpg`: 48 Shorts thumbnails, for reference only. They show the griddle smash, boxes, the storefront signage and promo cards.
- **`linktree-LogoTransparent.png`, `toast-Logo.jpg`, `toast-LOGOYELLOWOUTLINE01.png`, `tiktok-avatar.jpg`:** the logo. It was traced into `logo-wordmark.svg`, `logo-bottle.svg` and `logo-splat.svg` for the site, the favicon, the og image and the wrap-print pattern.
- **`branch-toast/`:** Toast's per-branch banners (crops of the hero) and logos. Not used.

## What's weak on the current site

- **The homepage is only a location picker:** "Welcome to Bun and Sum! Find your closest location". There's no story, no award, no halal, and nothing on why it's different.
- **The link preview is generic.** It reads og:title "Order Online", with a description listing menu sections.
- **There's no way to tell branches apart.** Six identical rows of address, "All hours" and "Order online". Nothing says Hackney is a late-night dine-in, Whitechapel has arcade games, Chiswick has no tables, or Bow is a hatch.
- **It still lists Camden**, which is closed, with its pin in the wrong part of London.
- **Chiswick shows a placeholder phone number**, and one number is shared across three branches.
- **No context on prices.** It never says menus and prices differ between branches.
- **The direct-order perk is buried.** The 20% off direct-order offer only appears inside each order page, and the "Remember; ALWAYS ORDER TWO" line is hidden in Toast metadata.

## Design reasoning

- **Palette.** Ink #111010 and mustard #F8C850 from the logo. Paper #FBF7EE from the wraps and bowls. Box yellow #F7DF1E from the sharing boxes and Linktree, used for the order hero. Red #D7282F from the trays, used only on the award.
- **Type.**
  - Anton for display, to match the logo's heavy condensed capitals and the shopfront letters.
  - Bangers for sticker callouts (their Toast heading font and Shorts stickers).
  - Poppins for body (their Toast body font).
  - A light worn-print mask on the big type echoes the logo's distressing.
- **Layout.** Phone first, built around the first screen: the branch name, open or closed, order, directions, then "What's good" photo cards peeking above a fixed order dock.
- **Bun & Sum touches.**
  - The page backgrounds use their wrap print.
  - Buttons use the hard offset shadow from their Linktree.
  - The mustard squeeze from the logo draws the underlines, the Thames on the map, and the story timeline.
  - The logo's ink splat bleeds off the hero.
- **Signature interactions.**
  - **The smash.** A ball of raw beef lands on the griddle, the spatula slams it flat into a lacy-edged patty that browns and steams, and the branch name squashes flat on the same beat. It plays on load, on every branch switch, and after "Find my nearest" (the ball wobbles while it's locating you).
  - **The branch switch.** Your branch, open status and distance carry through the top bar, the order dock, the hero, the menu (that branch's own items and prices) and the branches page. The site remembers it.

## Left out (couldn't confirm)

- A phone number for Brixton or Chiswick.
- Instagram follower count and captions (blocked).
- Uber Eats and TripAdvisor details.
- Which branch the BUN & SUM storefront in the Shorts is.
- Opening dates for Camden and Chiswick.
- Whether Brixton and Whitechapel online ordering is off for good or only outside hours.
- Monthly specials other than Slim Thick.
- The Halal Friendly List inspection (search snippet only).
- Hot Dinners' "organic beef" and "Martin's potato rolls" claims (press only, not used).

What the owners most want this site to do:
1. Get people ordering direct on Toast (20% off £15+) from their nearest open branch, instead of through Uber Eats.
2. Say who they are: born in 2021 in his dad's catering unit in Bow, Burger Chef of the Year 2024 with the MOTZ, No.1 smashburger in London, fully halal.
3. Make five very different places (the Bow hatch, late-night Hackney, arcade Whitechapel, the Pop Brixton counter, the Chiswick collection kitchen) easy to choose between on hours, menu and price.
