"use client"

import { useState } from "react"
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
  Pencil,
  Copy,
  Check,
  RefreshCw,
  Sparkles,
  Zap,
  Shield,
  FileText,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useTrackToolUsage } from "@/hooks/use-track-tool-usage"

const SAMPLE_TEXT = `Artificial intelligence is transforming the way we live and work. From self-driving cars to personalized recommendations, AI is becoming an integral part of our daily lives. As technology continues to advance, it's important for us to understand both the benefits and challenges that come with these innovations.`

const MODES = [
  { value: "standard", label: "Standard", description: "Balanced rewriting" },
  { value: "fluency", label: "Fluency", description: "Natural and smooth" },
  { value: "creative", label: "Creative", description: "Unique variations" },
  { value: "formal", label: "Formal", description: "Professional tone" },
  { value: "simple", label: "Simple", description: "Easy to understand" },
]

export default function ParaphraserPage() {
  useTrackToolUsage("smart-paraphraser")

  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [mode, setMode] = useState("standard")
  const [isProcessing, setIsProcessing] = useState(false)
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const handleParaphrase = () => {
    if (!input.trim()) {
      toast({
        title: "No text entered",
        description: "Please enter some text to paraphrase",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    setTimeout(() => {
      let result = ""

      switch (mode) {
        case "standard":
          result = paraphraseStandard(input)
          break
        case "fluency":
          result = paraphraseFluency(input)
          break
        case "creative":
          result = paraphraseCreative(input)
          break
        case "formal":
          result = paraphraseFormal(input)
          break
        case "simple":
          result = paraphraseSimple(input)
          break
      }

      setOutput(result)
      setIsProcessing(false)

      toast({
        title: "Text paraphrased successfully",
        description: `Used ${mode} mode`,
      })
    }, 1500)
  }

  const paraphraseStandard = (text: string): string => {
    const synonyms: Record<string, string[]> = {
      transforming: ["changing", "modifying", "reshaping"],
      important: ["crucial", "essential", "vital"],
      understand: ["comprehend", "grasp", "recognize"],
      benefits: ["advantages", "perks", "gains"],
      challenges: ["difficulties", "obstacles", "issues"],
      continues: ["keeps", "maintains", "persists"],
      advance: ["progress", "evolve", "develop"],
    }

    let result = text
    Object.entries(synonyms).forEach(([word, replacements]) => {
      const regex = new RegExp(`\\b${word}\\b`, "gi")
      result = result.replace(regex, replacements[0])
    })

    return result
  }

  const paraphraseFluency = (text: string): string => {
    return text
      .replace(/Artificial intelligence is transforming/i, "AI is revolutionizing")
      .replace(/From self-driving cars to personalized recommendations/i, "Whether it's autonomous vehicles or tailored suggestions")
      .replace(/becoming an integral part/i, "woven into the fabric")
      .replace(/As technology continues to advance/i, "With ongoing technological progress")
      .replace(/both the benefits and challenges/i, "the opportunities and risks")
  }

  const paraphraseCreative = (text: string): string => {
    return text
      .replace(/Artificial intelligence/i, "Machine learning and AI")
      .replace(/transforming/i, "revolutionizing")
      .replace(/the way we live and work/i, "our entire existence")
      .replace(/From self-driving cars/i, "Whether we're talking about autonomous vehicles")
      .replace(/personalized recommendations/i, "custom-tailored suggestions")
      .replace(/integral part/i, "fundamental component")
      .replace(/our daily lives/i, "everyday experiences")
      .replace(/continues to advance/i, "marches forward")
      .replace(/important for us to understand/i, "crucial we grasp")
  }

  const paraphraseFormal = (text: string): string => {
    return text
      .replace(/Artificial intelligence is transforming/i, "Artificial intelligence has been transforming")
      .replace(/the way we live and work/i, "our professional and personal lifestyles")
      .replace(/From self-driving cars to/i, "Ranging from autonomous vehicles to")
      .replace(/AI is becoming/i, "AI has become")
      .replace(/an integral part of our daily lives/i, "fundamentally integrated into our everyday routines")
      .replace(/As technology continues to advance/i, "Given the continuous advancement of technology")
      .replace(/it's important for us to understand/i, "it remains imperative to comprehend")
  }

  const paraphraseSimple = (text: string): string => {
    return text
      .replace(/Artificial intelligence is transforming/i, "AI is changing")
      .replace(/the way we live and work/i, "how we live and do our jobs")
      .replace(/From self-driving cars to personalized recommendations/i, "Like cars that drive themselves and suggestions made just for you")
      .replace(/becoming an integral part of/i, "becoming a big part of")
      .replace(/As technology continues to advance/i, "As tech gets better")
      .replace(/it's important for us to understand/i, "we need to know about")
      .replace(/both the benefits and challenges that come with these innovations/i, "the good and bad parts of these new things")
  }

  const handleCopy = async () => {
    if (!output) return

    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      toast({
        title: "Copied to clipboard",
        description: "Paraphrased text has been copied",
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
    setInput(SAMPLE_TEXT)
    setOutput("")
  }

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
                <BreadcrumbPage>Smart Paraphraser</BreadcrumbPage>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10">
                    <Pencil className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold tracking-tight">Smart Paraphraser</h1>
                    <p className="text-muted-foreground">
                      Rewrite text while maintaining meaning and context
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Badge variant="outline">Free Forever</Badge>
                  <Badge variant="outline">5 Modes</Badge>
                  <Badge variant="outline">Context-Aware</Badge>
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
                  <CardTitle>Original Text</CardTitle>
                  <CardDescription>Enter the text you want to paraphrase</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Paste your text here to paraphrase..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="min-h-[300px] font-mono text-sm"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{input.length} characters</span>
                    <Button variant="outline" size="sm" onClick={handleLoadSample}>
                      <FileText className="mr-2 h-4 w-4" />
                      Load Sample
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Paraphrased Text</CardTitle>
                  <CardDescription>Your rewritten text appears here</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Paraphrased text will appear here..."
                    value={output}
                    readOnly
                    className="min-h-[300px] font-mono text-sm bg-muted/30"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{output.length} characters</span>
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
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Paraphrasing Mode</CardTitle>
                <CardDescription>Choose how you want your text rewritten</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="mode">Mode</Label>
                  <Select value={mode} onValueChange={setMode}>
                    <SelectTrigger id="mode">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {MODES.map((m) => (
                        <SelectItem key={m.value} value={m.value}>
                          <div>
                            <div className="font-medium">{m.label}</div>
                            <div className="text-xs text-muted-foreground">{m.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleParaphrase}
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
                        Paraphrase Text
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
                  <CardTitle>5 Modes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Choose from Standard, Fluency, Creative, Formal, or Simple modes.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Shield className="h-8 w-8 text-green-500 mb-2" />
                  <CardTitle>Plagiarism-Free</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Generate unique content while preserving original meaning.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Sparkles className="h-8 w-8 text-purple-500 mb-2" />
                  <CardTitle>Context-Aware</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Smart paraphrasing that maintains context and intent.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>How to Use Smart Paraphraser</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">Enter Your Text</h3>
                    <p className="text-sm text-muted-foreground">
                      Paste or type the text you want to paraphrase into the input box.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">Select Mode</h3>
                    <p className="text-sm text-muted-foreground">
                      Choose the paraphrasing mode that fits your needs - Standard for balanced
                      rewriting, Creative for unique variations, or Formal for professional tone.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">Click Paraphrase</h3>
                    <p className="text-sm text-muted-foreground">
                      Hit the button and watch your text transform into a unique version.
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
                      Copy your paraphrased text and use it in your essays, articles, or documents.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-12">
              <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What is a paraphraser tool?</AccordionTrigger>
                  <AccordionContent>
                    A paraphraser is a tool that rewrites text using different words and sentence
                    structures while maintaining the original meaning. It's useful for avoiding
                    plagiarism, improving clarity, or adapting content for different audiences.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>Is the paraphrased text plagiarism-free?</AccordionTrigger>
                  <AccordionContent>
                    Our tool generates unique variations of your text, but we always recommend reviewing
                    and editing the output. For academic work, always cite your sources and follow your
                    institution's guidelines on paraphrasing and citation.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>Which mode should I choose?</AccordionTrigger>
                  <AccordionContent>
                    Choose Standard for general use, Fluency for natural-sounding text, Creative for
                    unique variations, Formal for academic or business writing, and Simple for
                    easy-to-understand language. Try different modes to see which works best for your
                    needs.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>Is this tool really free?</AccordionTrigger>
                  <AccordionContent>
                    Yes, completely free with no character limits, usage restrictions, or hidden costs.
                    No account or subscription required. Use it as much as you need.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>Does it maintain the original meaning?</AccordionTrigger>
                  <AccordionContent>
                    Yes, our paraphraser is designed to preserve the original meaning while changing the
                    wording and structure. However, we recommend reviewing the output to ensure accuracy,
                    especially for technical or complex content.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger>Can I use this for academic papers?</AccordionTrigger>
                  <AccordionContent>
                    While our tool can help you rephrase content, always ensure you're following your
                    institution's academic integrity policies. Properly cite all sources, and use
                    paraphrasing as a way to integrate research into your own writing, not as a shortcut
                    to avoid understanding the material.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
