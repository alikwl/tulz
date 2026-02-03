"use client"

import { useState, useRef } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Upload,
  Download,
  Trash2,
  Check,
  Crop,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const SOCIAL_SIZES = [
  { name: "Instagram Post", width: 1080, height: 1080 },
  { name: "Instagram Story", width: 1080, height: 1920 },
  { name: "Facebook Post", width: 1200, height: 630 },
  { name: "Twitter Post", width: 1200, height: 675 },
  { name: "LinkedIn Post", width: 1200, height: 627 },
  { name: "YouTube Thumbnail", width: 1280, height: 720 },
  { name: "Pinterest Pin", width: 1000, height: 1500 },
  { name: "TikTok Video", width: 1080, height: 1920 },
]

export default function SocialMediaResizerPage() {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [resizedImages, setResizedImages] = useState<{ name: string; dataUrl: string }[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      })
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      setOriginalImage(event.target?.result as string)
      setResizedImages([])
    }
    reader.readAsDataURL(file)
  }

  const resizeImage = () => {
    if (!originalImage) return

    const img = new Image()
    img.src = originalImage

    img.onload = () => {
      const results: { name: string; dataUrl: string }[] = []

      SOCIAL_SIZES.forEach((size) => {
        const canvas = document.createElement("canvas")
        canvas.width = size.width
        canvas.height = size.height
        const ctx = canvas.getContext("2d")

        if (ctx) {
          const scale = Math.max(size.width / img.width, size.height / img.height)
          const scaledWidth = img.width * scale
          const scaledHeight = img.height * scale
          const x = (size.width - scaledWidth) / 2
          const y = (size.height - scaledHeight) / 2

          ctx.fillStyle = "#ffffff"
          ctx.fillRect(0, 0, size.width, size.height)
          ctx.drawImage(img, x, y, scaledWidth, scaledHeight)

          results.push({
            name: size.name,
            dataUrl: canvas.toDataURL("image/jpeg", 0.9),
          })
        }
      })

      setResizedImages(results)
      toast({ title: "Success!", description: `Generated ${results.length} sizes` })
    }
  }

  const downloadImage = (dataUrl: string, name: string) => {
    const link = document.createElement("a")
    link.href = dataUrl
    link.download = `${name.toLowerCase().replace(/\s+/g, "-")}.jpg`
    link.click()
    toast({ title: "Downloaded!", description: `${name} saved` })
  }

  const downloadAll = () => {
    resizedImages.forEach((img, index) => {
      setTimeout(() => {
        downloadImage(img.dataUrl, img.name)
      }, index * 200)
    })
  }

  const handleClear = () => {
    setOriginalImage(null)
    setResizedImages([])
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    toast({ title: "Cleared!" })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="border-b bg-muted/30 py-6 sm:py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumb className="mb-4 sm:mb-6">
              <BreadcrumbList className="text-xs sm:text-sm">
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/tools">Tools</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem className="hidden sm:block">
                  <BreadcrumbLink href="/tools/image-tools">Image Tools</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden sm:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Social Media Resizer</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg flex-shrink-0">
                <Crop className="h-8 w-8 sm:h-10 sm:w-10" />
              </div>
              <div className="flex-1">
                <h1 className="mb-2 sm:mb-3 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                  One Image, Every Social Size Instantly
                </h1>
                <p className="mb-3 sm:mb-4 text-sm sm:text-base md:text-lg text-muted-foreground">
                  Resize images for all social media platforms at once. Instagram, Facebook, Twitter, LinkedIn, and more.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-green-500/10 text-green-700 dark:text-green-300 text-xs">
                    <Check className="mr-1 h-3 w-3" />
                    8 Platforms
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-6 sm:py-8 md:py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Image</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer flex flex-col items-center gap-4"
                    >
                      <div className="p-4 bg-muted rounded-full">
                        <Upload className="h-8 w-8" />
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Click to upload image</p>
                        <p className="text-sm text-muted-foreground">Any image format</p>
                      </div>
                    </label>
                  </div>

                  {originalImage && (
                    <div className="flex flex-wrap gap-2">
                      <Button onClick={resizeImage} className="min-h-[44px]">
                        <Crop className="mr-2 h-4 w-4" />
                        Generate All Sizes
                      </Button>
                      {resizedImages.length > 0 && (
                        <Button onClick={downloadAll} variant="outline" className="min-h-[44px]">
                          <Download className="mr-2 h-4 w-4" />
                          Download All
                        </Button>
                      )}
                      <Button onClick={handleClear} variant="outline" className="min-h-[44px]">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Clear
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {resizedImages.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {resizedImages.map((img, index) => (
                    <Card key={index}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">{img.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="relative bg-muted rounded overflow-hidden">
                          <img src={img.dataUrl} alt={img.name} className="w-full h-auto" />
                        </div>
                        <Button
                          onClick={() => downloadImage(img.dataUrl, img.name)}
                          size="sm"
                          className="w-full"
                        >
                          <Download className="mr-2 h-3 w-3" />
                          Download
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>About Social Media Resizer</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    Save hours of manual cropping! Upload one image and instantly get perfectly sized versions for Instagram, Facebook, Twitter, LinkedIn, YouTube, Pinterest, and TikTok.
                  </p>
                  <p>
                    <strong>Perfect for:</strong> Social media managers, content creators, marketers, and businesses maintaining consistent branding across platforms.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
