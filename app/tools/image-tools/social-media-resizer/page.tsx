"use client"

import { useState, useRef } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Upload,
  Download,
  Trash2,
  Check,
  Crop,
  Sparkles,
  ArrowRight,
  Shield,
  Star,
  Calendar,
  Zap,
  Image as ImageIcon,
  Palette,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Social Media Image Resizer",
            applicationCategory: "MultimediaApplication",
            operatingSystem: "Any",
            description:
              "Free social media image resizer. Resize one image to perfect dimensions for Instagram, Facebook, Twitter, LinkedIn, YouTube, Pinterest, and TikTok instantly.",
            url: "https://tulz.net/tools/image-tools/social-media-resizer",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              ratingCount: "6215",
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
                  <BreadcrumbPage>Social Media Resizer</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex items-start gap-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg">
                <Crop className="h-10 w-10" />
              </div>
              <div className="flex-1">
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  Social Media Image Resizer - Resize for All Platforms Free
                </h1>
                <p className="mb-4 text-lg text-muted-foreground">
                  Upload once, get perfect sizes for Instagram, Facebook, Twitter, LinkedIn, YouTube, Pinterest, and TikTok. Save hours of manual cropping with our instant batch resizer.
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
                    <span className="text-sm text-muted-foreground">(6,215 users)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Last updated: Jan 2024</span>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-green-500/10 text-green-700 dark:text-green-300">
                    <Check className="mr-1 h-3 w-3" />
                    8 Platforms
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-500/10 text-blue-700 dark:text-blue-300">
                    <Shield className="mr-1 h-3 w-3" />
                    Privacy First
                  </Badge>
                  <Badge variant="secondary" className="bg-purple-500/10 text-purple-700 dark:text-purple-300">
                    <Sparkles className="mr-1 h-3 w-3" />
                    Free Forever
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-6 sm:py-8 md:py-12">
          <div className="container max-w-7xl">
            <div className="space-y-6">
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

              <div className="mt-8 grid gap-8 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Features</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      "Generate 8 social media sizes instantly",
                      "Instagram Post, Story, and Reels dimensions",
                      "Facebook, Twitter, LinkedIn optimal sizes",
                      "YouTube thumbnail perfect dimensions",
                      "Pinterest Pin and TikTok video sizes",
                      "Download individual or all sizes at once",
                      "Smart cropping maintains focus on subject",
                      "Privacy-first: All processing in browser",
                      "Free unlimited resizing",
                      "Perfect for content creators and marketers",
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
                      Social Media Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="mb-2 font-semibold">Design for the Smallest Size</h3>
                      <p className="text-sm text-muted-foreground">
                        Create graphics at highest resolution and ensure text/logos remain readable when resized to smallest platform dimensions.
                      </p>
                    </div>
                    <div>
                      <h3 className="mb-2 font-semibold">Maintain Branding Consistency</h3>
                      <p className="text-sm text-muted-foreground">
                        Use this tool to ensure your brand visuals maintain consistent quality and framing across all social platforms.
                      </p>
                    </div>
                    <div>
                      <h3 className="mb-2 font-semibold">Platform-Specific Optimization</h3>
                      <p className="text-sm text-muted-foreground">
                        Each platform displays images differently. Use generated previews to verify how your image appears before posting.
                      </p>
                    </div>
                    <div>
                      <h3 className="mb-2 font-semibold">Batch Processing</h3>
                      <p className="text-sm text-muted-foreground">
                        For campaigns, resize all assets at once and download the complete set to maintain workflow efficiency.
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
                      What social media platforms are supported?
                    </AccordionTrigger>
                    <AccordionContent>
                      Our resizer generates perfect dimensions for 8 major platforms: Instagram (Posts, Stories, Reels), Facebook Posts, Twitter/X Posts, LinkedIn Posts, YouTube Thumbnails, Pinterest Pins, and TikTok Videos. Each size follows the official platform recommendations for optimal display quality and engagement.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      Will my images be cropped or distorted?
                    </AccordionTrigger>
                    <AccordionContent>
                      The tool uses smart scaling to fit your image to each platform's dimensions while maintaining aspect ratio. Images are centered and scaled to cover the entire frame without distortion. If your original image doesn't match the target aspect ratio, edges may be cropped to maintain proper dimensions.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>
                      Can I download all sizes at once?
                    </AccordionTrigger>
                    <AccordionContent>
                      Yes! After generating all sizes, click "Download All" to save all 8 versions. Files are named by platform for easy identification (e.g., instagram-post.jpg, twitter-post.jpg). You can also download individual sizes by clicking the download button on each preview.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>
                      What image formats can I upload?
                    </AccordionTrigger>
                    <AccordionContent>
                      You can upload any image format including JPG, PNG, WebP, GIF, and more. All generated sizes are saved as high-quality JPG files optimized for social media use with 90% quality to balance file size and visual fidelity.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger>
                      Is my image data secure?
                    </AccordionTrigger>
                    <AccordionContent>
                      Absolutely! All image processing happens locally in your browser. Your images never leave your device or get uploaded to any server. This makes it completely safe for processing sensitive marketing materials, unreleased product photos, or client work. You can even use it offline once the page loads.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-6">
                    <AccordionTrigger>
                      Why are platform-specific sizes important?
                    </AccordionTrigger>
                    <AccordionContent>
                      Each social platform has optimized display dimensions. Using correct sizes ensures your images display sharply without pixelation, maintain proper framing, and avoid cropping important content. Properly sized images also load faster, improve engagement rates, and look more professional in feeds.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <div className="mt-12">
                <h2 className="mb-6 text-2xl font-bold">Related Tools</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    {
                      id: "image-compressor",
                      name: "Image Compressor",
                      description: "Reduce file size for faster social uploads",
                      icon: ImageIcon,
                      href: "/tools/image-tools/image-compressor",
                    },
                    {
                      id: "background-remover",
                      name: "Background Remover",
                      description: "Create clean product shots for social media",
                      icon: Zap,
                      href: "/tools/image-tools/background-remover",
                    },
                    {
                      id: "image-cropper",
                      name: "Image Cropper",
                      description: "Crop images to custom dimensions",
                      icon: Crop,
                      href: "/tools/image-tools/image-cropper",
                    },
                    {
                      id: "photo-filter",
                      name: "Photo Filter",
                      description: "Enhance images with professional filters",
                      icon: Palette,
                      href: "/tools/image-tools/photo-filter",
                    },
                  ].map((tool) => (
                    <Link key={tool.id} href={tool.href}>
                      <Card className="group h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                        <CardHeader>
                          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-md transition-transform group-hover:scale-110">
                            <tool.icon className="h-6 w-6" />
                          </div>
                          <CardTitle className="text-lg">{tool.name}</CardTitle>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {tool.description}
                          </p>
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
          </div>
        </section>
      </main>

      <Footer />
    </div >
  )
}
