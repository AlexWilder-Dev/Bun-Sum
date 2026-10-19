// Everything the site knows about Bun & Sum lives in this file: branches, hours,
// contact details, order links and each branch's menu.
//
// Menus, prices, order links and hours were copied from bunandsum.com (their Toast
// ordering pages) on 19 October 2026 and checked against Google. Each branch has its
// own menu because they really do differ: Bow charges more for the Regular and the
// MOTZ, and Whitechapel's family boxes are cheaper.
//
// Camden (Camden Lock Market, West Yard) is left out: Google lists it as permanently
// closed, even though Toast still shows it.

export type BranchId = 'bow' | 'hackney' | 'whitechapel' | 'brixton' | 'chiswick'

/** Times are London time, 24h. A close at or before the open means it runs past midnight. */
export interface Interval {
  open: string
  close: string
}

/** Index 0 is Sunday, matching Date.getDay(). */
export type Hours = [Interval[], Interval[], Interval[], Interval[], Interval[], Interval[], Interval[]]

export interface MenuItem {
  name: string
  description?: string
  price: number
  /** file stem in public/img/menu */
  photo?: string
}

export interface MenuSection {
  name: string
  items: MenuItem[]
}

export interface Branch {
  id: BranchId
  name: string
  /** what sort of place it is, in a few words */
  kind: string
  /** one or two lines on what makes this one different */
  about: string
  /** a real line from a real reviewer, credited */
  overheard: { text: string; who: string }
  address: string
  postcode: string
  /** only numbers we could confirm */
  phone?: string
  lat: number
  lng: number
  googlePlaceId: string
  orderUrl: string
  opened?: string
  hours: Hours
  /** offers shown on the branch's own Toast page */
  offers: string[]
  /** Toast lets you schedule an order while this branch is shut */
  takesOrdersAhead: boolean
}

const every = (open: string, close: string): Hours => {
  const day = [{ open, close }]
  return [day, day, day, day, day, day, day]
}

export const brand = {
  name: 'Bun & Sum',
  line: 'Halal LA Style Smash Cheeseburgers',
  motto: 'Remember; ALWAYS ORDER TWO',
  founded: 'Summer 2021, Bow',
  instagram: 'https://www.instagram.com/bunandsum',
  tiktok: 'https://www.tiktok.com/@bunandsum',
  youtube: 'https://www.youtube.com/@bunandsum',
  linktree: 'https://linktr.ee/bunandsum',
  handle: '@bunandsum',
  rewards: {
    name: 'The Bun & Sum Cliq',
    url: 'https://www.toasttab.com/bunandsumbow/rewardsSignup',
  },
  videos: [
    { title: 'Behind The Grill Ep.2: Day In The Life', id: 'DMInPlhxQUo' },
    { title: 'Behind The Grill Ep.1: Abu Dhabi', id: 'sSW1X_8pDUI' },
  ],
}

// What the first screen points people at, in this order, if the branch sells it.
// Each line is backed by something they or the press have said.
export const highlights: { item: string; line: string }[] = [
  { item: 'Slim Thick', line: 'The new one. Dropped on National Burger Day, 27.08.26.' },
  { item: 'MOTZ', line: 'The burger that won Farbez Burger Chef of the Year 2024.' },
  { item: "BIG S'MAC", line: 'One of their two best-sellers, and a 2025 National Burger Awards finalist.' },
  { item: 'BOW DIP', line: 'The other best-seller. Named after Bow, where it all started.' },
  { item: 'PASTRAMI BURGER', line: '“Very recently imitated but never replicated.” Est 2022.' },
]

export const DEFAULT_BRANCH: BranchId = 'brixton'

const TOAST = 'https://bunandsum.com/order/'

export const branches: Branch[] = [
  {
    id: 'bow',
    name: 'Bow',
    kind: 'The original: a hatch on an industrial estate',
    about:
      'Where it started in July 2021, in the unit that was Farbez’s dad’s catering kitchen. Smoker on site, oak barrels outside to eat at. Parking’s tight.',
    overheard: { text: '…a carnivorous fever dream of oak wine barrels as makeshift tables', who: 'The Infatuation' },
    address: 'Unit 4, Bow Triangle Business Centre, Eleanor St',
    postcode: 'E3 4UR',
    phone: '020 3976 7158',
    lat: 51.52406,
    lng: -0.022738,
    googlePlaceId: 'ChIJITl1v34ddkgReDnQBXzgVJ0',
    orderUrl: `${TOAST}bunandsumbow`,
    opened: 'July 2021',
    hours: every('11:00', '23:00'),
    offers: ['20% off £15+', '20% off your first order of £15+'],
    takesOrdersAhead: true,
  },
  {
    id: 'hackney',
    name: 'Hackney Central',
    kind: 'Small dine-in, open late',
    about:
      'Opposite Hackney Central station. A handful of stools, red trays, collection buzzers and a hip-hop and R&B playlist. Opens at 5pm and goes on past midnight.',
    overheard: { text: 'Top tier scran!', who: 'Zack Pearce, Google review' },
    address: '224 Graham Road',
    postcode: 'E8 1BP',
    phone: '020 4539 4472',
    lat: 51.5465,
    lng: -0.05623,
    googlePlaceId: 'ChIJKfbwsKgddkgRXSmdhS8xQ1U',
    orderUrl: `${TOAST}bunandsumhackney`,
    opened: 'February 2024',
    // Toast says 2am every night; Google has Monday finishing at 12:30am, so Monday uses the earlier time.
    hours: [
      [{ open: '17:00', close: '02:00' }],
      [{ open: '17:00', close: '00:30' }],
      [{ open: '17:00', close: '02:00' }],
      [{ open: '17:00', close: '02:00' }],
      [{ open: '17:00', close: '02:00' }],
      [{ open: '17:00', close: '02:00' }],
      [{ open: '17:00', close: '02:00' }],
    ],
    offers: ['Buy a Regular, Get £5 off Motz', '20% off £15+', '20% off your first order of £15+'],
    takesOrdersAhead: true,
  },
  {
    id: 'whitechapel',
    name: 'Whitechapel',
    kind: 'Sit-down with arcade games',
    about: 'Set back off Mile End Road: the big sit-down one, with pinball, air hockey, foosball and arcade machines.',
    overheard: {
      text: 'The burgers were terrific if you don’t mind them a bit ‘dirty’',
      who: 'Russell Brown, Google review',
    },
    address: '27a Mile End Road',
    postcode: 'E1 4TP',
    phone: '020 3337 7444',
    lat: 51.52063,
    lng: -0.05459,
    googlePlaceId: 'ChIJGxtyMAAddkgRzmm71hhTnfU',
    orderUrl: `${TOAST}bunandsumwhitechapel`,
    opened: 'September 2024',
    hours: every('11:00', '23:00'),
    offers: [],
    takesOrdersAhead: false,
  },
  {
    id: 'brixton',
    name: 'Brixton',
    kind: 'Counter at Pop Brixton',
    about:
      'In the Pop Brixton containers by the station since June 2025. Walk up or click and collect. Open till midnight Thursday to Saturday.',
    overheard: {
      text: 'Hands down one of the best smash burger experiences in London.',
      who: 'Nellysworldoftaste, Google review',
    },
    address: 'Unit S19, Pop Brixton, 49 Brixton Station Rd',
    postcode: 'SW9 8PQ',
    lat: 51.46346,
    lng: -0.11234,
    googlePlaceId: 'ChIJw5aKnSoFdkgRsUkGnaXQfsk',
    orderUrl: `${TOAST}bunandsumbrixton`,
    opened: 'June 2025',
    hours: [
      [{ open: '12:00', close: '23:00' }],
      [{ open: '12:00', close: '23:00' }],
      [{ open: '12:00', close: '23:00' }],
      [{ open: '12:00', close: '23:00' }],
      [{ open: '12:00', close: '00:00' }],
      [{ open: '12:00', close: '00:00' }],
      [{ open: '12:00', close: '00:00' }],
    ],
    offers: ['Buy a Regular, Get £5 off Motz', '20% off £15+', '20% off your first order of £15+'],
    takesOrdersAhead: false,
  },
  {
    id: 'chiswick',
    name: 'Chiswick',
    kind: 'Kitchen for collection and delivery',
    about:
      'A kitchen unit at Encore Kitchens, Chiswick Park (Uber Eats calls it Acton). No tables: order ahead and pick up.',
    overheard: {
      text: 'Ordered a burger and animal style fries, and they were both brilliant!',
      who: 'Daniel, Google review',
    },
    address: 'Encore Kitchens, 6a Chiswick Park, Greenock Road',
    postcode: 'W3 8DU',
    lat: 51.498542,
    lng: -0.273187,
    googlePlaceId: 'ChIJx1cQ2doPdkgRr3AYSNL-SMI',
    orderUrl: `${TOAST}bun-and-sum-chiswick-encore-kitchens-6a-chiswick-park-greenock-road`,
    hours: every('11:00', '23:00'),
    offers: ['20% off £15+', '20% off your first order of £15+'],
    takesOrdersAhead: true,
  },
]

