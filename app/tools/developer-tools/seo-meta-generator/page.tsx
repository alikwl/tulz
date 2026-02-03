"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check, Globe, Share2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SEOMetaGenerator() {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  const [title, setTitle] = useState("My Awesome Website")
  const [description, setDescription] = useState("This is an amazing website that does incredible things")
  const [url, setUrl] = useState("https://example.com")
  const [image, setImage] = useState("https://example.com/image.jpg")
  const [twitterHandle, setTwitterHandle] = useState("@username")

  const generateMetaTags = () => {
    return `<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}">
<meta name="description" content="${description}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${image}">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="${url}">
<meta property="twitter:title" content="${title}">
<meta property="twitter:description" content="${description}">
<meta property="twitter:image" content="${image}">
<meta name="twitter:creator" content="${twitterHandle}">`
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateMetaTags())
    setCopied(true)
    toast({
      title: "Copied!",
      description: "Meta tags copied to clipboard",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="relative overflow-hidden border-b bg-gradient-to-br from-blue-500 to-cyan-500 py-16 text-white">
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          <div className="container relative">
            <div className="mx-auto max-w-3xl text-center">
              <Badge className="mb-4 bg-white/20 text-white backdrop-blur-sm">
                Developer Tools
              </Badge>
              <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
                SEO Meta Tag Generator
              </h1>
              <p className="text-lg text-white/90">
                Create optimized meta tags for Google, Facebook, and Twitter
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Page Information</CardTitle>
                  <CardDescription>Enter your page details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Page Title</Label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="My Awesome Website"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="A brief description of your page"
                      rows={4}
                    />
                    <p className="text-xs text-muted-foreground">{description.length}/160 characters</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Page URL</Label>
                    <Input
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Image URL</Label>
                    <Input
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Twitter Handle</Label>
                    <Input
                      value={twitterHandle}
                      onChange={(e) => setTwitterHandle(e.target.value)}
                      placeholder="@username"
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Social Previews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="google">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="google">
                          <Globe className="mr-2 h-4 w-4" />
                          Google
                        </TabsTrigger>
                        <TabsTrigger value="facebook">
                          <Share2 className="mr-2 h-4 w-4" />
                          Facebook
                        </TabsTrigger>
                        <TabsTrigger value="twitter">
                          <Share2 className="mr-2 h-4 w-4" />
                          Twitter
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="google" className="mt-4">
                        <div className="rounded-lg border p-4">
                          <h3 className="text-lg font-semibold text-blue-600">{title}</h3>
                          <p className="text-xs text-green-700">{url}</p>
                          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                        </div>
                      </TabsContent>

                      <TabsContent value="facebook" className="mt-4">
                        <div className="overflow-hidden rounded-lg border">
                          <div className="aspect-video bg-muted flex items-center justify-center text-muted-foreground">
                            Image Preview
                          </div>
                          <div className="p-3">
                            <p className="text-xs text-muted-foreground">{url}</p>
                            <p className="font-semibold">{title}</p>
                            <p className="text-sm text-muted-foreground">{description.substring(0, 80)}...</p>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="twitter" className="mt-4">
                        <div className="overflow-hidden rounded-lg border">
                          <div className="aspect-video bg-muted flex items-center justify-center text-muted-foreground">
                            Image Preview
                          </div>
                          <div className="p-3">
                            <p className="font-semibold">{title}</p>
                            <p className="text-sm text-muted-foreground">{description.substring(0, 80)}...</p>
                            <p className="text-xs text-muted-foreground">{url}</p>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Generated Meta Tags</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="max-h-[400px] overflow-auto rounded-lg bg-slate-950 p-4 text-xs text-slate-50">
                      <code>{generateMetaTags()}</code>
                    </pre>
                    <Button onClick={copyToClipboard} className="mt-4 w-full">
                      {copied ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy Meta Tags
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
