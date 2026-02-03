"use client"

import { useState, useRef, useMemo } from "react"
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
import { Switch } from "@/components/ui/switch"
import {
  Code2,
  Star,
  Calendar,
  Check,
  Copy,
  Download,
  Upload,
  Trash2,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Minimize2,
  Maximize2,
  FileJson,
  ArrowRight,
  FileCode,
  FileType,
  TestTube,
  BarChart3,
  Search,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const SAMPLE_JSONS = {
  simple: {
    name: "Simple Object",
    json: `{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com",
  "active": true
}`,
  },
  array: {
    name: "Array of Objects",
    json: `{
  "users": [
    {
      "id": 1,
      "name": "Alice Johnson",
      "role": "Admin"
    },
    {
      "id": 2,
      "name": "Bob Smith",
      "role": "User"
    }
  ]
}`,
  },
  nested: {
    name: "Nested Structure",
    json: `{
  "company": {
    "name": "Tech Corp",
    "address": {
      "street": "123 Main St",
      "city": "San Francisco",
      "country": "USA"
    },
    "employees": [
      {
        "name": "John",
        "department": "Engineering"
      }
    ]
  }
}`,
  },
  api: {
    name: "API Response",
    json: `{
  "status": "success",
  "data": {
    "id": "abc123",
    "timestamp": "2024-01-29T12:00:00Z",
    "results": [
      {
        "title": "Example",
        "value": 42
      }
    ]
  },
  "meta": {
    "page": 1,
    "total": 100
  }
}`,
  },
  config: {
    name: "Config File",
    json: `{
  "name": "my-app",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.2.0",
    "next": "^13.5.0"
  },
  "scripts": {
    "dev": "next dev",
    "build": "next build"
  }
}`,
  },
}

interface ValidationResult {
  isValid: boolean
  error?: string
  line?: number
  suggestion?: string
}

interface JSONStats {
  size: number
  keys: number
  values: number
  depth: number
}

export default function JSONFormatterPage() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [indentation, setIndentation] = useState("2")
  const [sortKeys, setSortKeys] = useState(false)
  const [treeView, setTreeView] = useState(false)
  const [validation, setValidation] = useState<ValidationResult>({ isValid: true })
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const stats = useMemo((): JSONStats => {
    if (!output || !validation.isValid) {
      return { size: 0, keys: 0, values: 0, depth: 0 }
    }

    try {
      const parsed = JSON.parse(output)
      const size = new Blob([output]).size / 1024

      const countKeysValues = (obj: any): { keys: number; values: number } => {
        let keys = 0
        let values = 0

        if (Array.isArray(obj)) {
          values += obj.length
          obj.forEach((item) => {
            const result = countKeysValues(item)
            keys += result.keys
            values += result.values
          })
        } else if (typeof obj === "object" && obj !== null) {
          const objKeys = Object.keys(obj)
          keys += objKeys.length
          values += objKeys.length
          objKeys.forEach((key) => {
            const result = countKeysValues(obj[key])
            keys += result.keys
            values += result.values
          })
        }

        return { keys, values }
      }

      const getDepth = (obj: any): number => {
        if (typeof obj !== "object" || obj === null) return 0
        if (Array.isArray(obj)) {
          if (obj.length === 0) return 1
          return 1 + Math.max(...obj.map(getDepth))
        }
        const values = Object.values(obj)
        if (values.length === 0) return 1
        return 1 + Math.max(...values.map(getDepth))
      }

      const { keys, values } = countKeysValues(parsed)
      const depth = getDepth(parsed)

      return {
        size: Math.round(size * 100) / 100,
        keys,
        values,
        depth,
      }
    } catch {
      return { size: 0, keys: 0, values: 0, depth: 0 }
    }
  }, [output, validation.isValid])

  const validateJSON = (jsonString: string): ValidationResult => {
    if (!jsonString.trim()) {
      return { isValid: true }
    }

    try {
      JSON.parse(jsonString)
      return { isValid: true }
    } catch (error: any) {
      const errorMessage = error.message
      const lineMatch = errorMessage.match(/position (\d+)/)
      let line = 1

      if (lineMatch) {
        const position = parseInt(lineMatch[1])
        line = jsonString.substring(0, position).split("\n").length
      }

      let suggestion = "Check your JSON syntax."
      if (errorMessage.includes("Unexpected token")) {
        suggestion = "You may have an extra comma, missing quote, or incorrect bracket."
      } else if (errorMessage.includes("Unexpected end")) {
        suggestion = "You may be missing a closing bracket or brace."
      }

      return {
        isValid: false,
        error: errorMessage,
        line,
        suggestion,
      }
    }
  }

  const handleFormat = () => {
    const result = validateJSON(input)
    setValidation(result)

    if (!result.isValid) {
      toast({
        title: "Invalid JSON",
        description: result.error,
        variant: "destructive",
      })
      return
    }

    try {
      let parsed = JSON.parse(input)
      if (sortKeys) {
        parsed = sortObjectKeys(parsed)
      }
      const formatted = JSON.stringify(parsed, null, parseInt(indentation))
      setOutput(formatted)
      toast({
        title: "JSON Formatted",
        description: "Your JSON has been beautified successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to format JSON.",
        variant: "destructive",
      })
    }
  }

  const handleMinify = () => {
    const result = validateJSON(input)
    setValidation(result)

    if (!result.isValid) {
      toast({
        title: "Invalid JSON",
        description: result.error,
        variant: "destructive",
      })
      return
    }

    try {
      const parsed = JSON.parse(input)
      const minified = JSON.stringify(parsed)
      setOutput(minified)
      toast({
        title: "JSON Minified",
        description: "Your JSON has been compressed successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to minify JSON.",
        variant: "destructive",
      })
    }
  }

  const handleValidate = () => {
    const result = validateJSON(input)
    setValidation(result)

    if (result.isValid && input.trim()) {
      toast({
        title: "Valid JSON",
        description: "Your JSON syntax is correct!",
      })
    } else if (!input.trim()) {
      toast({
        title: "Empty Input",
        description: "Please enter some JSON to validate.",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Invalid JSON",
        description: result.error,
        variant: "destructive",
      })
    }
  }

  const sortObjectKeys = (obj: any): any => {
    if (Array.isArray(obj)) {
      return obj.map(sortObjectKeys)
    } else if (typeof obj === "object" && obj !== null) {
      return Object.keys(obj)
        .sort()
        .reduce((sorted: any, key) => {
          sorted[key] = sortObjectKeys(obj[key])
          return sorted
        }, {})
    }
    return obj
  }

  const handleClear = () => {
    setInput("")
    setOutput("")
    setValidation({ isValid: true })
    toast({
      title: "Cleared",
      description: "Input and output have been cleared.",
    })
  }

  const handleLoadSample = (key: keyof typeof SAMPLE_JSONS) => {
    setInput(SAMPLE_JSONS[key].json)
    setValidation({ isValid: true })
    toast({
      title: "Sample Loaded",
      description: `${SAMPLE_JSONS[key].name} has been loaded.`,
    })
  }

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      setInput(content)
      toast({
        title: "File Uploaded",
        description: `${file.name} has been loaded.`,
      })
    }
    reader.readAsText(file)
  }

  const handleDownload = () => {
    if (!output) {
      toast({
        title: "No Output",
        description: "Please format JSON first.",
        variant: "destructive",
      })
      return
    }

    const blob = new Blob([output], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "formatted.json"
    a.click()
    URL.revokeObjectURL(url)
    toast({
      title: "Downloaded",
      description: "JSON file has been downloaded.",
    })
  }

  const handleCopy = () => {
    if (!output) {
      toast({
        title: "No Output",
        description: "Please format JSON first.",
        variant: "destructive",
      })
      return
    }

    navigator.clipboard.writeText(output)
    toast({
      title: "Copied",
      description: "Formatted JSON copied to clipboard.",
    })
  }

  const toggleNode = (path: string) => {
    const newExpanded = new Set(expandedNodes)
    if (newExpanded.has(path)) {
      newExpanded.delete(path)
    } else {
      newExpanded.add(path)
    }
    setExpandedNodes(newExpanded)
  }

  const renderTreeView = (obj: any, path = "root", level = 0): JSX.Element => {
    if (typeof obj !== "object" || obj === null) {
      return (
        <div className="ml-4 text-sm">
          <span className="text-blue-600 dark:text-blue-400">
            {JSON.stringify(obj)}
          </span>
        </div>
      )
    }

    const isExpanded = expandedNodes.has(path)
    const isArray = Array.isArray(obj)
    const entries = isArray ? obj : Object.entries(obj)
    const isEmpty = entries.length === 0

    return (
      <div className={level > 0 ? "ml-4" : ""}>
        <div
          className="flex cursor-pointer items-center gap-1 py-1 hover:bg-muted/50"
          onClick={() => !isEmpty && toggleNode(path)}
        >
          {!isEmpty && (
            <span className="text-muted-foreground">
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </span>
          )}
          <span className="font-mono text-sm">
            {isArray ? "[ ]" : "{ }"}{" "}
            <span className="text-muted-foreground">
              {entries.length} {isArray ? "items" : "keys"}
            </span>
          </span>
        </div>
        {isExpanded && !isEmpty && (
          <div className="border-l border-muted pl-2">
            {isArray
              ? obj.map((item: any, index: number) => (
                  <div key={index} className="py-1">
                    <span className="text-sm font-mono text-purple-600 dark:text-purple-400">
                      [{index}]:
                    </span>
                    {renderTreeView(item, `${path}[${index}]`, level + 1)}
                  </div>
                ))
              : Object.entries(obj).map(([key, value]) => (
                  <div key={key} className="py-1">
                    <span className="text-sm font-mono text-orange-600 dark:text-orange-400">
                      "{key}":
                    </span>
                    {renderTreeView(value, `${path}.${key}`, level + 1)}
                  </div>
                ))}
          </div>
        )}
      </div>
    )
  }

  const relatedTools = [
    {
      id: "xml-formatter",
      name: "XML Formatter",
      description: "Format and validate XML documents",
      icon: FileCode,
      href: "/tools/developer-tools/xml-formatter",
    },
    {
      id: "yaml-validator",
      name: "YAML Validator",
      description: "Validate and format YAML files",
      icon: FileType,
      href: "/tools/developer-tools/yaml-validator",
    },
    {
      id: "js-minifier",
      name: "JavaScript Minifier",
      description: "Minify and compress JavaScript code",
      icon: Code2,
      href: "/tools/developer-tools/js-minifier",
    },
    {
      id: "api-tester",
      name: "API Tester",
      description: "Test REST APIs and view responses",
      icon: TestTube,
      href: "/tools/developer-tools/api-tester",
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
            name: "JSON Formatter & Validator",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            description:
              "Free online JSON formatter and validator. Format, beautify, minify, and validate JSON data instantly.",
            url: "https://tulz.net/tools/developer-tools/json-formatter",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              ratingCount: "8650",
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
                  <BreadcrumbLink href="/tools/developer-tools">
                    Developer Tools
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>JSON Formatter</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex items-start gap-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg">
                <FileJson className="h-10 w-10" />
              </div>
              <div className="flex-1">
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  Free JSON Formatter & Validator - Beautify, Minify & Validate JSON
                </h1>
                <p className="mb-4 text-lg text-muted-foreground">
                  Format, validate, beautify, and minify JSON data instantly. Supports large
                  files, tree view, and error highlighting. Perfect for developers and API testing.
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
                    <span className="text-sm text-muted-foreground">(8,650 users)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Last updated: Jan 2024</span>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-green-500/10 text-green-700 dark:text-green-300">
                    <Check className="mr-1 h-3 w-3" />
                    Free
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-500/10 text-blue-700 dark:text-blue-300">
                    <Check className="mr-1 h-3 w-3" />
                    No Signup
                  </Badge>
                  <Badge variant="secondary" className="bg-purple-500/10 text-purple-700 dark:text-purple-300">
                    <Check className="mr-1 h-3 w-3" />
                    Secure
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container max-w-7xl">
            <Card className="mb-6">
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <CardTitle>JSON Formatter & Validator</CardTitle>
                    <CardDescription>
                      Format, minify, and validate your JSON data
                    </CardDescription>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button onClick={handleFormat} size="sm">
                      <Maximize2 className="mr-2 h-4 w-4" />
                      Format
                    </Button>
                    <Button onClick={handleMinify} variant="outline" size="sm">
                      <Minimize2 className="mr-2 h-4 w-4" />
                      Minify
                    </Button>
                    <Button onClick={handleValidate} variant="outline" size="sm">
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Validate
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="indentation" className="text-sm">
                      Indentation:
                    </Label>
                    <Select value={indentation} onValueChange={setIndentation}>
                      <SelectTrigger id="indentation" className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 spaces</SelectItem>
                        <SelectItem value="4">4 spaces</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      id="sort-keys"
                      checked={sortKeys}
                      onCheckedChange={setSortKeys}
                    />
                    <Label htmlFor="sort-keys" className="text-sm">
                      Sort keys
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      id="tree-view"
                      checked={treeView}
                      onCheckedChange={setTreeView}
                      disabled={!output || !validation.isValid}
                    />
                    <Label htmlFor="tree-view" className="text-sm">
                      Tree view
                    </Label>
                  </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <Label className="text-base font-semibold">Input JSON</Label>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => fileInputRef.current?.click()}
                          variant="ghost"
                          size="sm"
                        >
                          <Upload className="mr-1 h-4 w-4" />
                          Upload
                        </Button>
                        <Button onClick={handleClear} variant="ghost" size="sm">
                          <Trash2 className="mr-1 h-4 w-4" />
                          Clear
                        </Button>
                      </div>
                    </div>
                    <Textarea
                      placeholder='Paste your JSON here... e.g. {"key": "value"}'
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="min-h-[500px] font-mono text-sm"
                    />
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".json,application/json"
                      onChange={handleUpload}
                      className="hidden"
                    />
                    <div className="mt-2 flex flex-wrap gap-2">
                      {Object.entries(SAMPLE_JSONS).map(([key, sample]) => (
                        <Button
                          key={key}
                          onClick={() => handleLoadSample(key as keyof typeof SAMPLE_JSONS)}
                          variant="outline"
                          size="sm"
                        >
                          <Sparkles className="mr-1 h-3 w-3" />
                          {sample.name}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <Label className="text-base font-semibold">Formatted Output</Label>
                      <div className="flex gap-2">
                        <Button onClick={handleCopy} variant="ghost" size="sm">
                          <Copy className="mr-1 h-4 w-4" />
                          Copy
                        </Button>
                        <Button onClick={handleDownload} variant="ghost" size="sm">
                          <Download className="mr-1 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                    {treeView && output && validation.isValid ? (
                      <div className="min-h-[500px] rounded-md border bg-muted/50 p-4 font-mono text-sm overflow-auto">
                        {renderTreeView(JSON.parse(output))}
                      </div>
                    ) : (
                      <Textarea
                        placeholder="Formatted JSON will appear here..."
                        value={output}
                        readOnly
                        className="min-h-[500px] font-mono text-sm"
                      />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {!validation.isValid && validation.error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Invalid JSON</AlertTitle>
                <AlertDescription>
                  <p className="mb-1">{validation.error}</p>
                  {validation.line && (
                    <p className="mb-1 text-sm">
                      Error near line: <strong>{validation.line}</strong>
                    </p>
                  )}
                  {validation.suggestion && (
                    <p className="text-sm">
                      <strong>Suggestion:</strong> {validation.suggestion}
                    </p>
                  )}
                </AlertDescription>
              </Alert>
            )}

            {validation.isValid && input.trim() && (
              <Alert className="mb-6 border-green-500 bg-green-500/10">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-600 dark:text-green-400">
                  Valid JSON
                </AlertTitle>
                <AlertDescription className="text-green-600 dark:text-green-400">
                  Your JSON syntax is correct and can be parsed successfully.
                </AlertDescription>
              </Alert>
            )}

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                  <div className="rounded-lg border bg-muted/50 p-4">
                    <div className="text-sm text-muted-foreground">JSON Size</div>
                    <div className="text-2xl font-bold">{stats.size} KB</div>
                  </div>
                  <div className="rounded-lg border bg-muted/50 p-4">
                    <div className="text-sm text-muted-foreground">Keys Count</div>
                    <div className="text-2xl font-bold">{stats.keys}</div>
                  </div>
                  <div className="rounded-lg border bg-muted/50 p-4">
                    <div className="text-sm text-muted-foreground">Values Count</div>
                    <div className="text-2xl font-bold">{stats.values}</div>
                  </div>
                  <div className="rounded-lg border bg-muted/50 p-4">
                    <div className="text-sm text-muted-foreground">Depth Level</div>
                    <div className="text-2xl font-bold">{stats.depth}</div>
                  </div>
                  <div className="rounded-lg border bg-muted/50 p-4">
                    <div className="text-sm text-muted-foreground">Validation</div>
                    <div className="text-2xl font-bold">
                      {validation.isValid && input.trim() ? (
                        <span className="text-green-600 dark:text-green-400">Valid</span>
                      ) : !input.trim() ? (
                        <span className="text-muted-foreground">-</span>
                      ) : (
                        <span className="text-red-600 dark:text-red-400">Invalid</span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-8 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    "Format and beautify JSON with customizable indentation",
                    "Minify JSON to reduce file size",
                    "Validate JSON syntax with detailed error messages",
                    "Upload JSON files from your computer",
                    "Download formatted JSON as .json file",
                    "Copy formatted JSON to clipboard",
                    "Tree view for better visualization",
                    "Sort keys alphabetically",
                    "Support for large JSON files",
                    "Client-side processing for privacy",
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
                  <CardTitle>How to Use</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        step: 1,
                        title: "Paste or upload JSON",
                        description: "Enter your JSON in the left panel or upload a .json file.",
                      },
                      {
                        step: 2,
                        title: "Choose an action",
                        description:
                          "Click Format to beautify, Minify to compress, or Validate to check syntax.",
                      },
                      {
                        step: 3,
                        title: "Customize options",
                        description:
                          "Set indentation (2 or 4 spaces), enable sort keys, or switch to tree view.",
                      },
                      {
                        step: 4,
                        title: "Copy or download",
                        description:
                          "Use the Copy button or download the formatted JSON as a file.",
                      },
                    ].map((item) => (
                      <div key={item.step} className="flex gap-4">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-sm font-bold text-white">
                          {item.step}
                        </div>
                        <div>
                          <h3 className="mb-1 font-semibold">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <h2 className="mb-4 text-2xl font-bold">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What is JSON formatting?</AccordionTrigger>
                  <AccordionContent>
                    JSON formatting (also called beautifying or pretty printing) is the process of
                    adding whitespace, indentation, and line breaks to JSON data to make it more
                    readable for humans. While minified JSON is compact and efficient for
                    transmission, formatted JSON is easier to read, debug, and understand. Our tool
                    automatically adds proper indentation and spacing to your JSON structure.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>How do I fix JSON syntax errors?</AccordionTrigger>
                  <AccordionContent>
                    Common JSON errors include: missing or extra commas, unquoted keys, single
                    quotes instead of double quotes, trailing commas in arrays/objects, and
                    unescaped special characters. Our validator will show you the line number where
                    the error occurs and provide suggestions. Make sure all keys are in double
                    quotes, values are properly formatted, and brackets/braces are balanced.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Can I format large JSON files?</AccordionTrigger>
                  <AccordionContent>
                    Yes! Our JSON formatter can handle large files efficiently. Since all
                    processing happens in your browser (client-side), there's no file size limit
                    imposed by server restrictions. However, very large files (several megabytes)
                    may take a moment to process depending on your device's performance. For best
                    results with extremely large files, use a modern browser with sufficient RAM.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Is my JSON data secure?</AccordionTrigger>
                  <AccordionContent>
                    Absolutely! Your JSON data never leaves your browser. All formatting,
                    validation, and processing happen entirely on the client-side using JavaScript.
                    We don't send your data to any server, store it in any database, or have any
                    access to it. This makes our tool completely secure and private for handling
                    sensitive configuration files, API responses, or confidential data.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>
                    What's the difference between minify and beautify?
                  </AccordionTrigger>
                  <AccordionContent>
                    Beautifying (formatting) adds whitespace, indentation, and line breaks to make
                    JSON human-readable and easier to debug. Minifying removes all unnecessary
                    whitespace to create the smallest possible file size, which is ideal for
                    production environments where you want to reduce bandwidth and improve load
                    times. Use beautify for development and debugging, and minify for production
                    deployment.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className="mt-12">
              <h2 className="mb-4 text-2xl font-bold">What is JSON Formatter?</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-4">
                <p className="text-muted-foreground">
                  A JSON formatter is an essential tool for developers that transforms raw,
                  unformatted JSON data into a clean, well-structured, and easily readable format.
                  JSON (JavaScript Object Notation) is the most widely used data interchange format
                  on the web, and having the ability to quickly format, validate, and visualize it
                  is crucial for modern development workflows.
                </p>

                <h3 className="mt-6 text-xl font-semibold">Understanding JSON</h3>
                <p className="text-muted-foreground">
                  JSON is a lightweight data format that's easy for humans to read and write, and
                  easy for machines to parse and generate. It's built on two universal data
                  structures: collections of name/value pairs (objects) and ordered lists of values
                  (arrays). JSON is language-independent and has become the de facto standard for
                  web APIs, configuration files, and data storage. Despite its simplicity, working
                  with unformatted JSON can be challenging, especially when dealing with complex
                  nested structures.
                </p>

                <h3 className="mt-6 text-xl font-semibold">Why JSON Formatting Matters</h3>
                <p className="text-muted-foreground">
                  Raw JSON data from APIs or databases often comes in a minified format without any
                  whitespace or indentation. While this is efficient for data transmission and
                  storage, it makes the data nearly impossible to read and understand at a glance.
                  A JSON formatter adds proper indentation, line breaks, and spacing, transforming
                  a single-line JSON string into a hierarchical structure that clearly shows the
                  relationships between different data elements. This is invaluable for debugging,
                  code review, documentation, and understanding data structures.
                </p>

                <h3 className="mt-6 text-xl font-semibold">Common Use Cases</h3>
                <p className="text-muted-foreground">
                  Developers use JSON formatters daily for various tasks. When testing APIs, you
                  need to examine response data to verify correctness and structure. Configuration
                  files for modern applications (like package.json in Node.js projects) require
                  proper formatting for maintainability. Data analysts use JSON formatters to
                  explore and understand data sets from NoSQL databases. DevOps engineers format
                  JSON logs and deployment configurations. Frontend developers validate JSON data
                  before sending it to backend services. The tree view feature is particularly
                  useful for visualizing deeply nested data structures.
                </p>

                <h3 className="mt-6 text-xl font-semibold">
                  Validation and Error Detection
                </h3>
                <p className="text-muted-foreground">
                  Beyond formatting, a good JSON formatter includes validation capabilities that
                  check syntax correctness. Common errors include missing commas, unmatched braces,
                  invalid escape sequences, and trailing commas. Our validator provides precise
                  error messages with line numbers and helpful suggestions for fixing issues. This
                  immediate feedback saves countless hours that would otherwise be spent debugging
                  API calls or configuration problems. The validator ensures your JSON is
                  standards-compliant and will parse correctly in any environment.
                </p>

                <h3 className="mt-6 text-xl font-semibold">Best Practices</h3>
                <p className="text-muted-foreground">
                  When working with JSON, always validate before deploying to production. Use
                  consistent indentation (2 or 4 spaces) across your project. Consider sorting keys
                  alphabetically in configuration files for easier navigation. Minify JSON for
                  production to reduce payload size, but keep formatted versions in your source
                  control for readability. Use tools like ours that process data client-side to
                  maintain security when handling sensitive information. Regular use of a JSON
                  formatter will improve your code quality and make collaboration with team members
                  more efficient.
                </p>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-bold">Related Tools</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {relatedTools.map((tool) => (
                  <Link key={tool.id} href={tool.href}>
                    <Card className="group h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                      <CardHeader>
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-md transition-transform group-hover:scale-110">
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
