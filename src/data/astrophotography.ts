/**
 * Astrophotography gallery data
 * Shared between the gallery page and homepage carousel
 */

export interface AstroPhoto {
  /** Unique identifier (kebab-case) */
  id: string;
  /** Display title */
  title: string;
  /** Catalog designation (e.g., NGC 6888, M31) */
  catalogId: string;
  /** Brief description */
  description: string;
  /** 400px thumbnail version */
  thumbnail: string;
  /** 800px grid version */
  grid: string;
  /** 1920px full-size version */
  fullSize: string;
  /** Show in homepage carousel */
  featured: boolean;
}

const BASE_PATH = '/images/astrophotography';

export const astrophotos: AstroPhoto[] = [
  {
    id: 'crescent-nebula',
    title: 'Crescent Nebula',
    catalogId: 'NGC 6888',
    description:
      'An emission nebula in Cygnus, formed by the fast stellar wind from a Wolf-Rayet star colliding with slower wind ejected earlier.',
    thumbnail: `${BASE_PATH}/thumbnails/crescent-nebula.jpg`,
    grid: `${BASE_PATH}/grid/crescent-nebula.jpg`,
    fullSize: `${BASE_PATH}/full/crescent-nebula.jpg`,
    featured: true,
  },
  {
    id: 'ghost-nebula',
    title: 'Ghost Nebula',
    catalogId: 'IC 63',
    description:
      'A reflection and emission nebula in Cassiopeia, illuminated by the nearby star Gamma Cassiopeiae.',
    thumbnail: `${BASE_PATH}/thumbnails/ghost-nebula.jpg`,
    grid: `${BASE_PATH}/grid/ghost-nebula.jpg`,
    fullSize: `${BASE_PATH}/full/ghost-nebula.jpg`,
    featured: true,
  },
  {
    id: 'andromeda-galaxy',
    title: 'Andromeda Galaxy',
    catalogId: 'M31',
    description:
      'The nearest major galaxy to the Milky Way, approximately 2.5 million light-years away. Destined to merge with our galaxy in about 4.5 billion years.',
    thumbnail: `${BASE_PATH}/thumbnails/andromeda-galaxy.jpg`,
    grid: `${BASE_PATH}/grid/andromeda-galaxy.jpg`,
    fullSize: `${BASE_PATH}/full/andromeda-galaxy.jpg`,
    featured: true,
  },
  {
    id: 'whirlpool-galaxy',
    title: 'Whirlpool Galaxy',
    catalogId: 'M51',
    description:
      'A grand-design spiral galaxy interacting with its smaller companion NGC 5195. Located about 23 million light-years from Earth.',
    thumbnail: `${BASE_PATH}/thumbnails/whirlpool-galaxy.jpg`,
    grid: `${BASE_PATH}/grid/whirlpool-galaxy.jpg`,
    fullSize: `${BASE_PATH}/full/whirlpool-galaxy.jpg`,
    featured: true,
  },
  {
    id: 'm78-nebula',
    title: 'M78 Reflection Nebula',
    catalogId: 'M78',
    description:
      'A reflection nebula in Orion, part of the Orion Molecular Cloud Complex. One of the brightest diffuse reflection nebulae in the sky.',
    thumbnail: `${BASE_PATH}/thumbnails/m78-nebula.jpg`,
    grid: `${BASE_PATH}/grid/m78-nebula.jpg`,
    fullSize: `${BASE_PATH}/full/m78-nebula.jpg`,
    featured: true,
  },
  {
    id: 'trifid-nebula',
    title: 'Trifid Nebula',
    catalogId: 'M20',
    description:
      'An unusual combination of emission nebula, reflection nebula, and dark nebula in Sagittarius. Named for the dark dust lanes that trisect it.',
    thumbnail: `${BASE_PATH}/thumbnails/trifid-nebula.jpg`,
    grid: `${BASE_PATH}/grid/trifid-nebula.jpg`,
    fullSize: `${BASE_PATH}/full/trifid-nebula.jpg`,
    featured: false,
  },
  {
    id: 'moon-glow',
    title: 'The Moon',
    catalogId: 'Luna',
    description:
      'Earth\'s only natural satellite, captured with a 10" Ritchey-Chrétien telescope in November 2022. The terminator reveals dramatic shadows across craters and mountain ranges.',
    thumbnail: `${BASE_PATH}/thumbnails/moon-glow.jpg`,
    grid: `${BASE_PATH}/grid/moon-glow.jpg`,
    fullSize: `${BASE_PATH}/full/moon-glow.jpg`,
    featured: false,
  },
  {
    id: 'sunflower-galaxy',
    title: 'Sunflower Galaxy',
    catalogId: 'M63',
    description:
      'A spiral galaxy in Canes Venatici, about 29 million light-years away. Known for its bright, patchy spiral arms wound tightly around a small central region.',
    thumbnail: `${BASE_PATH}/thumbnails/sunflower-galaxy.jpg`,
    grid: `${BASE_PATH}/grid/sunflower-galaxy.jpg`,
    fullSize: `${BASE_PATH}/full/sunflower-galaxy.jpg`,
    featured: false,
  },
  {
    id: 'bodes-galaxy',
    title: "Bode's Galaxy",
    catalogId: 'M81',
    description:
      'A grand design spiral galaxy in Ursa Major, about 12 million light-years away. One of the brightest galaxies visible from Earth and a popular target for amateur astronomers.',
    thumbnail: `${BASE_PATH}/thumbnails/bodes-galaxy.jpg`,
    grid: `${BASE_PATH}/grid/bodes-galaxy.jpg`,
    fullSize: `${BASE_PATH}/full/bodes-galaxy.jpg`,
    featured: false,
  },
  {
    id: 'cigar-galaxy',
    title: 'Cigar Galaxy',
    catalogId: 'M82',
    description:
      'A starburst galaxy in Ursa Major, about 12 million light-years away. Gravitational interaction with neighboring M81 has triggered intense star formation, making it five times more luminous than our Milky Way.',
    thumbnail: `${BASE_PATH}/thumbnails/cigar-galaxy.jpg`,
    grid: `${BASE_PATH}/grid/cigar-galaxy.jpg`,
    fullSize: `${BASE_PATH}/full/cigar-galaxy.jpg`,
    featured: false,
  },
  {
    id: 'pinwheel-galaxy-supernova',
    title: 'Pinwheel Galaxy & Supernova',
    catalogId: 'M101 / SN2023ixf',
    description:
      'The Pinwheel Galaxy in Ursa Major, captured during the historic supernova SN2023ixf — the closest supernova in a decade. This 9-hour exposure shows the annotated position of the exploding star, about 21 million light-years away.',
    thumbnail: `${BASE_PATH}/thumbnails/pinwheel-galaxy-supernova.jpg`,
    grid: `${BASE_PATH}/grid/pinwheel-galaxy-supernova.jpg`,
    fullSize: `${BASE_PATH}/full/pinwheel-galaxy-supernova.jpg`,
    featured: false,
  },
  {
    id: 'm109-galaxy',
    title: 'M109',
    catalogId: 'M109 / NGC 3992',
    description:
      'A barred spiral galaxy in Ursa Major, about 83 million light-years away. Captured with a 10" Ritchey-Chrétien telescope.',
    thumbnail: `${BASE_PATH}/thumbnails/m109-galaxy.jpg`,
    grid: `${BASE_PATH}/grid/m109-galaxy.jpg`,
    fullSize: `${BASE_PATH}/full/m109-galaxy.jpg`,
    featured: false,
  },
  {
    id: 'pillars-of-creation',
    title: 'Pillars of Creation',
    catalogId: 'M16 / Eagle Nebula',
    description:
      'The iconic Pillars of Creation in the Eagle Nebula, about 7,000 light-years away. These towering columns of gas and dust are active star-forming regions. Captured with a 10" Ritchey-Chrétien telescope.',
    thumbnail: `${BASE_PATH}/thumbnails/pillars-of-creation.jpg`,
    grid: `${BASE_PATH}/grid/pillars-of-creation.jpg`,
    fullSize: `${BASE_PATH}/full/pillars-of-creation.jpg`,
    featured: false,
  },
];

/** Photos to display in the homepage carousel */
export const featuredPhotos = astrophotos.filter((photo) => photo.featured);

/** Get a photo by its ID */
export function getPhotoById(id: string): AstroPhoto | undefined {
  return astrophotos.find((photo) => photo.id === id);
}
