---
name: mosaic
description: Manage high-resolution deep-zoom mosaics - add new mosaics with DZI tiles, update metadata, and list current mosaics. Uses vips for tile generation and OpenSeadragon for viewing.
argument-hint: '[add|list|update] [mosaic-name]'
allowed-tools: Read, Edit, Write, Bash(vips *), Bash(vipsheader *), Bash(magick *), Bash(ls *), Bash(rm -rf *), Bash(mkdir *)
---

# High-Resolution Mosaic Management

This skill manages deep-zoom mosaics that can be panned and zoomed interactively using OpenSeadragon.

## File Locations

| Type            | Path                                           |
| --------------- | ---------------------------------------------- |
| Data file       | `src/data/mosaics.ts`                          |
| Source images   | `~/Pictures/website/`                          |
| DZI tiles       | `public/images/astrophotography/mosaics/<id>/` |
| Thumbnails      | `public/images/astrophotography/thumbnails/`   |
| Preview (800px) | `public/images/astrophotography/grid/`         |

## Usage

`/mosaic [action] [args]`

**Actions:**

- `add <source-file.tif> <id>` — Add a new mosaic from ~/Pictures/website
- `list` — List all current mosaics with metadata
- `update <id>` — Update metadata for a specific mosaic
- (no action) — Show help/status

## Adding a New Mosaic

When adding a new mosaic:

1. **Check source file exists** in `~/Pictures/website/` (typically .tif files)

2. **Get image dimensions** using vipsheader:

   ```bash
   vipsheader ~/Pictures/website/SourceFile.tif
   # Output: /path/to/file: 16227x10658 ushort, 3 bands, rgb16, tiffload
   ```

3. **Create output directory**:

   ```bash
   mkdir -p public/images/astrophotography/mosaics/<mosaic-id>
   ```

4. **Generate DZI tiles** using vips (this creates thousands of tile files):

   ```bash
   vips dzsave ~/Pictures/website/SourceFile.tif \
     public/images/astrophotography/mosaics/<mosaic-id>/<mosaic-id> \
     --suffix '.jpg[Q=85]' --tile-size 256 --overlap 1
   ```

   This creates:
   - `<mosaic-id>.dzi` - XML descriptor file
   - `<mosaic-id>_files/` - Directory with tile pyramid (levels 0-N)

5. **Generate thumbnail and preview**:

   ```bash
   # Thumbnail (400px max)
   magick ~/Pictures/website/SourceFile.tif -resize "400x400>" -quality 85 -strip \
     public/images/astrophotography/thumbnails/<mosaic-id>.jpg

   # Preview/grid (800px max)
   magick ~/Pictures/website/SourceFile.tif -resize "800x800>" -quality 85 -strip \
     public/images/astrophotography/grid/<mosaic-id>.jpg
   ```

6. **Add entry to data file** (`src/data/mosaics.ts`):

   ```typescript
   {
     id: 'mosaic-id',
     title: 'Display Title',
     catalogId: 'M8 / NGC 6523',
     description: 'Description of the object.',
     thumbnail: `${BASE_PATH}/thumbnails/mosaic-id.jpg`,
     preview: `${BASE_PATH}/grid/mosaic-id.jpg`,
     dzi: `${BASE_PATH}/mosaics/mosaic-id/mosaic-id.dzi`,
     dimensions: { width: 16227, height: 10658 },  // From vipsheader
     captureInfo: {
       location: 'Phoenix, Arizona',
       equipment: '11" RASA',
       // Optional: date, exposureTime, panels
     },
     featured: true,
   },
   ```

## Mosaic Data Schema

```typescript
interface AstroMosaic {
  id: string; // kebab-case identifier
  title: string; // Display name
  catalogId: string; // Catalog designation (e.g., "M8 / NGC 6523")
  description: string; // Brief description
  thumbnail: string; // 400px version path
  preview: string; // 800px version path
  dzi: string; // Path to .dzi descriptor file
  dimensions: {
    width: number;
    height: number;
  };
  captureInfo?: {
    date?: string;
    location?: string;
    equipment?: string;
    exposureTime?: string;
    panels?: number;
  };
  featured: boolean; // Show in featured section
}
```

## Removing a Mosaic

To remove a mosaic, delete:

1. The tile directory: `rm -rf public/images/astrophotography/mosaics/<mosaic-id>`
2. The thumbnail: `public/images/astrophotography/thumbnails/<mosaic-id>.jpg`
3. The preview: `public/images/astrophotography/grid/<mosaic-id>.jpg`
4. The entry from `src/data/mosaics.ts`

## Current Mosaics

Read `src/data/mosaics.ts` to see the current mosaic list.

## Workflow Examples

### Add a new mosaic

```
/mosaic add "Orion-Mosaic.tif" orion-nebula
```

Then provide: title, catalog ID, description, equipment, featured (y/n)

### List all mosaics

```
/mosaic list
```

### Update metadata

```
/mosaic update lagoon-nebula
```

## Notes

- Source files should be high-resolution TIF files (typically 10K+ pixels)
- DZI tile generation can take 30-60 seconds for large files
- Tile directories can contain thousands of files (normal for deep-zoom)
- Use kebab-case for mosaic IDs
- The viewer page is at `/astrophotography/mosaics/<id>`
- Mosaics link back to the main `/astrophotography` page

## Technical Details

- **Tile format**: JPEG at 85% quality
- **Tile size**: 256x256 pixels with 1px overlap
- **Viewer**: OpenSeadragon (installed via npm)
- **Component**: `src/components/DeepZoomViewer.astro`
- **Page template**: `src/pages/astrophotography/mosaics/[id].astro`
