# Customizing the Minimal Mistakes Theme

This document provides guidance on how to properly customize and extend the Minimal Mistakes theme in our Jekyll site.

## Directory Structure for Customization

```
jamesbrink.online/
├── _includes/          # Override theme includes
├── _layouts/           # Override theme layouts
├── _sass/
│   └── custom/
│       ├── _variables.scss        # Override theme variables
│       ├── _custom.scss           # Main file that imports all components
│       └── components/            # Modularized component styles
│           ├── _accessibility.scss # Accessibility styles
│           ├── _animations.scss    # Animation definitions
│           ├── _archive.scss       # Archive page styles
│           ├── _author.scss        # Author profile styles
│           ├── _buttons.scss       # Button styles
│           ├── _code.scss          # Code block styles
│           ├── _footer.scss        # Footer styles
│           ├── _forms.scss         # Form element styles
│           ├── _layout.scss        # Layout structure styles
│           ├── _masthead.scss      # Header styles
│           ├── _navigation.scss    # Navigation styles
│           ├── _notices.scss       # Notice/alert styles
│           ├── _pagination.scss    # Pagination styles
│           ├── _responsive.scss    # Responsive design adjustments
│           ├── _search.scss        # Search functionality styles
│           ├── _sidebar.scss       # Sidebar styles
│           ├── _social.scss        # Social media styles
│           ├── _tables.scss        # Table styles
│           ├── _theme.scss         # Theme-specific styles
│           └── _typography.scss    # Typography styles
└── assets/
    └── css/
        └── main.scss   # Main stylesheet that imports everything
```

## Customization Methods

### 1. CSS/SCSS Customization

The `main.scss` file in `assets/css/` is set up to:
- Import the theme's variables
- Override variables with our custom ones
- Import the theme's components
- Add our custom styles at the end

To customize styles:
1. Modify `_sass/custom/_variables.scss` to override theme variables
2. Add component-specific styles to the appropriate file in `_sass/custom/components/`
3. Ensure the component is imported in `_sass/custom/_custom.scss`

### 2. Layout Customization

To override any of the theme's layouts:
1. Find the original layout in the theme's GitHub repository or gem
2. Copy it to your `_layouts/` directory
3. Modify as needed

Example: To customize the home page layout:
```
cp $(bundle info --path minimal-mistakes-jekyll)/_layouts/home.html _layouts/
```

### 3. Include Customization

To override any of the theme's includes:
1. Find the original include in the theme's GitHub repository or gem
2. Copy it to your `_includes/` directory
3. Modify as needed

Example: To customize the author profile:
```
cp $(bundle info --path minimal-mistakes-jekyll)/_includes/author-profile.html _includes/
```

### 4. Configuration Customization

Many aspects of the theme can be customized through `_config.yml`:
- Site-wide settings
- Author information
- Navigation menus
- Default front matter for collections

### 5. Skin Selection

You can change the theme's skin in `_config.yml`:
```yaml
minimal_mistakes_skin: "default" # "air", "aqua", "contrast", "dark", "dirt", "neon", "mint", "plum", "sunrise"
```

## Finding Theme Files to Override

To locate the original theme files for reference:

```bash
# Find the theme's installation path
bundle info --path minimal-mistakes-jekyll

# List layouts
ls $(bundle info --path minimal-mistakes-jekyll)/_layouts/

# List includes
ls $(bundle info --path minimal-mistakes-jekyll)/_includes/

# List sass files
ls $(bundle info --path minimal-mistakes-jekyll)/_sass/minimal-mistakes/
```

## Best Practices

1. **Minimal Overrides**: Only override what you need to change
2. **Keep Updated**: When updating the theme, check if your overrides need updates
3. **Use Variables**: Leverage SCSS variables for consistent styling
4. **Document Changes**: Comment your customizations for future reference
5. **Test Thoroughly**: Test your customizations across different devices and browsers
6. **Component Isolation**: Keep component styles isolated in their respective files
7. **Variable First**: Define all variables in `_variables.scss` before using them in components
8. **Import Order**: Maintain a logical import order in `_custom.scss` (variables → base → components → utilities)

## Current Theme Implementation: Rosé Pine Dawn

