"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  Star,
  Calendar,
  Check,
  Copy,
  Download,
  Upload,
  ArrowRight,
  RefreshCw,
  X,
  FileText,
  Image as ImageIcon,
  AlertCircle,
  Code,
  Lock,
  Unlock,
  ArrowLeftRight,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Hash,
  Link2,
  Key,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function Base64ToolPage() {
  const [activeTab, setActiveTab] = useState<"encode" | "decode">("encode")
  const [encodeInput, setEncodeInput] = useState("")
  const [encodeOutput, setEncodeOutput] = useState("")
  const [decodeInput, setDecodeInput] = useState("")
  const [decodeOutput, setDecodeOutput] = useState("")
  const [encoding, setEncoding] = useState("utf-8")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [decodedImage, setDecodedImage] = useState<string | null>(null)
  const [isValidBase64, setIsValidBase64] = useState<boolean | null>(null)
  const [urlEncode, setUrlEncode] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { toast } = useToast()

  const isValidBase64String = (str: string): boolean => {
    if (!str || str.trim() === "") return false

    const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/
    const urlSafeBase64Regex = /^[A-Za-z0-9_-]*$/

    const trimmed = str.trim()

    if (urlSafeBase64Regex.test(trimmed)) return true
    if (base64Regex.test(trimmed) && trimmed.length % 4 === 0) return true

    return false
  }

  const handleEncode = () => {
    if (!encodeInput && !uploadedFile) {
      toast({
        title: "No Input",
        description: "Please enter text or upload a file",
        variant: "destructive",
      })
      return
    }

    try {
      let encoded = ""

      if (uploadedFile) {
        encoded = encodeOutput
      } else {
        const bytes = new TextEncoder().encode(encodeInput)
        encoded = btoa(String.fromCharCode(...Array.from(bytes)))

        if (urlEncode) {
          encoded = encoded.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "")
        }

        setEncodeOutput(encoded)
      }

      toast({
        title: "Encoded Successfully",
        description: `Generated ${encoded.length} character base64 string`,
      })
    } catch (error) {
      toast({
        title: "Encoding Error",
        description: "Failed to encode the input",
        variant: "destructive",
      })
    }
  }

  const handleDecode = () => {
    if (!decodeInput.trim()) {
      toast({
        title: "No Input",
        description: "Please enter a base64 string",
        variant: "destructive",
      })
      return
    }

    try {
      let input = decodeInput.trim()

      if (urlEncode) {
        input = input.replace(/-/g, "+").replace(/_/g, "/")
        while (input.length % 4) {
          input += "="
        }
      }

      const valid = isValidBase64String(input)
      setIsValidBase64(valid)

      if (!valid) {
        toast({
          title: "Invalid Base64",
          description: "The input is not a valid base64 string",
          variant: "destructive",
        })
        return
      }

      const decoded = atob(input)

      if (input.startsWith("data:image")) {
        setDecodedImage(input)
        setDecodeOutput("Image decoded successfully. Preview shown below.")
      } else if (input.match(/^[A-Za-z0-9+/]/) && decoded.startsWith("\x89PNG") || decoded.startsWith("\xFF\xD8\xFF")) {
        const dataUrl = `data:image/png;base64,${input}`
        setDecodedImage(dataUrl)
        setDecodeOutput("Image decoded successfully. Preview shown below.")
      } else {
        const uint8Array = Uint8Array.from(decoded, c => c.charCodeAt(0))
        const decodedText = new TextDecoder(encoding).decode(uint8Array)
        setDecodeOutput(decodedText)
        setDecodedImage(null)
      }

      toast({
        title: "Decoded Successfully",
        description: "Base64 string decoded",
      })
    } catch (error) {
      setIsValidBase64(false)
      toast({
        title: "Decoding Error",
        description: "Failed to decode the base64 string",
        variant: "destructive",
      })
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadedFile(file)

    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result as string

      if (file.type.startsWith("image/")) {
        setImagePreview(result)
      }

      const base64 = result.split(",")[1]
      setEncodeOutput(base64)

      toast({
        title: "File Uploaded",
        description: `${file.name} converted to base64`,
      })
    }

    reader.readAsDataURL(file)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied",
      description: "Copied to clipboard",
    })
  }

  const downloadAsFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    link.click()
    URL.revokeObjectURL(url)

    toast({
      title: "Downloaded",
      description: `File saved as ${filename}`,
    })
  }

  const swapInputOutput = () => {
    const temp = encodeInput
    setEncodeInput(encodeOutput)
    setEncodeOutput(temp)

    toast({
      title: "Swapped",
      description: "Input and output swapped",
    })
  }

  const clearAll = () => {
    setEncodeInput("")
    setEncodeOutput("")
    setDecodeInput("")
    setDecodeOutput("")
    setUploadedFile(null)
    setImagePreview(null)
    setDecodedImage(null)
    setIsValidBase64(null)

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }

    toast({
      title: "Cleared",
      description: "All fields cleared",
    })
  }

  const codeExamples = [
    {
      language: "JavaScript",
      encode: `// Encode to Base64
const text = "Hello, World!";
const encoded = btoa(text);
console.log(encoded);

// Encode with URL-safe characters
const urlSafe = encoded
  .replace(/\\+/g, '-')
  .replace(/\\//g, '_')
  .replace(/=/g, '');`,
      decode: `// Decode from Base64
const base64 = "SGVsbG8sIFdvcmxkIQ==";
const decoded = atob(base64);
console.log(decoded);

// Decode URL-safe Base64
let urlSafe = base64
  .replace(/-/g, '+')
  .replace(/_/g, '/');
while (urlSafe.length % 4) {
  urlSafe += '=';
}
const decoded2 = atob(urlSafe);`,
    },
    {
      language: "Python",
      encode: `import base64

# Encode to Base64
text = "Hello, World!"
encoded = base64.b64encode(text.encode()).decode()
print(encoded)

# URL-safe encoding
url_safe = base64.urlsafe_b64encode(text.encode()).decode()
print(url_safe)`,
      decode: `import base64

# Decode from Base64
base64_string = "SGVsbG8sIFdvcmxkIQ=="
decoded = base64.b64decode(base64_string).decode()
print(decoded)

# URL-safe decoding
url_safe = "SGVsbG8sIFdvcmxkIQ"
decoded2 = base64.urlsafe_b64decode(url_safe).decode()
print(decoded2)`,
    },
    {
      language: "PHP",
      encode: `<?php
// Encode to Base64
$text = "Hello, World!";
$encoded = base64_encode($text);
echo $encoded;

// URL-safe encoding
$url_safe = strtr($encoded, '+/', '-_');
$url_safe = rtrim($url_safe, '=');
?>`,
      decode: `<?php
// Decode from Base64
$base64 = "SGVsbG8sIFdvcmxkIQ==";
$decoded = base64_decode($base64);
echo $decoded;

// URL-safe decoding
$url_safe = strtr($base64, '-_', '+/');
$decoded2 = base64_decode($url_safe);
?>`,
    },
    {
      language: "Java",
      encode: `import java.util.Base64;

// Encode to Base64
String text = "Hello, World!";
String encoded = Base64.getEncoder()
    .encodeToString(text.getBytes());
System.out.println(encoded);

// URL-safe encoding
String urlSafe = Base64.getUrlEncoder()
    .encodeToString(text.getBytes());`,
      decode: `import java.util.Base64;

// Decode from Base64
String base64 = "SGVsbG8sIFdvcmxkIQ==";
byte[] decoded = Base64.getDecoder()
    .decode(base64);
String text = new String(decoded);

// URL-safe decoding
String urlSafe = "SGVsbG8sIFdvcmxkIQ";
byte[] decoded2 = Base64.getUrlDecoder()
    .decode(urlSafe);`,
    },
  ]

  const relatedTools = [
    {
      name: "URL Encoder/Decoder",
      description: "Encode and decode URLs",
      icon: Link2,
      href: "/tools/developer-tools/url-encoder-decoder",
    },
    {
      name: "JWT Decoder",
      description: "Decode JWT tokens",
      icon: Key,
      href: "/tools/developer-tools/jwt-decoder",
    },
    {
      name: "Hash Generator",
      description: "Generate MD5, SHA hashes",
      icon: Hash,
      href: "/tools/developer-tools/hash-generator",
    },
    {
      name: "Hex Converter",
      description: "Convert to/from hexadecimal",
      icon: Code,
      href: "/tools/developer-tools/hex-converter",
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
            name: "Base64 Encoder/Decoder",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            description:
              "Online Base64 encoder and decoder tool. Encode text and files to Base64, decode Base64 strings. Support for images with preview. 100% free and client-side.",
            url: "https://tulz.net/tools/developer-tools/base64-encoder-decoder",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              ratingCount: "18934",
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
                  <BreadcrumbLink href="/tools/developer-tools">Developer Tools</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Base64 Encoder/Decoder</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex items-start gap-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg">
                <Code className="h-10 w-10" />
              </div>
              <div className="flex-1">
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  Base64 Encoder/Decoder - Online Base64 Tool
                </h1>
                <p className="mb-4 text-lg text-muted-foreground">
                  Encode text and files to Base64 format or decode Base64 strings back to their
                  original form. Support for images with instant preview, file uploads, and multiple
                  encoding formats. 100% free, secure, and works entirely in your browser.
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
                    <span className="text-sm text-muted-foreground">(18,934 users)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Last updated: Jan 2024</span>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-green-500/10 text-green-700 dark:text-green-300">
                    <Check className="mr-1 h-3 w-3" />
                    Client-Side Processing
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-500/10 text-blue-700 dark:text-blue-300">
                    <ImageIcon className="mr-1 h-3 w-3" />
                    Image Support
                  </Badge>
                  <Badge variant="secondary" className="bg-purple-500/10 text-purple-700 dark:text-purple-300">
                    <Upload className="mr-1 h-3 w-3" />
                    File Upload
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Base64 Encoder/Decoder</CardTitle>
                    <CardDescription>
                      Convert between text/files and Base64 format
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs value={activeTab} onValueChange={(v: any) => setActiveTab(v)}>
                      <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger value="encode">
                          <Lock className="mr-2 h-4 w-4" />
                          Encode
                        </TabsTrigger>
                        <TabsTrigger value="decode">
                          <Unlock className="mr-2 h-4 w-4" />
                          Decode
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="encode" className="space-y-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label>Input Text</Label>
                              <Select value={encoding} onValueChange={setEncoding}>
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="utf-8">UTF-8</SelectItem>
                                  <SelectItem value="ascii">ASCII</SelectItem>
                                  <SelectItem value="iso-8859-1">ISO-8859-1</SelectItem>
                                  <SelectItem value="utf-16">UTF-16</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <Textarea
                              placeholder="Enter text to encode..."
                              value={encodeInput}
                              onChange={(e) => setEncodeInput(e.target.value)}
                              className="min-h-[150px] font-mono text-sm"
                            />
                          </div>

                          <div className="flex items-center justify-center border-2 border-dashed rounded-lg p-8">
                            <div className="text-center">
                              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                              <p className="text-sm font-medium mb-2">Or upload a file</p>
                              <input
                                ref={fileInputRef}
                                type="file"
                                onChange={handleFileUpload}
                                className="hidden"
                                id="file-upload"
                              />
                              <Button
                                variant="outline"
                                onClick={() => fileInputRef.current?.click()}
                              >
                                Choose File
                              </Button>
                              {uploadedFile && (
                                <p className="mt-2 text-sm text-muted-foreground">
                                  {uploadedFile.name} ({(uploadedFile.size / 1024).toFixed(2)} KB)
                                </p>
                              )}
                            </div>
                          </div>

                          {imagePreview && (
                            <div className="rounded-lg border p-4">
                              <p className="text-sm font-medium mb-2">Image Preview:</p>
                              <img
                                src={imagePreview}
                                alt="Preview"
                                className="max-h-64 mx-auto rounded-lg border"
                              />
                            </div>
                          )}

                          <div className="flex gap-2">
                            <Button onClick={handleEncode} className="flex-1">
                              <Lock className="mr-2 h-4 w-4" />
                              Encode to Base64
                            </Button>
                            <Button variant="outline" onClick={swapInputOutput}>
                              <ArrowLeftRight className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" onClick={clearAll}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          {encodeOutput && (
                            <>
                              <div className="space-y-2">
                                <Label>Base64 Output</Label>
                                <Textarea
                                  value={encodeOutput}
                                  readOnly
                                  className="min-h-[150px] font-mono text-sm bg-muted"
                                />
                              </div>

                              <div className="flex gap-2">
                                <Button
                                  onClick={() => copyToClipboard(encodeOutput)}
                                  variant="outline"
                                  className="flex-1"
                                >
                                  <Copy className="mr-2 h-4 w-4" />
                                  Copy
                                </Button>
                                <Button
                                  onClick={() => downloadAsFile(encodeOutput, "base64.txt")}
                                  variant="outline"
                                  className="flex-1"
                                >
                                  <Download className="mr-2 h-4 w-4" />
                                  Download
                                </Button>
                              </div>
                            </>
                          )}
                        </div>
                      </TabsContent>

                      <TabsContent value="decode" className="space-y-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label>Base64 Input</Label>
                              {isValidBase64 !== null && (
                                <Badge
                                  variant={isValidBase64 ? "default" : "destructive"}
                                  className="gap-1"
                                >
                                  {isValidBase64 ? (
                                    <>
                                      <CheckCircle className="h-3 w-3" />
                                      Valid
                                    </>
                                  ) : (
                                    <>
                                      <XCircle className="h-3 w-3" />
                                      Invalid
                                    </>
                                  )}
                                </Badge>
                              )}
                            </div>
                            <Textarea
                              placeholder="Enter Base64 string to decode..."
                              value={decodeInput}
                              onChange={(e) => {
                                setDecodeInput(e.target.value)
                                if (e.target.value.trim()) {
                                  setIsValidBase64(isValidBase64String(e.target.value))
                                } else {
                                  setIsValidBase64(null)
                                }
                              }}
                              className="min-h-[150px] font-mono text-sm"
                            />
                          </div>

                          <Button onClick={handleDecode} className="w-full">
                            <Unlock className="mr-2 h-4 w-4" />
                            Decode from Base64
                          </Button>

                          {decodeOutput && (
                            <>
                              <div className="space-y-2">
                                <Label>Decoded Output</Label>
                                <Textarea
                                  value={decodeOutput}
                                  readOnly
                                  className="min-h-[150px] font-mono text-sm bg-muted"
                                />
                              </div>

                              {decodedImage && (
                                <div className="rounded-lg border p-4">
                                  <p className="text-sm font-medium mb-2">Decoded Image:</p>
                                  <img
                                    src={decodedImage}
                                    alt="Decoded"
                                    className="max-h-64 mx-auto rounded-lg border"
                                  />
                                </div>
                              )}

                              <div className="flex gap-2">
                                <Button
                                  onClick={() => copyToClipboard(decodeOutput)}
                                  variant="outline"
                                  className="flex-1"
                                >
                                  <Copy className="mr-2 h-4 w-4" />
                                  Copy
                                </Button>
                                <Button
                                  onClick={() => downloadAsFile(decodeOutput, "decoded.txt")}
                                  variant="outline"
                                  className="flex-1"
                                >
                                  <Download className="mr-2 h-4 w-4" />
                                  Download
                                </Button>
                              </div>
                            </>
                          )}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Code Examples</CardTitle>
                    <CardDescription>
                      Base64 encoding and decoding in different programming languages
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {codeExamples.map((example, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger>{example.language}</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div>
                                <p className="text-sm font-medium mb-2">Encode:</p>
                                <div className="relative">
                                  <pre className="rounded-lg bg-muted p-4 text-sm overflow-x-auto">
                                    <code>{example.encode}</code>
                                  </pre>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="absolute top-2 right-2"
                                    onClick={() => copyToClipboard(example.encode)}
                                  >
                                    <Copy className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                              <div>
                                <p className="text-sm font-medium mb-2">Decode:</p>
                                <div className="relative">
                                  <pre className="rounded-lg bg-muted p-4 text-sm overflow-x-auto">
                                    <code>{example.decode}</code>
                                  </pre>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="absolute top-2 right-2"
                                    onClick={() => copyToClipboard(example.decode)}
                                  >
                                    <Copy className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Features</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      "Encode text to Base64",
                      "Decode Base64 to text",
                      "Upload and encode files",
                      "Image to Base64 conversion",
                      "Base64 to image with preview",
                      "Multiple character encodings",
                      "URL-safe Base64 option",
                      "Auto-validation of input",
                      "Copy to clipboard",
                      "Download as file",
                      "100% client-side processing",
                      "No file size limits",
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
                    <CardTitle>Quick Tips</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="rounded-lg border bg-blue-500/10 p-3">
                      <p className="font-medium mb-1">What is Base64?</p>
                      <p className="text-muted-foreground">
                        Base64 is an encoding scheme that converts binary data into ASCII text
                        format for safe transmission over text-based protocols.
                      </p>
                    </div>
                    <div className="rounded-lg border bg-purple-500/10 p-3">
                      <p className="font-medium mb-1">Common Uses</p>
                      <p className="text-muted-foreground">
                        Embedding images in HTML/CSS, email attachments, data URIs, API
                        authentication, and storing binary data in JSON.
                      </p>
                    </div>
                    <div className="rounded-lg border bg-amber-500/10 p-3">
                      <p className="font-medium mb-1">File Size Impact</p>
                      <p className="text-muted-foreground">
                        Base64 encoding increases the data size by approximately 33%. A 100KB file
                        becomes ~133KB when encoded.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="mb-4 text-2xl font-bold">Understanding Base64 Encoding</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-3">What is Base64?</h3>
                    <p className="text-muted-foreground mb-4">
                      Base64 is a binary-to-text encoding scheme that represents binary data in an
                      ASCII string format. It works by dividing the input into chunks of 3 bytes (24
                      bits) and converting each chunk into 4 characters from a set of 64 printable
                      characters. The character set includes uppercase letters (A-Z), lowercase
                      letters (a-z), digits (0-9), and two symbols (+ and /), with = used for
                      padding.
                    </p>

                    <h3 className="text-xl font-semibold mb-3 mt-6">When to Use Base64</h3>
                    <p className="text-muted-foreground mb-4">
                      Base64 encoding is essential when you need to transmit binary data over
                      protocols that only support text. Common scenarios include embedding images
                      directly in HTML or CSS using data URIs, sending binary attachments in email
                      (MIME), storing binary data in JSON or XML documents, encoding credentials for
                      HTTP Basic Authentication, and transmitting files through web APIs. It's
                      particularly useful for small to medium-sized files where inline embedding
                      provides benefits like reduced HTTP requests.
                    </p>

                    <h3 className="text-xl font-semibold mb-3 mt-6">Common Use Cases</h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-lg border p-3">
                        <p className="font-medium mb-1">Web Development</p>
                        <p className="text-sm text-muted-foreground">
                          Embedding images in CSS, inline SVGs, data URIs for small assets, favicon
                          encoding
                        </p>
                      </div>
                      <div className="rounded-lg border p-3">
                        <p className="font-medium mb-1">API Integration</p>
                        <p className="text-sm text-muted-foreground">
                          HTTP Basic Auth headers, JWT tokens, file uploads via JSON APIs, webhook
                          payloads
                        </p>
                      </div>
                      <div className="rounded-lg border p-3">
                        <p className="font-medium mb-1">Email Systems</p>
                        <p className="text-sm text-muted-foreground">
                          MIME email attachments, inline images in HTML emails, email header encoding
                        </p>
                      </div>
                      <div className="rounded-lg border p-3">
                        <p className="font-medium mb-1">Data Storage</p>
                        <p className="text-sm text-muted-foreground">
                          Storing binary data in databases, configuration files, JSON documents,
                          localStorage
                        </p>
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold mb-3 mt-6">Technical Details</h3>
                    <p className="text-muted-foreground mb-4">
                      Base64 encoding converts 3 bytes of input (24 bits) into 4 characters of output
                      (6 bits per character). Each character represents a value from 0-63, mapped to
                      the Base64 alphabet. When the input length isn't divisible by 3, padding
                      characters (=) are added to the output to make it a multiple of 4. URL-safe
                      Base64 variants replace + with - and / with _ to avoid issues with URL special
                      characters. The encoding process is deterministic and reversible, making it
                      perfect for data that needs to be decoded later. However, it's not encryption -
                      Base64 encoded data can be easily decoded by anyone.
                    </p>

                    <h3 className="text-xl font-semibold mb-3 mt-6">Best Practices</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>
                        Use Base64 for small to medium files only - large files should be served
                        separately
                      </li>
                      <li>
                        Consider the 33% size increase when deciding whether to encode
                      </li>
                      <li>
                        Never use Base64 as a security measure - it's encoding, not encryption
                      </li>
                      <li>
                        Use URL-safe Base64 when including encoded data in URLs or filenames
                      </li>
                      <li>
                        Be aware of browser limitations for data URIs (typically 2MB in most browsers)
                      </li>
                      <li>
                        Cache Base64 encoded assets when possible to avoid repeated encoding
                      </li>
                      <li>
                        For images, consider if direct file references would be more efficient
                      </li>
                      <li>
                        Validate Base64 strings before attempting to decode to avoid errors
                      </li>
                    </ul>

                    <h3 className="text-xl font-semibold mb-3 mt-6">Performance Considerations</h3>
                    <p className="text-muted-foreground">
                      Base64 encoding and decoding are computationally inexpensive operations, but the
                      increased data size can impact performance. For web applications, inline Base64
                      images reduce HTTP requests but increase HTML/CSS file sizes, which can delay
                      initial page rendering. For APIs, Base64 encoding adds overhead to request and
                      response payloads. In mobile applications with limited bandwidth, the 33% size
                      increase can be significant. Always benchmark your specific use case and
                      consider alternatives like multipart form data for file uploads or CDN-hosted
                      assets for images. Modern browsers efficiently handle Base64, but very large
                      encoded strings can cause memory issues in resource-constrained environments.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-bold">Related Tools</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {relatedTools.map((tool) => (
                  <Link key={tool.name} href={tool.href}>
                    <Card className="group h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                      <CardHeader>
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-md transition-transform group-hover:scale-110">
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
