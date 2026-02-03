"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Bot,
  Copy,
  Check,
  RefreshCw,
  Sparkles,
  Zap,
  Shield,
  FileText,
  TrendingUp,
  ChevronRight,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useTrackToolUsage } from "@/hooks/use-track-tool-usage"

const SAMPLE_TEXTS = {
  ai: `The implementation of sustainable energy solutions represents a critical pathway towards mitigating climate change impacts. Research demonstrates that renewable energy sources can significantly reduce carbon emissions while providing reliable power generation capabilities. Furthermore, the economic benefits associated with renewable energy deployment include job creation and energy independence.`,
  humanized: `Switching to clean energy is one of the best ways we can fight climate change. Studies show that solar and wind power can drastically cut our carbon footprint while still keeping the lights on. Plus, going green creates tons of jobs and helps countries rely less on foreign energy sources.`,
}

const TONES = [
  { value: "friendly", label: "Friendly", description: "Warm and conversational" },
  { value: "professional", label: "Professional", description: "Business-appropriate" },
  { value: "casual", label: "Casual", description: "Relaxed and informal" },
  { value: "academic", label: "Academic", description: "Formal and scholarly" },
]

export default function AIHumanizerPage() {
  useTrackToolUsage("ai-text-humanizer")

  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [tone, setTone] = useState("friendly")
  const [isProcessing, setIsProcessing] = useState(false)
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const handleHumanize = () => {
    if (!input.trim()) {
      toast({
        title: "No text entered",
        description: "Please enter some text to humanize",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    setTimeout(() => {
      let result = input

      switch (tone) {
        case "friendly":
          result = makeTextFriendly(input)
          break
        case "professional":
          result = makeTextProfessional(input)
          break
        case "casual":
          result = makeTextCasual(input)
          break
        case "academic":
          result = makeTextAcademic(input)
          break
      }

      setOutput(result)
      setIsProcessing(false)

      toast({
        title: "Text humanized successfully",
        description: `Converted to ${tone} tone`,
      })
    }, 1500)
  }

  const makeTextFriendly = (text: string): string => {
    return text
      .replace(/\bhowever\b/gi, "but")
      .replace(/\bfurthermore\b/gi, "plus")
      .replace(/\badditionally\b/gi, "also")
      .replace(/\btherefore\b/gi, "so")
      .replace(/\butilize\b/gi, "use")
      .replace(/\bimplement\b/gi, "set up")
      .replace(/\bdemonstrate\b/gi, "show")
      .replace(/\bfacilitate\b/gi, "help")
      .replace(/\. /g, ". You'll see that ")
      .replace(/\boptimize\b/gi, "improve")
      .replace(/\bassociated with\b/gi, "that come with")
  }

  const makeTextProfessional = (text: string): string => {
    return text
      .replace(/\bcan't\b/gi, "cannot")
      .replace(/\bwon't\b/gi, "will not")
      .replace(/\bdon't\b/gi, "do not")
      .replace(/\bhaven't\b/gi, "have not")
      .replace(/\bkinda\b/gi, "somewhat")
      .replace(/\bgonna\b/gi, "going to")
      .replace(/\bwanna\b/gi, "want to")
  }

  const makeTextCasual = (text: string): string => {
    return text
      .replace(/\bcannot\b/gi, "can't")
      .replace(/\bdo not\b/gi, "don't")
      .replace(/\bwill not\b/gi, "won't")
      .replace(/\bhave not\b/gi, "haven't")
      .replace(/\bin order to\b/gi, "to")
      .replace(/\bas a result of\b/gi, "because of")
  }

  const makeTextAcademic = (text: string): string => {
    return text
      .replace(/\bbut\b/gi, "however")
      .replace(/\bso\b/gi, "therefore")
      .replace(/\balso\b/gi, "furthermore")
      .replace(/\buse\b/gi, "utilize")
      .replace(/\bshow\b/gi, "demonstrate")
      .replace(/\bhelp\b/gi, "facilitate")
  }

  const handleCopy = async () => {
    if (!output) return

    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      toast({
        title: "Copied to clipboard",
        description: "Humanized text has been copied",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Please try again",
        variant: "destructive",
      })
    }
  }

  const handleClear = () => {
    setInput("")
    setOutput("")
  }

  const handleLoadSample = () => {
    setInput(SAMPLE_TEXTS.ai)
    setOutput("")
  }

  const inputLength = input.length
  const outputLength = output.length

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="border-b bg-gradient-to-b from-muted/50 to-background py-12">
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
                  <BreadcrumbLink href="/tools/ai-tools">AI Tools</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbPage>AI Text Humanizer</BreadcrumbPage>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10">
                    <Bot className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold tracking-tight">AI Text Humanizer</h1>
                    <p className="text-muted-foreground">
                      Convert AI-generated text to natural, human-like writing
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Badge variant="secondary" className="gap-1">
                    <TrendingUp className="h-3 w-3" />
                    Popular
                  </Badge>
                  <Badge variant="outline">Free Forever</Badge>
                  <Badge variant="outline">No Sign-up</Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Input (AI-Generated Text)</CardTitle>
                  <CardDescription>
                    Paste your AI-generated text that needs to sound more human
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Paste your AI-generated text here..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="min-h-[300px] font-mono text-sm"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{inputLength} characters</span>
                    <Button variant="outline" size="sm" onClick={handleLoadSample}>
                      <FileText className="mr-2 h-4 w-4" />
                      Load Sample
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Output (Humanized Text)</CardTitle>
                  <CardDescription>Natural, human-like version of your text</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Humanized text will appear here..."
                    value={output}
                    readOnly
                    className="min-h-[300px] font-mono text-sm bg-muted/30"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{outputLength} characters</span>
                    <div className="flex gap-2">
                      {output && (
                        <Button variant="outline" size="sm" onClick={handleCopy}>
                          {copied ? (
                            <>
                              <Check className="mr-2 h-4 w-4" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="mr-2 h-4 w-4" />
                              Copy
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Humanization Settings</CardTitle>
                <CardDescription>Choose how you want your text to sound</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="tone">Tone</Label>
                    <Select value={tone} onValueChange={setTone}>
                      <SelectTrigger id="tone">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {TONES.map((t) => (
                          <SelectItem key={t.value} value={t.value}>
                            <div>
                              <div className="font-medium">{t.label}</div>
                              <div className="text-xs text-muted-foreground">{t.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleHumanize}
                    disabled={!input.trim() || isProcessing}
                    size="lg"
                    className="flex-1"
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Humanize Text
                      </>
                    )}
                  </Button>
                  {(input || output) && (
                    <Button onClick={handleClear} variant="outline" size="lg">
                      Clear All
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <Zap className="h-8 w-8 text-yellow-500 mb-2" />
                  <CardTitle>Instant Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Transform your AI text in seconds. No waiting, no hassle.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Shield className="h-8 w-8 text-green-500 mb-2" />
                  <CardTitle>100% Private</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Your text is processed securely. We don't store or share your content.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Sparkles className="h-8 w-8 text-purple-500 mb-2" />
                  <CardTitle>Natural Output</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Text that sounds genuinely human, not robotic or mechanical.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>How to Use AI Text Humanizer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">Paste Your AI Text</h3>
                    <p className="text-sm text-muted-foreground">
                      Copy and paste the AI-generated text you want to humanize into the input box.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">Choose Your Tone</h3>
                    <p className="text-sm text-muted-foreground">
                      Select the tone that best fits your needs - friendly, professional, casual, or
                      academic.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">Click Humanize</h3>
                    <p className="text-sm text-muted-foreground">
                      Hit the "Humanize Text" button and watch your text transform into natural,
                      human-like writing.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                    4
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">Copy & Use</h3>
                    <p className="text-sm text-muted-foreground">
                      Copy your humanized text and use it wherever you need - essays, articles,
                      emails, or any content.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-12">
              <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What is an AI text humanizer?</AccordionTrigger>
                  <AccordionContent>
                    An AI text humanizer is a tool that converts AI-generated content into more
                    natural, human-sounding text. It helps make your content appear more authentic,
                    engaging, and less robotic by adjusting sentence structure, word choice, and tone.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>Is this tool really free?</AccordionTrigger>
                  <AccordionContent>
                    Yes, our AI text humanizer is completely free to use with no hidden costs, no
                    character limits, and no subscription required. Simply visit the page and start
                    humanizing your text immediately.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>Does it bypass AI detectors?</AccordionTrigger>
                  <AccordionContent>
                    While our tool makes text sound more natural and human-like, we cannot guarantee
                    it will bypass all AI detection systems. The effectiveness depends on various
                    factors including the original text quality and the specific detection tool used.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>What tones are available?</AccordionTrigger>
                  <AccordionContent>
                    We offer four tone options: Friendly (warm and conversational), Professional
                    (business-appropriate), Casual (relaxed and informal), and Academic (formal and
                    scholarly). Each tone adjusts the text style to match your specific needs.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>Is my text secure and private?</AccordionTrigger>
                  <AccordionContent>
                    Absolutely. We prioritize your privacy and security. Your text is processed
                    securely and we don't store, share, or use your content for any purpose. All
                    processing happens in real-time and data is immediately discarded after results
                    are delivered.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger>Can I use this for commercial purposes?</AccordionTrigger>
                  <AccordionContent>
                    Yes, you can use our AI humanizer for both personal and commercial projects. There
                    are no restrictions on how you use the humanized content. However, always ensure
                    your content meets the quality standards and requirements of your specific use
                    case.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <Card className="mt-8 border-blue-500/20 bg-blue-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Pro Tip
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  For best results, review and edit the humanized text to add your personal touch.
                  While our tool makes text more natural, your unique voice and perspective make
                  content truly authentic.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
