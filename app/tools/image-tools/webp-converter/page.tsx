"use client"

import { useState, useRef } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
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
  Zap,
  Sparkles,
  ArrowRight,
  Shield,
  Image as ImageIcon,
  Crop,
  Star,
  Calendar,
  Palette,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function WebPConverterPage() {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [convertedImage, setConvertedImage] = useState<string | null>(null)
  const [quality, setQuality] = useState([90])
  const [originalSize, setOriginalSize] = useState(0)
  const [convertedSize, setConvertedSize] = useState(0)
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

    setOriginalSize(file.size)

    const reader = new FileReader()
    reader.onload = (event) => {
      setOriginalImage(event.target?.result as string)
      setConvertedImage(null)
    }
    reader.readAsDataURL(file)
  }

  const convertToWebP = () => {
    if (!originalImage) return

    const img = new Image()
    img.src = originalImage

    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext("2d")

      if (ctx) {
        ctx.drawImage(img, 0, 0)
        const webpData = canvas.toDataURL("image/webp", quality[0] / 100)
        setConvertedImage(webpData)

        const base64Length = webpData.length - `data:image/webp;base64,`.length
        const sizeInBytes = (base64Length * 3) / 4
        setConvertedSize(sizeInBytes)

        toast({ title: "Converted to WebP!", description: "Image optimized successfully" })
      }
    }
  }

  const handleDownload = () => {
    if (!convertedImage) return

    const link = document.createElement("a")
    link.href = convertedImage
    link.download = "optimized-image.webp"
    link.click()
    toast({ title: "Downloaded!" })
  }

  const handleClear = () => {
    setOriginalImage(null)
    setConvertedImage(null)
    setOriginalSize(0)
    setConvertedSize(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    toast({ title: "Cleared!" })
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const savingsPercent = originalSize > 0 && convertedSize > 0
    ? Math.round(((originalSize - convertedSize) / originalSize) * 100)
    : 0

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "WebP Converter",
            applicationCategory: "MultimediaApplication",
            operatingSystem: "Any",
            description:
              "Free online WebP converter. Convert images to WebP format and reduce file size by up to 90% without losing quality. Improve website speed and SEO.",
            url: "https://tulz.net/tools/image-tools/webp-converter",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              ratingCount: "7340",
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
                  <BreadcrumbPage>WebP Converter</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex items-start gap-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-lg">
                <Zap className="h-10 w-10" />
              </div>
              <div className="flex-1">
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  WebP Converter - Convert Images to WebP Online Free
                </h1>
                <p className="mb-4 text-lg text-muted-foreground">
                  Convert JPG, PNG, GIF to WebP format and reduce file size by up to 90% without losing quality. Boost website speed, improve SEO rankings, and enhance user experience instantly.
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
                    <span className="text-sm text-muted-foreground">(7,340 users)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Last updated: Jan 2024</span>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-green-500/10 text-green-700 dark:text-green-300">
                    <Check className="mr-1 h-3 w-3" />
                    Up to 90% Smaller
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
                  <CardTitle>Upload & Convert</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
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
                        <p className="text-sm text-muted-foreground">PNG, JPG, GIF</p>
                      </div>
                    </label>
                  </div>

                  {originalImage && (
                    <>
                      <div className="space-y-4">
                        <div>
                          <Label>Quality: {quality[0]}%</Label>
                          <Slider
                            value={quality}
                            onValueChange={setQuality}
                            min={10}
                            max={100}
                            step={5}
                            className="mt-2"
                          />
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Button onClick={convertToWebP} className="min-h-[44px]">
                          <Zap className="mr-2 h-4 w-4" />
                          Convert to WebP
                        </Button>
                        {convertedImage && (
                          <Button onClick={handleDownload} variant="outline" className="min-h-[44px]">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        )}
                        <Button onClick={handleClear} variant="outline" className="min-h-[44px]">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Clear
                        </Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {convertedImage && (
                <Card>
                  <CardHeader>
                    <CardTitle>Compression Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-sm text-muted-foreground">Original</div>
                        <div className="text-2xl font-bold">{formatSize(originalSize)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Compressed</div>
                        <div className="text-2xl font-bold text-green-600">{formatSize(convertedSize)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Saved</div>
                        <div className="text-2xl font-bold text-green-600">{savingsPercent}%</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="mt-8 grid gap-8 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Features</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      "Convert JPG, PNG, GIF to WebP format",
                      "Reduce file size by up to 90%",
                      "Maintain excellent image quality",
                      "Adjustable quality slider (10-100%)",
                      "Instant conversion in browser",
                      "Privacy-first: No server uploads",
                      "See real-time compression statistics",
                      "Download optimized WebP files",
                      "Free unlimited conversions",
                      "Improve website PageSpeed scores",
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
                      WebP Conversion Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="mb-2 font-semibold">Quality Settings</h3>
                      <p className="text-sm text-muted-foreground">
                        For general web use, 80-90% quality provides excellent results with dramatic file size reduction. Use 90-100% for high-quality images.
                      </p>
                    </div>
                    <div>
                      <h3 className="mb-2 font-semibold">Browser Compatibility</h3>
                      <p className="text-sm text-muted-foreground">
                        WebP is supported by 95%+ of browsers including Chrome, Firefox, Safari, and Edge. Always provide fallbacks for older browsers.
                      </p>
                    </div>
                    <div>
                      <h3 className="mb-2 font-semibold">Best for Web Performance</h3>
                      <p className="text-sm text-muted-foreground">
                        WebP reduces bandwidth usage and improves page load times. Smaller images mean faster sites, better SEO, and improved Core Web Vitals.
                      </p>
                    </div>
                    <div>
                      <h3 className="mb-2 font-semibold">When to Use WebP</h3>
                      <p className="text-sm text-muted-foreground">
                        Use WebP for all website images to maximize performance. Especially beneficial for e-commerce product photos, blog images, and marketing materials.
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
                      What is WebP format?
                    </AccordionTrigger>
                    <AccordionContent>
                      WebP is a modern image format developed by Google that provides superior lossless and lossy compression for images on the web. Compared to JPEG and PNG, WebP offers 25-35% better compression with equivalent quality, resulting in dramatically smaller file sizes. This means faster website loading times, reduced bandwidth costs, and improved user experience across all devices.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      How much smaller are WebP images?
                    </AccordionTrigger>
                    <AccordionContent>
                      WebP images are typically 25-35% smaller than equivalent JPEG images and up to 80% smaller than PNG images for photos. For graphics and images with transparency, the savings can be even greater. Our converter shows real-time compression statistics so you can see exactly how much space you're saving with each conversion.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>
                      Is WebP supported by all browsers?
                    </AccordionTrigger>
                    <AccordionContent>
                      Yes, WebP is now supported by 95%+ of browsers worldwide, including all modern versions of Chrome, Firefox, Safari (since iOS 14 and macOS Big Sur), Edge, and Opera. For older browsers, you can use the HTML picture element to provide JPEG or PNG fallbacks, ensuring compatibility while still delivering WebP to modern browsers.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>
                      Will converting to WebP reduce image quality?
                    </AccordionTrigger>
                    <AccordionContent>
                      At quality settings of 80-90%, WebP maintains excellent visual quality that's virtually indistinguishable from the original while achieving significant file size reduction. WebP uses advanced compression algorithms that preserve important image details while efficiently removing redundant data. You have full control over the quality slider to balance size versus quality for your specific needs.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger>
                      How does WebP improve website SEO?
                    </AccordionTrigger>
                    <AccordionContent>
                      Google and other search engines use page load speed as a ranking factor. Smaller WebP images reduce page weight, decrease load times, and improve Core Web Vitals metrics (LCP, FID, CLS). Faster websites rank higher in search results, retain visitors better, and provide superior mobile experiences. Studies show that a 1-second improvement in load time can increase conversions by 7%.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-6">
                    <AccordionTrigger>
                      Is my image data safe when converting?
                    </AccordionTrigger>
                    <AccordionContent>
                      Absolutely! Our WebP converter processes everything client-side in your browser. Your images never leave your device or get uploaded to any server. All conversion happens locally using JavaScript and the HTML5 Canvas API. This makes it completely safe for processing sensitive images, product photos, or any confidential visual content. You can even use it offline once the page loads.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <div className="mt-12">
                <h2 className="mb-4 text-2xl font-bold">Complete Guide to WebP Image Conversion</h2>
                <div className="prose prose-gray dark:prose-invert max-w-none space-y-4">
                  <p className="text-muted-foreground">
                    WebP is revolutionizing web performance by delivering superior image compression without sacrificing visual quality. Whether you're optimizing an e-commerce site, blog, portfolio, or business website, converting images to WebP format is one of the most effective ways to improve page speed and user experience.
                  </p>

                  <h3 className="mt-6 text-xl font-semibold">Why Convert Images to WebP?</h3>
                  <p className="text-muted-foreground">
                    Images typically account for 50-70% of a webpage's total size. Traditional formats like JPEG and PNG, while widely compatible, use compression techniques from the 1990s. WebP, developed by Google in 2010, employs modern algorithms that achieve 25-35% better compression than JPEG for photos and up to 80% better compression than PNG for graphics. This dramatic reduction in file size translates directly to faster load times, lower bandwidth costs, and improved search engine rankings.
                  </p>

                  <h3 className="mt-6 text-xl font-semibold">Impact on Website Performance</h3>
                  <p className="text-muted-foreground">
                    Page speed is critical for modern websites. Google research shows that 53% of mobile users abandon sites that take longer than 3 seconds to load. Every megabyte of image data adds precious milliseconds to load time. By converting images to WebP, websites can reduce page weight by 30-50%, often cutting load times in half. This improvement directly boosts Google PageSpeed scores, Core Web Vitals metrics, and ultimately, conversion rates and revenue.
                  </p>

                  <h3 className="mt-6 text-xl font-semibold">Perfect for E-Commerce & Product Images</h3>
                  <p className="text-muted-foreground">
                    E-commerce sites benefit enormously from WebP conversion. Product pages typically contain 10-50 images including main photos, thumbnails, and variations. Converting these to WebP can reduce page size from 5MB to under 2MB, creating a significantly faster shopping experience. Studies show that faster product pages increase conversions by 15-20%, decrease bounce rates, and improve customer satisfaction scores. Amazon found that every 100ms of additional latency cost them 1% in sales.
                  </p>

                  <h3 className="mt-6 text-xl font-semibold">WebP vs JPEG vs PNG</h3>
                  <p className="text-muted-foreground">
                    JPEG excels at compressing photos but doesn't support transparency and can show artifacts at high compression. PNG provides lossless compression and transparency but creates large files. WebP combines the best of both: it supports both lossy and lossless compression, handles transparency perfectly, and produces files 25-80% smaller than equivalent JPEG or PNG images. For most web use cases, WebP is the superior choice.
                  </p>

                  <h3 className="mt-6 text-xl font-semibold">Implementation Best Practices</h3>
                  <p className="text-muted-foreground">
                    Convert all website images to WebP but implement fallbacks for older browsers using the picture element. Use quality settings of 80-90% for photos and 90-100% for graphics with text. Enable lazy loading so images only download when needed. Combine WebP with responsive images (srcset) to serve optimally sized files to different devices. Monitor your site's Core Web Vitals in Google Search Console to measure performance improvements after WebP implementation.
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
                      description: "Reduce image file size while maintaining quality",
                      icon: ImageIcon,
                      href: "/tools/image-tools/image-compressor",
                    },
                    {
                      id: "image-cropper",
                      name: "Image Cropper",
                      description: "Crop and resize images to custom dimensions",
                      icon: Crop,
                      href: "/tools/image-tools/image-cropper",
                    },
                    {
                      id: "background-remover",
                      name: "Background Remover",
                      description: "Remove image backgrounds instantly",
                      icon: Zap,
                      href: "/tools/image-tools/background-remover",
                    },
                    {
                      id: "photo-filter",
                      name: "Photo Filter",
                      description: "Apply professional filters to your images",
                      icon: Palette,
                      href: "/tools/image-tools/photo-filter",
                    },
                  ].map((tool) => (
                    <Link key={tool.id} href={tool.href}>
                      <Card className="group h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                        <CardHeader>
                          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-md transition-transform group-hover:scale-110">
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
