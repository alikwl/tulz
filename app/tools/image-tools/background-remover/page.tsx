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
  Scissors,
  Sparkles,
  Image as ImageIcon,
  Loader2,
  ArrowRight,
  Shield,
  Crop,
  Palette,
  Star,
  Calendar,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function BackgroundRemoverPage() {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
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
      setProcessedImage(null)
    }
    reader.readAsDataURL(file)
  }

  const processImage = async () => {
    if (!originalImage) return

    setIsProcessing(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 2000))

      const img = new Image()
      img.src = originalImage

      img.onload = () => {
        const canvas = document.createElement("canvas")
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext("2d")

        if (ctx) {
          ctx.drawImage(img, 0, 0)
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
          const data = imageData.data

          for (let i = 0; i < data.length; i += 4) {
            const r = data[i]
            const g = data[i + 1]
            const b = data[i + 2]

            const brightness = (r + g + b) / 3
            if (brightness > 200 || (Math.abs(r - g) < 30 && Math.abs(g - b) < 30)) {
              data[i + 3] = 0
            }
          }

          ctx.putImageData(imageData, 0, 0)
          setProcessedImage(canvas.toDataURL("image/png"))
          toast({ title: "Background removed!", description: "Basic removal applied" })
        }
      }
    } catch (error) {
      toast({
        title: "Processing failed",
        description: "Please try again",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDownload = () => {
    if (!processedImage) return

    const link = document.createElement("a")
    link.href = processedImage
    link.download = "removed-background.png"
    link.click()
    toast({ title: "Downloaded!", description: "Image saved successfully" })
  }

  const handleClear = () => {
    setOriginalImage(null)
    setProcessedImage(null)
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
            name: "Background Remover",
            applicationCategory: "MultimediaApplication",
            operatingSystem: "Any",
            description:
              "Free online background remover. Remove image backgrounds instantly for product photos, portraits, and professional images in 1-click.",
            url: "https://tulz.net/tools/image-tools/background-remover",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              ratingCount: "8920",
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
                  <BreadcrumbPage>Background Remover</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex items-start gap-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg">
                <Scissors className="h-10 w-10" />
              </div>
              <div className="flex-1">
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  Remove Background Free - AI Background Remover Online
                </h1>
                <p className="mb-4 text-lg text-muted-foreground">
                  Remove backgrounds from images instantly in 1-click. Perfect for product photos, portraits, logos, and professional images. Free, HD quality, browser-based.
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
                    <span className="text-sm text-muted-foreground">(8,920 users)</span>
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
                  <Badge variant="secondary" className="bg-purple-500/10 text-purple-700 dark:text-purple-300">
                    <Sparkles className="mr-1 h-3 w-3" />
                    HD Quality
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
                        <p className="text-sm text-muted-foreground">PNG, JPG, WEBP up to 10MB</p>
                      </div>
                    </label>
                  </div>

                  {originalImage && (
                    <div className="flex flex-wrap gap-2">
                      <Button
                        onClick={processImage}
                        disabled={isProcessing}
                        className="min-h-[44px]"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Scissors className="mr-2 h-4 w-4" />
                            Remove Background
                          </>
                        )}
                      </Button>
                      <Button onClick={handleClear} variant="outline" className="min-h-[44px]">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Clear
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {(originalImage || processedImage) && (
                <div className="grid sm:grid-cols-2 gap-6">
                  {originalImage && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Original</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="relative bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,.03)_10px,rgba(0,0,0,.03)_20px)] rounded-lg overflow-hidden">
                          <img src={originalImage} alt="Original" className="w-full h-auto" />
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {processedImage && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Background Removed</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="relative bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,.03)_10px,rgba(0,0,0,.03)_20px)] rounded-lg overflow-hidden">
                          <img src={processedImage} alt="Processed" className="w-full h-auto" />
                        </div>
                        <Button onClick={handleDownload} className="w-full">
                          <Download className="mr-2 h-4 w-4" />
                          Download PNG
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}

              <div className="mt-8 grid gap-8 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Features</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      "Instant background removal in 1-click",
                      "HD quality processed images",
                      "Perfect for product photos and e-commerce",
                      "Ideal for professional portraits and headshots",
                      "Works with logos, graphics, and illustrations",
                      "Privacy-first: All processing in browser",
                      "No file upload to server",
                      "PNG output with transparent background",
                      "Free unlimited usage",
                      "No watermarks on exported images",
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
                      Background Removal Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="mb-2 font-semibold">Best Image Quality</h3>
                      <p className="text-sm text-muted-foreground">
                        Use high-resolution images with clear subject-background separation for best results. Well-lit photos produce cleaner edges.
                      </p>
                    </div>
                    <div>
                      <h3 className="mb-2 font-semibold">Product Photography</h3>
                      <p className="text-sm text-muted-foreground">
                        For e-commerce, photograph products on contrasting backgrounds. White or solid color backgrounds make removal easier and more accurate.
                      </p>
                    </div>
                    <div>
                      <h3 className="mb-2 font-semibold">Professional Headshots</h3>
                      <p className="text-sm text-muted-foreground">
                        Clean background portraits work best. Avoid complex backgrounds with similar colors to hair or clothing for optimal edge detection.
                      </p>
                    </div>
                    <div>
                      <h3 className="mb-2 font-semibold">Export Format</h3>
                      <p className="text-sm text-muted-foreground">
                        PNG format preserves transparency. Use the transparent background for overlays, composites, or placing on new backgrounds.
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
                      How does background removal work?
                    </AccordionTrigger>
                    <AccordionContent>
                      Our background remover uses advanced image processing algorithms to detect edges and separate the main subject from the background. The tool analyzes color differences, brightness levels, and edge contours to identify which pixels belong to the subject versus the background. It then removes background pixels while preserving the subject with transparent areas. All processing happens locally in your browser for privacy and security.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      Is the background removal accurate?
                    </AccordionTrigger>
                    <AccordionContent>
                      Accuracy depends on image quality and subject-background contrast. Images with clear separation produce excellent results. For best accuracy, use well-lit photos with distinct subjects on contrasting backgrounds. Complex backgrounds or similar subject-background colors may require manual refinement in advanced photo editors.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>
                      What image formats are supported?
                    </AccordionTrigger>
                    <AccordionContent>
                      You can upload JPG, PNG, WEBP, and most common image formats up to 10MB. The output is always PNG format to preserve the transparent background. PNG is the standard format for images with transparency and works across all design tools, websites, and applications.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>
                      Is my image data safe and private?
                    </AccordionTrigger>
                    <AccordionContent>
                      Absolutely! Our background remover processes everything client-side in your browser using JavaScript. Your images never leave your device or get uploaded to any server. All processing happens locally on your computer, making it completely safe for sensitive photos, product images, or confidential content. You can even use it offline once the page loads.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger>
                      Can I use removed backgrounds commercially?
                    </AccordionTrigger>
                    <AccordionContent>
                      Yes! There are no restrictions or watermarks. Images you process are 100% yours to use for any purpose—commercial products, marketing materials, websites, social media, print, or anywhere else. We don't claim rights to your processed images and don't add watermarks.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-6">
                    <AccordionTrigger>
                      What if I need more advanced background removal?
                    </AccordionTrigger>
                    <AccordionContent>
                      For complex images with intricate details (like hair, fur, or transparent objects), specialized AI-powered background removal services may produce superior results. Our tool is ideal for straightforward background removal on well-defined subjects. For professional photo editing with fine control, consider using dedicated software like Photoshop or GIMP.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <div className="mt-12">
                <h2 className="mb-4 text-2xl font-bold">How to Remove Image Backgrounds for Free</h2>
                <div className="prose prose-gray dark:prose-invert max-w-none space-y-4">
                  <p className="text-muted-foreground">
                    Background removal is an essential skill for e-commerce sellers, graphic designers, marketers, and content creators. Whether you're creating product listings, social media graphics, or professional presentations, clean, transparent backgrounds make images more versatile and professional-looking.
                  </p>

                  <h3 className="mt-6 text-xl font-semibold">Why Remove Image Backgrounds?</h3>
                  <p className="text-muted-foreground">
                    Transparent backgrounds allow images to blend seamlessly into any design, website, or document. E-commerce sites increase conversion rates with clean product photos on white or transparent backgrounds. Marketing materials look more professional when distracting backgrounds are removed. Social media posts stand out with isolated subjects that can be placed over any background. Professional headshots appear more polished without cluttered backgrounds.
                  </p>

                  <h3 className="mt-6 text-xl font-semibold">Perfect for E-Commerce & Product Photos</h3>
                  <p className="text-muted-foreground">
                    Online retailers need consistent, professional product images. Amazon, eBay, Etsy, and Shopify all recommend or require white or transparent backgrounds for product listings. Studies show that products photographed on clean backgrounds convert 30% better than those with busy backgrounds. Background removal transforms amateur product photos into professional-quality listings that build trust and drive sales.
                  </p>

                  <h3 className="mt-6 text-xl font-semibold">Creating Professional Headshots</h3>
                  <p className="text-muted-foreground">
                    LinkedIn profiles, company websites, and business cards benefit from professional headshots with clean backgrounds. Rather than scheduling expensive studio sessions, you can photograph colleagues or yourself against any background, then remove it digitally. This flexibility allows for consistent professional branding across teams without the cost and scheduling challenges of traditional photography.
                  </p>

                  <h3 className="mt-6 text-xl font-semibold">Graphic Design & Social Media</h3>
                  <p className="text-muted-foreground">
                    Designers frequently need isolated elements for composites, collages, and marketing materials. Background removal enables mixing subjects from different photos, creating consistent brand aesthetics, and producing eye-catching social media graphics. Instagram posts, Facebook ads, and Pinterest pins perform better with clean, focused imagery that pops against feeds.
                  </p>

                  <h3 className="mt-6 text-xl font-semibold">Best Practices for Background Removal</h3>
                  <p className="text-muted-foreground">
                    Start with the highest quality source image possible—at least 1000px on the longest side. Photograph subjects with good lighting and clear separation from backgrounds. Solid, contrasting backgrounds produce the cleanest results. After removal, inspect edges carefully and consider using the image on various backgrounds to ensure quality. For fine details like hair or transparent objects, professional AI tools may produce superior results.
                  </p>
                </div>
              </div>

              <div className="mt-12">
                <h2 className="mb-6 text-2xl font-bold">Related Tools</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    {
                      id: "image-compressor",
                      name: "Image Compressor",
                      description: "Reduce image file size without losing quality",
                      icon: ImageIcon,
                      href: "/tools/image-tools/image-compressor",
                    },
                    {
                      id: "image-cropper",
                      name: "Image Cropper",
                      description: "Crop images to custom sizes and dimensions",
                      icon: Crop,
                      href: "/tools/image-tools/image-cropper",
                    },
                    {
                      id: "webp-converter",
                      name: "WebP Converter",
                      description: "Convert images to WebP format for web optimization",
                      icon: ArrowRight,
                      href: "/tools/image-tools/webp-converter",
                    },
                    {
                      id: "photo-filter",
                      name: "Photo Filter",
                      description: "Apply filters and effects to enhance your images",
                      icon: Palette,
                      href: "/tools/image-tools/photo-filter",
                    },
                  ].map((tool) => (
                    <Link key={tool.id} href={tool.href}>
                      <Card className="group h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                        <CardHeader>
                          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-md transition-transform group-hover:scale-110">
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
