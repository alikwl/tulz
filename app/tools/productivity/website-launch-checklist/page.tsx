"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Download, RotateCcw, CheckCircle2, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ChecklistItem {
  id: string
  title: string
  description: string
}

interface ChecklistCategory {
  category: string
  items: ChecklistItem[]
}

const checklistData: ChecklistCategory[] = [
  {
    category: "SEO",
    items: [
      { id: "seo-1", title: "Meta titles and descriptions", description: "All pages have unique, descriptive meta titles and descriptions" },
      { id: "seo-2", title: "Header tags (H1-H6)", description: "Proper heading hierarchy with one H1 per page" },
      { id: "seo-3", title: "Image alt text", description: "All images have descriptive alt attributes" },
      { id: "seo-4", title: "robots.txt file", description: "robots.txt configured correctly" },
      { id: "seo-5", title: "XML sitemap", description: "Sitemap generated and submitted to search engines" },
      { id: "seo-6", title: "Schema markup", description: "Structured data implemented where applicable" },
      { id: "seo-7", title: "404 page", description: "Custom 404 error page exists" },
      { id: "seo-8", title: "Canonical URLs", description: "Canonical tags implemented correctly" },
    ],
  },
  {
    category: "Performance",
    items: [
      { id: "perf-1", title: "Image optimization", description: "Images compressed and using modern formats (WebP)" },
      { id: "perf-2", title: "CSS minification", description: "CSS files minified and concatenated" },
      { id: "perf-3", title: "JavaScript minification", description: "JS files minified and bundled" },
      { id: "perf-4", title: "Lazy loading", description: "Images and videos load lazily" },
      { id: "perf-5", title: "Browser caching", description: "Cache headers configured" },
      { id: "perf-6", title: "CDN setup", description: "Assets served via CDN" },
      { id: "perf-7", title: "Page speed tested", description: "Google PageSpeed score above 90" },
    ],
  },
  {
    category: "Security",
    items: [
      { id: "sec-1", title: "SSL certificate", description: "HTTPS enabled with valid SSL certificate" },
      { id: "sec-2", title: "Security headers", description: "CSP, X-Frame-Options, etc. configured" },
      { id: "sec-3", title: "Form validation", description: "All forms have proper validation" },
      { id: "sec-4", title: "SQL injection protection", description: "Queries use parameterized statements" },
      { id: "sec-5", title: "XSS protection", description: "User input properly sanitized" },
      { id: "sec-6", title: "Regular backups", description: "Automated backup system in place" },
    ],
  },
  {
    category: "Content",
    items: [
      { id: "cont-1", title: "Spelling and grammar", description: "Content proofread and error-free" },
      { id: "cont-2", title: "Links tested", description: "All internal and external links work" },
      { id: "cont-3", title: "Contact information", description: "Contact details accurate and visible" },
      { id: "cont-4", title: "Privacy policy", description: "Privacy policy page exists" },
      { id: "cont-5", title: "Terms of service", description: "Terms of service page created" },
      { id: "cont-6", title: "Copyright notices", description: "Copyright information displayed" },
    ],
  },
  {
    category: "Testing",
    items: [
      { id: "test-1", title: "Cross-browser testing", description: "Tested on Chrome, Firefox, Safari, Edge" },
      { id: "test-2", title: "Mobile responsive", description: "Works on all device sizes" },
      { id: "test-3", title: "Form submissions", description: "All forms tested and working" },
      { id: "test-4", title: "Analytics setup", description: "Google Analytics or alternative installed" },
      { id: "test-5", title: "Console errors", description: "No JavaScript errors in console" },
    ],
  },
]

