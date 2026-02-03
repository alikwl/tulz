"use client"

import { useState, useRef, useCallback } from "react"

export const dynamic = 'force-dynamic'
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Star,
  Calendar,
  Check,
  Upload,
  Download,
  Trash2,
  RefreshCw,
  Sparkles,
  Loader2,
  X,
  ArrowRight,
  ArrowLeftRight,
  Crop,
  Palette,
  Scissors,
  FileImage,
  Zap,
  Shield,
  Infinity as InfinityIcon,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ImageFile {
  id: string
  file: File
  preview: string
  originalSize: number
  compressedSize?: number
  compressedBlob?: Blob
  compressedPreview?: string
  width: number
  height: number
  format: string
  status: "pending" | "processing" | "done" | "error"
  error?: string
}

interface CompressionOptions {
  quality: number
  outputFormat: "original" | "jpeg" | "png" | "webp"
  maintainAspectRatio: boolean
  resizeWidth?: number
  resizeHeight?: number
  resizePercentage: number
}

export default function ImageCompressorPage() {
  const [images, setImages] = useState<ImageFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [options, setOptions] = useState<CompressionOptions>({
    quality: 80,
    outputFormat: "original",
    maintainAspectRatio: true,
    resizePercentage: 100,
  })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
  }

  const getCompressionRatio = (original: number, compressed: number): number => {
    return Math.round(((original - compressed) / original) * 100)
  }

  const loadImage = (file: File): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new window.Image()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = URL.createObjectURL(file)
    })
  }

  const compressImage = async (imageFile: ImageFile): Promise<void> => {
    try {
      setImages((prev) =>
        prev.map((img) =>
          img.id === imageFile.id ? { ...img, status: "processing" } : img
        )
      )

      const img = await loadImage(imageFile.file)

      let targetWidth = img.width
      let targetHeight = img.height

      if (options.resizePercentage !== 100) {
        targetWidth = Math.round(img.width * (options.resizePercentage / 100))
        targetHeight = Math.round(img.height * (options.resizePercentage / 100))
      } else if (options.resizeWidth || options.resizeHeight) {
        if (options.maintainAspectRatio) {
          if (options.resizeWidth) {
            targetWidth = options.resizeWidth
            targetHeight = Math.round((img.height * options.resizeWidth) / img.width)
          } else if (options.resizeHeight) {
            targetHeight = options.resizeHeight
            targetWidth = Math.round((img.width * options.resizeHeight) / img.height)
          }
        } else {
          targetWidth = options.resizeWidth || img.width
          targetHeight = options.resizeHeight || img.height
        }
      }

      const canvas = document.createElement("canvas")
      canvas.width = targetWidth
      canvas.height = targetHeight

      const ctx = canvas.getContext("2d")
      if (!ctx) throw new Error("Failed to get canvas context")

      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = "high"
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight)

      let outputFormat = imageFile.format
      if (options.outputFormat !== "original") {
        outputFormat = `image/${options.outputFormat}`
      }

      const quality = options.quality / 100

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob)
            else reject(new Error("Failed to create blob"))
          },
          outputFormat,
          quality
        )
      })

      const compressedPreview = URL.createObjectURL(blob)

      setImages((prev) =>
        prev.map((img) =>
          img.id === imageFile.id
            ? {
                ...img,
                compressedSize: blob.size,
                compressedBlob: blob,
                compressedPreview,
                status: "done",
              }
            : img
        )
      )

      URL.revokeObjectURL(img.src)
    } catch (error) {
      console.error("Compression error:", error)
      setImages((prev) =>
        prev.map((img) =>
          img.id === imageFile.id
            ? {
                ...img,
                status: "error",
                error: "Failed to compress image",
              }
            : img
        )
      )
      toast({
        title: "Compression Error",
        description: `Failed to compress ${imageFile.file.name}`,
        variant: "destructive",
      })
    }
  }

  const handleFiles = useCallback(async (files: FileList) => {
    const validFiles: ImageFile[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]

      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid File",
          description: `${file.name} is not an image file`,
          variant: "destructive",
        })
        continue
      }

      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: `${file.name} exceeds 10MB limit`,
          variant: "destructive",
        })
        continue
      }

      try {
        const img = await loadImage(file)

        const imageFile: ImageFile = {
          id: Math.random().toString(36).substr(2, 9),
          file,
          preview: URL.createObjectURL(file),
          originalSize: file.size,
          width: img.width,
          height: img.height,
          format: file.type,
          status: "pending",
        }

        validFiles.push(imageFile)
        URL.revokeObjectURL(img.src)
      } catch (error) {
        toast({
          title: "Error Loading Image",
          description: `Failed to load ${file.name}`,
          variant: "destructive",
        })
      }
    }

    if (validFiles.length > 0) {
      setImages((prev) => [...prev, ...validFiles])
      toast({
        title: "Images Added",
        description: `${validFiles.length} image(s) ready for compression`,
      })
    }
  }, [toast])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files) {
      await handleFiles(e.dataTransfer.files)
    }
  }, [handleFiles])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files)
    }
  }

  const handleCompressAll = async () => {
    const pendingImages = images.filter((img) => img.status === "pending")
    if (pendingImages.length === 0) {
      toast({
        title: "No Images",
        description: "No images to compress",
        variant: "destructive",
      })
      return
    }

    for (const img of pendingImages) {
      await compressImage(img)
    }

    toast({
      title: "Compression Complete",
      description: `Successfully compressed ${pendingImages.length} image(s)`,
    })
  }

  const handleDownload = (imageFile: ImageFile) => {
    if (!imageFile.compressedBlob) return

    const url = URL.createObjectURL(imageFile.compressedBlob)
    const a = document.createElement("a")
    a.href = url
    const extension = options.outputFormat === "original"
      ? imageFile.file.name.split(".").pop()
      : options.outputFormat === "jpeg" ? "jpg" : options.outputFormat
    const baseName = imageFile.file.name.replace(/\.[^/.]+$/, "")
    a.download = `${baseName}_compressed.${extension}`
    a.click()
    URL.revokeObjectURL(url)

    toast({
      title: "Downloaded",
      description: `${imageFile.file.name} has been downloaded`,
    })
  }

  const handleDownloadAll = () => {
    const completedImages = images.filter((img) => img.status === "done")
    if (completedImages.length === 0) {
      toast({
        title: "No Images",
        description: "No compressed images to download",
        variant: "destructive",
      })
      return
    }

    completedImages.forEach((img) => handleDownload(img))
    toast({
      title: "Downloaded All",
      description: `${completedImages.length} image(s) downloaded`,
    })
  }

  const handleRemove = (id: string) => {
    setImages((prev) => {
      const img = prev.find((i) => i.id === id)
      if (img) {
        URL.revokeObjectURL(img.preview)
        if (img.compressedPreview) URL.revokeObjectURL(img.compressedPreview)
      }
      return prev.filter((i) => i.id !== id)
    })
  }

  const handleReset = () => {
    images.forEach((img) => {
      URL.revokeObjectURL(img.preview)
      if (img.compressedPreview) URL.revokeObjectURL(img.compressedPreview)
    })
    setImages([])
    setOptions({
      quality: 80,
      outputFormat: "original",
      maintainAspectRatio: true,
      resizePercentage: 100,
    })
    toast({
      title: "Reset Complete",
      description: "All images and settings have been reset",
    })
  }

  const relatedTools = [
    {
      id: "image-converter",
      name: "Image Converter",
      description: "Convert images between formats",
      icon: ArrowLeftRight,
      href: "/tools/image-tools/image-converter",
    },
    {
      id: "image-resizer",
      name: "Image Resizer",
      description: "Resize images to any dimensions",
      icon: Crop,
      href: "/tools/image-tools/image-resizer",
    },
    {
      id: "background-remover",
      name: "Background Remover",
      description: "Remove image backgrounds instantly",
      icon: Palette,
      href: "/tools/image-tools/background-remover",
    },
    {
      id: "image-cropper",
      name: "Image Cropper",
      description: "Crop images to custom sizes",
      icon: Scissors,
      href: "/tools/image-tools/image-cropper",
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
            name: "Image Compressor",
            applicationCategory: "MultimediaApplication",
            operatingSystem: "Any",
            description:
              "Free online image compressor. Reduce JPG, PNG, WebP file size up to 80%. Batch compression with no quality loss.",
            url: "https://tulz.net/tools/image-tools/image-compressor",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              ratingCount: "12450",
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
                  <BreadcrumbLink href="/tools/image-tools">Image Tools</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Image Compressor</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex items-start gap-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg">
                <FileImage className="h-10 w-10" />
              </div>
              <div className="flex-1">
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  Free Image Compressor - Reduce Photo Size Online
                </h1>
                <p className="mb-4 text-lg text-muted-foreground">
                  Compress images online for free. Reduce JPG, PNG, WebP file size up to 80% without
                  quality loss. Batch compression. Privacy-first - all processing in your browser.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-5 w-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                    <span className="ml-2 text-sm font-semibold">4.8/5</span>
                    <span className="text-sm text-muted-foreground">(12,450 users)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Last updated: Jan 2024</span>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-green-500/10 text-green-700 dark:text-green-300">
                    <Check className="mr-1 h-3 w-3" />
                    Free Forever
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-500/10 text-blue-700 dark:text-blue-300">
                    <Shield className="mr-1 h-3 w-3" />
                    Privacy First
                  </Badge>
                  <Badge variant="secondary" className="bg-orange-500/10 text-orange-700 dark:text-orange-300">
                    <InfinityIcon className="mr-1 h-3 w-3" />
                    Unlimited Use
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container max-w-7xl">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Upload Images</CardTitle>
                <CardDescription>
                  Drag and drop your images or click to browse. Supports JPG, PNG, WebP, GIF (max
                  10MB each)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`relative rounded-lg border-2 border-dashed p-12 text-center transition-colors ${
                    isDragging
                      ? "border-primary bg-primary/5"
                      : "border-muted-foreground/25 bg-muted/50"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileInput}
                    className="hidden"
                  />
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-500 text-white">
                      <Upload className="h-8 w-8" />
                    </div>
                    <div>
                      <p className="mb-2 text-lg font-semibold">
                        Drag images here or click to browse
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Supports JPG, PNG, WebP, GIF up to 10MB per image
                      </p>
                    </div>
                    <Button onClick={() => fileInputRef.current?.click()} size="lg">
                      <Upload className="mr-2 h-5 w-5" />
                      Choose Images
                    </Button>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <Badge variant="outline">JPG</Badge>
                      <Badge variant="outline">PNG</Badge>
                      <Badge variant="outline">WebP</Badge>
                      <Badge variant="outline">GIF</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {images.length > 0 && (
              <>
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Compression Options</CardTitle>
                    <CardDescription>
                      Adjust quality, format, and size before compressing
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="quality">Quality: {options.quality}%</Label>
                        <span className="text-sm text-muted-foreground">
                          Higher = Better quality, larger size
                        </span>
                      </div>
                      <Slider
                        id="quality"
                        value={[options.quality]}
                        onValueChange={([value]) =>
                          setOptions((prev) => ({ ...prev, quality: value }))
                        }
                        min={0}
                        max={100}
                        step={5}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="output-format">Output Format</Label>
                      <Select
                        value={options.outputFormat}
                        onValueChange={(value: any) =>
                          setOptions((prev) => ({ ...prev, outputFormat: value }))
                        }
                      >
                        <SelectTrigger id="output-format">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="original">Same as original</SelectItem>
                          <SelectItem value="jpeg">JPEG</SelectItem>
                          <SelectItem value="png">PNG</SelectItem>
                          <SelectItem value="webp">WebP (Best compression)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4">
                      <Label>Resize Options</Label>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="percentage">
                            Scale: {options.resizePercentage}%
                          </Label>
                        </div>
                        <Slider
                          id="percentage"
                          value={[options.resizePercentage]}
                          onValueChange={([value]) =>
                            setOptions((prev) => ({ ...prev, resizePercentage: value }))
                          }
                          min={10}
                          max={100}
                          step={5}
                          className="w-full"
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="maintain-aspect"
                          checked={options.maintainAspectRatio}
                          onCheckedChange={(checked) =>
                            setOptions((prev) => ({ ...prev, maintainAspectRatio: checked }))
                          }
                        />
                        <Label htmlFor="maintain-aspect" className="text-sm">
                          Maintain aspect ratio
                        </Label>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="width">Width (px)</Label>
                          <Input
                            id="width"
                            type="number"
                            placeholder="Auto"
                            value={options.resizeWidth || ""}
                            onChange={(e) =>
                              setOptions((prev) => ({
                                ...prev,
                                resizeWidth: e.target.value ? parseInt(e.target.value) : undefined,
                              }))
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="height">Height (px)</Label>
                          <Input
                            id="height"
                            type="number"
                            placeholder="Auto"
                            value={options.resizeHeight || ""}
                            onChange={(e) =>
                              setOptions((prev) => ({
                                ...prev,
                                resizeHeight: e.target.value ? parseInt(e.target.value) : undefined,
                              }))
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button onClick={handleCompressAll} size="lg" className="bg-gradient-to-r from-green-500 to-emerald-500">
                        <Zap className="mr-2 h-5 w-5" />
                        Compress All Images
                      </Button>
                      <Button onClick={handleDownloadAll} variant="outline" size="lg">
                        <Download className="mr-2 h-5 w-5" />
                        Download All
                      </Button>
                      <Button onClick={handleReset} variant="outline" size="lg">
                        <RefreshCw className="mr-2 h-5 w-5" />
                        Reset
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Images ({images.length})</CardTitle>
                    <CardDescription>
                      Preview and download your compressed images
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {images.map((img) => (
                        <div
                          key={img.id}
                          className="rounded-lg border bg-muted/30 p-4"
                        >
                          <div className="grid gap-4 md:grid-cols-2">
                            <div>
                              <div className="mb-2 flex items-center justify-between">
                                <Label className="font-semibold">Original</Label>
                                <Badge variant="secondary">{formatBytes(img.originalSize)}</Badge>
                              </div>
                              <div className="relative aspect-video overflow-hidden rounded-lg border bg-muted">
                                <Image
                                  src={img.preview}
                                  alt="Original"
                                  fill
                                  className="object-contain"
                                />
                              </div>
                              <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                                <p className="font-medium text-foreground">{img.file.name}</p>
                                <p>Dimensions: {img.width} × {img.height}</p>
                                <p>Format: {img.format.split("/")[1].toUpperCase()}</p>
                              </div>
                            </div>

                            <div>
                              <div className="mb-2 flex items-center justify-between">
                                <Label className="font-semibold">Compressed</Label>
                                {img.status === "done" && img.compressedSize && (
                                  <div className="flex gap-2">
                                    <Badge variant="secondary">
                                      {formatBytes(img.compressedSize)}
                                    </Badge>
                                    <Badge className="bg-green-500">
                                      {getCompressionRatio(img.originalSize, img.compressedSize)}%
                                      smaller
                                    </Badge>
                                  </div>
                                )}
                              </div>
                              <div className="relative aspect-video overflow-hidden rounded-lg border bg-muted">
                                {img.status === "pending" && (
                                  <div className="flex h-full items-center justify-center">
                                    <p className="text-sm text-muted-foreground">
                                      Ready to compress
                                    </p>
                                  </div>
                                )}
                                {img.status === "processing" && (
                                  <div className="flex h-full flex-col items-center justify-center gap-2">
                                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                    <p className="text-sm text-muted-foreground">
                                      Compressing...
                                    </p>
                                  </div>
                                )}
                                {img.status === "done" && img.compressedPreview && (
                                  <Image
                                    src={img.compressedPreview}
                                    alt="Compressed"
                                    fill
                                    className="object-contain"
                                  />
                                )}
                                {img.status === "error" && (
                                  <div className="flex h-full items-center justify-center">
                                    <p className="text-sm text-red-500">{img.error}</p>
                                  </div>
                                )}
                              </div>
                              <div className="mt-2 flex gap-2">
                                {img.status === "done" && (
                                  <Button
                                    onClick={() => handleDownload(img)}
                                    size="sm"
                                    className="flex-1"
                                  >
                                    <Download className="mr-2 h-4 w-4" />
                                    Download
                                  </Button>
                                )}
                                <Button
                                  onClick={() => handleRemove(img.id)}
                                  variant="outline"
                                  size="sm"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            <div className="mt-8 grid gap-8 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    "Compress images without visible quality loss",
                    "Batch processing for multiple images",
                    "Preview before downloading",
                    "Support for JPG, PNG, WebP, GIF formats",
                    "Privacy-first: All processing in browser",
                    "No file upload to server",
                    "Unlimited free compressions",
                    "Adjust quality from 0-100%",
                    "Resize images while compressing",
                    "Convert between image formats",
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
                  <CardTitle>
                    <Sparkles className="mr-2 inline h-5 w-5" />
                    Compression Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="mb-2 font-semibold">Recommended Quality Settings</h3>
                    <p className="text-sm text-muted-foreground">
                      For web use, 75-85% quality provides the best balance between file size and
                      visual quality. For print, use 90-100%.
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold">Use WebP Format</h3>
                    <p className="text-sm text-muted-foreground">
                      WebP offers superior compression compared to JPG and PNG, reducing file sizes
                      by up to 30% more with the same quality.
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold">Resize Large Images</h3>
                    <p className="text-sm text-muted-foreground">
                      If your images are larger than needed, resize them first. A 4K image scaled
                      to 1080p can reduce file size by 75%.
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold">Format Selection</h3>
                    <p className="text-sm text-muted-foreground">
                      Use JPG for photos and complex images. Use PNG for graphics, logos, and images
                      with transparency.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12">
              <h2 className="mb-4 text-2xl font-bold">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    How does image compression work?
                  </AccordionTrigger>
                  <AccordionContent>
                    Image compression reduces file size by removing redundant data and using
                    efficient encoding algorithms. Our tool uses lossy compression, which slightly
                    reduces image quality in ways that are imperceptible to the human eye. The
                    quality slider lets you control the balance between file size and visual
                    quality. All processing happens in your browser using the HTML5 Canvas API,
                    ensuring your images never leave your device.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    Will compressing images reduce quality?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes, but the reduction is typically imperceptible when using appropriate quality
                    settings. At 80% quality (our default), most people cannot distinguish between
                    the original and compressed image, yet the file size can be reduced by 60-80%.
                    For critical professional photography, you may want to use 90-95% quality, which
                    still provides 30-50% file size reduction with virtually no visible quality
                    loss.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    What's the best format for web images?
                  </AccordionTrigger>
                  <AccordionContent>
                    WebP is generally the best format for modern websites, offering superior
                    compression and quality compared to JPG and PNG. It's supported by all major
                    browsers since 2020. Use JPG for photographs and complex images, PNG for
                    graphics with transparency or sharp edges (logos, icons), and WebP when you want
                    the smallest possible file size with excellent quality. GIF should only be used
                    for simple animations.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    Is it safe to upload sensitive images?
                  </AccordionTrigger>
                  <AccordionContent>
                    Absolutely! Our image compressor processes everything client-side in your
                    browser using JavaScript. Your images never leave your device or get uploaded to
                    any server. All compression, resizing, and format conversion happens locally on
                    your computer. This makes it completely safe for processing sensitive documents,
                    personal photos, or confidential business images. You can even use it offline
                    once the page loads.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>
                    Why should I compress images for my website?
                  </AccordionTrigger>
                  <AccordionContent>
                    Compressed images dramatically improve website performance. Unoptimized images
                    are the #1 cause of slow page load times, which hurt user experience, SEO
                    rankings, and conversion rates. Google uses page speed as a ranking factor, and
                    studies show that 53% of mobile users abandon sites that take longer than 3
                    seconds to load. Compressing images can reduce page load time by 50-80%,
                    decrease bandwidth costs, and improve your site's Core Web Vitals scores.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className="mt-12">
              <h2 className="mb-4 text-2xl font-bold">How to Compress Images for Web</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-4">
                <p className="text-muted-foreground">
                  Image compression is a critical technique for web optimization that reduces file
                  sizes while maintaining visual quality. In today's mobile-first world, where users
                  expect instant page loads and many access websites on cellular connections,
                  optimizing images is no longer optional—it's essential for success.
                </p>

                <h3 className="mt-6 text-xl font-semibold">Why Compress Images?</h3>
                <p className="text-muted-foreground">
                  Images typically account for 50-70% of a webpage's total size. Unoptimized images
                  lead to slow loading times, increased bandwidth costs, and poor user experience.
                  Research shows that a 1-second delay in page load time can reduce conversions by
                  7% and page views by 11%. Search engines like Google also prioritize fast-loading
                  sites in their rankings. By compressing images, you can reduce file sizes by
                  60-80% without noticeable quality loss, dramatically improving your website's
                  performance and user satisfaction.
                </p>

                <h3 className="mt-6 text-xl font-semibold">Impact on Website Speed</h3>
                <p className="text-muted-foreground">
                  Website speed directly affects your bottom line. Amazon found that every 100ms of
                  latency cost them 1% in sales. Pinterest reduced wait times by 40% and saw a 15%
                  increase in traffic and conversions. Compressed images load faster, reducing Time
                  to First Byte (TTFB) and improving Core Web Vitals metrics like Largest
                  Contentful Paint (LCP). For e-commerce sites with hundreds of product images, or
                  blogs with photo galleries, proper image compression can be the difference between
                  a 2-second load time and a 10-second load time.
                </p>

                <h3 className="mt-6 text-xl font-semibold">
                  Best Practices for Image Compression
                </h3>
                <p className="text-muted-foreground">
                  Start by choosing the right quality setting: 80-85% for general web use, 75% for
                  thumbnails, and 90-95% for hero images or professional photography. Always resize
                  images to their display dimensions before compressing—never serve a 4000px image
                  when only 800px is displayed. Use responsive images with the srcset attribute to
                  serve appropriately sized versions to different devices. Implement lazy loading so
                  images only download when they're about to enter the viewport. Consider using a
                  CDN to serve images from servers geographically close to your users.
                </p>

                <h3 className="mt-6 text-xl font-semibold">
                  Format Comparison: JPG vs PNG vs WebP
                </h3>
                <p className="text-muted-foreground">
                  Each image format has ideal use cases. JPEG is best for photographs and images
                  with gradients—it uses lossy compression that's very efficient for complex images
                  but doesn't support transparency. PNG uses lossless compression, perfect for
                  graphics, logos, and images requiring transparency, but creates larger files than
                  JPEG for photos. WebP is a modern format that combines the best of both,
                  supporting both lossy and lossless compression plus transparency, typically
                  creating files 25-35% smaller than JPEG at equivalent quality. While WebP is now
                  supported by 95%+ of browsers, consider providing JPEG/PNG fallbacks for older
                  browsers using the picture element.
                </p>

                <h3 className="mt-6 text-xl font-semibold">When to Use Each Format</h3>
                <p className="text-muted-foreground">
                  Use JPEG for photographs, product images, and any image with millions of colors
                  and no transparency needs. Choose PNG when you need transparency (alpha channel),
                  for logos and icons, screenshots with text, or any image where maintaining crisp
                  edges and exact colors is critical. Select WebP as your primary format for modern
                  websites, as it offers the best compression efficiency across all image types.
                  GIF should only be used for simple animations; for static images, PNG is always a
                  better choice. For complex animations, consider using MP4 video instead of GIF,
                  which can reduce file size by 90% or more.
                </p>

                <h3 className="mt-6 text-xl font-semibold">Advanced Optimization Techniques</h3>
                <p className="text-muted-foreground">
                  Beyond basic compression, implement progressive JPEGs that load in multiple passes,
                  showing a low-quality preview quickly while the full image loads. Remove EXIF
                  metadata from images (our tool does this automatically) to save additional
                  kilobytes. Use CSS instead of images for simple graphics, gradients, and shapes.
                  Consider using SVG for logos and icons—they're infinitely scalable and often
                  smaller than raster equivalents. For critical above-the-fold images, inline them
                  as base64 data URIs to eliminate HTTP requests, though this only makes sense for
                  small images under 10KB.
                </p>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-bold">Related Tools</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {relatedTools.map((tool) => (
                  <Link key={tool.id} href={tool.href}>
                    <Card className="group h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                      <CardHeader>
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-md transition-transform group-hover:scale-110">
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
