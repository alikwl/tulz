"use client"

import { useState } from "react"
import { Mail } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface CategoryNewsletterProps {
  gradient: string
}

export function CategoryNewsletter({ gradient }: CategoryNewsletterProps) {
  const [email, setEmail] = useState("")

  return (
    <Card className={`border-2 bg-gradient-to-br ${gradient} text-white`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Mail className="h-5 w-5" />
          Stay Updated
        </CardTitle>
        <CardDescription className="text-white/80">
          Get notified about new tools and features
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            alert("Newsletter signup feature coming soon!")
          }}
          className="space-y-3"
        >
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-white/20 bg-white/10 text-white placeholder:text-white/60"
            required
          />
          <Button type="submit" variant="secondary" className="w-full">
            Subscribe
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
