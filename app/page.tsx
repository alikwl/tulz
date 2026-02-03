import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  FileText,
  Image as ImageIcon,
  Code,
  Zap,
  ArrowRight,
  Shield,
  Check,
  Hash,
  Type,
  FileJson,
  Bot,
  Sparkles,
  Smartphone,
  Lock,
  Globe,
  Rocket,
  TrendingUp,
  Clock,
  Users,
} from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Online Tools for Developers, Creators & Productivity – Tulz.net",
  description: "Access 50+ free online tools for AI, text, images, coding & productivity. No signup, privacy-first, fast & ad-free. Start using Tulz.net today!",
  keywords: ["free online tools", "AI tools", "developer tools", "productivity tools", "JSON formatter", "grammar checker", "image compressor", "word counter", "text tools", "coding tools"],
  openGraph: {
    title: "Free Online Tools for Developers, Creators & Productivity",
    description: "50+ free tools for AI, text, images, coding & productivity. No signup required!",
    type: "website",
    url: "https://tulz.net",
    siteName: "Tulz.net",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Tools – Tulz.net",
    description: "50+ free tools for AI, text, images, coding & productivity",
  },
  alternates: {
    canonical: "https://tulz.net",
  },
}

const popularTools = [
  {
    name: "AI Text Humanizer",
    description: "Make AI-generated text sound natural and human-like with advanced rewriting",
    icon: Bot,
    href: "/tools/ai-tools/ai-humanizer",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    name: "Grammar Checker",
    description: "Fix grammar, spelling, and punctuation errors instantly",
    icon: Check,
    href: "/tools/ai-tools/grammar-checker",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    name: "Word Counter",
    description: "Count words, characters, sentences, and estimate reading time",
    icon: Type,
    href: "/tools/text-tools/word-counter",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    name: "JSON Formatter",
    description: "Format, validate, and beautify JSON data with syntax highlighting",
    icon: FileJson,
    href: "/tools/developer-tools/json-formatter",
    gradient: "from-orange-500 to-red-500",
  },
  {
    name: "Image Compressor",
    description: "Reduce image file size without losing quality for faster loading",
    icon: ImageIcon,
    href: "/tools/image-tools/image-compressor",
    gradient: "from-teal-500 to-cyan-500",
  },
  {
    name: "AI Content Detector",
    description: "Identify AI-generated vs human-written text with advanced analysis",
    icon: Sparkles,
    href: "/tools/ai-tools/ai-detector",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    name: "Base64 Encoder/Decoder",
    description: "Quick encoding and decoding of Base64 strings for data conversion",
    icon: Hash,
    href: "/tools/developer-tools/base64-encoder-decoder",
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    name: "Color Picker",
    description: "Convert colors across formats: HEX, RGB, HSL with live preview",
    icon: Sparkles,
    href: "/tools/productivity/color-picker",
    gradient: "from-rose-500 to-pink-500",
  },
]

const categories = [
  {
    title: "AI Tools",
    description: "Harness the power of AI for text humanization, detection, grammar checking, and content generation",
    icon: Bot,
    count: "15+",
    href: "/tools/ai-tools",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Developer Tools",
    description: "Essential utilities for developers including formatters, encoders, generators, and code helpers",
    icon: Code,
    count: "10+",
    href: "/tools/developer-tools",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Image Tools",
    description: "Compress, convert, resize, and edit images with browser-based processing",
    icon: ImageIcon,
    count: "11+",
    href: "/tools/image-tools",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    title: "Text Tools",
    description: "Manipulate text with case converters, counters, formatters, and more",
    icon: FileText,
    count: "9+",
    href: "/tools/text-tools",
    gradient: "from-orange-500 to-red-500",
  },
  {
    title: "Productivity",
    description: "Boost your workflow with calculators, color pickers, checklists, and planning tools",
    icon: Zap,
    count: "5+",
    href: "/tools/productivity",
    gradient: "from-yellow-500 to-orange-500",
  },
]

const features = [
  {
    icon: Zap,
    title: "Lightning-Fast Performance",
    description: "Optimized for speed with instant results and minimal loading times",
  },
  {
    icon: Lock,
    title: "Privacy-First Approach",
    description: "All data processing happens in your browser. Nothing stored on servers",
  },
  {
    icon: Smartphone,
    title: "Works on All Devices",
    description: "Fully responsive design works perfectly on desktop, tablet, and mobile",
  },
  {
    icon: Shield,
    title: "No Ads, No Popups",
    description: "Clean, distraction-free experience focused on getting work done",
  },
  {
    icon: Globe,
    title: "Offline Support",
    description: "Many tools work offline once loaded. No internet required",
  },
  {
    icon: Rocket,
    title: "Regular Updates",
    description: "New tools and features added based on user feedback and requests",
  },
]

