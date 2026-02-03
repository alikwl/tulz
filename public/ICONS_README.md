# Icon Assets Required

This file documents the icon assets needed for complete SEO and PWA optimization.

## Required Icon Files

Place the following icon files in the `/public` directory:

### Favicon Files
- `favicon.ico` - 32x32, 16x16 multi-resolution ICO file
- `icon-16x16.png` - 16x16 PNG icon
- `icon-32x32.png` - 32x32 PNG icon

### Apple Touch Icon
- `apple-touch-icon.png` - 180x180 PNG icon (used for iOS home screen)

### Android/Chrome Icons
- `android-chrome-192x192.png` - 192x192 PNG icon
- `android-chrome-512x512.png` - 512x512 PNG icon

### Safari Pinned Tab
- `safari-pinned-tab.svg` - Monochrome SVG icon for Safari pinned tabs

### Social Media / OpenGraph Images
- `og-image.jpg` - 1200x630 JPG image for OpenGraph (Facebook, LinkedIn)
- `twitter-image.jpg` - 1200x630 JPG image for Twitter Card
- `logo.png` - 512x512 PNG logo for organization schema

### Optional but Recommended
- `logo.svg` - Scalable vector logo
- `logo-white.svg` - White version for dark backgrounds
- `og-image-tool.jpg` - Generic OG image for tool pages

## Design Guidelines

### Favicon & App Icons
- Use the Tulz.net logo or "T" initial
- Keep design simple and recognizable at small sizes
- Use brand colors (blue gradient: #3b82f6 to #06b6d4)
- Ensure good contrast for visibility

### Social Media Images (OG/Twitter)
- Dimensions: 1200x630 pixels
- Include "Tulz.net" branding
- Add tagline: "Free Online Tools"
- Use gradient background
- Include 2-3 representative tool icons
- Ensure text is readable at small sizes
- Keep important content within safe zone (avoid edges)

### Color Scheme
- Primary: #3b82f6 (Blue)
- Secondary: #06b6d4 (Cyan)
- Gradient: from-blue-500 to-cyan-500
- Background: White (#ffffff) / Dark (#0a0a0a)

## Quick Generation Tools

You can use these tools to generate the required icons:

1. **Favicon Generator**: https://realfavicongenerator.net/
2. **OG Image Generator**: https://www.bannerbear.com/tools/open-graph-image-generator/
3. **Image Resize**: Use any image editor or online tool

## Current Status

⚠️ **Action Required**: Icon assets need to be created and added to the `/public` directory.

Once icons are added, they will be automatically referenced by:
- `/app/layout.tsx` (metadata configuration)
- `/public/site.webmanifest` (PWA manifest)
- Individual tool pages (social sharing)

## Testing Icons

After adding icons, test them at:
- https://realfavicongenerator.net/favicon_checker
- https://www.opengraph.xyz/ (for OG images)
- https://cards-dev.twitter.com/validator (for Twitter cards)