// Section and item names, descriptions and prices exactly as each branch lists them on Toast.
export const menus: Record<BranchId, MenuSection[]> = {
  brixton: [
    {
      name: 'Special',
      items: [
        {
          name: 'Slim Thick',
          description:
            '180g Thick Beef Patty, Double American Cheese, Freshly Sliced or Griddled Onion, Shredded Lettuce topped with a Chipotle Aioli. Served with a portion of our Drip Fries.',
          price: 9.25,
          photo: 'slim-thick',
        },
      ],
    },
    {
      name: 'Family Box',
      items: [
        {
          name: 'Buddy Box',
          description:
            'The Ultimate Family Bundle for 3. Grab 3 Signature Smash, with a Hat Trick of Fries and some dips.',
          price: 15.99,
          photo: 'buddy-box',
        },
        {
          name: 'Quad Box',
          description:
            'The Ultimate Sharing Bundle for 4. Grab 2 Signature Smash with 2 Double Smash, with a collection of our most popular Fries.',
          price: 21.99,
          photo: 'quad-box',
        },
      ],
    },
    {
      name: 'Combo Meals',
      items: [
        {
          name: 'The Go To Combo',
          description: 'Our Signature Burgers with Fries, Drink, Dunk and a Dip',
          price: 11.99,
          photo: 'the-go-to-combo',
        },
        {
          name: 'Classic Combo',
          description: 'Our Classic Burgers with Fries, Drink, Dunk and a Dip',
          price: 9.99,
          photo: 'classic-combo',
        },
        {
          name: 'Special Combo',
          description: 'Our Special Burgers with Fries, Drink, Dunk and a Dip',
          price: 14.99,
          photo: 'special-combo',
        },
      ],
    },
    {
      name: 'Burgers',
      items: [
        {
          name: 'REGULAR BURGER',
          description: 'Double smash patty, american cheese, pickles, onions, american mustard, ketchup',
          price: 5.75,
          photo: 'regular-burger',
        },
        {
          name: 'MOTZ',
          description: 'Double smash patty, Mustard, thinly sliced onions smashed into the patty, american cheese',
          price: 6.5,
          photo: 'motz',
        },
        {
          name: "BIG S'MAC",
          description:
            'The classic but our way. Double Smash Patty, American Cheese, Lettuce, Pickles & House S’Mac Sauce, with that middle bun.',
          price: 6.5,
          photo: 'big-s-mac',
        },
        {
          name: 'EASY STREET',
          description: 'Double Smash Patty, American Cheese, Caramelised Onions & House Easy Sauce',
          price: 7.0,
          photo: 'easy-street',
        },
        {
          name: 'GREEN CHILLI CHEESEBURGER',
          description: 'Double Smash Patty, American Cheese, Fresh Jalapeño, Onion & House Fire Sauce',
          price: 7.0,
          photo: 'green-chilli-cheeseburger',
        },
        {
          name: 'DOUBLE BACON',
          description: 'Double Smash Patty, Burnt Butter Mayo, Onion, American Cheese, Smoked Crispy Bacon',
          price: 8.0,
          photo: 'double-bacon',
        },
        {
          name: 'TOMMYS CHILLI CHEESE',
          description:
            'Double Smash Patty, Beef Chilli, American Cheese, Pickled Peppers, Onion, Lettuce and Easy Sauce',
          price: 8.0,
          photo: 'tommys-chilli-cheese',
        },
        {
          name: 'BIG RIB',
          description:
            'Double Smash Patty, American Cheese, Onion, Pickles, House Honey BBQ Sauce, Topped with Our Coffee Rubbed, 5 Hour Smoked Beef Backed Rib Slathered in Even More of Our House Honey BBQ Sauce',
          price: 13.0,
          photo: 'big-rib',
        },
        {
          name: 'PASTRAMI BURGER',
          description:
            'Double Smash Patty, American Cheese, Lettuce, Onion, House Fry Sauce, Topped with Housemade 12 Hour Smoked Pastrami',
          price: 14.5,
          photo: 'pastrami-burger',
        },
        {
          name: 'BOW DIP',
          description:
            'Double Smash Patty, American Cheese, 12 Hour Smoked Brisket and Served with a Pot of Our Au Jus (Beef Bone Dip)',
          price: 14.5,
          photo: 'bow-dip',
        },
      ],
    },
    {
      name: 'Sides',
      items: [
        { name: 'DRIP FRIES', description: 'French fries cooked in beef dripping', price: 2.75, photo: 'drip-fries' },
        {
          name: 'CAJUN FRIES',
          description: 'French Fries with our House Cajun Seasoning',
          price: 3.0,
          photo: 'cajun-fries',
        },
        {
          name: 'ANIMAL FRIES',
          description: "French fries, caramelised onion, cheese, House S'Mac sauce",
          price: 3.5,
          photo: 'animal-fries',
        },
        {
          name: '*NEW* CHEESEBURGER FRIES',
          description:
            'Our New & Improved Cheeseburger Fries! Crispy Fries topped with Easy Sauce, Oklahoma Smashed Patty with Cheese, Lashing of S’Mac Sauce and some Pickles.',
          price: 4.0,
          photo: 'new-cheeseburger-fries',
        },
        {
          name: 'CORN RIBS',
          description: 'Charred Corn Ribs tossed in Cajun Seasoning with Chipotle, Lime Aioli',
          price: 4.0,
          photo: 'corn-ribs',
        },
        {
          name: 'PEPPERONI CHIPS',
          description: 'Crisp, Salty Slices of Pepperoni Served with Honey Sirracha',
          price: 4.0,
          photo: 'pepperoni-chips',
        },
        {
          name: 'SMASHED POTATOES',
          description: 'Garlic, Rosemary & Thyme Smashed Potatoes, tossed in our House Cajun Seasoning',
          price: 5.5,
          photo: 'smashed-potatoes',
        },
        {
          name: 'LOADED SMASH',
          description:
            'Smashed Potatoes, House Cajun Seasoning, Queso Cheese Sauce, Cincinnati Beef Chilli, Jalapeño, Onions and House Easy Sauce',
          price: 7.75,
          photo: 'loaded-smash',
        },
        {
          name: 'BBQ RIB FRIES',
          description:
            'Drip Fries smothered in our House Honey BBQ Sauce, Topped with our 5 Hour Smoked Beef Backed Ribs Slathered in Even More of Our House Honey BBQ Sauce and Hot Pickled Peppers.',
          price: 9.25,
          photo: 'bbq-rib-fries',
        },
        {
          name: 'SHTICKY RIBS',
          description: '5 Hour Smoked Beef Back Ribs Smothered in our House Honey BBQ Sauce and Pickles',
          price: 11.75,
          photo: 'shticky-ribs',
        },
      ],
    },
    {
      name: 'Dunks',
      items: [
        { name: 'QUESO CHEESE DIP', description: 'Queso Cheese Dip', price: 3.0, photo: 'queso-cheese-dip' },
        {
          name: 'BEEF CHILLI POT',
          description: 'Pot of House Cincinnati Beef Chilli',
          price: 4.5,
          photo: 'beef-chilli-pot',
        },
        {
          name: 'BEEF BONE BROTH',
          description: 'Pot of our Decadent House Made Beef Broth (Au Jus)',
          price: 5.25,
          photo: 'beef-bone-broth',
        },
      ],
    },
    {
      name: 'Dips',
      items: [
        { name: "S'MAC DIP", description: 'Our House Made Burger Sauce', price: 1.25, photo: 's-mac-dip' },
        { name: 'EASY DIP', description: 'Classic American Burger Sauce', price: 1.25, photo: 'easy-dip' },
        {
          name: 'FIRE DIP',
          description: "House made Sriracha Mayo & Roasted Green Chilli's. Has a bit of a kick!",
          price: 1.25,
          photo: 'fire-dip',
        },
        {
          name: 'FRY DIP',
          description: 'A Utah Classic Sauce Onion Burger Sauce, served in joints throughout the state.',
          price: 1.25,
          photo: 'fry-dip',
        },
        {
          name: 'HONEY BBQ DIP',
          description: 'Housemade Smokey BBQ Sauce mixed with Sweet Honey.',
          price: 1.25,
          photo: 'honey-bbq-dip',
        },
        {
          name: 'BURNT BUTTER MAYO DIP',
          description: 'House Made Mayo made with Burnt Butter.',
          price: 1.25,
          photo: 'burnt-butter-mayo-dip',
        },
      ],
    },
    {
      name: 'Sweet',
      items: [
        {
          name: 'SLICE OF PIE',
          description:
            'Care For A Slice of Pie, Our ever changing Sweet Pies served with Whipped Cream. Currently Serving Chocolate Pie.',
          price: 6.0,
        },
      ],
    },
    {
      name: 'Drinks',
      items: [
        {
          name: 'DRIP WATER',
          description: 'Water, What else do you wasn’t know about it?',
          price: 1.75,
          photo: 'drip-water',
        },
        { name: 'Can', description: 'Classic Can Drinks', price: 1.75, photo: 'can' },
        {
          name: 'MEXICAN COKE OR FANTA',
          description: 'The Original Coke & Fanta Bottled in Mexico',
          price: 5.5,
          photo: 'mexican-coke-or-fanta',
        },
      ],
    },
  ],
  bow: [
    {
      name: 'Special',
      items: [
        {
          name: 'Slim Thick',
          description:
            '180g Thick Beef Patty, Double American Cheese, Freshly Sliced or Griddled Onion, Shredded Lettuce topped with a Chipotle Aioli. Served with a portion of our Drip Fries.',
          price: 9.25,
          photo: 'slim-thick',
        },
      ],
    },
    {
      name: 'Family Box',
      items: [
        {
          name: 'Buddy Box',
          description:
            'The Ultimate Family Bundle for 3. Grab 3 Signature Smash, with a Hat Trick of Fries and some dips.',
          price: 15.99,
          photo: 'buddy-box',
        },
        {
          name: 'Quad Box',
          description:
            'The Ultimate Sharing Bundle for 4. Grab 2 Signature Smash with 2 Double Smash, with a collection of our most popular Fries.',
          price: 21.99,
          photo: 'quad-box',
        },
      ],
    },
    {
      name: 'Combo Meals',
      items: [
        {
          name: 'The Go To Combo',
          description: 'Our Signature Burgers with Fries, Drink, Dunk & Dip.',
          price: 11.99,
          photo: 'the-go-to-combo',
        },
        {
          name: 'Classic Combo',
          description: 'Your Fave Classic Burgers with Fries, Drink, Dunk & Dip',
          price: 9.99,
          photo: 'classic-combo',
        },
        {
          name: 'Special Combo',
          description: 'Our Special Burgers with Fries, Drink, Dunk and dip',
          price: 14.99,
          photo: 'special-combo',
        },
      ],
    },
    {
      name: 'Burgers',
      items: [
        {
          name: 'REGULAR BURGER',
          description: 'Double smash patty, american cheese, pickles, onions, american mustard, ketchup',
          price: 6.0,
          photo: 'regular-burger',
        },
        {
          name: 'MOTZ',
          description: 'Double smash patty, Mustard, thinly sliced onions smashed into the patty, american cheese',
          price: 6.75,
          photo: 'motz',
        },
        {
          name: "BIG S'MAC",
          description:
            'The classic but our way. Double Smash Patty, American Cheese, Lettuce, Pickles & House S’Mac Sauce, with that middle bun.',
          price: 6.5,
          photo: 'big-s-mac',
        },
        {
          name: 'EASY STREET',
          description: 'Double Smash Patty, American Cheese, Caramelised Onions & House Easy Sauce',
          price: 7.0,
          photo: 'easy-street',
        },
        {
          name: 'GREEN CHILLI CHEESEBURGER',
          description: 'Double Smash Patty, American Cheese, Fresh Jalapeño, Onion & House Fire Sauce',
          price: 7.0,
          photo: 'green-chilli-cheeseburger',
        },
        {
          name: 'DOUBLE BACON',
          description: 'Double Smash Patty, Burnt Butter Mayo, Onion, American Cheese, Smoked Crispy Bacon',
          price: 8.0,
          photo: 'double-bacon',
        },
        {
          name: 'TOMMYS CHILLI CHEESE',
          description:
            'Double Smash Patty, Beef Chilli, American Cheese, Pickled Peppers, Onion, Lettuce and Easy Sauce',
          price: 8.0,
          photo: 'tommys-chilli-cheese',
        },
        {
          name: 'BIG RIB',
          description:
            'Double Smash Patty, American Cheese, Onion, Pickles, House Honey BBQ Sauce, Topped with Our Coffee Rubbed, 5 Hour Smoked Beef Backed Rib Slathered in Even More of Our House Honey BBQ Sauce',
          price: 13.0,
          photo: 'big-rib',
        },
        {
          name: 'PASTRAMI BURGER',
          description:
            'Double Smash Patty, American Cheese, Lettuce, Onion, House Fry Sauce, Topped with Housemade 12 Hour Smoked Pastrami',
          price: 14.5,
          photo: 'pastrami-burger',
        },
        {
          name: 'BOW DIP',
          description:
            'Double Smash Patty, American Cheese, 12 Hour Smoked Brisket and Served with a Pot of Our Au Jus (Beef Bone Dip)',
          price: 14.5,
          photo: 'bow-dip',
        },
      ],
    },
    {
      name: 'Sides',
      items: [
        { name: 'DRIP FRIES', description: 'French fries cooked in beef dripping', price: 2.75, photo: 'drip-fries' },
        {
          name: 'CAJUN FRIES',
          description: 'French Fries with our House Cajun Seasoning',
          price: 3.0,
          photo: 'cajun-fries',
        },
        {
          name: 'ANIMAL FRIES',
          description: "French fries, caramelised onion, cheese, House S'Mac sauce",
          price: 3.5,
          photo: 'animal-fries',
        },
        {
          name: '*NEW* CHEESEBURGER FRIES',
          description:
            'Our New & Improved Cheeseburger Fries! Crispy Fries topped with Easy Sauce, Oklahoma Smashed Patty with Cheese, Lashing of S’Mac Sauce and some Pickles.',
          price: 4.0,
          photo: 'new-cheeseburger-fries',
        },
        {
          name: 'CORN RIBS',
          description: 'Charred Corn Ribs tossed in Cajun Seasoning with Chipotle, Lime Aioli',
          price: 4.0,
          photo: 'corn-ribs',
        },
        {
          name: 'PEPPERONI CHIPS',
          description: 'Crisp, Salty Slices of Pepperoni Served with Honey Sirracha',
          price: 4.0,
          photo: 'pepperoni-chips',
        },
        {
          name: 'SMASHED POTATOES',
          description: 'Garlic, Rosemary & Thyme Smashed Potatoes, tossed in our House Cajun Seasoning',
          price: 5.5,
          photo: 'smashed-potatoes',
        },
        {
          name: 'LOADED SMASH',
          description:
            'Smashed Potatoes, House Cajun Seasoning, Queso Cheese Sauce, Cincinnati Beef Chilli, Jalapeño, Onions and House Easy Sauce',
          price: 7.75,
          photo: 'loaded-smash',
        },
        {
          name: 'BBQ RIB FRIES',
          description:
            'Drip Fries smothered in our House Honey BBQ Sauce, Topped with our 5 Hour Smoked Beef Backed Ribs Slathered in Even More of Our House Honey BBQ Sauce and Hot Pickled Peppers.',
          price: 9.25,
          photo: 'bbq-rib-fries',
        },
        {
          name: 'SHTICKY RIBS',
          description: '5 Hour Smoked Beef Back Ribs Smothered in our House Honey BBQ Sauce and Pickles',
          price: 11.75,
          photo: 'shticky-ribs',
        },
      ],
    },
    {
      name: 'Dunks',
      items: [
        { name: 'QUESO CHEESE DIP', description: 'Queso Cheese Dip', price: 3.0, photo: 'queso-cheese-dip' },
        {
          name: 'BEEF CHILLI POT',
          description: 'Pot of House Cincinnati Beef Chilli',
          price: 4.5,
          photo: 'beef-chilli-pot',
        },
        {
          name: 'BEEF BONE BROTH',
          description: 'Pot of our Decadent House Made Beef Broth (Au Jus)',
          price: 5.25,
          photo: 'beef-bone-broth',
        },
      ],
    },
    {
      name: 'Dips',
      items: [
        { name: "S'MAC DIP", description: 'Our House Made Burger Sauce', price: 1.25, photo: 's-mac-dip' },
        { name: 'EASY DIP', description: 'Classic American Burger Sauce', price: 1.25, photo: 'easy-dip' },
        {
          name: 'FIRE DIP',
          description: "House made Sriracha Mayo & Roasted Green Chilli's. Has a bit of a kick!",
          price: 1.25,
          photo: 'fire-dip',
        },
        {
          name: 'FRY DIP',
          description: 'A Utah Classic Sauce Onion Burger Sauce, served in joints throughout the state.',
          price: 1.25,
          photo: 'fry-dip',
        },
        {
          name: 'HONEY BBQ DIP',
          description: 'Housemade Smokey BBQ Sauce mixed with Sweet Honey.',
          price: 1.25,
          photo: 'honey-bbq-dip',
        },
        {
          name: 'BURNT BUTTER MAYO DIP',
          description: 'House Made Mayo made with Burnt Butter.',
          price: 1.25,
          photo: 'burnt-butter-mayo-dip',
        },
      ],
    },
    {
      name: 'Sweet',
      items: [
        {
          name: 'SLICE OF PIE',
          description:
            'Care For A Slice of Pie, Our ever changing Sweet Pies served with Whipped Cream. Currently Serving Chocolate Pie.',
          price: 6.0,
        },
      ],
    },
    {
      name: 'Drinks',
      items: [
        {
          name: 'WATER',
          description: 'Water, What else do you wasn’t know about it?',
          price: 1.75,
          photo: 'drip-water',
        },
        { name: 'CAN', description: 'Classic Can Drinks', price: 1.75, photo: 'can' },
        {
          name: 'MEXICAN COKE OR FANTA',
          description: 'The Original Coke & Fanta Bottled in Mexico',
          price: 5.5,
          photo: 'mexican-coke-or-fanta',
        },
      ],
    },
  ],
  hackney: [
    {
      name: 'Special',
      items: [
        {
          name: 'Slim Thick',
          description:
            '180g Thick Beef Patty, Double American Cheese, Freshly Sliced or Griddled Onion, Shredded Lettuce topped with a Chipotle Aioli. Served with a portion of our Drip Fries.',
          price: 9.25,
          photo: 'slim-thick',
        },
      ],
    },
    {
      name: 'Family Box',
      items: [
        {
          name: 'Buddy Box',
          description:
            'The Ultimate Family Bundle for 3. Grab 3 Signature Smash, with a Hat Trick of Fries and some dips.',
          price: 15.99,
          photo: 'buddy-box',
        },
        {
          name: 'Quad Box',
          description:
            'The Ultimate Sharing Bundle for 4. Grab 2 Signature Smash with 2 Double Smash, with a collection of our most popular Fries and some dips.',
          price: 21.99,
          photo: 'quad-box',
        },
      ],
    },
    {
      name: 'Combo Meals',
      items: [
        {
          name: 'The Go To Combo',
          description: 'Our Signature Burgers with Fries, Drink, Dunk and a Dip',
          price: 11.99,
          photo: 'the-go-to-combo',
        },
        {
          name: 'Classic Combo',
          description: 'Our Classic Burgers with Fries, Drink, Dunk and a Dip',
          price: 9.99,
          photo: 'classic-combo',
        },
        {
          name: 'Special Combo',
          description: 'Our Special Burgers with Fries, Drink, Dunk and a Dip',
          price: 14.99,
          photo: 'special-combo',
        },
      ],
    },
    {
      name: 'Burgers',
      items: [
        {
          name: 'REGULAR BURGER',
          description: 'Double smash patty, american cheese, pickles, onions, american mustard, ketchup',
          price: 5.75,
          photo: 'regular-burger',
        },
        {
          name: 'MOTZ',
          description: 'Double smash patty, Mustard, thinly sliced onions smashed into the patty, american cheese',
          price: 6.5,
          photo: 'motz',
        },
        {
          name: "BIG S'MAC",
          description:
            'The classic but our way. Double Smash Patty, American Cheese, Lettuce, Pickles & House S’Mac Sauce, with that middle bun.',
          price: 6.5,
          photo: 'big-s-mac',
        },
        {
          name: 'EASY STREET',
          description: 'Double Smash Patty, American Cheese, Caramelised Onions & House Easy Sauce',
          price: 7.0,
          photo: 'easy-street',
        },
        {
          name: 'GREEN CHILLI CHEESEBURGER',
          description: 'Double Smash Patty, American Cheese, Fresh Jalapeño, Onion & House Fire Sauce',
          price: 7.0,
          photo: 'green-chilli-cheeseburger',
        },
        {
          name: 'DOUBLE BACON',
          description: 'Double Smash Patty, Burnt Butter Mayo, Onion, American Cheese, Smoked Crispy Bacon',
          price: 8.0,
          photo: 'double-bacon',
        },
        {
          name: 'TOMMYS CHILLI CHEESE',
          description:
            'Double Smash Patty, Beef Chilli, American Cheese, Pickled Peppers, Onion, Lettuce and Easy Sauce',
          price: 8.0,
          photo: 'tommys-chilli-cheese',
        },
        {
          name: 'BIG RIB',
          description:
            'Double Smash Patty, American Cheese, Onion, Pickles, House Honey BBQ Sauce, Topped with Our Coffee Rubbed, 5 Hour Smoked Beef Backed Rib Slathered in Even More of Our House Honey BBQ Sauce',
          price: 13.0,
          photo: 'big-rib',
        },
        {
          name: 'PASTRAMI BURGER',
          description:
            'Double Smash Patty, American Cheese, Lettuce, Onion, House Fry Sauce, Topped with Housemade 12 Hour Smoked Pastrami',
          price: 14.5,
          photo: 'pastrami-burger',
        },
        {
          name: 'BOW DIP',
          description:
            'Double Smash Patty, American Cheese, 12 Hour Smoked Brisket and Served with a Pot of Our Au Jus (Beef Bone Dip)',
          price: 14.5,
          photo: 'bow-dip',
        },
      ],
    },
    {
      name: 'Sides',
      items: [
        { name: 'DRIP FRIES', description: 'French fries cooked in beef dripping', price: 2.75, photo: 'drip-fries' },
        {
          name: 'CAJUN FRIES',
          description: 'French Fries with our House Cajun Seasoning',
          price: 3.0,
          photo: 'cajun-fries',
        },
        {
          name: 'ANIMAL FRIES',
          description: "French fries, caramelised onion, cheese, House S'Mac sauce",
          price: 3.5,
          photo: 'animal-fries',
        },
        {
          name: '*NEW* CHEESEBURGER FRIES',
          description:
            'Our New & Improved Cheeseburger Fries! Crispy Fries topped with Easy Sauce, Oklahoma Smashed Patty with Cheese, Lashing of S’Mac Sauce and some Pickles.',
          price: 4.0,
          photo: 'new-cheeseburger-fries',
        },
        {
          name: 'CORN RIBS',
          description: 'Charred Corn Ribs tossed in Cajun Seasoning with Chipotle, Lime Aioli',
          price: 4.0,
          photo: 'corn-ribs',
        },
        {
          name: 'PEPPERONI CHIPS',
          description: 'Crisp, Salty Slices of Pepperoni Served with Honey Sirracha',
          price: 4.0,
          photo: 'pepperoni-chips',
        },
        {
          name: 'SMASHED POTATOES',
          description: 'Garlic, Rosemary & Thyme Smashed Potatoes, tossed in our House Cajun Seasoning',
          price: 5.5,
          photo: 'smashed-potatoes',
        },
        {
          name: 'LOADED SMASH',
          description:
            'Smashed Potatoes, House Cajun Seasoning, Queso Cheese Sauce, Cincinnati Beef Chilli, Jalapeño, Onions and House Easy Sauce',
          price: 7.75,
          photo: 'loaded-smash',
        },
        {
          name: 'BBQ RIB FRIES',
          description:
            'Drip Fries smothered in our House Honey BBQ Sauce, Topped with our 5 Hour Smoked Beef Backed Ribs Slathered in Even More of Our House Honey BBQ Sauce and Hot Pickled Peppers.',
          price: 9.25,
          photo: 'bbq-rib-fries',
        },
        {
          name: 'SHTICKY RIBS',
          description: '5 Hour Smoked Beef Back Ribs Smothered in our House Honey BBQ Sauce and Pickles',
          price: 11.75,
          photo: 'shticky-ribs',
        },
      ],
    },
    {
      name: 'Dunks',
      items: [
        { name: 'CHEESE DIP', description: 'Queso Cheese Dip', price: 3.0, photo: 'queso-cheese-dip' },
        {
          name: 'BEEF CHILLI POT',
          description: 'Pot of House Cincinnati Beef Chilli',
          price: 4.5,
          photo: 'beef-chilli-pot',
        },
        {
          name: 'BEEF BONE BROTH',
          description: 'Pot of our Decadent House Made Beef Broth (Au Jus)',
          price: 5.25,
          photo: 'beef-bone-broth',
        },
      ],
    },
    {
      name: 'Dips',
      items: [
        { name: "S'MAC DIP", description: 'Our House Made Burger Sauce', price: 1.25, photo: 's-mac-dip' },
        { name: 'EASY DIP', description: 'Classic American Burger Sauce', price: 1.25, photo: 'easy-dip' },
        {
          name: 'FIRE DIP',
          description: "House made Sriracha Mayo & Roasted Green Chilli's. Has a bit of a kick!",
          price: 1.25,
          photo: 'fire-dip',
        },
        {
          name: 'FRY DIP',
          description: 'A Utah Classic Sauce Onion Burger Sauce, served in joints throughout the state.',
          price: 1.25,
          photo: 'fry-dip',
        },
        {
          name: 'HONEY BBQ DIP',
          description: 'Housemade Smokey BBQ Sauce mixed with Sweet Honey.',
          price: 1.25,
          photo: 'honey-bbq-dip',
        },
        {
          name: 'BURNT BUTTER MAYO DIP',
          description: 'House Made Mayo made with Burnt Butter.',
          price: 1.25,
          photo: 'burnt-butter-mayo-dip',
        },
      ],
    },
    {
      name: 'Sweet',
      items: [
        {
          name: 'SLICE OF PIE',
          description:
            'Care For A Slice of Pie, Our ever changing Sweet Pies served with Whipped Cream. Currently Serving Chocolate Pie.',
          price: 6.0,
        },
      ],
    },
    {
      name: 'Drinks',
      items: [
        {
          name: 'WATER',
          description: 'Water, What else do you wasn’t know about it?',
          price: 1.75,
          photo: 'drip-water',
        },
        { name: 'CAN', description: 'Classic Can Drinks', price: 1.75, photo: 'can' },
        {
          name: 'MEXICAN COKE OR FANTA',
          description: 'The Original Coke & Fanta Bottled in Mexico',
          price: 5.5,
          photo: 'mexican-coke-or-fanta',
        },
      ],
    },
  ],
  whitechapel: [
    {
      name: 'Special',
      items: [
        {
          name: 'Slim Thick',
          description:
            '180g Thick Beef Patty, Double American Cheese, Freshly Sliced or Griddled Onion, Shredded Lettuce topped with a Chipotle Aioli. Served with a portion of our Drip Fries.',
          price: 9.25,
          photo: 'slim-thick',
        },
      ],
    },
    {
      name: 'Family Box',
      items: [
        {
          name: 'Buddy Box',
          description:
            'The Ultimate Family Bundle for 3. Grab 3 Signature Smash, with a Hat Trick of Fries and some dips.',
          price: 13.99,
          photo: 'buddy-box',
        },
        {
          name: 'Quad Box',
          description:
            'The Ultimate Sharing Bundle for 4. Grab 2 Signature Smash with 2 Double Smash, with a collection of our most popular Fries and some dips.',
          price: 19.99,
          photo: 'quad-box',
        },
      ],
    },
    {
      name: 'Combo Meals',
      items: [
        {
          name: 'The Go To Combo',
          description: 'Our Signature Burgers with Fries, Drink, Dunk and a Dip',
          price: 11.99,
          photo: 'the-go-to-combo',
        },
        {
          name: 'Classic Combo',
          description: 'Our Classic Burgers with Fries, Drink, Dunk and a Dip',
          price: 9.99,
          photo: 'classic-combo',
        },
        {
          name: 'Special Combo',
          description: 'Our Special Burgers with Fries, Drink, Dunk and a Dip',
          price: 14.99,
          photo: 'special-combo',
        },
      ],
    },
    {
      name: 'Burgers',
      items: [
        {
          name: 'REGULAR BURGER',
          description: 'Double smash patty, american cheese, pickles, onions, american mustard, ketchup',
          price: 5.75,
          photo: 'regular-burger',
        },
        {
          name: 'MOTZ',
          description: 'Double smash patty, Mustard, thinly sliced onions smashed into the patty, american cheese',
          price: 6.5,
          photo: 'motz',
        },
        {
          name: "BIG S'MAC",
          description:
            'The classic but our way. Double Smash Patty, American Cheese, Lettuce, Pickles & House S’Mac Sauce, with that middle bun.',
          price: 6.5,
          photo: 'big-s-mac',
        },
        {
          name: 'EASY STREET',
          description: 'Double Smash Patty, American Cheese, Caramelised Onions & House Easy Sauce',
          price: 7.0,
          photo: 'easy-street',
        },
        {
          name: 'GREEN CHILLI CHEESEBURGER',
          description: 'Double Smash Patty, American Cheese, Fresh Jalapeño, Onion & House Fire Sauce',
          price: 7.0,
          photo: 'green-chilli-cheeseburger',
        },
        {
          name: 'DOUBLE BACON',
          description: 'Double Smash Patty, Burnt Butter Mayo, Onion, American Cheese, Smoked Crispy Bacon',
          price: 8.0,
          photo: 'double-bacon',
        },
        {
          name: 'TOMMYS CHILLI CHEESE',
          description:
            'Double Smash Patty, Beef Chilli, American Cheese, Pickled Peppers, Onion, Lettuce and Easy Sauce',
          price: 8.0,
          photo: 'tommys-chilli-cheese',
        },
        {
          name: 'BIG RIB',
          description:
            'Double Smash Patty, American Cheese, Onion, Pickles, House Honey BBQ Sauce, Topped with Our Coffee Rubbed, 5 Hour Smoked Beef Backed Rib Slathered in Even More of Our House Honey BBQ Sauce',
          price: 13.0,
          photo: 'big-rib',
        },
        {
          name: 'PASTRAMI BURGER',
          description:
            'Double Smash Patty, American Cheese, Lettuce, Onion, House Fry Sauce, Topped with Housemade 12 Hour Smoked Pastrami',
          price: 14.5,
          photo: 'pastrami-burger',
        },
        {
          name: 'BOW DIP',
          description:
            'Double Smash Patty, American Cheese, 12 Hour Smoked Brisket and Served with a Pot of Our Au Jus (Beef Bone Dip)',
          price: 14.5,
          photo: 'bow-dip',
        },
      ],
    },
    {
      name: 'Sides',
      items: [
        { name: 'DRIP FRIES', description: 'French fries cooked in beef dripping', price: 2.75, photo: 'drip-fries' },
        {
          name: 'CAJUN FRIES',
          description: 'French Fries with our House Cajun Seasoning',
          price: 3.0,
          photo: 'cajun-fries',
        },
        {
          name: 'ANIMAL FRIES',
          description: "French fries, caramelised onion, cheese, House S'Mac sauce",
          price: 3.5,
          photo: 'animal-fries',
        },
        {
          name: '*NEW*CHEESEBURGER FRIES',
          description:
            'Our New & Improved Cheeseburger Fries! Crispy Fries topped with Easy Sauce, Oklahoma Smashed Patty with Cheese, Lashing of S’Mac Sauce and some Pickles.',
          price: 4.0,
          photo: 'new-cheeseburger-fries',
        },
        {
          name: 'CORN RIBS',
          description: 'Charred Corn Ribs tossed in Cajun Seasoning with Chipotle, Lime Aioli',
          price: 4.0,
          photo: 'corn-ribs',
        },
        {
          name: 'PEPPERONI CHIPS',
          description: 'Crisp, Salty Slices of Pepperoni Served with Honey Sirracha',
          price: 4.0,
          photo: 'pepperoni-chips',
        },
        {
          name: 'SMASHED POTATOES',
          description: 'Garlic, Rosemary & Thyme Smashed Potatoes, tossed in our House Cajun Seasoning',
          price: 5.5,
          photo: 'smashed-potatoes',
        },
        {
          name: 'LOADED SMASH',
          description:
            'Smashed Potatoes, House Cajun Seasoning, Queso Cheese Sauce, Cincinnati Beef Chilli, Jalapeño, Onions and House Easy Sauce',
          price: 7.75,
          photo: 'loaded-smash',
        },
        {
          name: 'BBQ RIB FRIES',
          description:
            'Drip Fries smothered in our House Honey BBQ Sauce, Topped with our 5 Hour Smoked Beef Backed Ribs Slathered in Even More of Our House Honey BBQ Sauce and Hot Pickled Peppers.',
          price: 9.25,
          photo: 'bbq-rib-fries',
        },
        {
          name: 'SHTICKY RIBS',
          description: '5 Hour Smoked Beef Back Ribs Smothered in our House Honey BBQ Sauce and Pickles',
          price: 11.75,
          photo: 'shticky-ribs',
        },
      ],
    },
    {
      name: 'Dunks',
      items: [
        { name: 'CHEESE DIP', description: 'Queso Cheese Dip', price: 3.0, photo: 'queso-cheese-dip' },
        {
          name: 'BEEF CHILLI POT',
          description: 'Pot of House Cincinnati Beef Chilli',
          price: 4.5,
          photo: 'beef-chilli-pot',
        },
        {
          name: 'BEEF BONE BROTH',
          description: 'Pot of our Decadent House Made Beef Broth (Au Jus)',
          price: 5.25,
          photo: 'beef-bone-broth',
        },
      ],
    },
    {
      name: 'Dips',
      items: [
        { name: "S'MAC DIP", description: 'Our House Made Burger Sauce', price: 1.25, photo: 's-mac-dip' },
        { name: 'EASY DIP', description: 'Classic American Burger Sauce', price: 1.25, photo: 'easy-dip' },
        {
          name: 'FIRE DIP',
          description: "House made Sriracha Mayo & Roasted Green Chilli's. Has a bit of a kick!",
          price: 1.25,
          photo: 'fire-dip',
        },
        {
          name: 'FRY DIP',
          description: 'A Utah Classic Sauce Onion Burger Sauce, served in joints throughout the state.',
          price: 1.25,
          photo: 'fry-dip',
        },
        {
          name: 'HONEY BBQ DIP',
          description: 'Housemade Smokey BBQ Sauce mixed with Sweet Honey.',
          price: 1.25,
          photo: 'honey-bbq-dip',
        },
        {
          name: 'BURNT BUTTER MAYO DIP',
          description: 'House Made Mayo made with Burnt Butter.',
          price: 1.25,
          photo: 'burnt-butter-mayo-dip',
        },
      ],
    },
    {
      name: 'Sweet',
      items: [
        {
          name: 'SLICE OF PIE',
          description:
            'Care For A Slice of Pie, Our ever changing Sweet Pies served with Whipped Cream. Currently Serving Chocolate Pie.',
          price: 6.0,
        },
      ],
    },
    {
      name: 'Drinks',
      items: [
        {
          name: 'WATER',
          description: 'Water, What else do you wasn’t know about it?',
          price: 1.75,
          photo: 'drip-water',
        },
        { name: 'CAN', description: 'Classic Can Drinks', price: 1.75, photo: 'can' },
        {
          name: 'MEXICAN COKE OR FANTA',
          description: 'The Original Coke & Fanta Bottled in Mexico',
          price: 5.5,
          photo: 'mexican-coke-or-fanta',
        },
      ],
    },
  ],
  chiswick: [
    {
      name: 'Special',
      items: [
        {
          name: 'Slim Thick',
          description:
            '180g Thick Beef Patty, Double American Cheese, Freshly Sliced or Griddled Onion, Shredded Lettuce topped with a Chipotle Aioli. Served with a portion of our Drip Fries.',
          price: 9.25,
          photo: 'slim-thick',
        },
      ],
    },
    {
      name: 'Family Box',
      items: [
        {
          name: 'Buddy Box',
          description:
            'The Ultimate Family Bundle for 3. Grab 3 Signature Smash, with a Hat Trick of Fries and some dips.',
          price: 15.99,
          photo: 'buddy-box',
        },
        {
          name: 'Quad Box',
          description:
            'The Ultimate Sharing Bundle for 4. Grab 2 Signature Smash with 2 Double Smash, with a collection of our most popular Fries.',
          price: 21.99,
          photo: 'quad-box',
        },
      ],
    },
    {
      name: 'Combo Meals',
      items: [
        {
          name: 'The Go To Combo',
          description: 'Our Signature Burgers with Fries, Drink, Dunk & Dip.',
          price: 11.99,
          photo: 'the-go-to-combo',
        },
        {
          name: 'Classic Combo',
          description: 'Your Fave Classic Burgers with Fries, Drink, Dunk & Dip',
          price: 9.99,
          photo: 'classic-combo',
        },
        {
          name: 'Special Combo',
          description: 'Our Special Burgers with Fries, Drink, Dunk and dip',
          price: 14.99,
          photo: 'special-combo',
        },
      ],
    },
    {
      name: 'Burgers',
      items: [
        {
          name: 'REGULAR BURGER',
          description: 'Double smash patty, american cheese, pickles, onions, american mustard, ketchup',
          price: 5.75,
          photo: 'regular-burger',
        },
        {
          name: 'MOTZ',
          description: 'Double smash patty, Mustard, thinly sliced onions smashed into the patty, american cheese',
          price: 6.5,
          photo: 'motz',
        },
        {
          name: "BIG S'MAC",
          description:
            'The classic but our way. Double Smash Patty, American Cheese, Lettuce, Pickles & House S’Mac Sauce, with that middle bun.',
          price: 6.5,
          photo: 'big-s-mac',
        },
        {
          name: 'EASY STREET',
          description: 'Double Smash Patty, American Cheese, Caramelised Onions & House Easy Sauce',
          price: 7.0,
          photo: 'easy-street',
        },
        {
          name: 'GREEN CHILLI CHEESEBURGER',
          description: 'Double Smash Patty, American Cheese, Fresh Jalapeño, Onion & House Fire Sauce',
          price: 7.0,
          photo: 'green-chilli-cheeseburger',
        },
        {
          name: 'DOUBLE BACON',
          description: 'Double Smash Patty, Burnt Butter Mayo, Onion, American Cheese, Smoked Crispy Bacon',
          price: 8.0,
          photo: 'double-bacon',
        },
        {
          name: 'TOMMYS CHILLI CHEESE',
          description:
            'Double Smash Patty, Beef Chilli, American Cheese, Pickled Peppers, Onion, Lettuce and Easy Sauce',
          price: 8.0,
          photo: 'tommys-chilli-cheese',
        },
        {
          name: 'BIG RIB',
          description:
            'Double Smash Patty, American Cheese, Onion, Pickles, House Honey BBQ Sauce, Topped with Our Coffee Rubbed, 5 Hour Smoked Beef Backed Rib Slathered in Even More of Our House Honey BBQ Sauce',
          price: 13.0,
          photo: 'big-rib',
        },
        {
          name: 'PASTRAMI BURGER',
          description:
            'Double Smash Patty, American Cheese, Lettuce, Onion, House Fry Sauce, Topped with Housemade 12 Hour Smoked Pastrami',
          price: 14.5,
          photo: 'pastrami-burger',
        },
        {
          name: 'BOW DIP',
          description:
            'Double Smash Patty, American Cheese, 12 Hour Smoked Brisket and Served with a Pot of Our Au Jus (Beef Bone Dip)',
          price: 14.5,
          photo: 'bow-dip',
        },
      ],
    },
    {
      name: 'Sides',
      items: [
        { name: 'DRIP FRIES', description: 'French fries cooked in beef dripping', price: 2.75, photo: 'drip-fries' },
        {
          name: 'CAJUN FRIES',
          description: 'French Fries with our House Cajun Seasoning',
          price: 3.0,
          photo: 'cajun-fries',
        },
        {
          name: 'ANIMAL FRIES',
          description: "French fries, caramelised onion, cheese, House S'Mac sauce",
          price: 3.5,
          photo: 'animal-fries',
        },
        {
          name: '*NEW* CHEESEBURGER FRIES',
          description:
            'Our New & Improved Cheeseburger Fries! Crispy Fries topped with Easy Sauce, Oklahoma Smashed Patty with Cheese, Lashing of S’Mac Sauce and some Pickles.',
          price: 4.0,
          photo: 'new-cheeseburger-fries',
        },
        {
          name: 'CORN RIBS',
          description: 'Charred Corn Ribs tossed in Cajun Seasoning with Chipotle, Lime Aioli',
          price: 4.0,
          photo: 'corn-ribs',
        },
        {
          name: 'PEPPERONI CHIPS',
          description: 'Crisp, Salty Slices of Pepperoni Served with Honey Sirracha',
          price: 4.0,
          photo: 'pepperoni-chips',
        },
        {
          name: 'SMASHED POTATOES',
          description: 'Garlic, Rosemary & Thyme Smashed Potatoes, tossed in our House Cajun Seasoning',
          price: 5.5,
          photo: 'smashed-potatoes',
        },
        {
          name: 'LOADED SMASH',
          description:
            'Smashed Potatoes, House Cajun Seasoning, Queso Cheese Sauce, Cincinnati Beef Chilli, Jalapeño, Onions and House Easy Sauce',
          price: 7.75,
          photo: 'loaded-smash',
        },
        {
          name: 'BBQ RIB FRIES',
          description:
            'Drip Fries smothered in our House Honey BBQ Sauce, Topped with our 5 Hour Smoked Beef Backed Ribs Slathered in Even More of Our House Honey BBQ Sauce and Hot Pickled Peppers.',
          price: 9.25,
          photo: 'bbq-rib-fries',
        },
        {
          name: 'SHTICKY RIBS',
          description: '5 Hour Smoked Beef Back Ribs Smothered in our House Honey BBQ Sauce and Pickles',
          price: 11.75,
          photo: 'shticky-ribs',
        },
      ],
    },
    {
      name: 'Dunks',
      items: [
        { name: 'QUESO CHEESE DIP', description: 'Queso Cheese Dip', price: 3.0, photo: 'queso-cheese-dip' },
        {
          name: 'BEEF CHILLI POT',
          description: 'Pot of House Cincinnati Beef Chilli',
          price: 4.5,
          photo: 'beef-chilli-pot',
        },
        {
          name: 'BEEF BONE BROTH',
          description: 'Pot of our Decadent House Made Beef Broth (Au Jus)',
          price: 5.25,
          photo: 'beef-bone-broth',
        },
      ],
    },
    {
      name: 'Dips',
      items: [
        { name: "S'MAC DIP", description: 'Our House Made Burger Sauce', price: 1.25, photo: 's-mac-dip' },
        { name: 'EASY DIP', description: 'Classic American Burger Sauce', price: 1.25, photo: 'easy-dip' },
        {
          name: 'FIRE DIP',
          description: "House made Sriracha Mayo & Roasted Green Chilli's. Has a bit of a kick!",
          price: 1.25,
          photo: 'fire-dip',
        },
        {
          name: 'FRY DIP',
          description: 'A Utah Classic Sauce Onion Burger Sauce, served in joints throughout the state.',
          price: 1.25,
          photo: 'fry-dip',
        },
        {
          name: 'HONEY BBQ DIP',
          description: 'Housemade Smokey BBQ Sauce mixed with Sweet Honey.',
          price: 1.25,
          photo: 'honey-bbq-dip',
        },
        {
          name: 'BURNT BUTTER MAYO DIP',
          description: 'House Made Mayo made with Burnt Butter.',
          price: 1.25,
          photo: 'burnt-butter-mayo-dip',
        },
      ],
    },
    {
      name: 'Sweet',
      items: [
        {
          name: 'SLICE OF PIE',
          description:
            'Care For A Slice of Pie, Our ever changing Sweet Pies served with Whipped Cream. Currently Serving Chocolate Pie.',
          price: 6.0,
        },
      ],
    },
    {
      name: 'Drinks',
      items: [
        {
          name: 'WATER',
          description: 'Water, What else do you wasn’t know about it?',
          price: 1.75,
          photo: 'drip-water',
        },
        { name: 'CAN', description: 'Classic Can Drinks', price: 1.75, photo: 'can' },
        {
          name: 'MEXICAN COKE OR FANTA',
          description: 'The Original Coke & Fanta Bottled in Mexico',
          price: 5.5,
          photo: 'mexican-coke-or-fanta',
        },
      ],
    },
  ],
}
