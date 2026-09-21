export type GalleryPhoto = {
  id: string;
  src: string;
  /** Describes the space, for screen readers — not a filename. */
  alt: string;
  /** Short visible caption. Describes what is shown, nothing more. */
  caption: string;
  width: number;
  height: number;
};

/**
 * KMD Interior's completed work, as photographed.
 *
 * This is a photo gallery rather than a list of named projects, and that
 * is deliberate. The live site at kmdinterior.com publishes these
 * photographs with no project name, client, location, size or year
 * attached to any of them — its "Recent Project" section is an empty
 * carousel, and the three entries behind it are unmodified WordPress
 * theme demo posts with Lorem ipsum titles. So there is nothing to
 * migrate into a named-project model, and inventing names, locations or
 * years to fill one would be fabrication.
 *
 * Every image below is authentic KMD photography downloaded from
 * kmdinterior.com and stored locally in public/projects (converted to
 * WebP, no crop, no upscale). Captions describe only what is visible in
 * the frame.
 *
 * When real project details do exist, this can go back to a named-project
 * model: add a `name`/`location`/`year` to each record and reintroduce
 * the case-study link — see content/case-studies.ts and MIGRATION-NOTES.md.
 */
export const GALLERY: GalleryPhoto[] = [
  {
    id: "living-room-city-view",
    src: "/projects/living-room-city-view.webp",
    alt: "Living room at dusk with tan leather seating, a backlit stone television wall and the city skyline through a full-height window",
    caption: "Living room with backlit stone wall",
    width: 1070,
    height: 671,
  },
  {
    id: "living-room-timber-ceiling",
    src: "/projects/living-room-timber-ceiling.webp",
    alt: "Open-plan living room with a timber-clad ceiling, green armchairs, pale sectional seating and a polished marble floor opening onto a balcony",
    caption: "Open-plan living room, timber-clad ceiling",
    width: 1072,
    height: 671,
  },
  {
    id: "residence-passages",
    src: "/projects/residence-passages.webp",
    alt: "Three residence passages side by side: a mirrored corridor lit by backlit onyx panels, a hallway lined in fluted timber, and a fluted timber screen framing an etched glass artwork",
    caption: "Entrance passages — fluted timber, onyx and etched glass",
    width: 1072,
    height: 566,
  },
  {
    id: "bedroom-agate-panels",
    src: "/projects/bedroom-agate-panels.webp",
    alt: "Bedroom with a leather channel-tufted headboard flanked by tall backlit agate panels, framed by high-gloss fitted wardrobes",
    caption: "Bedroom with backlit agate panels",
    width: 1067,
    height: 665,
  },
  {
    id: "bedroom-blue-headboard",
    src: "/projects/bedroom-blue-headboard.webp",
    alt: "Master bedroom with a deep blue upholstered headboard, teak plank flooring, patterned floor-length drapes and full-height fitted wardrobes",
    caption: "Master bedroom, teak flooring",
    width: 1070,
    height: 660,
  },
  {
    id: "living-room-teak-floor",
    src: "/projects/living-room-teak-floor.webp",
    alt: "Living room with teak plank flooring, a glass console television unit, display niches and carved timber wall panelling",
    caption: "Living room with carved timber panelling",
    width: 1073,
    height: 631,
  },
  {
    id: "living-room-teak-floor-seating",
    src: "/projects/living-room-teak-floor-seating.webp",
    alt: "The same teak-floored living room seen from the seating area, with a leather sofa, patterned rug and a recessed television wall",
    caption: "Living room, seating area",
    width: 1073,
    height: 631,
  },
  {
    id: "bedroom-contemporary-white",
    src: "/projects/bedroom-contemporary-white.webp",
    alt: "All-white contemporary bedroom: a curved cove-lit headboard wall wrapping into a sculpted bedside shelf, full-height fitted wardrobes, a pale plank floor and a full-height window",
    caption: "Bedroom with curved cove lighting",
    width: 1280,
    height: 960,
  },
  {
    id: "bathroom-sculpted-white",
    src: "/projects/bathroom-sculpted-white.webp",
    alt: "White bathroom with a freestanding oval tub on a raised plinth, set against sculpted curved wall panels and layered ceiling coves with concealed lighting",
    caption: "Bathroom with sculpted wall panels",
    width: 1280,
    height: 960,
  },
  {
    id: "entrance-brass-screen",
    src: "/projects/entrance-brass-screen.webp",
    alt: "Entrance threshold framed by sliding brass screens etched with a gold floral motif, set into book-matched white marble and fluted stone, opening onto a quilted white alcove",
    caption: "Entrance screens in etched brass and marble",
    width: 2048,
    height: 1536,
  },
  {
    id: "powder-room-quartzite",
    src: "/projects/powder-room-quartzite.webp",
    alt: "Powder room lined in figured quartzite beneath a curved walnut ceiling, with a sculpted stone basin, brass wall-mounted tap and two agate-framed mirrors",
    caption: "Powder room in figured quartzite and walnut",
    width: 1536,
    height: 2048,
  },
  {
    id: "lounge-brass-chandelier",
    src: "/projects/lounge-brass-chandelier.webp",
    alt: "Lounge with a pale linen sectional, burgundy tub chairs and a brass ring chandelier, against textured stone walls and a polished marble floor",
    caption: "Lounge with brass ring chandelier",
    width: 2048,
    height: 1536,
  },
  {
    id: "living-room-evening",
    src: "/projects/living-room-evening.webp",
    alt: "Living room in the evening with the drapes drawn, facing pale bouclé sofas, burgundy armchairs and stepped marble coffee tables under a brass ring chandelier",
    caption: "Living room at evening, drapes drawn",
    width: 2048,
    height: 1536,
  },
  {
    id: "living-room-marble-credenza",
    src: "/projects/living-room-marble-credenza.webp",
    alt: "Marble-topped credenza with high-gloss walnut fronts running the length of a living room, set behind a curved bouclé sofa",
    caption: "Marble and walnut credenza",
    width: 2048,
    height: 1536,
  },
  {
    id: "corridor-fitted-joinery",
    src: "/projects/corridor-fitted-joinery.webp",
    alt: "Corridor lined with full-height cream fitted cabinetry beneath a walnut ceiling, lit by a continuous recessed strip above a marble floor",
    caption: "Corridor with full-height fitted joinery",
    width: 1536,
    height: 2048,
  },
  {
    id: "dining-room-crane-artwork",
    src: "/projects/dining-room-crane-artwork.webp",
    alt: "Dining room with a marble table and cane-backed chairs, full-height windows onto the city, and a backlit panel depicting cranes among blossom",
    caption: "Dining room with backlit crane panel",
    width: 1280,
    height: 960,
  },
];

