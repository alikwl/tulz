'use client'

import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error('Page error:', error)
    }, [error])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8">
            <div className="text-center max-w-md">
                <h2 className="text-3xl font-bold text-destructive mb-4">
                    Oops! Something went wrong
                </h2>
                <p className="text-muted-foreground mb-6">
                    We're sorry for the inconvenience. The page encountered an error and couldn't load properly.
                </p>
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={reset}
                        className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition"
                    >
                        Try again
                    </button>
                    <a
                        href="/"
                        className="px-6 py-3 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition"
                    >
                        Go home
                    </a>
                </div>
                {process.env.NODE_ENV === 'development' && error?.message && (
                    <details className="mt-8 text-left">
                        <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                            Error details (dev only)
                        </summary>
                        <pre className="mt-2 p-4 bg-muted rounded text-xs overflow-auto">
                            {error.message}
                        </pre>
                    </details>
                )}
            </div>
        </div>
    )
}
