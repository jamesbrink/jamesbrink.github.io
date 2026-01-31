/**
 * High-resolution mosaic data for deep-zoom viewing
 * These are large astrophotography images that can be explored interactively
 */

export interface AstroMosaic {
  /** Unique identifier (kebab-case) */
  id: string;
  /** Display title */
  title: string;
  /** Catalog designation (e.g., M8, NGC 6523) */
  catalogId: string;
  /** Brief description */
  description: string;
  /** 400px thumbnail version */
  thumbnail: string;
  /** 800px preview version */
  preview: string;
  /** Path to DZI descriptor file */
  dzi: string;
  /** Full resolution dimensions */
  dimensions: { width: number; height: number };
  /** Optional capture metadata */
  captureInfo?: {
    date?: string;
    location?: string;
    equipment?: string;
    exposureTime?: string;
    panels?: number;
  };
  /** Show in featured section on astrophotography page */
  featured: boolean;
}

const BASE_PATH = '/images/astrophotography';

export const mosaics: AstroMosaic[] = [
  {
    id: 'lagoon-nebula',
    title: 'Lagoon Nebula',
    catalogId: 'M8 / NGC 6523',
    description:
      'A giant interstellar cloud in Sagittarius, one of only two star-forming nebulae visible to the naked eye from mid-northern latitudes. The Lagoon spans 110 by 50 light-years and lies about 4,100 light-years from Earth.',
    thumbnail: `${BASE_PATH}/thumbnails/lagoon-nebula.jpg`,
    preview: `${BASE_PATH}/grid/lagoon-nebula.jpg`,
    dzi: `${BASE_PATH}/mosaics/lagoon-nebula/lagoon-nebula.dzi`,
    dimensions: { width: 16227, height: 10658 },
    captureInfo: {
      location: 'Phoenix, Arizona',
      equipment: '11" RASA',
    },
    featured: true,
  },
  {
    id: 'cygnus-mosaic',
    title: 'Cygnus Region',
    catalogId: 'Cygnus',
    description:
      'A wide-field mosaic of the Cygnus constellation, one of the richest regions of the Milky Way. This area contains numerous emission nebulae, dark nebulae, and star-forming regions along the galactic plane.',
    thumbnail: `${BASE_PATH}/thumbnails/cygnus-mosaic.jpg`,
    preview: `${BASE_PATH}/grid/cygnus-mosaic.jpg`,
    dzi: `${BASE_PATH}/mosaics/cygnus-mosaic/cygnus-mosaic.dzi`,
    dimensions: { width: 10655, height: 11164 },
    captureInfo: {
      location: 'Phoenix, Arizona',
      equipment: '11" RASA',
    },
    featured: true,
  },
  {
    id: 'horsehead-ha',
    title: 'Horsehead Nebula (Ha)',
    catalogId: 'Barnard 33 / IC 434',
    description:
      'A 3-panel hydrogen-alpha mosaic of the iconic Horsehead Nebula in Orion. This monochrome image reveals the intricate structure of the dark nebula silhouetted against the glowing emission nebula IC 434, about 1,500 light-years away.',
    thumbnail: `${BASE_PATH}/thumbnails/horsehead-ha.jpg`,
    preview: `${BASE_PATH}/grid/horsehead-ha.jpg`,
    dzi: `${BASE_PATH}/mosaics/horsehead-ha/horsehead-ha.dzi`,
    dimensions: { width: 8000, height: 4700 },
    captureInfo: {
      location: 'Phoenix, Arizona',
      equipment: '11" RASA',
      panels: 3,
    },
    featured: true,
  },
];

/** Mosaics to display in featured section */
export const featuredMosaics = mosaics.filter((mosaic) => mosaic.featured);

/** Get a mosaic by its ID */
export function getMosaicById(id: string): AstroMosaic | undefined {
  return mosaics.find((mosaic) => mosaic.id === id);
}
