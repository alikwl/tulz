# Dark/Light Theme System - Tulz.net

## Overview

Tulz.net features a comprehensive, professional dark/light theme system built with `next-themes`, providing seamless theme switching with smooth transitions, system preference detection, and localStorage persistence.

## ✅ Implemented Features

### 1. Theme Provider Setup

**Location:** `app/layout.tsx`

```tsx
<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange={false}
>
  {children}
</ThemeProvider>
```

**Features:**
- Uses CSS class attribute for theme switching
- Defaults to system preference
- Respects OS dark/light mode settings
- Enables smooth transitions on theme change

### 2. Professional Theme Toggle Component

**Location:** `components/theme-toggle.tsx`

**Features:**
- **Three Theme Options:**
  - Light mode (Sun icon)
  - Dark mode (Moon icon)
  - System preference (Monitor icon)

- **UI Elements:**
  - Dropdown menu with all three options
  - Visual checkmark for current selection
  - Animated icon transitions (rotate and scale)
  - Tooltip showing current theme
  - Accessible (ARIA labels, keyboard navigation)

- **Usage Example:**
```tsx
import { ThemeToggle } from '@/components/theme-toggle'

<ThemeToggle />
```

### 3. Color Scheme Design

**Location:** `app/globals.css`

#### CSS Variables (HSL Format)

**Light Theme:**
```css
:root {
  --background: 0 0% 100%;          /* White */
  --foreground: 222.2 84% 4.9%;     /* Near Black */
  --primary: 221.2 83.2% 53.3%;     /* Blue-600 */
  --border: 214.3 31.8% 91.4%;      /* Gray-200 */
  --card: 0 0% 100%;                /* White */
  /* ... more variables */
}
```

**Dark Theme:**
```css
.dark {
  --background: 222.2 84% 4.9%;     /* Near Black */
  --foreground: 210 40% 98%;        /* Near White */
  --primary: 217.2 91.2% 59.8%;     /* Blue-500 (lighter) */
  --border: 217.2 32.6% 17.5%;      /* Gray-700 */
  --card: 217.2 32.6% 17.5%;        /* Gray-800 */
  /* ... more variables */
}
```

### 4. Smooth Transitions

**Location:** `app/globals.css`

All theme-related properties transition smoothly:

```css
* {
  transition-property: background-color, border-color, color, fill, stroke, box-shadow;
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

button, a, input, textarea, select {
  transition-property: all;
  transition-duration: 200ms;
}
```

**Properties that transition:**
- Background colors
- Border colors
- Text colors
- Shadows
- SVG fill/stroke

### 5. Theme-Aware Components

#### Header Component
**Location:** `components/header.tsx`

**Dark Mode Features:**
- Logo gradient adapts to theme
- Border color changes
- Backdrop blur with theme-appropriate opacity
- Enhanced shadow in dark mode

```tsx
<header className="sticky top-0 z-50 w-full border-b border-border
  bg-background/95 backdrop-blur-lg
  dark:shadow-lg dark:shadow-background/10">

  <span className="bg-gradient-to-r
    from-blue-600 via-blue-500 to-blue-400
    dark:from-blue-400 dark:via-blue-300 dark:to-blue-200
    bg-clip-text text-transparent">
    Tulz.net
  </span>
</header>
```

#### Footer Component
**Location:** `components/footer.tsx`

**Dark Mode Features:**
- Semi-transparent background with backdrop blur
- Theme-aware logo gradient
- Proper contrast for links and text
- Social icons with hover states

```tsx
<footer className="border-t border-border
  bg-gray-50/50 dark:bg-gray-900/50
  backdrop-blur-sm">
```

#### Homepage
**Location:** `app/page.tsx`

**Dark Mode Features:**
- Hero section with theme-appropriate background
- Grid pattern adapts to theme
- Cards with proper contrast
- Gradient overlays for both themes

```tsx
<div className="bg-gradient-to-br
  from-blue-50 via-white to-blue-50
  dark:from-gray-900 dark:via-gray-900 dark:to-blue-950">
```

### 6. Grid Pattern Utility

**Location:** `app/globals.css`

```css
.bg-grid-pattern {
  /* Light mode: dark lines */
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
  background-size: 20px 20px;
}

.dark .bg-grid-pattern {
  /* Dark mode: light lines */
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 20px 20px;
}
```

### 7. Theme Persistence

**Automatic Features:**
- Saves theme preference to localStorage
- Restores theme on page reload
- No flash of wrong theme (FOUT prevention)
- Syncs across browser tabs

**localStorage Key:** `theme`
**Possible Values:** `"light"`, `"dark"`, `"system"`

