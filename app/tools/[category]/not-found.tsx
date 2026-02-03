import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center py-16">
        <div className="container text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
              <Search className="h-12 w-12 text-muted-foreground" />
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold">Category Not Found</h1>
          <p className="mb-8 text-lg text-muted-foreground">
            The category you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/tools">
              <Button size="lg">Browse All Tools</Button>
            </Link>
            <Link href="/">
              <Button size="lg" variant="outline">
                Go Home
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
