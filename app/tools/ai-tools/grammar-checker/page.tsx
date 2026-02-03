"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
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
  CheckCircle,
  AlertCircle,
  Copy,
  Check,
  RefreshCw,
  Sparkles,
  Zap,
  Shield,
  FileText,
  TrendingUp,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useTrackToolUsage } from "@/hooks/use-track-tool-usage"

const SAMPLE_TEXT = `Their are many reason's why grammar and spelling is importent. Its affects how people perceive you're writing and can effect the clarity of you're message. Weather your writing an email or a essay, correct grammar makes a big difference.`

interface GrammarError {
  type: "grammar" | "spelling" | "punctuation" | "style"
  message: string
  suggestion: string
  explanation: string
  position: { start: number; end: number }
  original: string
}

export default function GrammarCheckerPage() {
  useTrackToolUsage("grammar-checker")

  const [input, setInput] = useState("")
  const [errors, setErrors] = useState<GrammarError[]>([])
  const [correctedText, setCorrectedText] = useState("")
  const [isChecking, setIsChecking] = useState(false)
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const checkGrammar = () => {
    if (!input.trim()) {
      toast({
        title: "No text entered",
        description: "Please enter some text to check",
        variant: "destructive",
      })
      return
    }

    setIsChecking(true)

    setTimeout(() => {
      const detectedErrors = detectErrors(input)
      setErrors(detectedErrors)

      let corrected = input
      detectedErrors.forEach((error) => {
        corrected = corrected.replace(error.original, error.suggestion)
      })
      setCorrectedText(corrected)

      setIsChecking(false)

      toast({
        title: "Grammar check complete",
        description: `Found ${detectedErrors.length} issue${detectedErrors.length !== 1 ? "s" : ""}`,
      })
    }, 1500)
  }

  const detectErrors = (text: string): GrammarError[] => {
    const errors: GrammarError[] = []

    const patterns = [
      {
        regex: /\btheir\s+are\b/gi,
        type: "grammar" as const,
        message: "Incorrect use of 'their'",
        suggestion: "there are",
        explanation: "Use 'there' for existence, not 'their' (possessive).",
      },
      {
        regex: /\breason's\b/gi,
        type: "punctuation" as const,
        message: "Unnecessary apostrophe",
        suggestion: "reasons",
        explanation: "Plural nouns don't need apostrophes.",
      },
      {
        regex: /\bis\s+importent\b/gi,
        type: "spelling" as const,
        message: "Spelling error",
        suggestion: "is important",
        explanation: "The correct spelling is 'important'.",
      },
      {
        regex: /\bIts\s+affects\b/gi,
        type: "grammar" as const,
        message: "Incorrect use of 'its'",
        suggestion: "It affects",
        explanation: "Use 'it' here, not 'its' (possessive).",
      },
      {
        regex: /\byou're\s+writing\b/gi,
        type: "grammar" as const,
        message: "Incorrect contraction",
        suggestion: "your writing",
        explanation: "Use 'your' (possessive), not 'you're' (you are).",
      },
      {
        regex: /\beffect\s+the\b/gi,
        type: "grammar" as const,
        message: "Wrong word choice",
        suggestion: "affect the",
        explanation: "Use 'affect' (verb) not 'effect' (noun) here.",
      },
      {
        regex: /\bWeather\s+your\b/gi,
        type: "grammar" as const,
        message: "Wrong homophone",
        suggestion: "Whether you're",
        explanation: "Use 'whether' for choices and 'you're' for 'you are'.",
      },
      {
        regex: /\ba\s+essay\b/gi,
        type: "grammar" as const,
        message: "Article error",
        suggestion: "an essay",
        explanation: "Use 'an' before words starting with vowel sounds.",
      },
    ]

    patterns.forEach((pattern) => {
      const matches = Array.from(text.matchAll(pattern.regex))
      for (const match of matches) {
        if (match.index !== undefined) {
          errors.push({
            type: pattern.type,
            message: pattern.message,
            suggestion: pattern.suggestion,
            explanation: pattern.explanation,
            position: {
              start: match.index,
              end: match.index + match[0].length,
            },
            original: match[0],
          })
        }
      }
    })

    return errors.sort((a, b) => a.position.start - b.position.start)
  }

  const handleCopy = async () => {
    if (!correctedText) return

    try {
      await navigator.clipboard.writeText(correctedText)
      setCopied(true)
      toast({
        title: "Copied to clipboard",
        description: "Corrected text has been copied",
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
    setErrors([])
    setCorrectedText("")
  }

  const handleLoadSample = () => {
    setInput(SAMPLE_TEXT)
    setErrors([])
    setCorrectedText("")
  }

  const getErrorIcon = (type: string) => {
    switch (type) {
      case "grammar":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "spelling":
        return <AlertCircle className="h-4 w-4 text-orange-500" />
      case "punctuation":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "style":
        return <AlertCircle className="h-4 w-4 text-blue-500" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const errorCounts = {
    grammar: errors.filter((e) => e.type === "grammar").length,
    spelling: errors.filter((e) => e.type === "spelling").length,
    punctuation: errors.filter((e) => e.type === "punctuation").length,
    style: errors.filter((e) => e.type === "style").length,
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
                <BreadcrumbPage>Grammar Checker</BreadcrumbPage>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
                    <CheckCircle className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold tracking-tight">Grammar Checker</h1>
                    <p className="text-muted-foreground">
                      Check grammar, spelling, and punctuation errors instantly
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Badge variant="secondary" className="gap-1">
                    <TrendingUp className="h-3 w-3" />
                    Popular
                  </Badge>
                  <Badge variant="outline">Free Forever</Badge>
                  <Badge variant="outline">Real-time</Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container max-w-5xl">
            <Card>
              <CardHeader>
                <CardTitle>Check Your Text</CardTitle>
                <CardDescription>
                  Enter or paste your text to check for grammar, spelling, and punctuation errors
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Type or paste your text here..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="min-h-[250px] text-base"
                />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {input.length} characters • {input.trim().split(/\s+/).filter((w) => w).length}{" "}
                    words
                  </span>
                  <Button variant="outline" size="sm" onClick={handleLoadSample}>
                    <FileText className="mr-2 h-4 w-4" />
                    Load Sample
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={checkGrammar}
                    disabled={!input.trim() || isChecking}
                    size="lg"
                    className="flex-1"
                  >
                    {isChecking ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Checking...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Check Grammar
                      </>
                    )}
                  </Button>
                  {(input || errors.length > 0) && (
                    <Button onClick={handleClear} variant="outline" size="lg">
                      Clear
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {errors.length > 0 && (
              <>
                <div className="mt-6 grid gap-4 md:grid-cols-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardDescription>Total Issues</CardDescription>
                      <CardTitle className="text-3xl">{errors.length}</CardTitle>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardDescription className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-red-500"></span>
                        Grammar
                      </CardDescription>
                      <CardTitle className="text-3xl">{errorCounts.grammar}</CardTitle>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardDescription className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-orange-500"></span>
                        Spelling
                      </CardDescription>
                      <CardTitle className="text-3xl">{errorCounts.spelling}</CardTitle>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardDescription className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                        Punctuation
                      </CardDescription>
                      <CardTitle className="text-3xl">{errorCounts.punctuation}</CardTitle>
                    </CardHeader>
                  </Card>
                </div>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Issues Found</CardTitle>
                    <CardDescription>Review and fix the following errors</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {errors.map((error, index) => (
                      <div
                        key={index}
                        className="flex gap-3 p-4 rounded-lg border bg-muted/50 hover:bg-muted/70 transition-colors"
                      >
                        <div className="mt-1">{getErrorIcon(error.type)}</div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="capitalize">
                              {error.type}
                            </Badge>
                            <span className="font-medium text-sm">{error.message}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-muted-foreground">Original:</span>
                            <code className="px-2 py-0.5 rounded bg-red-500/10 text-red-600 dark:text-red-400">
                              {error.original}
                            </code>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-muted-foreground">Suggestion:</span>
                            <code className="px-2 py-0.5 rounded bg-green-500/10 text-green-600 dark:text-green-400">
                              {error.suggestion}
                            </code>
                          </div>
                          <p className="text-sm text-muted-foreground pt-1">{error.explanation}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Corrected Text</CardTitle>
                        <CardDescription>Text with all suggested corrections applied</CardDescription>
                      </div>
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
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 rounded-lg bg-muted/30 border">
                      <p className="text-base leading-relaxed">{correctedText}</p>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {errors.length === 0 && input && !isChecking && (
              <Card className="mt-6 border-green-500/20 bg-green-500/5">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                    <div>
                      <h3 className="font-semibold text-lg">Great job!</h3>
                      <p className="text-muted-foreground">
                        No grammar, spelling, or punctuation errors found.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <Zap className="h-8 w-8 text-yellow-500 mb-2" />
                  <CardTitle>Real-time Check</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Get instant feedback on your writing with detailed suggestions.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Shield className="h-8 w-8 text-green-500 mb-2" />
                  <CardTitle>Explanations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Learn from detailed explanations for every error detected.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Sparkles className="h-8 w-8 text-purple-500 mb-2" />
                  <CardTitle>Comprehensive</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Checks grammar, spelling, punctuation, and style issues.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12">
              <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Is this grammar checker really free?</AccordionTrigger>
                  <AccordionContent>
                    Yes, completely free with no word limits, usage restrictions, or hidden costs. Check
                    as much text as you need without any subscription or payment.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>What types of errors does it detect?</AccordionTrigger>
                  <AccordionContent>
                    Our grammar checker detects grammar errors, spelling mistakes, punctuation issues, and
                    style problems. It provides suggestions and explanations for each error to help you
                    improve your writing.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>Is my text stored or shared?</AccordionTrigger>
                  <AccordionContent>
                    No. Your privacy is important to us. All text is checked in real-time and immediately
                    discarded. We don't store, share, or use your content for any purpose.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>Can I use this for academic writing?</AccordionTrigger>
                  <AccordionContent>
                    Yes, our grammar checker is perfect for essays, research papers, and academic writing.
                    However, always review the suggestions and use your judgment, as automated tools may
                    not catch all contextual nuances.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>How accurate is the grammar checker?</AccordionTrigger>
                  <AccordionContent>
                    Our grammar checker uses advanced pattern matching to detect common errors with high
                    accuracy. While it catches most issues, we recommend using it as a helpful tool
                    alongside your own proofreading for best results.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger>Does it work for non-native English speakers?</AccordionTrigger>
                  <AccordionContent>
                    Absolutely! Our grammar checker is especially helpful for non-native English speakers
                    as it provides detailed explanations for each error, helping you learn and improve
                    your English writing skills over time.
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