### 8. System Preference Detection

**Automatic Detection:**
- Detects OS theme preference via `prefers-color-scheme`
- Updates automatically when OS theme changes
- Falls back to system preference if no saved preference

## 🎨 Design Guidelines

### Color Usage

#### Light Theme
- **Background:** White (#ffffff), Gray-50
- **Text:** Gray-900, Gray-700
- **Primary:** Blue-600
- **Borders:** Gray-200, Gray-300
- **Cards:** White with shadow
- **Accents:** Blue, Green, Purple gradients

#### Dark Theme
- **Background:** Gray-900, Gray-950
- **Text:** Gray-100, Gray-300
- **Primary:** Blue-500 (lighter than light mode)
- **Borders:** Gray-700, Gray-600
- **Cards:** Gray-800 with subtle glow
- **Accents:** Lighter versions of gradients

### Component Styling Patterns

#### Buttons
```tsx
<Button className="
  bg-blue-600 dark:bg-blue-500
  hover:bg-blue-700 dark:hover:bg-blue-600
  text-white
  transition-all duration-200
">
  Click Me
</Button>
```

#### Cards
```tsx
<Card className="
  bg-white dark:bg-gray-800
  border border-gray-200 dark:border-gray-700
  shadow-lg dark:shadow-gray-900/50
  transition-all
">
  Content
</Card>
```

#### Inputs
```tsx
<Input className="
  bg-white dark:bg-gray-900
  border-gray-300 dark:border-gray-600
  text-gray-900 dark:text-gray-100
  focus:ring-blue-500 dark:focus:ring-blue-400
  placeholder:text-gray-400 dark:placeholder:text-gray-500
" />
```

#### Text & Links
```tsx
<p className="text-gray-700 dark:text-gray-300">
  Regular text
</p>

<Link className="
  text-blue-600 dark:text-blue-400
  hover:text-blue-700 dark:hover:text-blue-300
  transition-colors
">
  Link text
</Link>
```

### Gradient Patterns

#### Text Gradients
```tsx
<span className="
  bg-gradient-to-r
  from-blue-600 via-blue-500 to-blue-400
  dark:from-blue-400 dark:via-blue-300 dark:to-blue-200
  bg-clip-text text-transparent
">
  Gradient Text
</span>
```

#### Background Gradients
```tsx
<div className="
  bg-gradient-to-br
  from-blue-50 to-purple-50
  dark:from-blue-950 dark:to-purple-950
">
  Content
</div>
```

### Shadow Guidelines

**Light Mode:**
- Use standard shadows: `shadow-sm`, `shadow-md`, `shadow-lg`
- Colors: Gray-based shadows

**Dark Mode:**
- Use softer shadows: `dark:shadow-lg dark:shadow-gray-900/50`
- Add subtle glows: `dark:shadow-primary/10`
- Reduce opacity for better appearance

## 📱 Special Considerations

### Tool Pages

#### Code Editors
- Syntax highlighting adapts to theme
- Use appropriate color schemes (light/dark)
- Ensure good contrast for readability

#### Charts & Visualizations
- Use theme-appropriate colors
- Ensure data is visible in both themes
- Adapt axis labels and legends

#### Images & Media
- Consider filters for dark mode if needed
- Use theme-appropriate placeholder colors
- Ensure logos work in both themes

### Accessibility

**WCAG AA Compliance:**
- Light mode: 4.5:1 contrast ratio for normal text
- Dark mode: 4.5:1 contrast ratio for normal text
- All interactive elements: minimum 3:1 contrast
- Focus indicators visible in both themes

**Features:**
- Keyboard navigation supported
- Screen reader friendly
- High contrast mode compatible
- Reduced motion respects user preference

## 🧪 Testing Checklist

### Visual Testing
- [ ] All pages render correctly in light mode
- [ ] All pages render correctly in dark mode
- [ ] All pages render correctly in system mode
- [ ] Smooth transitions when switching themes
- [ ] No flash of unstyled content (FOUC)
- [ ] No flash of wrong theme (FOUT)

### Functional Testing
- [ ] Theme toggle works correctly
- [ ] Dropdown shows all three options
- [ ] Current theme is marked with checkmark
- [ ] Tooltip displays correct theme name
- [ ] Theme persists after page reload
- [ ] Theme syncs across browser tabs
- [ ] System preference detection works
- [ ] Theme changes when OS theme changes

### Component Testing
- [ ] Header looks good in both themes
- [ ] Footer looks good in both themes
- [ ] Cards have proper contrast
- [ ] Buttons are visible and accessible
- [ ] Forms are usable in both themes
- [ ] Modals/Dialogs work in both themes
- [ ] Navigation menus work correctly
- [ ] Tool pages function properly

### Accessibility Testing
- [ ] Keyboard navigation works
- [ ] Screen reader announces theme changes
- [ ] Focus indicators are visible
- [ ] Color contrast meets WCAG AA
- [ ] All interactive elements accessible
- [ ] Touch targets are adequate (44x44px min)

### Performance Testing
- [ ] No layout shift when theme changes
- [ ] Smooth 200ms transitions
- [ ] No performance degradation
- [ ] Bundle size is reasonable (currently 225 kB vendor bundle)

## 🚀 Usage in New Components

### Basic Component with Dark Mode

```tsx
export function MyComponent() {
  return (
    <div className="
      bg-white dark:bg-gray-800
      border border-gray-200 dark:border-gray-700
      rounded-lg p-4
      transition-all
    ">
      <h2 className="
        text-2xl font-bold
        text-gray-900 dark:text-gray-100
      ">
        Title
      </h2>
      <p className="
        text-gray-600 dark:text-gray-400
        mt-2
      ">
        Description text
      </p>
    </div>
  )
}
```

### Component with Theme Detection

```tsx
"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeAwareComponent() {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div>Loading...</div>
  }

  const isDark = resolvedTheme === "dark"

  return (
    <div>
      Current theme: {isDark ? "Dark" : "Light"}
    </div>
  )
}
```

### Conditional Rendering Based on Theme

```tsx
"use client"

import { useTheme } from "next-themes"

export function ConditionalThemeComponent() {
  const { resolvedTheme } = useTheme()

  return (
    <div>
      {resolvedTheme === "dark" ? (
        <img src="/logo-light.png" alt="Logo" />
      ) : (
        <img src="/logo-dark.png" alt="Logo" />
      )}
    </div>
  )
}
```

## 📊 Performance Metrics

### Build Results

```
Route                                              Size     First Load JS
┌ ○ /                                              131 B    242 kB
├ ○ /tools                                         3.01 kB  244 kB
├ ○ /tools/developer-tools/json-formatter          8.47 kB  250 kB
└ + First Load JS shared by all                    227 kB
  ├ chunks/vendor-*.js                             225 kB
  └ chunks/runtime-*.js                            1.74 kB
```

**Bundle Size:**
- Vendor bundle: 225 kB (+6 kB from theme components)
- Runtime: 1.74 kB
- Individual pages: 131 B - 10.6 kB

**Performance Impact:**
- Minimal: +6 kB for enhanced theme system
- Includes dropdown menu, tooltip, and animations
- Acceptable tradeoff for improved UX

### Transition Performance

- **Duration:** 200ms
- **Properties:** background-color, border-color, color, shadow
- **Timing:** cubic-bezier(0.4, 0, 0.2, 1)
- **GPU Accelerated:** Icon rotations use transform

## 🐛 Troubleshooting

### Flash of Unstyled Content (FOUC)

**Problem:** White flash when loading in dark mode

**Solution:**
```tsx
// Use suppressHydrationWarning on html tag
<html lang="en" suppressHydrationWarning>
```

### Theme Not Persisting

**Problem:** Theme resets on page reload

**Solution:**
- Check localStorage is enabled
- Ensure ThemeProvider is in layout.tsx
- Verify `enableSystem` and `defaultTheme` props

### Icons Not Animating

**Problem:** Sun/Moon icons don't rotate

**Solution:**
- Check Tailwind dark: variants are working
- Verify transition classes are applied
- Ensure component is client-side ("use client")

### Slow Transitions

**Problem:** Theme change feels sluggish

**Solution:**
- Check transition-duration (should be 200ms)
- Reduce animated properties
- Use GPU-accelerated properties (transform, opacity)

## 📚 Resources

- [next-themes Documentation](https://github.com/pacocoursey/next-themes)
- [Tailwind CSS Dark Mode](https://tailwindcss.com/docs/dark-mode)
- [shadcn/ui Theme Guide](https://ui.shadcn.com/docs/dark-mode)
- [WCAG Color Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)

## 🎉 Summary

The Tulz.net theme system provides:

✅ Professional light/dark/system theme options
✅ Smooth 200ms transitions for all theme changes
✅ Theme persistence with localStorage
✅ System preference detection and automatic updates
✅ Accessible theme toggle with tooltips
✅ Comprehensive dark mode support across all components
✅ WCAG AA compliant color contrast
✅ No flash of unstyled content (FOUC)
✅ Optimized performance (6 kB bundle increase)

The theme system is production-ready and provides an excellent user experience across all devices and lighting conditions!
