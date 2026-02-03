import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Check,
  Zap,
  Shield,
  Users,
  Heart,
  Target,
  Lightbulb,
  Rocket,
  Globe,
  ArrowRight,
} from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Tulz.net - Free Online Tools for Everyone",
  description: "Learn about Tulz.net's mission to provide free, powerful online tools for developers, designers, and creators worldwide.",
  keywords: ["about tulz.net", "free online tools", "mission", "about us"],
}

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-950 py-16 sm:py-20 lg:py-24">
          <div className="container px-4 sm:px-6 lg:px-8">
            <Breadcrumb className="mb-6">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>About</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="mx-auto max-w-4xl text-center">
              <Badge className="mb-4 bg-blue-500/10 text-blue-700 dark:text-blue-300">
                About Tulz.net
              </Badge>
              <h1 className="mb-6 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                Free Tools for{" "}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Everyone
                </span>
              </h1>
              <p className="mb-8 text-lg sm:text-xl text-muted-foreground">
                Our mission is to provide powerful, accessible online tools that help people work smarter, create better, and achieve more—without barriers or paywalls.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
              <div className="grid gap-8 md:grid-cols-3 mb-12">
                <Card>
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-4">
                      <Target className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">Our Mission</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      To democratize access to professional-grade online tools, empowering individuals and businesses to achieve their goals without financial barriers.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 mb-4">
                      <Lightbulb className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">Our Vision</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      A world where powerful tools are accessible to everyone, fostering creativity, productivity, and innovation across all communities.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 mb-4">
                      <Heart className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">Our Values</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Transparency, accessibility, privacy-first design, and continuous improvement driven by user feedback and needs.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className="mb-12">
                <CardHeader>
                  <CardTitle className="text-2xl">Our Story</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    Tulz.net was born from a simple observation: many essential online tools were hidden behind paywalls, required signups, or came with intrusive ads. We believed there had to be a better way.
                  </p>
                  <p>
                    We started with a handful of developer tools and quickly realized the demand for accessible, high-quality utilities extended far beyond just code. Today, we offer 50+ tools across AI, development, image editing, text processing, and productivity—all completely free.
                  </p>
                  <p>
                    What makes Tulz.net different is our commitment to user experience. No signups, no hidden costs, no data harvesting. Just clean, fast, powerful tools that work the moment you need them. Most of our tools process data entirely in your browser, ensuring your privacy and security.
                  </p>
                  <p>
                    We're continuously adding new tools and features based on user feedback. Our goal isn't just to provide tools—it's to create a platform that genuinely makes people's lives easier and more productive.
                  </p>
                </CardContent>
              </Card>

              <div className="mb-12">
                <h2 className="mb-6 text-2xl font-bold">Why Choose Tulz.net?</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-green-500/10">
                      <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">100% Free Forever</h3>
                      <p className="text-sm text-muted-foreground">
                        No trials, no hidden costs, no premium tiers. Every feature is free for everyone.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
                      <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Lightning Fast</h3>
                      <p className="text-sm text-muted-foreground">
                        Optimized performance and browser-based processing for instant results.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-purple-500/10">
                      <Shield className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Privacy-First</h3>
                      <p className="text-sm text-muted-foreground">
                        Most tools process data locally in your browser. Your data never leaves your device.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-orange-500/10">
                      <Users className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">No Signup Required</h3>
                      <p className="text-sm text-muted-foreground">
                        Start using any tool immediately. No accounts, no email verification.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-red-500/10">
                      <Rocket className="h-5 w-5 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Constantly Improving</h3>
                      <p className="text-sm text-muted-foreground">
                        Regular updates, new features, and new tools added based on user feedback.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-cyan-500/10">
                      <Globe className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Works Everywhere</h3>
                      <p className="text-sm text-muted-foreground">
                        Fully responsive design works on desktop, tablet, and mobile devices.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-8" />

              <div className="mb-12">
                <h2 className="mb-6 text-2xl font-bold">By the Numbers</h2>
                <div className="grid gap-6 sm:grid-cols-4">
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">50+</div>
                      <p className="text-sm text-muted-foreground mt-2">Free Tools</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="text-3xl font-bold text-green-600 dark:text-green-400">100%</div>
                      <p className="text-sm text-muted-foreground mt-2">Free Forever</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">0</div>
                      <p className="text-sm text-muted-foreground mt-2">Signups Required</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">5</div>
                      <p className="text-sm text-muted-foreground mt-2">Tool Categories</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Card className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                <CardHeader>
                  <CardTitle className="text-2xl">Ready to Get Started?</CardTitle>
                  <CardDescription className="text-white/90">
                    Explore our collection of 50+ free online tools and boost your productivity today
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link href="/tools" className="flex-1">
                      <Button variant="secondary" size="lg" className="w-full min-h-[44px]">
                        Browse All Tools
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href="/blog" className="flex-1">
                      <Button variant="outline" size="lg" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 min-h-[44px]">
                        Read Our Blog
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
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
