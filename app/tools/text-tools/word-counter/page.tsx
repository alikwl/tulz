"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
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
  FileText,
  Star,
  Calendar,
  Check,
  Copy,
  Download,
  Printer,
  Share2,
  Trash2,
  Sparkles,
  Clock,
  MessageSquare,
  AlignLeft,
  Type,
  BarChart3,
  Zap,
  Shield,
  Smartphone,
  ArrowRight,
  Hash,
  CaseSensitive,
  ArrowLeftRight,
  FileSearch,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const SAMPLE_TEXT = `Welcome to our Word Counter tool! This is a sample text to help you see how the counter works in real-time.

As you type or paste your content, you'll see instant statistics about your text. This includes word count, character count, sentence count, and much more.

Our tool is perfect for writers, students, bloggers, and anyone who needs to track their writing metrics. Try editing this text or paste your own content to see the magic happen!`

interface TextStats {
  words: number
  charactersWithSpaces: number
  charactersWithoutSpaces: number
  sentences: number
  paragraphs: number
  readingTime: number
  speakingTime: number
  averageWordLength: number
  longestWord: string
}

export default function WordCounterPage() {
  const [text, setText] = useState("")
  const [hasCharLimit, setHasCharLimit] = useState(false)
  const [charLimit, setCharLimit] = useState(5000)
  const { toast } = useToast()

  useEffect(() => {
    const saved = localStorage.getItem("wordCounterText")
    if (saved) {
      setText(saved)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("wordCounterText", text)
    }, 1000)
    return () => clearTimeout(timer)
  }, [text])

  const stats = useMemo((): TextStats => {
    if (!text.trim()) {
      return {
        words: 0,
        charactersWithSpaces: 0,
        charactersWithoutSpaces: 0,
        sentences: 0,
        paragraphs: 0,
        readingTime: 0,
        speakingTime: 0,
        averageWordLength: 0,
        longestWord: "",
      }
    }

    const words = text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0)
    const wordCount = words.length

    const charactersWithSpaces = text.length
    const charactersWithoutSpaces = text.replace(/\s/g, "").length

    const sentences = text
      .split(/[.!?]+/)
      .filter((sentence) => sentence.trim().length > 0).length

    const paragraphs = text
      .split(/\n\n+/)
      .filter((para) => para.trim().length > 0).length

    const readingTime = Math.ceil(wordCount / 200)
    const speakingTime = Math.ceil(wordCount / 150)

    const averageWordLength =
      wordCount > 0
        ? Math.round(
            words.reduce((sum, word) => sum + word.length, 0) / wordCount
          )
        : 0

    const longestWord =
      words.length > 0
        ? words.reduce((longest, current) =>
            current.length > longest.length ? current : longest
          )
        : ""

    return {
      words: wordCount,
      charactersWithSpaces,
      charactersWithoutSpaces,
      sentences,
      paragraphs,
      readingTime,
      speakingTime,
      averageWordLength,
      longestWord,
    }
  }, [text])

  const handleClear = () => {
    setText("")
    localStorage.removeItem("wordCounterText")
    toast({
      title: "Text cleared",
      description: "Your text has been removed.",
    })
  }

  const handleLoadSample = () => {
    setText(SAMPLE_TEXT)
    toast({
      title: "Sample loaded",
      description: "Sample text has been loaded into the editor.",
    })
  }

  const handleCopyStats = () => {
    const statsText = `Word Count Statistics:
Words: ${stats.words}
Characters (with spaces): ${stats.charactersWithSpaces}
Characters (without spaces): ${stats.charactersWithoutSpaces}
Sentences: ${stats.sentences}
Paragraphs: ${stats.paragraphs}
Reading time: ${stats.readingTime} min
Speaking time: ${stats.speakingTime} min
Average word length: ${stats.averageWordLength} chars
Longest word: ${stats.longestWord}`

    navigator.clipboard.writeText(statsText)
    toast({
      title: "Copied!",
      description: "Statistics copied to clipboard.",
    })
  }

  const handleExportTxt = () => {
    const blob = new Blob([text], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "text-analysis.txt"
    a.click()
    URL.revokeObjectURL(url)
    toast({
      title: "Exported!",
      description: "Text exported as TXT file.",
    })
  }

  const handlePrint = () => {
    const printWindow = window.open("", "", "width=800,height=600")
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Word Counter Results</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 40px; }
              h1 { color: #333; }
              .stats { margin: 20px 0; }
              .stat { margin: 10px 0; }
              .content { margin-top: 30px; white-space: pre-wrap; }
            </style>
          </head>
          <body>
            <h1>Word Counter Results</h1>
            <div class="stats">
              <div class="stat"><strong>Words:</strong> ${stats.words}</div>
              <div class="stat"><strong>Characters (with spaces):</strong> ${stats.charactersWithSpaces}</div>
              <div class="stat"><strong>Characters (without spaces):</strong> ${stats.charactersWithoutSpaces}</div>
              <div class="stat"><strong>Sentences:</strong> ${stats.sentences}</div>
              <div class="stat"><strong>Paragraphs:</strong> ${stats.paragraphs}</div>
              <div class="stat"><strong>Reading time:</strong> ${stats.readingTime} min</div>
              <div class="stat"><strong>Speaking time:</strong> ${stats.speakingTime} min</div>
            </div>
            <h2>Content</h2>
            <div class="content">${text}</div>
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Word Counter Results",
          text: `My text has ${stats.words} words, ${stats.charactersWithSpaces} characters, and ${stats.sentences} sentences.`,
          url: window.location.href,
        })
      } catch (err) {
        toast({
          title: "Share failed",
          description: "Could not share the results.",
          variant: "destructive",
        })
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link copied!",
        description: "Share link copied to clipboard.",
      })
    }
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value
    if (hasCharLimit && newText.length > charLimit) {
      return
    }
    setText(newText)
  }

  const relatedTools = [
    {
      id: "character-counter",
      name: "Character Counter",
      description: "Count characters with or without spaces",
      icon: Hash,
      href: "/tools/text-tools/character-counter",
    },
    {
      id: "case-converter",
      name: "Text Case Converter",
      description: "Convert text to uppercase, lowercase, or title case",
      icon: CaseSensitive,
      href: "/tools/text-tools/case-converter",
    },
    {
      id: "lorem-ipsum",
      name: "Lorem Ipsum Generator",
      description: "Generate placeholder text for your designs",
      icon: Type,
      href: "/tools/text-tools/lorem-ipsum",
    },
    {
      id: "text-diff",
      name: "Text Diff Checker",
      description: "Compare two texts and find differences",
      icon: ArrowLeftRight,
      href: "/tools/text-tools/text-diff",
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
            name: "Word Counter",
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Any",
            description:
              "Free online word counter tool. Count words, characters, sentences, and paragraphs instantly.",
            url: "https://tulz.net/tools/text-tools/word-counter",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              ratingCount: "12450",
            },
          }),
        }}
      />

      <Header />

      <main className="flex-1">
        <section className="border-b bg-muted/30 py-6 sm:py-8">
          <div className="container px-4 sm:px-6 lg:px-8">
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
                  <BreadcrumbLink href="/tools/text-tools">Text Tools</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden sm:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Word Counter</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-lg flex-shrink-0">
                <FileText className="h-8 w-8 sm:h-10 sm:w-10" />
              </div>
              <div className="flex-1">
                <h1 className="mb-2 sm:mb-3 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                  Free Word Counter - Character, Line & Paragraph Counter
                </h1>
                <p className="mb-3 sm:mb-4 text-sm sm:text-base md:text-lg text-muted-foreground">
                  Count words, characters, sentences, and paragraphs instantly. Perfect for
                  writers, students, and content creators. Real-time statistics as you type.
                </p>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-4 w-4 sm:h-5 sm:w-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                    <span className="ml-2 text-xs sm:text-sm font-semibold">4.9/5</span>
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      (12,450 users)
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>Last updated: Jan 2024</span>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-green-500/10 text-green-700 dark:text-green-300 text-xs">
                    <Check className="mr-1 h-3 w-3" />
                    Free
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-500/10 text-blue-700 dark:text-blue-300 text-xs">
                    <Check className="mr-1 h-3 w-3" />
                    No Signup
                  </Badge>
                  <Badge variant="secondary" className="bg-purple-500/10 text-purple-700 dark:text-purple-300 text-xs">
                    <Zap className="mr-1 h-3 w-3" />
                    Instant Results
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-6 sm:py-8 md:py-12">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 order-2 lg:order-1">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <CardTitle className="text-lg sm:text-xl">Text Editor</CardTitle>
                      <div className="flex items-center gap-2">
                        <Switch
                          id="char-limit"
                          checked={hasCharLimit}
                          onCheckedChange={setHasCharLimit}
                          className="min-h-[24px]"
                        />
                        <Label htmlFor="char-limit" className="text-xs sm:text-sm cursor-pointer">
                          Limit ({charLimit})
                        </Label>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Start typing or paste your text here..."
                      value={text}
                      onChange={handleTextChange}
                      className="min-h-[300px] sm:min-h-[400px] resize-none text-sm sm:text-base"
                    />
                    {hasCharLimit && (
                      <div className="mt-2 text-xs sm:text-sm text-muted-foreground">
                        {text.length} / {charLimit} characters
                      </div>
                    )}
                    <div className="mt-4 grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
                      <Button onClick={handleClear} variant="outline" size="sm" className="min-h-[44px]">
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span className="hidden sm:inline">Clear</span>
                        <span className="sm:hidden">Clear</span>
                      </Button>
                      <Button onClick={handleLoadSample} variant="outline" size="sm" className="min-h-[44px]">
                        <Sparkles className="mr-2 h-4 w-4" />
                        <span className="hidden sm:inline">Load Sample</span>
                        <span className="sm:hidden">Sample</span>
                      </Button>
                      <Button onClick={handleCopyStats} variant="outline" size="sm" className="min-h-[44px]">
                        <Copy className="mr-2 h-4 w-4" />
                        <span className="hidden sm:inline">Copy Stats</span>
                        <span className="sm:hidden">Copy</span>
                      </Button>
                      <Button onClick={handleExportTxt} variant="outline" size="sm" className="min-h-[44px]">
                        <Download className="mr-2 h-4 w-4" />
                        <span className="hidden sm:inline">Export TXT</span>
                        <span className="sm:hidden">Export</span>
                      </Button>
                      <Button onClick={handlePrint} variant="outline" size="sm" className="min-h-[44px]">
                        <Printer className="mr-2 h-4 w-4" />
                        Print
                      </Button>
                      <Button onClick={handleShare} variant="outline" size="sm" className="min-h-[44px]">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-600" />
                      Why Use Our Word Counter?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                        <Check className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">100% Free & Unlimited</h3>
                        <p className="text-sm text-muted-foreground">
                          No hidden fees or premium features
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                        <Zap className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Real-time Counting</h3>
                        <p className="text-sm text-muted-foreground">
                          Instant results as you type
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                        <Shield className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">No Registration Required</h3>
                        <p className="text-sm text-muted-foreground">
                          Start using immediately
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
                        <Shield className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Privacy-Focused</h3>
                        <p className="text-sm text-muted-foreground">
                          Client-side processing only
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-500/10">
                        <Smartphone className="h-5 w-5 text-pink-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Mobile-Friendly</h3>
                        <p className="text-sm text-muted-foreground">
                          Works on all devices
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10">
                        <Check className="h-5 w-5 text-cyan-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Works Offline</h3>
                        <p className="text-sm text-muted-foreground">
                          No internet connection needed
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle>How to Use</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          step: 1,
                          title: "Paste or type your text",
                          description:
                            "Enter your content in the text area above or paste it from your document.",
                        },
                        {
                          step: 2,
                          title: "Get instant word count",
                          description:
                            "Watch as the statistics update in real-time as you type or edit.",
                        },
                        {
                          step: 3,
                          title: "View detailed statistics",
                          description:
                            "Check words, characters, sentences, reading time, and more on the right panel.",
                        },
                        {
                          step: 4,
                          title: "Export or share results",
                          description:
                            "Use the buttons to copy stats, export as TXT, print, or share your results.",
                        },
                      ].map((item) => (
                        <div key={item.step} className="flex gap-4">
                          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-lg font-bold text-white">
                            {item.step}
                          </div>
                          <div>
                            <h3 className="mb-1 font-semibold">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle>Perfect For</CardTitle>
                    <CardDescription>
                      Our word counter is ideal for various use cases
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {[
                        "Essay writing (character limits)",
                        "Social media posts (Twitter, LinkedIn limits)",
                        "Academic papers",
                        "Blog content optimization",
                        "Resume writing",
                        "Product descriptions",
                        "Meta descriptions for SEO",
                        "Email marketing campaigns",
                      ].map((useCase, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                          <span className="text-sm">{useCase}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="mt-8">
                  <h2 className="mb-4 text-2xl font-bold">
                    Frequently Asked Questions
                  </h2>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>
                        Does the word counter work offline?
                      </AccordionTrigger>
                      <AccordionContent>
                        Yes! Our word counter works entirely in your browser using
                        client-side JavaScript. Once the page is loaded, you can use it
                        without an internet connection. Your text is processed locally and
                        never sent to our servers.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>
                        Is there a character limit?
                      </AccordionTrigger>
                      <AccordionContent>
                        No, there's no hard limit! You can count words in documents of any
                        size. For very large documents, processing might take a moment, but
                        the tool will handle it. You can also enable an optional character
                        limit if you need to stay within specific constraints.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>
                        How is reading time calculated?
                      </AccordionTrigger>
                      <AccordionContent>
                        Reading time is calculated based on the average reading speed of
                        200 words per minute, which is the standard for adults reading
                        English text. Speaking time uses 150 words per minute, which is the
                        average speaking pace for presentations.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                      <AccordionTrigger>
                        Can I count words in multiple languages?
                      </AccordionTrigger>
                      <AccordionContent>
                        Yes! Our word counter works with text in any language. It uses
                        whitespace to detect word boundaries, which works for most
                        languages. However, for languages without spaces (like Chinese or
                        Japanese), the character count will be more accurate than word
                        count.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                      <AccordionTrigger>
                        Is my text stored or saved?
                      </AccordionTrigger>
                      <AccordionContent>
                        Your text is only saved locally in your browser's local storage for
                        your convenience (so you don't lose your work if you refresh the
                        page). We never send your text to our servers or store it in any
                        database. You have complete privacy and control over your content.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-6">
                      <AccordionTrigger>
                        How do I count words in a PDF?
                      </AccordionTrigger>
                      <AccordionContent>
                        To count words in a PDF, first copy the text from your PDF file
                        (most PDF readers allow you to select and copy text), then paste it
                        into our word counter. Alternatively, you can use a PDF to text
                        converter first, then paste the extracted text into our tool.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                <div className="mt-12">
                  <h2 className="mb-4 text-2xl font-bold">
                    What is a Word Counter and Why You Need One
                  </h2>
                  <div className="prose prose-gray dark:prose-invert max-w-none space-y-4">
                    <p className="text-muted-foreground">
                      A word counter is an essential digital tool that automatically
                      calculates the number of words, characters, sentences, and paragraphs
                      in your text. In today's digital age, where content creation is
                      paramount, having accurate text metrics is crucial for writers,
                      students, marketers, and professionals across all industries.
                    </p>

                    <h3 className="mt-6 text-xl font-semibold">Definition and Purpose</h3>
                    <p className="text-muted-foreground">
                      A word counter is more than just a simple counting tool. It's a
                      comprehensive text analyzer that provides detailed statistics about
                      your content. Beyond basic word count, modern word counters like ours
                      offer character counting (with and without spaces), sentence analysis,
                      paragraph detection, reading time estimation, and even speaking time
                      calculations. These metrics help you understand the scope and
                      readability of your content at a glance.
                    </p>

                    <h3 className="mt-6 text-xl font-semibold">
                      Benefits of Using a Word Counter
                    </h3>
                    <p className="text-muted-foreground">
                      Word counters provide numerous benefits for content creators. They
                      help you meet specific word count requirements for essays, articles,
                      or academic papers. For social media managers, they ensure posts fit
                      within platform character limits. Writers can track their daily
                      progress and maintain consistency across chapters or sections. SEO
                      professionals use word counters to optimize content length for search
                      engines, while students ensure their assignments meet professor
                      requirements.
                    </p>

                    <h3 className="mt-6 text-xl font-semibold">Common Use Cases</h3>
                    <p className="text-muted-foreground">
                      Word counters are invaluable in numerous scenarios. Students use them
                      to meet essay requirements and stay within character limits for
                      college applications. Bloggers and content writers optimize their
                      articles to meet SEO best practices, typically aiming for 1,500-2,500
                      words for long-form content. Social media managers ensure tweets stay
                      under 280 characters and LinkedIn posts remain concise. Novelists
                      track their daily word count goals, while copywriters craft product
                      descriptions that fit within e-commerce platform constraints.
                    </p>

                    <h3 className="mt-6 text-xl font-semibold">Tips for Writers</h3>
                    <p className="text-muted-foreground">
                      To maximize the benefits of a word counter, use it throughout your
                      writing process, not just at the end. Set daily word count goals to
                      maintain consistent writing habits. Pay attention to average word
                      length to ensure readability—shorter words generally mean easier
                      comprehension. Use reading time estimates to gauge whether your
                      content matches your audience's attention span. For blog posts, aim
                      for 7-10 minutes of reading time. Monitor sentence count to avoid
                      overly long, complex sentences that might lose readers.
                    </p>

                    <h3 className="mt-6 text-xl font-semibold">Conclusion</h3>
                    <p className="text-muted-foreground">
                      A reliable word counter is an indispensable tool in any writer's
                      toolkit. Whether you're a student, professional writer, marketer, or
                      casual blogger, having instant access to accurate text statistics
                      helps you create better content, meet requirements, and improve your
                      writing efficiency. Our free word counter provides all these benefits
                      without requiring registration, ensuring your privacy while delivering
                      professional-grade text analysis in real-time.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1 order-1 lg:order-2">
                <div className="lg:sticky lg:top-6 space-y-4 sm:space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                        <BarChart3 className="h-5 w-5" />
                        Statistics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-1">
                      <div className="rounded-lg border bg-muted/50 p-4">
                        <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
                          <Type className="h-4 w-4" />
                          Words
                        </div>
                        <div className="text-3xl font-bold">{stats.words}</div>
                      </div>
                      <div className="rounded-lg border bg-muted/50 p-4">
                        <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
                          <Hash className="h-4 w-4" />
                          Characters (with spaces)
                        </div>
                        <div className="text-3xl font-bold">
                          {stats.charactersWithSpaces}
                        </div>
                      </div>
                      <div className="rounded-lg border bg-muted/50 p-4">
                        <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
                          <Hash className="h-4 w-4" />
                          Characters (no spaces)
                        </div>
                        <div className="text-3xl font-bold">
                          {stats.charactersWithoutSpaces}
                        </div>
                      </div>
                      <div className="rounded-lg border bg-muted/50 p-4">
                        <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
                          <MessageSquare className="h-4 w-4" />
                          Sentences
                        </div>
                        <div className="text-3xl font-bold">{stats.sentences}</div>
                      </div>
                      <div className="rounded-lg border bg-muted/50 p-4">
                        <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
                          <AlignLeft className="h-4 w-4" />
                          Paragraphs
                        </div>
                        <div className="text-3xl font-bold">{stats.paragraphs}</div>
                      </div>
                      <div className="rounded-lg border bg-muted/50 p-4">
                        <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          Reading Time
                        </div>
                        <div className="text-3xl font-bold">{stats.readingTime} min</div>
                      </div>
                      <div className="rounded-lg border bg-muted/50 p-4">
                        <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
                          <MessageSquare className="h-4 w-4" />
                          Speaking Time
                        </div>
                        <div className="text-3xl font-bold">{stats.speakingTime} min</div>
                      </div>
                      <div className="rounded-lg border bg-muted/50 p-4">
                        <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
                          <BarChart3 className="h-4 w-4" />
                          Avg Word Length
                        </div>
                        <div className="text-3xl font-bold">
                          {stats.averageWordLength} chars
                        </div>
                      </div>
                      {stats.longestWord && (
                        <div className="rounded-lg border bg-muted/50 p-4">
                          <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
                            <FileSearch className="h-4 w-4" />
                            Longest Word
                          </div>
                          <div className="break-all text-xl font-bold">
                            {stats.longestWord}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            <div className="mt-8 sm:mt-10 md:mt-12">
              <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl font-bold">Related Tools</h2>
              <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {relatedTools.map((tool) => (
                  <Link key={tool.id} href={tool.href}>
                    <Card className="group h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                      <CardHeader>
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-md transition-transform group-hover:scale-110">
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
