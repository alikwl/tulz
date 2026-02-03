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
import { Copy, Check, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function READMEGenerator() {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)
  const [projectName, setProjectName] = useState("My Awesome Project")
  const [description, setDescription] = useState("A brief description of what this project does")
  const [installation, setInstallation] = useState("npm install")
  const [usage, setUsage] = useState("npm start")
  const [author, setAuthor] = useState("Your Name")
  const [license, setLicense] = useState("MIT")

  const generateREADME = () => {
    return `# ${projectName}

![License](https://img.shields.io/badge/license-${license}-blue.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)

## Description

${description}

## Installation

\`\`\`bash
${installation}
\`\`\`

## Usage

\`\`\`bash
${usage}
\`\`\`

## Features

- Feature 1
- Feature 2
- Feature 3

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ${license} License.

## Author

${author}

## Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc
`
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateREADME())
    setCopied(true)
    toast({
      title: "Copied!",
      description: "README copied to clipboard",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadREADME = () => {
    const blob = new Blob([generateREADME()], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "README.md"
    a.click()
    URL.revokeObjectURL(url)

    toast({
      title: "Downloaded!",
      description: "README.md downloaded successfully",
    })
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
                README Generator
              </h1>
              <p className="text-lg text-white/90">
                Create professional README.md files for your GitHub projects
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Project Information</CardTitle>
                  <CardDescription>Fill in your project details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Project Name</Label>
                    <Input value={projectName} onChange={(e) => setProjectName(e.target.value)} />
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Installation</Label>
                    <Input value={installation} onChange={(e) => setInstallation(e.target.value)} />
                  </div>

                  <div className="space-y-2">
                    <Label>Usage</Label>
                    <Input value={usage} onChange={(e) => setUsage(e.target.value)} />
                  </div>

                  <div className="space-y-2">
                    <Label>Author</Label>
                    <Input value={author} onChange={(e) => setAuthor(e.target.value)} />
                  </div>

                  <div className="space-y-2">
                    <Label>License</Label>
                    <Input value={license} onChange={(e) => setLicense(e.target.value)} />
                  </div>
                </CardContent>
              </Card>

              <div className="lg:sticky lg:top-6 lg:self-start">
                <Card className="mb-4">
                  <CardHeader>
                    <CardTitle>Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="max-h-[600px] overflow-auto rounded-lg bg-slate-950 p-6 text-sm text-slate-50">
                      <code>{generateREADME()}</code>
                    </pre>
                  </CardContent>
                </Card>

                <div className="flex gap-3">
                  <Button onClick={downloadREADME} className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Download README.md
                  </Button>
                  <Button variant="outline" onClick={copyToClipboard}>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
