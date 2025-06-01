#!/bin/bash

# Update all rose-pine references to theme-agnostic variables
cd _sass/custom/components

# Replace rose-pine color variables with theme-agnostic ones
sed -i '' 's/\$rose-pine-base/\$background-color/g' *.scss
sed -i '' 's/\$rose-pine-surface/\$theme-surface/g' *.scss
sed -i '' 's/\$rose-pine-overlay/\$theme-overlay/g' *.scss
sed -i '' 's/\$rose-pine-text/\$text-color/g' *.scss
sed -i '' 's/\$rose-pine-subtle/\$theme-text-secondary/g' *.scss
sed -i '' 's/\$rose-pine-muted/\$theme-text-muted/g' *.scss
sed -i '' 's/\$rose-pine-pine/\$primary-color/g' *.scss
sed -i '' 's/\$rose-pine-rose/\$theme-accent-secondary/g' *.scss
sed -i '' 's/\$rose-pine-iris/\$link-color/g' *.scss
sed -i '' 's/\$rose-pine-foam/\$theme-info/g' *.scss
sed -i '' 's/\$rose-pine-gold/\$theme-warning/g' *.scss
sed -i '' 's/\$rose-pine-love/\$theme-danger/g' *.scss
sed -i '' 's/\$rose-pine-highlight-low/\$theme-border-light/g' *.scss
sed -i '' 's/\$rose-pine-highlight-med/\$theme-border-medium/g' *.scss
sed -i '' 's/\$rose-pine-highlight-high/\$theme-border-dark/g' *.scss

# Special case for code blocks
sed -i '' 's/\$rose-pine-code-base/\$nord0/g' *.scss
sed -i '' 's/\$rose-pine-code-surface/\$nord1/g' *.scss
sed -i '' 's/\$rose-pine-code-text/\$nord6/g' *.scss

echo "Theme variable updates complete!"