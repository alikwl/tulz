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
import { Download, Eye, Copy, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface JekyllConfig {
  title: string
  description: string
  baseurl: string
  url: string
  twitter: string
  github: string
  email: string
  theme: string
  markdown: string
  plugins: string[]
}

export default function JekyllConfigBuilder() {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  const [config, setConfig] = useState<JekyllConfig>({
    title: "My Jekyll Site",
    description: "A beautiful Jekyll website",
    baseurl: "",
    url: "https://example.com",
    twitter: "",
    github: "",
    email: "hello@example.com",
    theme: "minima",
    markdown: "kramdown",
    plugins: ["jekyll-feed", "jekyll-seo-tag"],
  })

  const generateConfig = () => {
    let configText = `# Site Settings
title: "${config.title}"
description: "${config.description}"
${config.baseurl ? `baseurl: "${config.baseurl}"` : "# baseurl: \"\""}
url: "${config.url}"

# Contact Information
${config.email ? `email: ${config.email}` : "# email: your-email@example.com"}
${config.twitter ? `twitter_username: ${config.twitter}` : "# twitter_username: username"}
${config.github ? `github_username: ${config.github}` : "# github_username: username"}

# Build Settings
theme: ${config.theme}
markdown: ${config.markdown}
plugins:
${config.plugins.map(p => `  - ${p}`).join('\n')}

# Exclude from processing
exclude:
  - Gemfile
  - Gemfile.lock
  - node_modules
  - vendor/bundle/
  - vendor/cache/
  - vendor/gems/
  - vendor/ruby/
`
    return configText
  }

  const downloadConfig = () => {
    const configText = generateConfig()
    const blob = new Blob([configText], { type: "text/yaml" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "_config.yml"
    a.click()
    URL.revokeObjectURL(url)

    toast({
      title: "Downloaded!",
      description: "_config.yml file has been downloaded",
    })
  }

  const copyConfig = () => {
    const configText = generateConfig()
    navigator.clipboard.writeText(configText)
    setCopied(true)
    toast({
      title: "Copied!",
      description: "Configuration copied to clipboard",
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
                Jekyll Config Builder
              </h1>
              <p className="text-lg text-white/90">
                Build your Jekyll _config.yml file with an easy visual interface
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <h2 className="mb-6 text-2xl font-bold">Site Configuration</h2>

                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>Main site details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Site Title</Label>
                      <Input
                        id="title"
                        value={config.title}
                        onChange={(e) => setConfig({ ...config, title: e.target.value })}
                        placeholder="My Jekyll Site"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={config.description}
                        onChange={(e) => setConfig({ ...config, description: e.target.value })}
                        placeholder="A brief description of your site"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="url">URL</Label>
                      <Input
                        id="url"
                        value={config.url}
                        onChange={(e) => setConfig({ ...config, url: e.target.value })}
                        placeholder="https://example.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="baseurl">Base URL (optional)</Label>
                      <Input
                        id="baseurl"
                        value={config.baseurl}
                        onChange={(e) => setConfig({ ...config, baseurl: e.target.value })}
                        placeholder="/blog"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Social & Contact</CardTitle>
                    <CardDescription>Connect with your audience</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={config.email}
                        onChange={(e) => setConfig({ ...config, email: e.target.value })}
                        placeholder="hello@example.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="twitter">Twitter Username</Label>
                      <Input
                        id="twitter"
                        value={config.twitter}
                        onChange={(e) => setConfig({ ...config, twitter: e.target.value })}
                        placeholder="username"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="github">GitHub Username</Label>
                      <Input
                        id="github"
                        value={config.github}
                        onChange={(e) => setConfig({ ...config, github: e.target.value })}
                        placeholder="username"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Build Settings</CardTitle>
                    <CardDescription>Jekyll configuration</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="theme">Theme</Label>
                      <Input
                        id="theme"
                        value={config.theme}
                        onChange={(e) => setConfig({ ...config, theme: e.target.value })}
                        placeholder="minima"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="markdown">Markdown Processor</Label>
                      <Input
                        id="markdown"
                        value={config.markdown}
                        onChange={(e) => setConfig({ ...config, markdown: e.target.value })}
                        placeholder="kramdown"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:sticky lg:top-6 lg:self-start">
                <h2 className="mb-6 text-2xl font-bold flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Live Preview
                </h2>

                <Card className="mb-4">
                  <CardContent className="p-0">
                    <pre className="max-h-[600px] overflow-auto rounded-lg bg-slate-950 p-6 text-sm text-slate-50">
                      <code>{generateConfig()}</code>
                    </pre>
                  </CardContent>
                </Card>

                <div className="flex gap-3">
                  <Button onClick={downloadConfig} className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Download _config.yml
                  </Button>
                  <Button variant="outline" onClick={copyConfig}>
                    {copied ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            <Card className="mt-12 border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950">
              <CardHeader>
                <CardTitle>About Jekyll Config Builder</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p>
                  Jekyll is a popular static site generator. The _config.yml file is essential for configuring
                  your Jekyll site. This tool helps you create a properly formatted configuration file without
                  memorizing the YAML syntax.
                </p>
                <p>
                  Simply fill in the form fields, see your configuration update in real-time, and download
                  the ready-to-use _config.yml file for your Jekyll project.
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
