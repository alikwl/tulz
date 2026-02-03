'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function GoogleAnalytics() {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        const url = pathname + searchParams.toString()

        // Track pageview
        if (typeof window !== 'undefined' && (window as any).gtag) {
            ; (window as any).gtag('config', 'G-148D01JH2R', {
                page_path: url,
            })
        }
    }, [pathname, searchParams])

    return null
}
