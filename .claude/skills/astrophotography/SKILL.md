---
name: astrophotography
description: Manage astrophotography gallery - add new photos, update metadata, optimize images, and list current photos.
argument-hint: '[add|list|update|optimize] [photo-name]'
allowed-tools: Read, Edit, Write, Bash(magick *), Bash(ls *), Bash(cp *), Bash(mkdir *), Bash(./scripts/*)
---

# Astrophotography Gallery Management

## File Locations

| Type                | Path                                         |
| ------------------- | -------------------------------------------- |
| Data file           | `src/data/astrophotography.ts`               |
| Optimization script | `scripts/optimize-astro-images.sh`           |
| Source photos       | `~/Pictures/website/`                        |
| Thumbnails (400px)  | `public/images/astrophotography/thumbnails/` |
| Grid images (800px) | `public/images/astrophotography/grid/`       |
| Full size (1920px)  | `public/images/astrophotography/full/`       |

## Usage

`/astrophotography [action] [args]`

**Actions:**

- `add <source-file> <id>` — Add a new photo from ~/Pictures/website
- `list` — List all current photos with metadata
- `update <id>` — Update metadata for a specific photo
- `optimize [id]` — Optimize a specific photo or all photos
- (no action) — Show help/status

## Adding a New Photo

When adding a new photo:

1. **Check source file exists** in `~/Pictures/website/`
2. **Generate optimized versions** using ImageMagick:

   ```bash
   # Thumbnail (400px max)
   magick "~/Pictures/website/SourceFile.jpg" -resize "400x400>" -quality 85 -strip "public/images/astrophotography/thumbnails/photo-id.jpg"

   # Grid (800px max)
   magick "~/Pictures/website/SourceFile.jpg" -resize "800x800>" -quality 85 -strip "public/images/astrophotography/grid/photo-id.jpg"

   # Full (1920px max)
   magick "~/Pictures/website/SourceFile.jpg" -resize "1920x1920>" -quality 85 -strip "public/images/astrophotography/full/photo-id.jpg"
   ```

3. **Add entry to data file** (`src/data/astrophotography.ts`):

   ```typescript
   {
     id: 'photo-id',
     title: 'Display Title',
     catalogId: 'NGC/M/IC number',
     description: 'Brief description of the object.',
     thumbnail: `${BASE_PATH}/thumbnails/photo-id.jpg`,
     grid: `${BASE_PATH}/grid/photo-id.jpg`,
     fullSize: `${BASE_PATH}/full/photo-id.jpg`,
     featured: true,  // Show in homepage carousel?
   },
   ```

## Photo Data Schema

```typescript
interface AstroPhoto {
  id: string; // kebab-case identifier
  title: string; // Display name (e.g., "Crescent Nebula")
  catalogId: string; // Catalog designation (e.g., "NGC 6888", "M31")
  description: string; // Brief description
  thumbnail: string; // 400px version path
  grid: string; // 800px version path
  fullSize: string; // 1920px version path
  featured: boolean; // Include in homepage carousel
}
```

## Current Photos

Read `src/data/astrophotography.ts` to see the current photo list.

## Common Catalog Prefixes

| Prefix | Catalog               | Example         |
| ------ | --------------------- | --------------- |
| M      | Messier               | M31 (Andromeda) |
| NGC    | New General Catalogue | NGC 6888        |
| IC     | Index Catalogue       | IC 63           |
| Sh2    | Sharpless             | Sh2-106         |
| LDN    | Lynds Dark Nebula     | LDN 673         |

## Workflow Examples

### Add a new photo

```
/astrophotography add "Horsehead.jpg" horsehead-nebula
```

Then provide: title, catalog ID, description, featured (y/n)

### List all photos

```
/astrophotography list
```

### Update metadata

```
/astrophotography update horsehead-nebula
```

### Re-optimize images

```
/astrophotography optimize
```

## Notes

- Skip TIFF files (too large, need manual conversion first)
- Use kebab-case for photo IDs
- Keep descriptions concise (1-2 sentences)
- Only mark 5-6 photos as featured for homepage carousel
