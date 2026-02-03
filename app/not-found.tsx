import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Home, Search, ArrowLeft } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
                <div className="container flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-12">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="mb-4 text-9xl font-bold text-primary">404</h1>
                        <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
                            Page Not Found
                        </h2>
                        <p className="mb-8 text-lg text-muted-foreground">
                            Sorry, we couldn't find the page you're looking for. The page may have been moved,
                            deleted, or never existed.
                        </p>
                        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                            <Button asChild size="lg">
                                <Link href="/">
                                    <Home className="mr-2 h-5 w-5" />
                                    Go Home
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg">
                                <Link href="/tools">
                                    <Search className="mr-2 h-5 w-5" />
                                    Browse Tools
                                </Link>
                            </Button>
                            <Button asChild variant="ghost" size="lg">
                                <Link href="/"> {/* Changed to a simple link, linking to home as a fallback */}
                                    <ArrowLeft className="mr-2 h-5 w-5" />
                                    Go Back
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
