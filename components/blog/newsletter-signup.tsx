"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, CheckCircle2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface NewsletterSignupProps {
  title?: string
  description?: string
  inline?: boolean
}

export function NewsletterSignup({
  title = "Never Miss an Update",
  description = "Get the latest tips, tutorials, and productivity hacks delivered to your inbox weekly",
  inline = false
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubscribed(true)
      toast({
        title: "Successfully subscribed!",
        description: "Check your inbox for a confirmation email",
      })
      setEmail("")

      setTimeout(() => setIsSubscribed(false), 3000)
    }, 1000)
  }

  if (inline) {
    return (
      <div className="my-8 rounded-lg border-2 border-dashed border-primary/20 bg-primary/5 p-6 sm:p-8">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <h3 className="mb-2 text-xl font-bold">{title}</h3>
          <p className="mb-4 text-sm text-muted-foreground max-w-md">{description}</p>

          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
                className="h-11 flex-1"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="min-h-[44px]"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          ) : (
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-medium">You're subscribed!</span>
            </div>
          )}

          <p className="mt-3 text-xs text-muted-foreground">
            Join 10,000+ subscribers. No spam, unsubscribe anytime.
          </p>
        </div>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Mail className="h-5 w-5 text-primary" />
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {!isSubscribed ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
              className="h-11"
            />
            <Button
              type="submit"
              className="w-full min-h-[44px]"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Join 10,000+ subscribers. No spam, unsubscribe anytime.
            </p>
          </form>
        ) : (
          <div className="flex flex-col items-center gap-3 py-4">
            <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
            <p className="font-medium text-green-600 dark:text-green-400">Successfully subscribed!</p>
            <p className="text-sm text-muted-foreground">Check your inbox for confirmation</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