### Theme Overview

The current site uses a custom implementation of the [Rosé Pine Dawn](https://rosepinetheme.com/palette/dawn/) color palette, a light variant of the Rosé Pine theme. The theme features a light background with subtle, warm undertones while maintaining dark-themed code blocks for better readability.

### Color Palette

The Rosé Pine Dawn palette used in our implementation includes:

| Variable | Hex Code | Description |
|----------|----------|-------------|
| `$rose-pine-base` | `#faf4ed` | Primary background |
| `$rose-pine-surface` | `#fffaf3` | Secondary background |
| `$rose-pine-overlay` | `#f2e9e1` | Tertiary background |
| `$rose-pine-muted` | `#9893a5` | Low contrast text |
| `$rose-pine-subtle` | `#797593` | Medium contrast text |
| `$rose-pine-text` | `#575279` | High contrast text |
| `$rose-pine-love` | `#b4637a` | Terminal red/Error |
| `$rose-pine-gold` | `#ea9d34` | Terminal yellow/Warning |
| `$rose-pine-rose` | `#d7827e` | Terminal cyan/Secondary accent |
| `$rose-pine-pine` | `#286983` | Terminal green/Primary accent |
| `$rose-pine-foam` | `#56949f` | Terminal blue/Links |
| `$rose-pine-iris` | `#907aa9` | Terminal magenta/Visited links |

### Code Block Theme

Code blocks maintain a dark theme for better contrast and readability:

| Variable | Hex Code | Description |
|----------|----------|-------------|
| `$rose-pine-code-base` | `#191724` | Code block background |
| `$rose-pine-code-surface` | `#1f1d2e` | Inline code background |
| `$rose-pine-code-text` | `#e0def4` | Code text color |

### UI Components

The theme includes modern styling for various UI components:

1. **Links**: Animated underline effects with smooth transitions
2. **Buttons**: Gradient hover effects with subtle animations
3. **Navigation**: Interactive hover states with subtle background changes
4. **Notices**: Clean, modern styling with subtle elevation effects
5. **Pagination**: Modern, borderless design with hover animations

### File Structure

The theme customization follows a modular, component-based approach:

1. `_sass/custom/_variables.scss`: Contains all color and layout variable definitions
2. `_sass/custom/_custom.scss`: Acts as the main entry point that imports all component files
3. `_sass/custom/components/`: Directory containing individual component files:

#### Component Files

Each component file focuses on a specific UI element or functionality:

| Component File | Purpose |
|----------------|--------|
| `_accessibility.scss` | Accessibility enhancements and screen reader styles |
| `_animations.scss` | Reusable animation keyframes and transitions |
| `_archive.scss` | Styles for archive pages and listings |
| `_author.scss` | Author profile and bio styling |
| `_buttons.scss` | Button variants and interactive states |
| `_code.scss` | Code blocks and syntax highlighting |
| `_footer.scss` | Footer layout and styling |
| `_forms.scss` | Form elements and validation styles |
| `_layout.scss` | Core layout structures and containers |
| `_masthead.scss` | Header and site branding |
| `_navigation.scss` | Navigation menus and links |
| `_notices.scss` | Alert and notice boxes |
| `_pagination.scss` | Pagination controls |
| `_responsive.scss` | Media queries and responsive adjustments |
| `_responsive-layout.scss` | Specific layout fixes for responsive behavior |
| `_search.scss` | Search interface elements |
| `_sidebar.scss` | Sidebar layout and components |
| `_social.scss` | Social media links and sharing buttons |
| `_tables.scss` | Table styling |
| `_theme.scss` | Theme-specific color applications |
| `_typography.scss` | Font definitions and text styling |

### Typography System

The site uses a refined typography system that prioritizes readability and visual hierarchy while maintaining the elegant Rosé Pine Dawn aesthetic:

#### Font Size Hierarchy

| Element | Font Size | Purpose |
|---------|-----------|--------|
| `h1` | 1.8em | Main page titles |
| `h2` | 1.5em | Section headings |
| `h3` | 1.15em | Subsection headings |
| `h4` | 1.1em | Minor headings |
| `h5` | 1.0em | Small headings |
| `h6` | 0.95em | Micro headings |
| Body text | 0.95em | Main content |
| Small text | 0.9em | Secondary content |
| Micro text | 0.85em | Tertiary content |

#### Typography Principles

- **Consistent Scale**: Font sizes follow a consistent scale to create visual harmony
- **Proper Spacing**: Headings have appropriate margin-top (1.2em) and margin-bottom (0.6em) values
- **Visual Hierarchy**: Clear distinction between different heading levels
- **Optimal Line Length**: Content width is limited to 90ch for optimal readability
- **Responsive Adjustments**: Typography adapts appropriately to different screen sizes

#### Special Typography Elements

- **Heading Decorations**: Subtle gradient underlines for headings using `:after` pseudo-elements
- **Link Animations**: Animated underlines for links using CSS transforms
- **Resume Project Items**: Custom typography for project cards with smaller font sizes (1rem for titles, 0.85rem for descriptions)

### Animation Effects

The theme uses subtle animations to enhance user experience:

- Cubic bezier timing functions for natural movement
- Transform effects for subtle elevation changes
- Gradient animations for interactive elements
- Scale and translate transitions for tactile feedback

### Responsive Design

The theme maintains responsiveness across different device sizes while preserving the aesthetic qualities of the Rosé Pine Dawn palette.

#### Sidebar Customizations

The sidebar has been customized to improve its responsiveness and visual appeal:

1. **Scrollbar Elimination**: 
   - Removed the default scrollbar by overriding the theme's max-height calculation
   - Set `max-height: none !important` and `overflow-y: visible !important` to prevent scrollbars

2. **Layout Optimization**:
   - Added proper padding (1em) to prevent content from sticking to edges
   - Centered the profile photo and author name for visual focus
   - Left-aligned bio text and social links for better readability
   - Created visual hierarchy with centered identity elements and left-aligned content

3. **Style Enhancements**:
   - Applied Rosé Pine Dawn colors to sidebar elements
   - Added subtle border styling with `border-right: 1px solid $rose-pine-highlight-med`
   - Maintained consistent styling with the rest of the site

4. **Responsive Layout Fixes**:
   - Created a dedicated `_responsive-layout.scss` component to address sidebar spacing issues
   - Increased maximum width from 1280px to 1440px for the main content container to better utilize space on wider screens
   - Implemented proper sidebar positioning relative to the content area at all screen sizes
   - Ensured consistent spacing between the sidebar and content across all device widths
   - Expanded optimal text width constraints from 80ch to 90ch for improved content display on larger screens
   - Fixed the issue of excessive blank space appearing in the sidebar on wider screens
   - Added responsive grid layouts for project items that adapt to different screen sizes

These customizations ensure the sidebar displays properly across different screen sizes without unnecessary scrollbars while maintaining the elegant Rosé Pine Dawn aesthetic. The responsive layout fixes specifically address the issue of improper spacing and excessive blank areas that appeared when viewing the site on wider screens.

### Future Enhancements

Potential areas for future theme development:

1. Further refinement of dark/light mode toggle
2. Enhanced typography with variable fonts
3. Additional microinteractions for interactive elements
4. Optimization of animation performance
5. Expanded color palette for data visualizations
6. Further component modularization for complex elements
7. Creation of reusable SCSS mixins for common patterns
8. Implementation of CSS custom properties for runtime theme switching

#### Typography Enhancement Opportunities

Areas for future typography refinement:

1. **Font Pairing Optimization**: Explore complementary font pairings for headings and body text
2. **Variable Fonts**: Implement variable fonts for more nuanced typography control
3. **Responsive Typography**: Enhance the fluid typography system with viewport-based scaling
4. **Vertical Rhythm**: Implement a consistent baseline grid for improved vertical rhythm
5. **Micro-Typography**: Refine letter-spacing, word-spacing, and hyphenation for better readability
6. **Specialized Text Components**: Create custom typography components for specific content types (quotes, code snippets, etc.)
7. **Localization Support**: Ensure typography works well with multiple languages
8. **Print Stylesheet**: Optimize typography for print media
9. **Accessibility Improvements**: Enhance contrast ratios and readability for users with visual impairments
