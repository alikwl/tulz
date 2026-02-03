"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Copy, Check, Download, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const templates = {
  "Node.js": `# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Production
/build
/dist

# Environment
.env
.env.local
.env.production`,

  Python: `# Byte-compiled
__pycache__/
*.py[cod]
*$py.class

# Virtual environments
venv/
ENV/
env/

# Distribution
*.egg-info/
dist/
build/`,

  macOS: `.DS_Store
.AppleDouble
.LSOverride
._*`,

  Windows: `Thumbs.db
ehthumbs.db
Desktop.ini
$RECYCLE.BIN/`,

  "VS Code": `.vscode/
*.code-workspace`,

  JetBrains: `.idea/
*.iml
*.iws`,
}

export default function GitignoreGenerator() {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)
  const [selected, setSelected] = useState<string[]>(["Node.js", "macOS"])

  const generateGitignore = () => {
    const parts = selected.map((key) => `# ${key}\n${templates[key as keyof typeof templates]}`)
    return parts.join("\n\n")
  }

  const toggleTemplate = (template: string) => {
    setSelected((prev) =>
      prev.includes(template) ? prev.filter((t) => t !== template) : [...prev, template]
    )
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateGitignore())
    setCopied(true)
    toast({
      title: "Copied!",
      description: ".gitignore content copied to clipboard",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadFile = () => {
    const blob = new Blob([generateGitignore()], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = ".gitignore"
    a.click()
    URL.revokeObjectURL(url)

    toast({
      title: "Downloaded!",
      description: ".gitignore file downloaded successfully",
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
                .gitignore Generator
              </h1>
              <p className="text-lg text-white/90">
                Generate .gitignore files for your tech stack
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container max-w-7xl">
            <Alert className="mb-8 border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Security Warning:</strong> Never commit sensitive files like .env, private keys, or credentials
                to your repository. Always add them to .gitignore before your first commit.
              </AlertDescription>
            </Alert>

            <div className="grid gap-8 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Select Templates</CardTitle>
                  <CardDescription>Choose the environments you're using</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.keys(templates).map((template) => (
                    <div key={template} className="flex items-center space-x-2">
                      <Checkbox
                        id={template}
                        checked={selected.includes(template)}
                        onCheckedChange={() => toggleTemplate(template)}
                      />
                      <label
                        htmlFor={template}
                        className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {template}
                      </label>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Generated .gitignore</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="max-h-[500px] overflow-auto rounded-lg bg-slate-950 p-4 text-sm text-slate-50">
                      <code>{generateGitignore() || "# Select templates to generate .gitignore"}</code>
                    </pre>
                  </CardContent>
                </Card>

                <div className="flex gap-3">
                  <Button onClick={downloadFile} className="flex-1" disabled={selected.length === 0}>
                    <Download className="mr-2 h-4 w-4" />
                    Download .gitignore
                  </Button>
                  <Button onClick={copyToClipboard} variant="outline" disabled={selected.length === 0}>
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
