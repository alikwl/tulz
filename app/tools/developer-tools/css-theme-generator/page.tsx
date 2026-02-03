"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, Check, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function CSSThemeGenerator() {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  const [primary, setPrimary] = useState("#3b82f6")
  const [secondary, setSecondary] = useState("#8b5cf6")
  const [background, setBackground] = useState("#ffffff")
  const [text, setText] = useState("#1f2937")

  const generateCSS = () => {
    return `:root {
  /* Primary Colors */
  --color-primary: ${primary};
  --color-primary-light: ${primary}20;
  --color-primary-dark: ${primary};

  /* Secondary Colors */
  --color-secondary: ${secondary};
  --color-secondary-light: ${secondary}20;

  /* Background */
  --color-background: ${background};

  /* Text */
  --color-text: ${text};
  --color-text-muted: ${text}99;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}`
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateCSS())
    setCopied(true)
    toast({
      title: "Copied!",
      description: "CSS variables copied to clipboard",
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
                CSS Theme Generator
              </h1>
              <p className="text-lg text-white/90">
                Build custom CSS themes with live preview and color pickers
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Color Palette</CardTitle>
                    <CardDescription>Choose your theme colors</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Primary Color</Label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={primary}
                          onChange={(e) => setPrimary(e.target.value)}
                          className="h-10 w-20 cursor-pointer rounded border"
                        />
                        <input
                          type="text"
                          value={primary}
                          onChange={(e) => setPrimary(e.target.value)}
                          className="flex-1 rounded border px-3 py-2 font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Secondary Color</Label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={secondary}
                          onChange={(e) => setSecondary(e.target.value)}
                          className="h-10 w-20 cursor-pointer rounded border"
                        />
                        <input
                          type="text"
                          value={secondary}
                          onChange={(e) => setSecondary(e.target.value)}
                          className="flex-1 rounded border px-3 py-2 font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Background Color</Label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={background}
                          onChange={(e) => setBackground(e.target.value)}
                          className="h-10 w-20 cursor-pointer rounded border"
                        />
                        <input
                          type="text"
                          value={background}
                          onChange={(e) => setBackground(e.target.value)}
                          className="flex-1 rounded border px-3 py-2 font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Text Color</Label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                          className="h-10 w-20 cursor-pointer rounded border"
                        />
                        <input
                          type="text"
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                          className="flex-1 rounded border px-3 py-2 font-mono"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Generated CSS</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="max-h-[300px] overflow-auto rounded-lg bg-slate-950 p-4 text-sm text-slate-50">
                      <code>{generateCSS()}</code>
                    </pre>
                    <Button onClick={copyToClipboard} className="mt-4 w-full">
                      {copied ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy CSS
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Live Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={{ backgroundColor: background, color: text }} className="space-y-4 rounded-lg p-6">
                    <h2 className="text-2xl font-bold">Preview Heading</h2>
                    <p>This is how your text will look with the selected colors.</p>

                    <button
                      style={{ backgroundColor: primary, color: background }}
                      className="rounded-lg px-4 py-2 font-semibold"
                    >
                      Primary Button
                    </button>

                    <button
                      style={{ backgroundColor: secondary, color: background }}
                      className="ml-2 rounded-lg px-4 py-2 font-semibold"
                    >
                      Secondary Button
                    </button>

                    <div
                      style={{ backgroundColor: `${primary}20`, borderLeft: `4px solid ${primary}` }}
                      className="mt-4 p-4"
                    >
                      <p className="font-semibold">Highlighted Content</p>
                      <p className="text-sm opacity-75">This shows how highlighted sections will appear.</p>
                    </div>
                  </div>
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
