"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function GitHubActionsGenerator() {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)
  const [techStack, setTechStack] = useState<string>("nodejs")
  const [destination, setDestination] = useState<string>("vercel")

  const generateWorkflow = () => {
    const workflows: Record<string, Record<string, string>> = {
      nodejs: {
        vercel: `name: Deploy to Vercel

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: \${{ secrets.VERCEL_PROJECT_ID }}`,

        netlify: `name: Deploy to Netlify

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install and Build
        run: |
          npm ci
          npm run build

      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        env:
          NETLIFY_AUTH_TOKEN: \${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: \${{ secrets.NETLIFY_SITE_ID }}
        with:
          args: deploy --prod --dir=build`,
      },
      python: {
        heroku: `name: Deploy to Heroku

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: \${{ secrets.HEROKU_API_KEY }}
          heroku_app_name: "your-app-name"
          heroku_email: "your-email@example.com"`,

        aws: `name: Deploy to AWS

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1

      - name: Deploy to AWS
        run: |
          # Add your deployment commands here
          echo "Deploying to AWS..."`,
      },
    }

    return workflows[techStack]?.[destination] || "# Select options to generate workflow"
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateWorkflow())
    setCopied(true)
    toast({
      title: "Copied!",
      description: "Workflow copied to clipboard",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadWorkflow = () => {
    const blob = new Blob([generateWorkflow()], { type: "text/yaml" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "deploy.yml"
    a.click()
    URL.revokeObjectURL(url)

    toast({
      title: "Downloaded!",
      description: "Workflow file downloaded successfully",
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
                GitHub Actions Generator
              </h1>
              <p className="text-lg text-white/90">
                Create GitHub Actions workflows with an easy wizard
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Workflow Configuration</CardTitle>
                  <CardDescription>Answer a few questions to generate your workflow</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>What's your tech stack?</Label>
                    <Select value={techStack} onValueChange={setTechStack}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nodejs">Node.js</SelectItem>
                        <SelectItem value="python">Python</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Where do you want to deploy?</Label>
                    <Select value={destination} onValueChange={setDestination}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {techStack === "nodejs" && (
                          <>
                            <SelectItem value="vercel">Vercel</SelectItem>
                            <SelectItem value="netlify">Netlify</SelectItem>
                          </>
                        )}
                        {techStack === "python" && (
                          <>
                            <SelectItem value="heroku">Heroku</SelectItem>
                            <SelectItem value="aws">AWS</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950">
                    <h4 className="mb-2 font-semibold">Next Steps:</h4>
                    <ol className="list-inside list-decimal space-y-1 text-sm text-muted-foreground">
                      <li>Copy or download the generated workflow</li>
                      <li>Create .github/workflows directory in your repository</li>
                      <li>Save the workflow as deploy.yml</li>
                      <li>Configure required secrets in GitHub Settings</li>
                      <li>Push to trigger the workflow</li>
                    </ol>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Generated Workflow</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="max-h-[500px] overflow-auto rounded-lg bg-slate-950 p-4 text-sm text-slate-50">
                      <code>{generateWorkflow()}</code>
                    </pre>
                  </CardContent>
                </Card>

                <div className="flex gap-3">
                  <Button onClick={downloadWorkflow} className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Download deploy.yml
                  </Button>
                  <Button onClick={copyToClipboard} variant="outline">
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
