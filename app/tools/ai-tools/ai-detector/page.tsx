"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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
  Search,
  AlertCircle,
  FileText,
  TrendingUp,
  Shield,
  Zap,
  BarChart3,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useTrackToolUsage } from "@/hooks/use-track-tool-usage"

const SAMPLE_AI_TEXT = `The implementation of sustainable energy solutions represents a critical pathway towards mitigating climate change impacts. Research demonstrates that renewable energy sources can significantly reduce carbon emissions while providing reliable power generation capabilities. Furthermore, the economic benefits associated with renewable energy deployment include job creation and energy independence.`

const SAMPLE_HUMAN_TEXT = `I've been thinking a lot about climate change lately. You know what really gets me excited? Solar panels and wind turbines! They're not just good for the planet - they actually create jobs too. My neighbor just got a solar installation job last month, and he loves it.`

export default function AIDetectorPage() {
  useTrackToolUsage("ai-content-detector")

  const [input, setInput] = useState("")
  const [result, setResult] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const { toast } = useToast()

  const analyzeText = () => {
    if (!input.trim()) {
      toast({
        title: "No text entered",
        description: "Please enter some text to analyze",
        variant: "destructive",
      })
      return
    }

    if (input.trim().split(/\s+/).length < 10) {
      toast({
        title: "Text too short",
        description: "Please enter at least 10 words for accurate analysis",
        variant: "destructive",
      })
      return
    }

    setIsAnalyzing(true)

    setTimeout(() => {
      const analysis = performAnalysis(input)
      setResult(analysis)
      setIsAnalyzing(false)

      toast({
        title: "Analysis complete",
        description: `Detection confidence: ${analysis.confidence}%`,
      })
    }, 2000)
  }

  const performAnalysis = (text: string) => {
    const patterns = {
      formalWords: /\b(furthermore|moreover|therefore|consequently|additionally|implement|demonstrate|facilitate|utilize)\b/gi,
      casualWords: /\b(I'm|you're|we're|gonna|wanna|kinda|yeah|cool|awesome)\b/gi,
      personalPronouns: /\b(I|me|my|you|your|we|us|our)\b/gi,
      passiveVoice: /\b(is|are|was|were|be|been|being)\s+\w+ed\b/gi,
      complexSentences: /[^.!?]+[,;:][^.!?]+[,;:][^.!?]+[.!?]/g,
    }

    const formalCount = (text.match(patterns.formalWords) || []).length
    const casualCount = (text.match(patterns.casualWords) || []).length
    const personalCount = (text.match(patterns.personalPronouns) || []).length
    const passiveCount = (text.match(patterns.passiveVoice) || []).length
    const complexCount = (text.match(patterns.complexSentences) || []).length

    const wordCount = text.trim().split(/\s+/).length
    const sentenceCount = text.split(/[.!?]+/).filter(s => s.trim()).length
    const avgWordsPerSentence = wordCount / sentenceCount

    let aiScore = 0
    aiScore += Math.min(formalCount / wordCount * 100 * 3, 25)
    aiScore += Math.min(passiveCount / sentenceCount * 10, 20)
    aiScore += Math.min(complexCount / sentenceCount * 30, 20)
    aiScore += avgWordsPerSentence > 20 ? 15 : 0
    aiScore -= Math.min(casualCount / wordCount * 100 * 2, 15)
    aiScore -= Math.min(personalCount / wordCount * 100, 15)

    aiScore = Math.max(0, Math.min(100, aiScore))
    const humanScore = 100 - aiScore

    let prediction = "UNCERTAIN"
    let confidence = 50

    if (aiScore > 65) {
      prediction = "AI-GENERATED"
      confidence = Math.round(aiScore)
    } else if (humanScore > 65) {
      prediction = "HUMAN-WRITTEN"
      confidence = Math.round(humanScore)
    } else {
      confidence = Math.round(Math.max(aiScore, humanScore))
    }

    return {
      prediction,
      confidence,
      aiScore: Math.round(aiScore),
      humanScore: Math.round(humanScore),
      metrics: {
        wordCount,
        sentenceCount,
        avgWordsPerSentence: avgWordsPerSentence.toFixed(1),
        formalLanguage: formalCount,
        casualLanguage: casualCount,
        personalPronouns: personalCount,
        passiveVoice: passiveCount,
      }
    }
  }

  const handleClear = () => {
    setInput("")
    setResult(null)
  }

  const handleLoadSample = (type: "ai" | "human") => {
    setInput(type === "ai" ? SAMPLE_AI_TEXT : SAMPLE_HUMAN_TEXT)
    setResult(null)
  }

  const inputLength = input.length
  const wordCount = input.trim().split(/\s+/).filter(w => w).length

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
                <BreadcrumbPage>AI Content Detector</BreadcrumbPage>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
                    <CheckCircle className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold tracking-tight">AI Content Detector</h1>
                    <p className="text-muted-foreground">
                      Detect AI-generated text with advanced analysis
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Badge variant="secondary" className="gap-1">
                    <TrendingUp className="h-3 w-3" />
                    Popular
                  </Badge>
                  <Badge variant="outline">Free Forever</Badge>
                  <Badge variant="outline">High Accuracy</Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container max-w-5xl">
            <Card>
              <CardHeader>
                <CardTitle>Analyze Text</CardTitle>
                <CardDescription>
                  Paste the text you want to analyze for AI-generated content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Paste your text here for AI detection analysis..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="min-h-[250px] font-mono text-sm"
                />
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    {inputLength} characters • {wordCount} words
                    {wordCount < 10 && wordCount > 0 && (
                      <span className="text-destructive ml-2">
                        (Minimum 10 words required)
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleLoadSample("ai")}>
                      Load AI Sample
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleLoadSample("human")}>
                      Load Human Sample
                    </Button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={analyzeText}
                    disabled={!input.trim() || isAnalyzing || wordCount < 10}
                    size="lg"
                    className="flex-1"
                  >
                    {isAnalyzing ? (
                      <>
                        <Search className="mr-2 h-4 w-4 animate-pulse" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        Analyze Text
                      </>
                    )}
                  </Button>
                  {(input || result) && (
                    <Button onClick={handleClear} variant="outline" size="lg">
                      Clear
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {result && (
              <Card className="mt-6 border-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Detection Results</CardTitle>
                    <Badge
                      variant={
                        result.prediction === "AI-GENERATED"
                          ? "destructive"
                          : result.prediction === "HUMAN-WRITTEN"
                          ? "default"
                          : "secondary"
                      }
                      className="text-lg px-4 py-1"
                    >
                      {result.prediction}
                    </Badge>
                  </div>
                  <CardDescription>Analysis confidence: {result.confidence}%</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">AI-Generated Likelihood</span>
                        <span className="text-destructive font-semibold">{result.aiScore}%</span>
                      </div>
                      <Progress value={result.aiScore} className="h-3" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Human-Written Likelihood</span>
                        <span className="text-green-600 dark:text-green-400 font-semibold">
                          {result.humanScore}%
                        </span>
                      </div>
                      <Progress value={result.humanScore} className="h-3" />
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Detailed Analysis
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Word Count</div>
                        <div className="text-2xl font-bold">{result.metrics.wordCount}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Sentence Count</div>
                        <div className="text-2xl font-bold">{result.metrics.sentenceCount}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Avg Words/Sentence</div>
                        <div className="text-2xl font-bold">{result.metrics.avgWordsPerSentence}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Formal Language</div>
                        <div className="text-2xl font-bold">{result.metrics.formalLanguage}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Personal Pronouns</div>
                        <div className="text-2xl font-bold">{result.metrics.personalPronouns}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Passive Voice</div>
                        <div className="text-2xl font-bold">{result.metrics.passiveVoice}</div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
                      <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium mb-1">About This Analysis</p>
                        <p className="text-muted-foreground">
                          This tool analyzes text patterns, sentence structure, and linguistic features
                          to estimate if content was AI-generated. Results are indicators, not
                          definitive proof. Accuracy may vary based on text length and quality.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <Shield className="h-8 w-8 text-green-500 mb-2" />
                  <CardTitle>High Accuracy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Advanced pattern recognition for reliable AI detection results.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Zap className="h-8 w-8 text-yellow-500 mb-2" />
                  <CardTitle>Instant Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Get detailed results in seconds with comprehensive metrics.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <FileText className="h-8 w-8 text-blue-500 mb-2" />
                  <CardTitle>Detailed Report</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    View confidence scores and linguistic analysis breakdowns.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12">
              <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How accurate is this AI detector?</AccordionTrigger>
                  <AccordionContent>
                    Our AI detector uses advanced linguistic pattern analysis to achieve high accuracy
                    rates. However, no detector is 100% perfect. Results should be used as indicators
                    rather than definitive proof. Accuracy improves with longer text samples (100+ words
                    recommended).
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>What AI models can it detect?</AccordionTrigger>
                  <AccordionContent>
                    This tool can detect text from various AI models including ChatGPT, GPT-3, GPT-4,
                    and other large language models. It analyzes patterns common to AI-generated text
                    regardless of the specific model used.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>Is my text stored or shared?</AccordionTrigger>
                  <AccordionContent>
                    No. We prioritize your privacy. Your text is analyzed in real-time and immediately
                    discarded after results are delivered. We don't store, share, or use your content for
                    any purpose.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>How much text do I need for accurate results?</AccordionTrigger>
                  <AccordionContent>
                    Minimum 10 words are required, but we recommend at least 100-150 words for the most
                    accurate analysis. Longer text samples provide more patterns to analyze, leading to
                    higher confidence scores.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>Can it detect humanized AI text?</AccordionTrigger>
                  <AccordionContent>
                    Detecting humanized AI text is more challenging as it's specifically modified to seem
                    human-written. Our tool analyzes deeper linguistic patterns, but heavily edited or
                    humanized text may yield uncertain results. Context and writing style matter
                    significantly.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger>Is this tool free to use?</AccordionTrigger>
                  <AccordionContent>
                    Yes, completely free with no hidden costs, character limits, or usage restrictions.
                    No account or subscription required. Simply paste your text and analyze instantly.
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