export default function WebsiteLaunchChecklist() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())
  const { toast } = useToast()

  useEffect(() => {
    const saved = localStorage.getItem("website-launch-checklist")
    if (saved) {
      setCheckedItems(new Set(JSON.parse(saved)))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("website-launch-checklist", JSON.stringify(Array.from(checkedItems)))
  }, [checkedItems])

  const totalItems = checklistData.reduce((sum, cat) => sum + cat.items.length, 0)
  const completedItems = checkedItems.size
  const readinessScore = Math.round((completedItems / totalItems) * 100)

  const toggleItem = (id: string) => {
    const newChecked = new Set(checkedItems)
    if (newChecked.has(id)) {
      newChecked.delete(id)
    } else {
      newChecked.add(id)
    }
    setCheckedItems(newChecked)
  }

  const resetChecklist = () => {
    setCheckedItems(new Set())
    toast({
      title: "Reset Complete",
      description: "Checklist has been reset",
    })
  }

  const downloadReport = () => {
    toast({
      title: "Report Generated",
      description: "Your readiness report is being prepared",
    })
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 dark:text-green-400"
    if (score >= 70) return "text-yellow-600 dark:text-yellow-400"
    return "text-red-600 dark:text-red-400"
  }

  const getScoreMessage = (score: number) => {
    if (score >= 90) return "Excellent! Your site is ready to launch."
    if (score >= 70) return "Good progress! A few more items to complete."
    if (score >= 50) return "Getting there! Keep working on the checklist."
    return "Just starting! Complete the checklist for a successful launch."
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="relative overflow-hidden border-b bg-gradient-to-br from-yellow-500 to-orange-500 py-16 text-white">
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          <div className="container relative">
            <div className="mx-auto max-w-3xl text-center">
              <Badge className="mb-4 bg-white/20 text-white backdrop-blur-sm">
                Productivity
              </Badge>
              <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
                Website Launch Checklist
              </h1>
              <p className="text-lg text-white/90">
                Ensure your website is ready for launch with this comprehensive checklist
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container max-w-4xl">
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-3xl">Readiness Score</CardTitle>
                    <CardDescription>
                      {completedItems} of {totalItems} items completed
                    </CardDescription>
                  </div>
                  <div className={`text-5xl font-bold ${getScoreColor(readinessScore)}`}>
                    {readinessScore}%
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Progress value={readinessScore} className="mb-4 h-4" />
                <p className="text-center text-muted-foreground">{getScoreMessage(readinessScore)}</p>
                <div className="mt-6 flex gap-3">
                  <Button onClick={downloadReport} className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF Report
                  </Button>
                  <Button variant="outline" onClick={resetChecklist}>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Accordion type="multiple" defaultValue={checklistData.map(cat => cat.category)}>
              {checklistData.map((category) => {
                const categoryCompleted = category.items.filter(item => checkedItems.has(item.id)).length
                const categoryTotal = category.items.length
                const categoryProgress = Math.round((categoryCompleted / categoryTotal) * 100)

                return (
                  <AccordionItem key={category.category} value={category.category}>
                    <AccordionTrigger>
                      <div className="flex w-full items-center justify-between pr-4">
                        <span className="text-lg font-semibold">{category.category}</span>
                        <Badge variant={categoryCompleted === categoryTotal ? "default" : "secondary"}>
                          {categoryCompleted}/{categoryTotal}
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-4">
                        {category.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-start gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/50"
                          >
                            <Checkbox
                              id={item.id}
                              checked={checkedItems.has(item.id)}
                              onCheckedChange={() => toggleItem(item.id)}
                              className="mt-1"
                            />
                            <div className="flex-1">
                              <label
                                htmlFor={item.id}
                                className={`cursor-pointer font-medium ${
                                  checkedItems.has(item.id) ? "text-muted-foreground line-through" : ""
                                }`}
                              >
                                {item.title}
                              </label>
                              <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                            </div>
                            {checkedItems.has(item.id) && (
                              <CheckCircle2 className="h-5 w-5 text-green-500" />
                            )}
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>

            <Card className="mt-12 border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  About This Checklist
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p>
                  This comprehensive checklist covers essential aspects of website launches including SEO,
                  performance, security, content quality, and testing. Your progress is automatically saved in your browser.
                </p>
                <p>
                  Use this tool to ensure nothing is missed before going live. A score of 90% or higher indicates
                  your site is well-prepared for launch.
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
