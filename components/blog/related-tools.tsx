import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Wrench } from "lucide-react"
import { tools } from "@/lib/tools-data"

interface RelatedToolsProps {
  category?: string
  limit?: number
  keywords?: string[]
}

export function RelatedTools({ category, limit = 3, keywords = [] }: RelatedToolsProps) {
  let relatedTools = tools

  if (keywords.length > 0) {
    relatedTools = tools.filter(tool =>
      keywords.some(keyword =>
        tool.name.toLowerCase().includes(keyword.toLowerCase()) ||
        tool.description.toLowerCase().includes(keyword.toLowerCase()) ||
        tool.features.some(f => f.toLowerCase().includes(keyword.toLowerCase()))
      )
    )
  }

  relatedTools = relatedTools.filter(t => t.popular).slice(0, limit)

  if (relatedTools.length === 0) {
    relatedTools = tools.filter(t => t.popular).slice(0, limit)
  }

  return (
    <Card className="my-8 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Wrench className="h-5 w-5 text-primary" />
          <CardTitle>Related Tools to Try</CardTitle>
        </div>
        <CardDescription>
          Put what you learned into practice with these free tools
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-3">
          {relatedTools.map((tool) => {
            const Icon = tool.icon
            return (
              <Link key={tool.id} href={tool.href}>
                <div className="group flex flex-col rounded-lg border bg-card p-4 transition-all hover:-translate-y-1 hover:shadow-lg active:scale-95">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h4 className="mb-2 font-semibold group-hover:text-primary transition-colors">
                    {tool.name}
                  </h4>
                  <p className="mb-3 text-xs text-muted-foreground line-clamp-2">
                    {tool.description}
                  </p>
                  <div className="mt-auto flex items-center text-xs font-medium text-primary">
                    Try it free
                    <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
        <div className="mt-4 text-center">
          <Link href="/tools">
            <Button variant="outline" size="sm" className="min-h-[44px]">
              View All {tools.length}+ Tools
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

