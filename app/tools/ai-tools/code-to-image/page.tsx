"use client"

import { useState, useRef } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
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
  Download,
  Copy,
  Trash2,
  Check,
  Code2,
  Image as ImageIcon,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const THEMES = [
  { value: "dark", label: "Dark" },
  { value: "light", label: "Light" },
  { value: "monokai", label: "Monokai" },
  { value: "dracula", label: "Dracula" },
]

const LANGUAGES = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "rust", label: "Rust" },
  { value: "go", label: "Go" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
]

export default function CodeToImagePage() {
  const [code, setCode] = useState(`function hello() {\n  console.log("Hello, World!");\n  return true;\n}`)
  const [theme, setTheme] = useState("dark")
  const [language, setLanguage] = useState("javascript")
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const codeDisplayRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const generateImage = async () => {
    if (!codeDisplayRef.current) return

    try {
      const htmlToImage = (await import("html-to-image")).toPng

      const dataUrl = await htmlToImage(codeDisplayRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: theme === "dark" ? "#1e1e1e" : "#ffffff",
      })

      setGeneratedImage(dataUrl)
      toast({ title: "Image generated!" })
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Please try again",
        variant: "destructive",
      })
    }
  }

  const handleDownload = () => {
    if (!generatedImage) return

    const link = document.createElement("a")
    link.href = generatedImage
    link.download = `code-snapshot-${Date.now()}.png`
    link.click()
    toast({ title: "Downloaded!" })
  }

  const handleCopyImage = async () => {
    if (!generatedImage) return

    try {
      const response = await fetch(generatedImage)
      const blob = await response.blob()
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ])
      toast({ title: "Image copied to clipboard!" })
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Please download instead",
        variant: "destructive",
      })
    }
  }

  const handleClear = () => {
    setCode("")
    setGeneratedImage(null)
    toast({ title: "Cleared!" })
  }

  const getThemeStyles = () => {
    switch (theme) {
      case "light":
        return "bg-white text-gray-900"
      case "monokai":
        return "bg-[#272822] text-[#f8f8f2]"
      case "dracula":
        return "bg-[#282a36] text-[#f8f8f2]"
      default:
        return "bg-[#1e1e1e] text-[#d4d4d4]"
    }
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
                  <BreadcrumbLink href="/tools/ai-tools">AI Tools</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden sm:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Code to Image</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 text-white shadow-lg flex-shrink-0">
                <Code2 className="h-8 w-8 sm:h-10 sm:w-10" />
              </div>
              <div className="flex-1">
                <h1 className="mb-2 sm:mb-3 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                  Code to Image Generator | Beautiful Syntax Snapshots
                </h1>
                <p className="mb-3 sm:mb-4 text-sm sm:text-base md:text-lg text-muted-foreground">
                  Create beautiful images of your code snippets. Perfect for sharing on social media, documentation, and presentations.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-green-500/10 text-green-700 dark:text-green-300 text-xs">
                    <Check className="mr-1 h-3 w-3" />
                    No Watermark
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-500/10 text-blue-700 dark:text-blue-300 text-xs">
                    <ImageIcon className="mr-1 h-3 w-3" />
                    High Quality
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-6 sm:py-8 md:py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Code Editor</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label>Language</Label>
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {LANGUAGES.map((lang) => (
                            <SelectItem key={lang.value} value={lang.value}>
                              {lang.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Theme</Label>
                      <Select value={theme} onValueChange={setTheme}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {THEMES.map((t) => (
                            <SelectItem key={t.value} value={t.value}>
                              {t.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label>Your Code</Label>
                    <Textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      rows={12}
                      className="font-mono text-sm mt-2"
                      placeholder="Paste your code here..."
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button onClick={generateImage} className="min-h-[44px]">
                      <ImageIcon className="mr-2 h-4 w-4" />
                      Generate Image
                    </Button>
                    {generatedImage && (
                      <>
                        <Button onClick={handleDownload} variant="outline" className="min-h-[44px]">
                          <Download className="mr-2 h-4 w-4" />
                          Download PNG
                        </Button>
                        <Button onClick={handleCopyImage} variant="outline" className="min-h-[44px]">
                          <Copy className="mr-2 h-4 w-4" />
                          Copy Image
                        </Button>
                      </>
                    )}
                    <Button onClick={handleClear} variant="outline" className="min-h-[44px]">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Clear
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    ref={codeDisplayRef}
                    className={`p-6 rounded-lg font-mono text-sm whitespace-pre-wrap ${getThemeStyles()}`}
                  >
                    {code || "// Your code will appear here"}
                  </div>
                </CardContent>
              </Card>

              {generatedImage && (
                <Card>
                  <CardHeader>
                    <CardTitle>Generated Image</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted rounded-lg p-4">
                      <img src={generatedImage} alt="Generated code" className="w-full h-auto rounded" />
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>About Code to Image</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    Create beautiful, shareable images of your code snippets. Perfect for Twitter, LinkedIn,
                    documentation, blog posts, and presentations.
                  </p>
                  <p>
                    <strong>Features:</strong> Multiple themes, syntax highlighting, high-quality exports, no watermarks,
                    and completely free to use.
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
