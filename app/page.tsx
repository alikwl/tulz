import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  FileText,
  Image as ImageIcon,
  Code,
  Search,
  Zap,
  ArrowRight,
  Gift,
  Shield,
  Check,
  Hash,
  Key,
  QrCode,
  Type,
  FileJson,
  Bot,
  Wrench,
  Sparkles,
  TrendingUp,
} from "lucide-react"

const popularTools = [
  {
    name: "AI Text Humanizer",
    description: "Make AI text sound natural and human-like",
    icon: Bot,
    href: "/tools/ai-tools/ai-humanizer",
  },
  {
    name: "Grammar Checker",
    description: "Check grammar, spelling, and punctuation",
    icon: Check,
    href: "/tools/ai-tools/grammar-checker",
  },
  {
    name: "Word Counter",
    description: "Count words, characters, and reading time",
    icon: Type,
    href: "/tools/text-tools/word-counter",
  },
  {
    name: "JSON Formatter",
    description: "Format and validate JSON data instantly",
    icon: FileJson,
    href: "/tools/developer-tools/json-formatter",
  },
  {
    name: "Image Compressor",
    description: "Reduce image size without quality loss",
    icon: ImageIcon,
    href: "/tools/image-tools/image-compressor",
  },
  {
    name: "AI Content Detector",
    description: "Detect AI-generated vs human-written text",
    icon: Sparkles,
    href: "/tools/ai-tools/ai-detector",
  },
  {
    name: "Base64 Encoder",
    description: "Encode and decode Base64 strings",
    icon: Hash,
    href: "/tools/developer-tools/base64-encoder-decoder",
  },
  {
    name: "Color Picker",
    description: "Pick and convert colors between formats",
    icon: Sparkles,
    href: "/tools/productivity/color-picker",
  },
]

const categories = [
  {
    title: "AI Tools",
    icon: Bot,
    count: 5,
    href: "/tools/ai-tools",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Developer Tools",
    icon: Code,
    count: 10,
    href: "/tools/developer-tools",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Image Tools",
    icon: ImageIcon,
    count: 1,
    href: "/tools/image-tools",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    title: "Text Tools",
    icon: FileText,
    count: 1,
    href: "/tools/text-tools",
    gradient: "from-orange-500 to-red-500",
  },
  {
    title: "Productivity",
    icon: Zap,
    count: 5,
    href: "/tools/productivity",
    gradient: "from-yellow-500 to-orange-500",
  },
]

const benefits = [
  "Lightning fast performance",
  "Works offline",
  "No ads or popups",
  "Regular updates",
  "Open source",
]

const steps = [
  {
    number: "01",
    title: "Choose Your Tool",
    description: "Browse our catalog of 50+ tools or use search to find exactly what you need",
    icon: Search,
  },
  {
    number: "02",
    title: "Use Instantly",
    description: "No registration, no downloads. Start using the tool immediately in your browser",
    icon: Zap,
  },
  {
    number: "03",
    title: "Get Results",
    description: "Fast, accurate results with the option to download, copy, or share",
    icon: Check,
  },
]

const stats = [
  { value: "50+", label: "Tools Available" },
  { value: "100%", label: "Free Forever" },
  { value: "0", label: "Registration Required" },
  { value: "24/7", label: "Available" },
]

