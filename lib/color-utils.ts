export interface RGB {
  r: number
  g: number
  b: number
}

export interface HSL {
  h: number
  s: number
  l: number
}

export interface HSV {
  h: number
  s: number
  v: number
}

export interface CMYK {
  c: number
  m: number
  y: number
  k: number
}

export function hexToRgb(hex: string): RGB {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 }
}

export function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((x) => {
    const hex = Math.round(x).toString(16)
    return hex.length === 1 ? "0" + hex : hex
  }).join("")
}

export function rgbToHsl(r: number, g: number, b: number): HSL {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  }
}

export function hslToRgb(h: number, s: number, l: number): RGB {
  h /= 360
  s /= 100
  l /= 100

  let r, g, b

  if (s === 0) {
    r = g = b = l
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q

    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  }
}

export function rgbToHsv(r: number, g: number, b: number): HSV {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const d = max - min
  let h = 0
  const s = max === 0 ? 0 : d / max
  const v = max

  if (max !== min) {
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    v: Math.round(v * 100),
  }
}

export function hsvToRgb(h: number, s: number, v: number): RGB {
  h /= 360
  s /= 100
  v /= 100

  let r = 0, g = 0, b = 0

  const i = Math.floor(h * 6)
  const f = h * 6 - i
  const p = v * (1 - s)
  const q = v * (1 - f * s)
  const t = v * (1 - (1 - f) * s)

  switch (i % 6) {
    case 0:
      r = v
      g = t
      b = p
      break
    case 1:
      r = q
      g = v
      b = p
      break
    case 2:
      r = p
      g = v
      b = t
      break
    case 3:
      r = p
      g = q
      b = v
      break
    case 4:
      r = t
      g = p
      b = v
      break
    case 5:
      r = v
      g = p
      b = q
      break
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  }
}

export function rgbToCmyk(r: number, g: number, b: number): CMYK {
  let c = 1 - r / 255
  let m = 1 - g / 255
  let y = 1 - b / 255
  const k = Math.min(c, m, y)

  if (k === 1) {
    return { c: 0, m: 0, y: 0, k: 100 }
  }

  c = Math.round(((c - k) / (1 - k)) * 100)
  m = Math.round(((m - k) / (1 - k)) * 100)
  y = Math.round(((y - k) / (1 - k)) * 100)

  return {
    c,
    m,
    y,
    k: Math.round(k * 100),
  }
}

export function cmykToRgb(c: number, m: number, y: number, k: number): RGB {
  c /= 100
  m /= 100
  y /= 100
  k /= 100

  const r = 255 * (1 - c) * (1 - k)
  const g = 255 * (1 - m) * (1 - k)
  const b = 255 * (1 - y) * (1 - k)

  return {
    r: Math.round(r),
    g: Math.round(g),
    b: Math.round(b),
  }
}

export function getContrastRatio(rgb1: RGB, rgb2: RGB): number {
  const l1 = getRelativeLuminance(rgb1)
  const l2 = getRelativeLuminance(rgb2)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

function getRelativeLuminance(rgb: RGB): number {
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((val) => {
    val /= 255
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export function getComplementaryColor(hex: string): string {
  const rgb = hexToRgb(hex)
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
  hsl.h = (hsl.h + 180) % 360
  const newRgb = hslToRgb(hsl.h, hsl.s, hsl.l)
  return rgbToHex(newRgb.r, newRgb.g, newRgb.b)
}

export function getAnalogousColors(hex: string): string[] {
  const rgb = hexToRgb(hex)
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
  const colors = []

  for (let i = -2; i <= 2; i++) {
    if (i === 0) continue
    const newHsl = { ...hsl, h: (hsl.h + i * 30 + 360) % 360 }
    const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l)
    colors.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b))
  }

  return colors
}

export function getTriadicColors(hex: string): string[] {
  const rgb = hexToRgb(hex)
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
  const colors = []

  for (let i = 1; i <= 2; i++) {
    const newHsl = { ...hsl, h: (hsl.h + i * 120) % 360 }
    const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l)
    colors.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b))
  }

  return colors
}

export function getTetradicColors(hex: string): string[] {
  const rgb = hexToRgb(hex)
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
  const colors = []

  for (let i = 1; i <= 3; i++) {
    const newHsl = { ...hsl, h: (hsl.h + i * 90) % 360 }
    const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l)
    colors.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b))
  }

  return colors
}

export function getShades(hex: string, count: number = 5): string[] {
  const rgb = hexToRgb(hex)
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
  const shades = []

  for (let i = 1; i <= count; i++) {
    const newHsl = { ...hsl, l: Math.max(0, hsl.l - (i * 100) / (count + 1)) }
    const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l)
    shades.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b))
  }

  return shades
}

export function getTints(hex: string, count: number = 5): string[] {
  const rgb = hexToRgb(hex)
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
  const tints = []

  for (let i = 1; i <= count; i++) {
    const newHsl = { ...hsl, l: Math.min(100, hsl.l + (i * 100) / (count + 1)) }
    const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l)
    tints.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b))
  }

  return tints
}

export function getTones(hex: string, count: number = 5): string[] {
  const rgb = hexToRgb(hex)
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
  const tones = []

  for (let i = 1; i <= count; i++) {
    const newHsl = { ...hsl, s: Math.max(0, hsl.s - (i * 100) / (count + 1)) }
    const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l)
    tones.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b))
  }

  return tones
}

export function getMonochromaticPalette(hex: string, count: number = 5): string[] {
  const rgb = hexToRgb(hex)
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
  const palette = [hex]

  for (let i = 1; i < count; i++) {
    const newHsl = {
      h: hsl.h,
      s: hsl.s,
      l: (hsl.l + (i * 100) / count) % 100,
    }
    const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l)
    palette.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b))
  }

  return palette
}

export function isValidHex(hex: string): boolean {
  return /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.test(hex)
}
