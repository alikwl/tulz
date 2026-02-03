import { Card } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

export function AffiliateDisclosure() {
  return (
    <Card className="my-6 border-l-4 border-l-blue-500 bg-blue-50/50 dark:bg-blue-950/20">
      <div className="flex gap-3 p-4">
        <AlertCircle className="h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400 mt-0.5" />
        <div className="text-sm">
          <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
            Affiliate Disclosure
          </p>
          <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
            This post may contain affiliate links. If you purchase through these links, we may earn a small commission at no additional cost to you. This helps us maintain Tulz.net and keep all our tools free forever. We only recommend products and services we genuinely believe in.
          </p>
        </div>
      </div>
    </Card>
  )
}
