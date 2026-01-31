#!/usr/bin/env bash
# Optimize astrophotography images for the web
# Generates thumbnail (400px), grid (800px), and full (1920px) versions

set -euo pipefail

SOURCE_DIR="${1:-$HOME/Pictures/website}"
OUTPUT_BASE="public/images/astrophotography"

# Image mappings: source filename -> target filename
declare -A IMAGES=(
  ["CrescentNebula.jpg"]="crescent-nebula.jpg"
  ["Ghost.jpg"]="ghost-nebula.jpg"
  ["M31-FINAL-3.jpg"]="andromeda-galaxy.jpg"
  ["M51_LinearFit.jpg"]="whirlpool-galaxy.jpg"
  ["M78_Remix.jpg"]="m78-nebula.jpg"
  ["Trifid_HOO_4.jpg"]="trifid-nebula.jpg"
)

# Size configurations: directory -> max width
declare -A SIZES=(
  ["thumbnails"]="400"
  ["grid"]="800"
  ["full"]="1920"
)

# Create output directories
for dir in "${!SIZES[@]}"; do
  mkdir -p "${OUTPUT_BASE}/${dir}"
done

# Process each image
for source_name in "${!IMAGES[@]}"; do
  target_name="${IMAGES[$source_name]}"
  source_path="${SOURCE_DIR}/${source_name}"

  if [[ ! -f "$source_path" ]]; then
    echo "Warning: Source file not found: $source_path"
    continue
  fi

  echo "Processing: $source_name -> $target_name"

  for dir in "${!SIZES[@]}"; do
    width="${SIZES[$dir]}"
    output_path="${OUTPUT_BASE}/${dir}/${target_name}"

    echo "  Creating ${dir} (${width}px)..."
    magick "$source_path" \
      -resize "${width}x${width}>" \
      -quality 85 \
      -strip \
      "$output_path"
  done
done

echo ""
echo "Optimization complete!"
echo "Output directory: ${OUTPUT_BASE}"
ls -la "${OUTPUT_BASE}"/*/ 2>/dev/null || true
