"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Copy, Check, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function JSONPlayground() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const beautifyJSON = () => {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, 2))
      setError("")
      toast({
        title: "Success!",
        description: "JSON beautified successfully",
      })
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON")
      setOutput("")
    }
  }

  const minifyJSON = () => {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed))
      setError("")
      toast({
        title: "Success!",
        description: "JSON minified successfully",
      })
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON")
      setOutput("")
    }
  }

  const clearAll = () => {
    setInput("")
    setOutput("")
    setError("")
  }

  const copyOutput = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    toast({
      title: "Copied!",
      description: "JSON copied to clipboard",
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
                JSON Playground
              </h1>
              <p className="text-lg text-white/90">
                Interactive JSON editor with beautify, minify, and validation
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container max-w-7xl">
            <div className="mb-6 flex gap-3">
              <Button onClick={beautifyJSON}>
                <Sparkles className="mr-2 h-4 w-4" />
                Beautify
              </Button>
              <Button variant="outline" onClick={minifyJSON}>
                Minify
              </Button>
              <Button variant="outline" onClick={clearAll}>
                Clear
              </Button>
              <Button variant="outline" onClick={copyOutput} disabled={!output}>
                {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                Copy Output
              </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Input JSON</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder='{"key": "value"}'
                    className="font-mono text-sm"
                    rows={20}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Output</CardTitle>
                </CardHeader>
                <CardContent>
                  {error ? (
                    <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
                      <p className="font-semibold">Error:</p>
                      <p className="text-sm">{error}</p>
                    </div>
                  ) : (
                    <Textarea
                      value={output}
                      readOnly
                      placeholder="Output will appear here..."
                      className="font-mono text-sm"
                      rows={20}
                    />
                  )}
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
