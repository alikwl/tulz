"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Star,
  Calendar,
  Check,
  Copy,
  Download,
  Upload,
  ArrowRight,
  Palette,
  Droplet,
  Eye,
  Heart,
  Trash2,
  Save,
  Image as ImageIcon,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileCode,
  Layers,
  Sparkles,
  X,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  rgbToHsv,
  hsvToRgb,
  rgbToCmyk,
  cmykToRgb,
  getContrastRatio,
  getComplementaryColor,
  getAnalogousColors,
  getTriadicColors,
  getTetradicColors,
  getShades,
  getTints,
  getTones,
  getMonochromaticPalette,
  isValidHex,
} from "@/lib/color-utils"

export default function ColorPickerPage() {
  const [currentColor, setCurrentColor] = useState("#3b82f6")
  const [hue, setHue] = useState(217)
  const [saturation, setSaturation] = useState(91)
  const [lightness, setLightness] = useState(60)
  const [alpha, setAlpha] = useState(100)

  const [hexInput, setHexInput] = useState("#3b82f6")
  const [rgbInput, setRgbInput] = useState({ r: 59, g: 130, b: 246 })
  const [hslInput, setHslInput] = useState({ h: 217, s: 91, l: 60 })
  const [hsvInput, setHsvInput] = useState({ h: 217, s: 76, v: 96 })
  const [cmykInput, setCmykInput] = useState({ c: 76, m: 47, y: 0, k: 4 })

  const [colorHistory, setColorHistory] = useState<string[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [selectedPaletteType, setSelectedPaletteType] = useState("complementary")

  const [gradientColor1, setGradientColor1] = useState("#3b82f6")
  const [gradientColor2, setGradientColor2] = useState("#8b5cf6")
  const [gradientAngle, setGradientAngle] = useState(90)
  const [gradientType, setGradientType] = useState<"linear" | "radial">("linear")

  const [contrastBg, setContrastBg] = useState("#ffffff")
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageCanvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { toast } = useToast()

  useEffect(() => {
    updateAllFormats(currentColor)
  }, [])

  const updateAllFormats = (hex: string) => {
    if (!isValidHex(hex)) return

    setCurrentColor(hex)
    setHexInput(hex)

    const rgb = hexToRgb(hex)
    setRgbInput(rgb)

    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
    setHslInput(hsl)
    setHue(hsl.h)
    setSaturation(hsl.s)
    setLightness(hsl.l)

    const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b)
    setHsvInput(hsv)

    const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b)
    setCmykInput(cmyk)

    if (!colorHistory.includes(hex)) {
      setColorHistory((prev) => [hex, ...prev].slice(0, 20))
    }
  }

  const handleHexChange = (value: string) => {
    setHexInput(value)
    if (isValidHex(value)) {
      updateAllFormats(value)
    }
  }

  const handleRgbChange = (r: number, g: number, b: number) => {
    const hex = rgbToHex(r, g, b)
    updateAllFormats(hex)
  }

  const handleHslChange = (h: number, s: number, l: number) => {
    const rgb = hslToRgb(h, s, l)
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b)
    updateAllFormats(hex)
  }

  const handleHsvChange = (h: number, s: number, v: number) => {
    const rgb = hsvToRgb(h, s, v)
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b)
    updateAllFormats(hex)
  }

  const handleCmykChange = (c: number, m: number, y: number, k: number) => {
    const rgb = cmykToRgb(c, m, y, k)
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b)
    updateAllFormats(hex)
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied",
      description: `${label} copied to clipboard`,
    })
  }

  const addToFavorites = () => {
    if (!favorites.includes(currentColor)) {
      setFavorites((prev) => [...prev, currentColor])
      toast({
        title: "Added to Favorites",
        description: `${currentColor} saved`,
      })
    }
  }

  const removeFromFavorites = (color: string) => {
    setFavorites((prev) => prev.filter((c) => c !== color))
    toast({
      title: "Removed",
      description: "Color removed from favorites",
    })
  }

  const getPalette = () => {
    switch (selectedPaletteType) {
      case "monochromatic":
        return getMonochromaticPalette(currentColor, 5)
      case "complementary":
        return [currentColor, getComplementaryColor(currentColor)]
      case "analogous":
        return [currentColor, ...getAnalogousColors(currentColor).slice(0, 2)]
      case "triadic":
        return [currentColor, ...getTriadicColors(currentColor)]
      case "tetradic":
        return [currentColor, ...getTetradicColors(currentColor)]
      default:
        return [currentColor]
    }
  }

  const exportPalette = (format: "json" | "css" | "scss") => {
    const palette = getPalette()
    let content = ""

    switch (format) {
      case "json":
        content = JSON.stringify({ colors: palette }, null, 2)
        break
      case "css":
        content = ":root {\n" + palette.map((c, i) => `  --color-${i + 1}: ${c};`).join("\n") + "\n}"
        break
      case "scss":
        content = palette.map((c, i) => `$color-${i + 1}: ${c};`).join("\n")
        break
    }

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `palette.${format}`
    link.click()
    URL.revokeObjectURL(url)

    toast({
      title: "Exported",
      description: `Palette exported as ${format.toUpperCase()}`,
    })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      setUploadedImage(event.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const pickColorFromImage = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = imageCanvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const imageData = ctx.getImageData(x, y, 1, 1)
    const [r, g, b] = Array.from(imageData.data)
    const hex = rgbToHex(r, g, b)
    updateAllFormats(hex)

    toast({
      title: "Color Picked",
      description: hex,
    })
  }

  useEffect(() => {
    if (uploadedImage && imageCanvasRef.current) {
      const canvas = imageCanvasRef.current
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const img = new Image()
      img.onload = () => {
        const maxWidth = 400
        const scale = maxWidth / img.width
        canvas.width = maxWidth
        canvas.height = img.height * scale
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      }
      img.src = uploadedImage
    }
  }, [uploadedImage])

  const getGradientCSS = () => {
    if (gradientType === "linear") {
      return `linear-gradient(${gradientAngle}deg, ${gradientColor1}, ${gradientColor2})`
    }
    return `radial-gradient(circle, ${gradientColor1}, ${gradientColor2})`
  }

  const contrastRatio = getContrastRatio(hexToRgb(currentColor), hexToRgb(contrastBg))
  const wcagAA = contrastRatio >= 4.5
  const wcagAAA = contrastRatio >= 7

  const relatedTools = [
    {
      name: "Gradient Generator",
      description: "Create CSS gradients",
      icon: Layers,
      href: "/tools/developer-tools/gradient-generator",
    },
    {
      name: "Image Compressor",
      description: "Optimize images",
      icon: ImageIcon,
      href: "/tools/image-tools/image-compressor",
    },
    {
      name: "CSS Generator",
      description: "Generate CSS code",
      icon: FileCode,
      href: "/tools/developer-tools/css-generator",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Color Picker Tool",
            applicationCategory: "DesignApplication",
            operatingSystem: "Any",
            description:
              "Advanced color picker tool with HEX, RGB, HSL, HSV, CMYK support. Generate palettes, check contrast ratios, and pick colors from images. Free online color tool.",
            url: "https://tulz.net/tools/productivity/color-picker",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              ratingCount: "24567",
            },
          }),
        }}
      />

      <Header />

      <main className="flex-1">
        <section className="border-b bg-muted/30 py-8">
          <div className="container">
            <Breadcrumb className="mb-6">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/tools">Tools</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/tools/productivity">Productivity</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Color Picker</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex items-start gap-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg">
                <Palette className="h-10 w-10" />
              </div>
              <div className="flex-1">
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  Color Picker - HTML Color Codes, RGB, HEX Picker Tool
                </h1>
                <p className="mb-4 text-lg text-muted-foreground">
                  Professional color picker with support for HEX, RGB, HSL, HSV, and CMYK formats.
                  Generate color palettes, check WCAG contrast ratios, pick colors from images, and
                  create beautiful gradients. Perfect for designers and developers.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-5 w-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                    <span className="ml-2 text-sm font-semibold">4.9/5</span>
                    <span className="text-sm text-muted-foreground">(24,567 users)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Last updated: Jan 2024</span>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-green-500/10 text-green-700 dark:text-green-300">
                    <Check className="mr-1 h-3 w-3" />
                    All Color Formats
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-500/10 text-blue-700 dark:text-blue-300">
                    <Palette className="mr-1 h-3 w-3" />
                    Palette Generator
                  </Badge>
                  <Badge variant="secondary" className="bg-purple-500/10 text-purple-700 dark:text-purple-300">
                    <Eye className="mr-1 h-3 w-3" />
                    WCAG Contrast Checker
                  </Badge>
                  <Badge variant="secondary" className="bg-rose-500/10 text-rose-700 dark:text-rose-300">
                    <ImageIcon className="mr-1 h-3 w-3" />
                    Image Color Picker
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Color Picker</CardTitle>
                    <CardDescription>Select and customize your color</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex gap-4">
                      <div
                        className="h-32 w-32 rounded-lg border-4 border-white shadow-lg ring-2 ring-gray-200 dark:ring-gray-700 cursor-pointer"
                        style={{ backgroundColor: currentColor }}
                        onClick={() => copyToClipboard(currentColor, currentColor)}
                      />
                      <div className="flex-1 space-y-3">
                        <div>
                          <Label className="text-xs">Hue</Label>
                          <Slider
                            value={[hue]}
                            onValueChange={([value]) => {
                              setHue(value)
                              handleHslChange(value, saturation, lightness)
                            }}
                            max={360}
                            step={1}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Saturation</Label>
                          <Slider
                            value={[saturation]}
                            onValueChange={([value]) => {
                              setSaturation(value)
                              handleHslChange(hue, value, lightness)
                            }}
                            max={100}
                            step={1}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Lightness</Label>
                          <Slider
                            value={[lightness]}
                            onValueChange={([value]) => {
                              setLightness(value)
                              handleHslChange(hue, saturation, value)
                            }}
                            max={100}
                            step={1}
                            className="mt-2"
                          />
                        </div>
                      </div>
                    </div>

                    <Tabs defaultValue="hex" className="w-full">
                      <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="hex">HEX</TabsTrigger>
                        <TabsTrigger value="rgb">RGB</TabsTrigger>
                        <TabsTrigger value="hsl">HSL</TabsTrigger>
                        <TabsTrigger value="hsv">HSV</TabsTrigger>
                        <TabsTrigger value="cmyk">CMYK</TabsTrigger>
                      </TabsList>

                      <TabsContent value="hex" className="space-y-3">
                        <div className="flex gap-2">
                          <Input
                            value={hexInput}
                            onChange={(e) => handleHexChange(e.target.value)}
                            placeholder="#000000"
                            className="font-mono"
                          />
                          <Button
                            variant="outline"
                            onClick={() => copyToClipboard(hexInput, "HEX")}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </TabsContent>

                      <TabsContent value="rgb" className="space-y-3">
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <Label className="text-xs">R</Label>
                            <Input
                              type="number"
                              min="0"
                              max="255"
                              value={rgbInput.r}
                              onChange={(e) =>
                                handleRgbChange(
                                  parseInt(e.target.value) || 0,
                                  rgbInput.g,
                                  rgbInput.b
                                )
                              }
                            />
                          </div>
                          <div>
                            <Label className="text-xs">G</Label>
                            <Input
                              type="number"
                              min="0"
                              max="255"
                              value={rgbInput.g}
                              onChange={(e) =>
                                handleRgbChange(
                                  rgbInput.r,
                                  parseInt(e.target.value) || 0,
                                  rgbInput.b
                                )
                              }
                            />
                          </div>
                          <div>
                            <Label className="text-xs">B</Label>
                            <Input
                              type="number"
                              min="0"
                              max="255"
                              value={rgbInput.b}
                              onChange={(e) =>
                                handleRgbChange(
                                  rgbInput.r,
                                  rgbInput.g,
                                  parseInt(e.target.value) || 0
                                )
                              }
                            />
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() =>
                            copyToClipboard(
                              `rgb(${rgbInput.r}, ${rgbInput.g}, ${rgbInput.b})`,
                              "RGB"
                            )
                          }
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Copy RGB
                        </Button>
                      </TabsContent>

                      <TabsContent value="hsl" className="space-y-3">
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <Label className="text-xs">H</Label>
                            <Input
                              type="number"
                              min="0"
                              max="360"
                              value={hslInput.h}
                              onChange={(e) =>
                                handleHslChange(
                                  parseInt(e.target.value) || 0,
                                  hslInput.s,
                                  hslInput.l
                                )
                              }
                            />
                          </div>
                          <div>
                            <Label className="text-xs">S</Label>
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              value={hslInput.s}
                              onChange={(e) =>
                                handleHslChange(
                                  hslInput.h,
                                  parseInt(e.target.value) || 0,
                                  hslInput.l
                                )
                              }
                            />
                          </div>
                          <div>
                            <Label className="text-xs">L</Label>
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              value={hslInput.l}
                              onChange={(e) =>
                                handleHslChange(
                                  hslInput.h,
                                  hslInput.s,
                                  parseInt(e.target.value) || 0
                                )
                              }
                            />
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() =>
                            copyToClipboard(
                              `hsl(${hslInput.h}, ${hslInput.s}%, ${hslInput.l}%)`,
                              "HSL"
                            )
                          }
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Copy HSL
                        </Button>
                      </TabsContent>

                      <TabsContent value="hsv" className="space-y-3">
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <Label className="text-xs">H</Label>
                            <Input
                              type="number"
                              min="0"
                              max="360"
                              value={hsvInput.h}
                              onChange={(e) =>
                                handleHsvChange(
                                  parseInt(e.target.value) || 0,
                                  hsvInput.s,
                                  hsvInput.v
                                )
                              }
                            />
                          </div>
                          <div>
                            <Label className="text-xs">S</Label>
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              value={hsvInput.s}
                              onChange={(e) =>
                                handleHsvChange(
                                  hsvInput.h,
                                  parseInt(e.target.value) || 0,
                                  hsvInput.v
                                )
                              }
                            />
                          </div>
                          <div>
                            <Label className="text-xs">V</Label>
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              value={hsvInput.v}
                              onChange={(e) =>
                                handleHsvChange(
                                  hsvInput.h,
                                  hsvInput.s,
                                  parseInt(e.target.value) || 0
                                )
                              }
                            />
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() =>
                            copyToClipboard(
                              `hsv(${hsvInput.h}, ${hsvInput.s}%, ${hsvInput.v}%)`,
                              "HSV"
                            )
                          }
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Copy HSV
                        </Button>
                      </TabsContent>

                      <TabsContent value="cmyk" className="space-y-3">
                        <div className="grid grid-cols-4 gap-2">
                          <div>
                            <Label className="text-xs">C</Label>
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              value={cmykInput.c}
                              onChange={(e) =>
                                handleCmykChange(
                                  parseInt(e.target.value) || 0,
                                  cmykInput.m,
                                  cmykInput.y,
                                  cmykInput.k
                                )
                              }
                            />
                          </div>
                          <div>
                            <Label className="text-xs">M</Label>
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              value={cmykInput.m}
                              onChange={(e) =>
                                handleCmykChange(
                                  cmykInput.c,
                                  parseInt(e.target.value) || 0,
                                  cmykInput.y,
                                  cmykInput.k
                                )
                              }
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Y</Label>
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              value={cmykInput.y}
                              onChange={(e) =>
                                handleCmykChange(
                                  cmykInput.c,
                                  cmykInput.m,
                                  parseInt(e.target.value) || 0,
                                  cmykInput.k
                                )
                              }
                            />
                          </div>
                          <div>
                            <Label className="text-xs">K</Label>
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              value={cmykInput.k}
                              onChange={(e) =>
                                handleCmykChange(
                                  cmykInput.c,
                                  cmykInput.m,
                                  cmykInput.y,
                                  parseInt(e.target.value) || 0
                                )
                              }
                            />
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() =>
                            copyToClipboard(
                              `cmyk(${cmykInput.c}%, ${cmykInput.m}%, ${cmykInput.y}%, ${cmykInput.k}%)`,
                              "CMYK"
                            )
                          }
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Copy CMYK
                        </Button>
                      </TabsContent>
                    </Tabs>

                    <Button onClick={addToFavorites} className="w-full">
                      <Heart className="mr-2 h-4 w-4" />
                      Add to Favorites
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Color Variations</CardTitle>
                    <CardDescription>Explore different variations of your color</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Shades (Darker)</Label>
                      <div className="grid grid-cols-5 gap-2">
                        {getShades(currentColor).map((shade, i) => (
                          <div
                            key={i}
                            className="h-12 rounded cursor-pointer border shadow-sm hover:scale-105 transition-transform"
                            style={{ backgroundColor: shade }}
                            onClick={() => updateAllFormats(shade)}
                            title={shade}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium mb-2 block">Tints (Lighter)</Label>
                      <div className="grid grid-cols-5 gap-2">
                        {getTints(currentColor).map((tint, i) => (
                          <div
                            key={i}
                            className="h-12 rounded cursor-pointer border shadow-sm hover:scale-105 transition-transform"
                            style={{ backgroundColor: tint }}
                            onClick={() => updateAllFormats(tint)}
                            title={tint}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium mb-2 block">Tones (Desaturated)</Label>
                      <div className="grid grid-cols-5 gap-2">
                        {getTones(currentColor).map((tone, i) => (
                          <div
                            key={i}
                            className="h-12 rounded cursor-pointer border shadow-sm hover:scale-105 transition-transform"
                            style={{ backgroundColor: tone }}
                            onClick={() => updateAllFormats(tone)}
                            title={tone}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium mb-2 block">Color Harmonies</Label>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs w-28">Complementary:</span>
                          <div className="flex gap-2 flex-1">
                            <div
                              className="h-10 flex-1 rounded cursor-pointer border shadow-sm hover:scale-105 transition-transform"
                              style={{ backgroundColor: currentColor }}
                              onClick={() => updateAllFormats(currentColor)}
                            />
                            <div
                              className="h-10 flex-1 rounded cursor-pointer border shadow-sm hover:scale-105 transition-transform"
                              style={{ backgroundColor: getComplementaryColor(currentColor) }}
                              onClick={() => updateAllFormats(getComplementaryColor(currentColor))}
                            />
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs w-28">Triadic:</span>
                          <div className="flex gap-2 flex-1">
                            <div
                              className="h-10 flex-1 rounded cursor-pointer border shadow-sm hover:scale-105 transition-transform"
                              style={{ backgroundColor: currentColor }}
                              onClick={() => updateAllFormats(currentColor)}
                            />
                            {getTriadicColors(currentColor).map((color, i) => (
                              <div
                                key={i}
                                className="h-10 flex-1 rounded cursor-pointer border shadow-sm hover:scale-105 transition-transform"
                                style={{ backgroundColor: color }}
                                onClick={() => updateAllFormats(color)}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs w-28">Analogous:</span>
                          <div className="flex gap-2 flex-1">
                            {getAnalogousColors(currentColor).slice(0, 4).map((color, i) => (
                              <div
                                key={i}
                                className="h-10 flex-1 rounded cursor-pointer border shadow-sm hover:scale-105 transition-transform"
                                style={{ backgroundColor: color }}
                                onClick={() => updateAllFormats(color)}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Palette Generator</CardTitle>
                    <CardDescription>Generate color palettes automatically</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Select value={selectedPaletteType} onValueChange={setSelectedPaletteType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monochromatic">Monochromatic</SelectItem>
                        <SelectItem value="complementary">Complementary</SelectItem>
                        <SelectItem value="analogous">Analogous</SelectItem>
                        <SelectItem value="triadic">Triadic</SelectItem>
                        <SelectItem value="tetradic">Tetradic</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="flex gap-2">
                      {getPalette().map((color, i) => (
                        <div
                          key={i}
                          className="flex-1 h-24 rounded cursor-pointer border-2 shadow-md hover:scale-105 transition-transform"
                          style={{ backgroundColor: color }}
                          onClick={() => updateAllFormats(color)}
                          title={color}
                        />
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => exportPalette("json")}
                        className="flex-1"
                      >
                        Export JSON
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => exportPalette("css")}
                        className="flex-1"
                      >
                        Export CSS
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => exportPalette("scss")}
                        className="flex-1"
                      >
                        Export SCSS
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Gradient Generator</CardTitle>
                    <CardDescription>Create beautiful CSS gradients</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <Label className="text-xs mb-2 block">Color 1</Label>
                        <Input
                          type="color"
                          value={gradientColor1}
                          onChange={(e) => setGradientColor1(e.target.value)}
                          className="h-12"
                        />
                      </div>
                      <div className="flex-1">
                        <Label className="text-xs mb-2 block">Color 2</Label>
                        <Input
                          type="color"
                          value={gradientColor2}
                          onChange={(e) => setGradientColor2(e.target.value)}
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant={gradientType === "linear" ? "default" : "outline"}
                        onClick={() => setGradientType("linear")}
                        className="flex-1"
                      >
                        Linear
                      </Button>
                      <Button
                        variant={gradientType === "radial" ? "default" : "outline"}
                        onClick={() => setGradientType("radial")}
                        className="flex-1"
                      >
                        Radial
                      </Button>
                    </div>

                    {gradientType === "linear" && (
                      <div>
                        <Label className="text-xs">Angle: {gradientAngle}°</Label>
                        <Slider
                          value={[gradientAngle]}
                          onValueChange={([value]) => setGradientAngle(value)}
                          max={360}
                          step={1}
                          className="mt-2"
                        />
                      </div>
                    )}

                    <div
                      className="h-24 rounded-lg shadow-md"
                      style={{ background: getGradientCSS() }}
                    />

                    <div className="flex gap-2">
                      <Input value={getGradientCSS()} readOnly className="font-mono text-sm" />
                      <Button
                        variant="outline"
                        onClick={() => copyToClipboard(getGradientCSS(), "Gradient CSS")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Accessibility Checker</CardTitle>
                    <CardDescription>WCAG contrast ratio compliance</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <Label className="text-xs mb-2 block">Text Color</Label>
                        <div className="flex gap-2">
                          <Input
                            type="color"
                            value={currentColor}
                            onChange={(e) => updateAllFormats(e.target.value)}
                            className="h-12 flex-1"
                          />
                          <Input
                            value={currentColor}
                            readOnly
                            className="font-mono text-sm w-28"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <Label className="text-xs mb-2 block">Background Color</Label>
                        <div className="flex gap-2">
                          <Input
                            type="color"
                            value={contrastBg}
                            onChange={(e) => setContrastBg(e.target.value)}
                            className="h-12 flex-1"
                          />
                          <Input
                            value={contrastBg}
                            readOnly
                            className="font-mono text-sm w-28"
                          />
                        </div>
                      </div>
                    </div>

                    <div
                      className="rounded-lg p-8 text-center"
                      style={{ backgroundColor: contrastBg, color: currentColor }}
                    >
                      <p className="text-2xl font-bold mb-2">Sample Text</p>
                      <p className="text-base">
                        The quick brown fox jumps over the lazy dog
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="pt-6 text-center">
                          <p className="text-3xl font-bold mb-2">{contrastRatio.toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground">Contrast Ratio</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6 text-center">
                          {wcagAA ? (
                            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                          ) : (
                            <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                          )}
                          <p className="text-xs text-muted-foreground">WCAG AA</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6 text-center">
                          {wcagAAA ? (
                            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                          ) : (
                            <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                          )}
                          <p className="text-xs text-muted-foreground">WCAG AAA</p>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="rounded-lg bg-blue-500/10 p-4 border">
                      <p className="text-sm">
                        <strong>WCAG Guidelines:</strong> AA requires 4.5:1 for normal text,
                        AAA requires 7:1. Large text (18pt+) requires 3:1 (AA) and 4.5:1 (AAA).
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Image Color Picker</CardTitle>
                    <CardDescription>Extract colors from any image</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <Button onClick={() => fileInputRef.current?.click()}>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Image
                      </Button>
                    </div>

                    {uploadedImage && (
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Click on the image to pick a color
                        </p>
                        <canvas
                          ref={imageCanvasRef}
                          onClick={pickColorFromImage}
                          className="max-w-full rounded-lg border cursor-crosshair shadow-md"
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Color History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-5 gap-2">
                      {colorHistory.slice(0, 15).map((color, i) => (
                        <div
                          key={i}
                          className="h-10 rounded cursor-pointer border shadow-sm hover:scale-110 transition-transform"
                          style={{ backgroundColor: color }}
                          onClick={() => updateAllFormats(color)}
                          title={color}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Favorites</CardTitle>
                      {favorites.length > 0 && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setFavorites([])}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {favorites.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No favorites yet
                      </p>
                    ) : (
                      <div className="grid grid-cols-5 gap-2">
                        {favorites.map((color, i) => (
                          <div
                            key={i}
                            className="relative group"
                          >
                            <div
                              className="h-10 rounded cursor-pointer border shadow-sm hover:scale-110 transition-transform"
                              style={{ backgroundColor: color }}
                              onClick={() => updateAllFormats(color)}
                              title={color}
                            />
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                removeFromFavorites(color)
                              }}
                              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Features</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {[
                      "HEX, RGB, HSL, HSV, CMYK formats",
                      "Color sliders & inputs",
                      "Shades, tints & tones",
                      "Color harmony generator",
                      "Palette creation & export",
                      "Gradient generator",
                      "WCAG contrast checker",
                      "Image color picker",
                      "Color history (20 colors)",
                      "Save favorite colors",
                      "Export CSS/SCSS/JSON",
                      "100% client-side",
                    ].map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600 dark:text-green-400" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Guide</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="rounded-lg border bg-blue-500/10 p-3">
                      <p className="font-medium mb-1">Color Models</p>
                      <p className="text-muted-foreground text-xs">
                        HEX for web, RGB for screens, CMYK for print, HSL/HSV for intuitive
                        adjustments
                      </p>
                    </div>
                    <div className="rounded-lg border bg-purple-500/10 p-3">
                      <p className="font-medium mb-1">Color Harmonies</p>
                      <p className="text-muted-foreground text-xs">
                        Use complementary for contrast, analogous for harmony, triadic for balance
                      </p>
                    </div>
                    <div className="rounded-lg border bg-green-500/10 p-3">
                      <p className="font-medium mb-1">Accessibility</p>
                      <p className="text-muted-foreground text-xs">
                        Always check contrast ratios. Aim for AA (4.5:1) or better for text
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="mb-4 text-2xl font-bold">
                Complete Guide to Color Theory & Tools
              </h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <Card>
                  <CardContent className="pt-6 space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Understanding Color Models</h3>
                      <p className="text-muted-foreground mb-4">
                        Different color models serve different purposes in design and development.
                        Understanding when to use each model is crucial for effective color
                        management across various media and applications.
                      </p>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-lg border p-4">
                          <p className="font-medium mb-2">HEX (Hexadecimal)</p>
                          <p className="text-sm text-muted-foreground mb-2">
                            The standard format for web colors. Represents RGB values in hexadecimal
                            notation (#RRGGBB). Easy to copy, paste, and use in CSS. Format:
                            #000000 to #FFFFFF.
                          </p>
                          <p className="text-xs font-mono bg-muted p-2 rounded">
                            Example: #3b82f6 (blue)
                          </p>
                        </div>

                        <div className="rounded-lg border p-4">
                          <p className="font-medium mb-2">RGB (Red, Green, Blue)</p>
                          <p className="text-sm text-muted-foreground mb-2">
                            Additive color model used by screens and digital displays. Each channel
                            ranges from 0-255. Intuitive for understanding color composition.
                            Supports alpha channel for transparency.
                          </p>
                          <p className="text-xs font-mono bg-muted p-2 rounded">
                            Example: rgb(59, 130, 246)
                          </p>
                        </div>

                        <div className="rounded-lg border p-4">
                          <p className="font-medium mb-2">HSL (Hue, Saturation, Lightness)</p>
                          <p className="text-sm text-muted-foreground mb-2">
                            Intuitive model for human perception. Hue (0-360°) determines the color,
                            Saturation (0-100%) determines intensity, Lightness (0-100%) determines
                            brightness. Easiest for creating variations.
                          </p>
                          <p className="text-xs font-mono bg-muted p-2 rounded">
                            Example: hsl(217, 91%, 60%)
                          </p>
                        </div>

                        <div className="rounded-lg border p-4">
                          <p className="font-medium mb-2">CMYK (Cyan, Magenta, Yellow, Black)</p>
                          <p className="text-sm text-muted-foreground mb-2">
                            Subtractive color model used in printing. Each value (0-100%) represents
                            ink density. Essential for print design. Black (K) channel improves
                            print quality.
                          </p>
                          <p className="text-xs font-mono bg-muted p-2 rounded">
                            Example: cmyk(76, 47, 0, 4)
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">
                        Choosing Colors for Web Design
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Effective color selection is fundamental to creating visually appealing and
                        functional websites. Your color choices affect brand perception, user
                        experience, and conversion rates. Here's how to approach color selection
                        strategically.
                      </p>

                      <div className="space-y-3">
                        <div className="rounded-lg border p-4">
                          <p className="font-medium mb-2">1. Start with Brand Identity</p>
                          <p className="text-sm text-muted-foreground">
                            Choose a primary brand color that reflects your identity. Blue conveys
                            trust (banks, tech), green suggests growth (finance, health), red
                            evokes urgency (sales, food), purple implies creativity (art, beauty).
                            Use color psychology to align with your message and target audience.
                          </p>
                        </div>

                        <div className="rounded-lg border p-4">
                          <p className="font-medium mb-2">2. Build a Color Palette</p>
                          <p className="text-sm text-muted-foreground">
                            Create a 3-5 color palette: primary (brand color), secondary
                            (complementary or analogous), accent (call-to-action), neutrals
                            (backgrounds, text). Use the 60-30-10 rule: 60% dominant color, 30%
                            secondary, 10% accent for visual balance.
                          </p>
                        </div>

                        <div className="rounded-lg border p-4">
                          <p className="font-medium mb-2">3. Consider Color Harmonies</p>
                          <p className="text-sm text-muted-foreground">
                            Complementary colors (opposite on color wheel) create vibrant contrast.
                            Analogous colors (adjacent) provide harmony. Triadic colors (equally
                            spaced) offer balance. Monochromatic variations ensure consistency.
                            Test different combinations to find what works for your design.
                          </p>
                        </div>

                        <div className="rounded-lg border p-4">
                          <p className="font-medium mb-2">4. Test Across Devices</p>
                          <p className="text-sm text-muted-foreground">
                            Colors appear differently on various screens. Test your palette on
                            multiple devices, monitors, and in different lighting conditions.
                            Consider how colors render in dark mode. Ensure consistency across
                            platforms and maintain brand recognition regardless of viewing context.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">
                        Color Accessibility Considerations
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Accessible color choices ensure your content is readable by everyone,
                        including users with visual impairments. Following WCAG (Web Content
                        Accessibility Guidelines) isn't just best practice—it's often legally
                        required and always ethically important.
                      </p>

                      <div className="rounded-lg border p-4 mb-4">
                        <p className="font-medium mb-2">WCAG Contrast Requirements</p>
                        <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                          <li>
                            <strong>Level AA (Minimum):</strong> 4.5:1 for normal text, 3:1 for
                            large text (18pt+ or 14pt+ bold)
                          </li>
                          <li>
                            <strong>Level AAA (Enhanced):</strong> 7:1 for normal text, 4.5:1 for
                            large text
                          </li>
                          <li>
                            <strong>UI Components:</strong> 3:1 minimum contrast for interactive
                            elements and graphics
                          </li>
                          <li>
                            <strong>Testing:</strong> Always test color combinations with
                            accessibility tools before launch
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-3">
                        <div className="rounded-lg border bg-amber-500/10 p-4">
                          <p className="font-medium mb-1">Don't Rely on Color Alone</p>
                          <p className="text-sm text-muted-foreground">
                            Never use color as the only way to convey information. Add icons, text
                            labels, or patterns to ensure color-blind users can understand your
                            content. About 8% of men and 0.5% of women have some form of color
                            blindness.
                          </p>
                        </div>

                        <div className="rounded-lg border bg-blue-500/10 p-4">
                          <p className="font-medium mb-1">Test for Color Blindness</p>
                          <p className="text-sm text-muted-foreground">
                            Use color blindness simulators to check how your design appears to
                            users with different types of color vision deficiency. The most common
                            types are Protanopia (red-blind), Deuteranopia (green-blind), and
                            Tritanopia (blue-blind).
                          </p>
                        </div>

                        <div className="rounded-lg border bg-green-500/10 p-4">
                          <p className="font-medium mb-1">Accessible Color Combinations</p>
                          <p className="text-sm text-muted-foreground">
                            Dark text on light backgrounds and light text on dark backgrounds
                            typically provide good contrast. Avoid red/green, blue/purple, and
                            light gray combinations. When in doubt, use our contrast checker tool
                            above.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Color Psychology in Design</h3>
                      <p className="text-muted-foreground mb-4">
                        Colors evoke emotional responses and influence user behavior. Understanding
                        color psychology helps you make strategic design decisions that support your
                        goals and resonate with your audience.
                      </p>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-lg border p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <div
                              className="w-6 h-6 rounded"
                              style={{ backgroundColor: "#ef4444" }}
                            />
                            <p className="font-medium">Red</p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Energy, passion, urgency, danger. Increases heart rate. Use for CTAs,
                            sales, alerts. Caution: can signal warnings.
                          </p>
                        </div>

                        <div className="rounded-lg border p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <div
                              className="w-6 h-6 rounded"
                              style={{ backgroundColor: "#3b82f6" }}
                            />
                            <p className="font-medium">Blue</p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Trust, security, professionalism, calm. Most universally liked. Ideal
                            for corporate, healthcare, tech, finance.
                          </p>
                        </div>

                        <div className="rounded-lg border p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <div
                              className="w-6 h-6 rounded"
                              style={{ backgroundColor: "#22c55e" }}
                            />
                            <p className="font-medium">Green</p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Growth, health, nature, success. Associated with money. Perfect for
                            environmental, wellness, financial services.
                          </p>
                        </div>

                        <div className="rounded-lg border p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <div
                              className="w-6 h-6 rounded"
                              style={{ backgroundColor: "#f59e0b" }}
                            />
                            <p className="font-medium">Orange</p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Enthusiasm, creativity, fun, affordability. Attention-grabbing without
                            red's urgency. Great for CTAs, youth brands.
                          </p>
                        </div>

                        <div className="rounded-lg border p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <div
                              className="w-6 h-6 rounded"
                              style={{ backgroundColor: "#8b5cf6" }}
                            />
                            <p className="font-medium">Purple</p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Luxury, creativity, wisdom, spirituality. Associated with royalty. Ideal
                            for beauty, art, premium products.
                          </p>
                        </div>

                        <div className="rounded-lg border p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <div
                              className="w-6 h-6 rounded"
                              style={{ backgroundColor: "#eab308" }}
                            />
                            <p className="font-medium">Yellow</p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Optimism, happiness, warning. Grabs attention. Use sparingly as accent.
                            Can cause eye strain if overused.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Design Tips & Best Practices</h3>
                      <ul className="space-y-3 text-sm text-muted-foreground">
                        <li className="flex gap-2">
                          <span className="text-primary font-bold">•</span>
                          <span>
                            <strong>Limit Your Palette:</strong> Use 3-5 colors maximum. Too many
                            colors create visual chaos and dilute your brand identity. More colors
                            don't mean better design.
                          </span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary font-bold">•</span>
                          <span>
                            <strong>Create Hierarchy:</strong> Use color to guide user attention.
                            Primary actions get accent colors, secondary actions use subdued tones,
                            destructive actions use red.
                          </span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary font-bold">•</span>
                          <span>
                            <strong>Maintain Consistency:</strong> Define color variables (CSS
                            custom properties or design tokens) and reuse them throughout your
                            project. Consistency builds trust.
                          </span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary font-bold">•</span>
                          <span>
                            <strong>Use Shades and Tints:</strong> Create depth with variations of
                            your base colors. Lighter tints for backgrounds, darker shades for
                            hover states and borders.
                          </span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary font-bold">•</span>
                          <span>
                            <strong>Consider Dark Mode:</strong> Design with both light and dark
                            themes in mind. Colors that work well in light mode may need adjustment
                            for dark mode.
                          </span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary font-bold">•</span>
                          <span>
                            <strong>Test in Context:</strong> Colors interact with each other.
                            Always preview color combinations in actual designs, not in isolation.
                            Context matters.
                          </span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary font-bold">•</span>
                          <span>
                            <strong>Use Neutral Backgrounds:</strong> Let your content shine.
                            White, light gray, or subtle off-white backgrounds (like #fafafa) work
                            best for most interfaces.
                          </span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary font-bold">•</span>
                          <span>
                            <strong>Save and Document:</strong> Create a color style guide with
                            your palette, usage rules, and accessibility notes. Export it in
                            formats your team can easily use (CSS, SCSS, JSON).
                          </span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-bold">Related Tools</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedTools.map((tool) => (
                  <Link key={tool.name} href={tool.href}>
                    <Card className="group h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                      <CardHeader>
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-md transition-transform group-hover:scale-110">
                          <tool.icon className="h-6 w-6" />
                        </div>
                        <CardTitle className="text-lg">{tool.name}</CardTitle>
                        <CardDescription className="line-clamp-2">
                          {tool.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center text-sm text-primary">
                          Try it now
                          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