const steps = [
  {
    number: "01",
    title: "Choose Your Tool",
    description: "Browse our catalog or use search to find exactly what you need",
    icon: FileText,
  },
  {
    number: "02",
    title: "Use Instantly",
    description: "No signup, no download. Start using immediately in your browser",
    icon: Zap,
  },
  {
    number: "03",
    title: "Get Results",
    description: "Fast, accurate results with download, copy, or share options",
    icon: Check,
  },
]

const stats = [
  { value: "50+", label: "Tools Available", icon: Rocket },
  { value: "100%", label: "Free Forever", icon: Check },
  { value: "0", label: "Registration Required", icon: Lock },
  { value: "24/7", label: "Availability", icon: Clock },
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
    answer: "Many of our tools work offline once you've loaded the page. However, some AI-powered tools may require an internet connection for processing.",
  },
  {
    question: "Do you have mobile apps?",
    answer: "Our website is fully responsive and works perfectly on all devices. You can add Tulz.net to your home screen for an app-like experience on mobile.",
  },
  {
    question: "How often do you add new tools?",
    answer: "We regularly add new tools based on user requests and emerging needs. New tools are typically added weekly or bi-weekly.",
  },
]

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Enhanced Schema Markup */}
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
                description: "Free Online Tools for Developers, Creators & Productivity",
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
                "@type": "SoftwareApplication",
                name: "Tulz.net - Free Online Tools",
                applicationCategory: "WebApplication",
                operatingSystem: "Any (Browser-based)",
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "USD",
                },
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: "4.8",
                  reviewCount: "1250",
                },
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
        {/* Hero Section */}
        <section className="border-b bg-gradient-to-b from-muted/50 to-background py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <Badge variant="secondary" className="mb-4 sm:mb-6">
                <Sparkles className="mr-1 h-3 w-3" />
                50+ Free Tools
              </Badge>

              <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Free Online Tools for Developers & Creators
              </h1>

              <p className="mb-8 sm:mb-10 text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                50+ AI, text, image, and productivity tools – 100% free, no signup required. Fast, secure, and privacy-first.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Button asChild size="lg" className="text-base px-8">
                  <Link href="/tools">
                    Explore All Tools
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-base px-8">
                  <Link href="/tools">Browse Categories</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                Why Choose Tulz.net?
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
                Built for developers, designers, and creators who value speed, privacy, and simplicity
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${index % 6 === 0 ? "from-purple-500 to-pink-500" :
                        index % 6 === 1 ? "from-blue-500 to-cyan-500" :
                          index % 6 === 2 ? "from-green-500 to-emerald-500" :
                            index % 6 === 3 ? "from-orange-500 to-red-500" :
                              index % 6 === 4 ? "from-yellow-500 to-orange-500" :
                                "from-violet-500 to-purple-500"
                      } flex items-center justify-center text-white mb-4`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm sm:text-base">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Tools Section */}
        <section className="border-y bg-muted/30 py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                Most Popular Free Tools
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
                Our most-used tools trusted by thousands of users daily
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {popularTools.map((tool, index) => (
                <Link key={index} href={tool.href}>
                  <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
                    <CardHeader>
                      <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-white mb-3`}>
                        <tool.icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-base sm:text-lg">{tool.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm">{tool.description}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8 sm:mt-10">
              <Button asChild size="lg" variant="outline">
                <Link href="/tools">
                  View All 50+ Tools
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Browse by Category */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                Explore Tools by Category
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
                Organized collections of tools for every need
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
              {categories.map((category, index) => (
                <Link key={index} href={category.href}>
                  <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer border-2 hover:border-primary/50">
                    <CardHeader className="text-center">
                      <div className={`h-16 w-16 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center text-white mx-auto mb-4`}>
                        <category.icon className="h-8 w-8" />
                      </div>
                      <CardTitle className="text-lg sm:text-xl mb-2">{category.title}</CardTitle>
                      <Badge variant="secondary" className="mx-auto">
                        {category.count} Tools
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground text-center">{category.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="border-y bg-muted/30 py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                Get Started in 3 Easy Steps
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
                Simple, fast, and straightforward workflow
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <Card className="h-full border-2">
                    <CardHeader>
                      <div className="text-6xl font-bold text-primary/10 mb-2">{step.number}</div>
                      <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white mb-4">
                        <step.icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl sm:text-2xl">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{step.description}</p>
                    </CardContent>
                  </Card>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="h-8 w-8 text-muted-foreground/30" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* By the Numbers */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                Trusted Worldwide
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
                Join thousands of users who choose Tulz.net for their daily tasks
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center border-2">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white mx-auto mb-3">
                      <stat.icon className="h-6 w-6" />
                    </div>
                    <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                    <p className="text-sm sm:text-base text-muted-foreground">{stat.label}</p>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="border-y bg-muted/30 py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
                Everything you need to know about Tulz.net
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left text-base sm:text-lg font-semibold">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm sm:text-base text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="border-2 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardContent className="p-8 sm:p-12 text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                  Ready to Get Started?
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join thousands of developers and creators using Tulz.net every day
                </p>
                <Button asChild size="lg" className="text-base px-8">
                  <Link href="/tools">
                    Explore All Tools
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
