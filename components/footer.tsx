"use client"

import Link from "next/link"
import { Github, Twitter, Linkedin, Facebook, ArrowRight, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setTimeout(() => {
        setIsSubscribed(false)
        setEmail("")
      }, 3000)
    }
  }

  return (
    <footer className="border-t border-border bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Tulz.net",
            url: "https://tulz.net",
            logo: "https://tulz.net/logo.png",
            description: "Free Online Tools for Everyone",
            sameAs: [
              "https://twitter.com/tulznet",
              "https://github.com/tulznet",
              "https://linkedin.com/company/tulznet",
              "https://facebook.com/tulznet",
            ],
          }),
        }}
      />

      <div className="container mx-auto py-12 md:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div>
              <Link href="/" className="inline-block">
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 dark:from-blue-400 dark:via-blue-300 dark:to-blue-200 bg-clip-text text-transparent">
                  Tulz.net
                </h3>
              </Link>
              <p className="mt-2 text-sm text-muted-foreground">
                Free Online Tools for Everyone
              </p>
            </div>
            <div className="flex space-x-3">
              <Link
                href="https://twitter.com/tulznet"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-background transition-all hover:bg-primary hover:text-primary-foreground"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </Link>
              <Link
                href="https://github.com/tulznet"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-background transition-all hover:bg-primary hover:text-primary-foreground"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </Link>
              <Link
                href="https://linkedin.com/company/tulznet"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-background transition-all hover:bg-primary hover:text-primary-foreground"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </Link>
              <Link
                href="https://facebook.com/tulznet"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-background transition-all hover:bg-primary hover:text-primary-foreground"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground transition-colors hover:text-primary hover:translate-x-1 inline-block">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-muted-foreground transition-colors hover:text-primary hover:translate-x-1 inline-block">
                  All Tools
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground transition-colors hover:text-primary hover:translate-x-1 inline-block">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground transition-colors hover:text-primary hover:translate-x-1 inline-block">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground transition-colors hover:text-primary hover:translate-x-1 inline-block">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground transition-colors hover:text-primary hover:translate-x-1 inline-block">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground transition-colors hover:text-primary hover:translate-x-1 inline-block">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Tool Categories</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/tools/ai-tools" className="text-muted-foreground transition-colors hover:text-primary hover:translate-x-1 inline-block">
                  AI Tools
                </Link>
              </li>
              <li>
                <Link href="/tools/developer-tools" className="text-muted-foreground transition-colors hover:text-primary hover:translate-x-1 inline-block">
                  Developer Tools
                </Link>
              </li>
              <li>
                <Link href="/tools/image-tools" className="text-muted-foreground transition-colors hover:text-primary hover:translate-x-1 inline-block">
                  Image Tools
                </Link>
              </li>
              <li>
                <Link href="/tools/text-tools" className="text-muted-foreground transition-colors hover:text-primary hover:translate-x-1 inline-block">
                  Text Tools
                </Link>
              </li>
              <li>
                <Link href="/tools/productivity" className="text-muted-foreground transition-colors hover:text-primary hover:translate-x-1 inline-block">
                  Productivity
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Stay Updated</h3>
            <p className="text-sm text-muted-foreground">
              Get latest tools & updates
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background"
                aria-label="Email for newsletter"
              />
              <Button
                type="submit"
                className="w-full"
                disabled={isSubscribed}
              >
                {isSubscribed ? (
                  "Subscribed!"
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} Tulz.net. All rights reserved.
            </p>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-4 w-4 fill-red-500 text-red-500" />
              <span>for developers</span>
            </div>
            <div className="flex gap-4 text-sm">
              <Link
                href="/privacy"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                Privacy
              </Link>
              <span className="text-muted-foreground">|</span>
              <Link
                href="/terms"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                Terms
              </Link>
              <span className="text-muted-foreground">|</span>
              <Link
                href="/sitemap.xml"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