/**
 * Look a photograph up by id.
 *
 * Every placement outside the gallery goes through this rather than
 * `GALLERY[n]`. Positional access is what let three photographs end up
 * in five different sections — the hero, "Who We Are", Selected Work,
 * Design Philosophy and the closing CTA all pointed at the same handful
 * of indexes, and nothing in the code made that visible. Named lookups
 * make each placement legible, survive reordering the array, and throw
 * at build time on a typo instead of rendering the wrong room.
 */
export function getPhoto(id: string): GalleryPhoto {
  const photo = GALLERY.find((candidate) => candidate.id === id);
  if (!photo) throw new Error(`Unknown photo id: "${id}"`);
  return photo;
}

/**
 * The three photographs used in the homepage's Selected Work section.
 *
 * Distinct from the hero, the "Who We Are" pair, the Philosophy backdrop
 * and the closing CTA — no photograph appears twice on the homepage.
 */
export const FEATURED_GALLERY: GalleryPhoto[] = [
  // Lead frame runs at 21:9 and the pair below at 4:3, so all three are
  // landscape sources that sit in their slots without a heavy crop. The
  // credenza leads because it is the one genuinely horizontal
  // composition of the set.
  getPhoto("living-room-marble-credenza"),
  getPhoto("living-room-evening"),
  getPhoto("dining-room-crane-artwork"),
];