const faqs = [
  {
    question: "Are all tools really free?",
    answer: "Yes! All our tools are completely free to use with no hidden costs, subscriptions, or premium tiers. We believe in making productivity tools accessible to everyone.",
  },
  {
    question: "Do I need to create an account?",
    answer: "No account needed! You can start using any tool immediately without registration. Your data stays in your browser and is never stored on our servers.",
  },
  {
    question: "Is my data safe and private?",
    answer: "Absolutely. All processing happens directly in your browser. We don't collect, store, or transmit your data to any servers. Your privacy is our top priority.",
  },
  {
    question: "Can I use these tools offline?",
    answer: "Many of our tools work offline once you've loaded the page. However, some AI-powered tools may require an internet connection.",
  },
  {
    question: "Do you have mobile apps?",
    answer: "Our website is fully responsive and works perfectly on all devices. You can add it to your home screen for app-like experience.",
  },
  {
    question: "How often do you add new tools?",
    answer: "We regularly add new tools based on user requests and emerging needs. Follow us on social media to stay updated on new releases.",
  },
]

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": "https://tulz.net/#website",
                url: "https://tulz.net",
                name: "Tulz.net",
                description: "Free Online Tools for Developers & Creators",
                inLanguage: "en-US",
                potentialAction: {
                  "@type": "SearchAction",
                  target: {
                    "@type": "EntryPoint",
                    urlTemplate: "https://tulz.net/search?q={search_term_string}",
                  },
                  "query-input": "required name=search_term_string",
                },
              },
              {
                "@type": "Organization",
                "@id": "https://tulz.net/#organization",
                name: "Tulz.net",
                url: "https://tulz.net",
                logo: {
                  "@type": "ImageObject",
                  url: "https://tulz.net/logo.png",
                  width: 512,
                  height: 512,
                },
                description: "Free online tools for productivity, development, and everyday tasks.",
                sameAs: [
                  "https://twitter.com/tulznet",
                  "https://github.com/tulznet",
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://tulz.net/#webpage",
                url: "https://tulz.net",
                name: "Tulz.net - Free Online Tools for Productivity & Development",
                isPartOf: {
                  "@id": "https://tulz.net/#website",
                },
                about: {
                  "@id": "https://tulz.net/#organization",
                },
                description:
                  "Access powerful AI tools and utilities for productivity, development, and everyday tasks. Clean, fast, and user-friendly.",
                inLanguage: "en-US",
              },
              {
                "@type": "ItemList",
                itemListElement: popularTools.map((tool, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  item: {
                    "@type": "SoftwareApplication",
                    name: tool.name,
                    description: tool.description,
                    applicationCategory: "UtilityApplication",
                    operatingSystem: "Any",
                    offers: {
                      "@type": "Offer",
                      price: "0",
                      priceCurrency: "USD",
                    },
                  },
                })),
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    item: {
                      "@id": "https://tulz.net",
                      name: "Home",
                    },
                  },
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: faqs.map((faq) => ({
                  "@type": "Question",
                  name: faq.question,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: faq.answer,
                  },
                })),
              },
            ],
          }),
        }}
      />

      <Header />

      <main className="flex-1">
        <section className="relative overflow-hidden py-12 sm:py-16 md:py-24 lg:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-950">
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          </div>

          <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight">
                Free Online Tools for
                <span className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-200 bg-clip-text text-transparent">
                  {" "}
                  Developers & Creators
                </span>
              </h1>
              <p className="mb-6 sm:mb-8 text-base sm:text-lg md:text-xl text-muted-foreground px-4 sm:px-0">
                Access powerful AI-powered tools - No signup required
              </p>

              <div className="mb-6 sm:mb-8 flex flex-col items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0 sm:flex-row">
                <Button size="lg" asChild className="w-full sm:w-auto min-h-[48px]">
                  <Link href="/tools">
                    Explore Tools
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="w-full sm:w-auto min-h-[48px]">
                  <Link href="/tools">View All Categories</Link>
                </Button>
              </div>

              <div className="mx-auto max-w-2xl px-4 sm:px-0">
                <div className="relative">
                  <Search className="absolute left-3 sm:left-4 top-1/2 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  <Input
                    type="search"
                    placeholder="Search for any tool..."
                    className="h-12 sm:h-14 pl-10 sm:pl-12 text-sm sm:text-base"
                    aria-label="Search tools"
                  />
                </div>
                <div className="mt-3 sm:mt-4 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm">
                  <span className="text-muted-foreground">Trending:</span>
                  <Link
                    href="/tools/text-tools/word-counter"
                    className="rounded-full bg-background px-3 py-1.5 min-h-[32px] flex items-center transition-colors hover:bg-accent active:bg-accent"
                  >
                    Word Counter
                  </Link>
                  <Link
                    href="/tools/developer-tools/json-formatter"
                    className="rounded-full bg-background px-3 py-1.5 min-h-[32px] flex items-center transition-colors hover:bg-accent active:bg-accent"
                  >
                    JSON Formatter
                  </Link>
                  <Link
                    href="/tools/image-tools/image-compressor"
                    className="rounded-full bg-background px-3 py-1.5 min-h-[32px] flex items-center transition-colors hover:bg-accent active:bg-accent"
                  >
                    Image Compressor
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t py-12 sm:py-16 lg:py-20">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 sm:gap-10 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg">
                  <Gift className="h-7 w-7 sm:h-8 sm:w-8" />
                </div>
                <h3 className="mb-2 text-lg sm:text-xl font-semibold">100% Free</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  All tools completely free forever
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg">
                  <Zap className="h-7 w-7 sm:h-8 sm:w-8" />
                </div>
                <h3 className="mb-2 text-lg sm:text-xl font-semibold">No Registration</h3>
                <p className="text-sm sm:text-base text-muted-foreground">Start using instantly</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg">
                  <Shield className="h-7 w-7 sm:h-8 sm:w-8" />
                </div>
                <h3 className="mb-2 text-lg sm:text-xl font-semibold">Privacy First</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Your data never leaves your browser
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="mb-8 sm:mb-10 lg:mb-12 text-center">
              <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                Popular Tools
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground px-4 sm:px-0">
                Most used tools by our community
              </p>
            </div>

            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {popularTools.map((tool) => (
                <Link key={tool.name} href={tool.href}>
                  <Card className="group h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl active:scale-95">
                    <CardHeader>
                      <div className="mb-3 sm:mb-4 inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg transition-transform group-hover:scale-110">
                        <tool.icon className="h-6 w-6 sm:h-7 sm:w-7" />
                      </div>
                      <CardTitle className="text-base sm:text-lg">{tool.name}</CardTitle>
                      <CardDescription className="line-clamp-2 text-sm">
                        {tool.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="ghost" className="group/button w-full justify-between min-h-[44px]">
                        Try Now
                        <ArrowRight className="h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t bg-muted/30 py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="mb-8 sm:mb-10 lg:mb-12 text-center">
              <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                Browse by Category
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground px-4 sm:px-0">
                Find the perfect tool for your needs
              </p>
            </div>

            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {categories.map((category) => (
                <Link key={category.title} href={category.href}>
                  <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl active:scale-95">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 transition-opacity group-hover:opacity-10`}
                    />
                    <CardHeader className="text-center">
                      <div className="mx-auto mb-3 sm:mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-600/10 transition-all group-hover:scale-110">
                        <category.icon className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
                      </div>
                      <CardTitle className="text-base sm:text-lg">{category.title}</CardTitle>
                      <CardDescription className="flex items-center justify-center gap-1 text-sm">
                        <TrendingUp className="h-3 w-3" />
                        {category.count} tools
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div className="flex items-center justify-center">
                <div className="relative h-full w-full max-w-md">
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-8">
                    <div className="flex h-full flex-col items-center justify-center gap-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-background shadow-lg">
                          <Code className="h-12 w-12 text-primary" />
                        </div>
                        <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-background shadow-lg">
                          <Zap className="h-12 w-12 text-primary" />
                        </div>
                        <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-background shadow-lg">
                          <Shield className="h-12 w-12 text-primary" />
                        </div>
                        <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-background shadow-lg">
                          <Wrench className="h-12 w-12 text-primary" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">
                  Why Choose Tulz.net?
                </h2>
                <p className="mb-8 text-lg text-muted-foreground">
                  Built with modern technologies for the best user experience
                </p>
                <ul className="space-y-4">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/10">
                        <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="text-lg">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t bg-muted/30 py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="mb-8 sm:mb-10 lg:mb-12 text-center">
              <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                By the Numbers
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground px-4 sm:px-0">
                Trusted by thousands of users worldwide
              </p>
            </div>
            <div className="grid gap-6 sm:gap-8 grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <CardTitle className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                      {stat.value}
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base">{stat.label}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="mb-8 sm:mb-10 lg:mb-12 text-center">
              <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                How It Works
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground px-4 sm:px-0">
                Get started in three simple steps
              </p>
            </div>
            <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
              {steps.map((step, index) => (
                <Card key={index} className="relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 text-8xl font-bold text-muted/10">
                    {step.number}
                  </div>
                  <CardHeader>
                    <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
                      <step.icon className="h-7 w-7" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl">{step.title}</CardTitle>
                    <CardDescription className="text-sm sm:text-base">
                      {step.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="mb-8 sm:mb-10 lg:mb-12 text-center">
              <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground px-4 sm:px-0">
                Everything you need to know about Tulz.net
              </p>
            </div>
            <div className="mx-auto max-w-3xl space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-base sm:text-lg text-left">
                      {faq.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm sm:text-base text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-2xl">
                <div className="absolute right-0 top-0 h-full w-1/2 opacity-10">
                  <div className="flex h-full items-center justify-center">
                    <Sparkles className="h-64 w-64" />
                  </div>
                </div>
                <CardHeader className="relative pb-4 text-center">
                  <CardTitle className="text-3xl md:text-4xl">
                    Ready to boost your productivity?
                  </CardTitle>
                  <CardDescription className="text-lg text-blue-100">
                    Start using our tools now - completely free, no signup needed
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative flex justify-center pb-8">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="text-base shadow-lg"
                    asChild
                  >
                    <Link href="/tools">
                      Start Using Tools Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
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
