"use client"

import { useEffect } from "react"
import { useReportWebVitals } from "next/web-vitals"

export function WebVitals() {
  useReportWebVitals((metric) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("event", metric.name, {
        value: Math.round(
          metric.name === "CLS" ? metric.value * 1000 : metric.value
        ),
        event_label: metric.id,
        non_interaction: true,
      })
    }

    if (process.env.NODE_ENV === "development") {
      console.log(metric)
    }
  })

  useEffect(() => {
    let scrollDepth = 0
    let maxScroll = 0

    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY

      const scrollableHeight = documentHeight - windowHeight
      const currentScrollPercentage = Math.round(
        (scrollTop / scrollableHeight) * 100
      )

      if (currentScrollPercentage > maxScroll) {
        maxScroll = currentScrollPercentage

        if (
          maxScroll >= 25 &&
          scrollDepth < 25 &&
          typeof window !== "undefined" &&
          (window as any).gtag
        ) {
          scrollDepth = 25
          ;(window as any).gtag("event", "scroll_depth", {
            percent_scrolled: 25,
          })
        } else if (
          maxScroll >= 50 &&
          scrollDepth < 50 &&
          typeof window !== "undefined" &&
          (window as any).gtag
        ) {
          scrollDepth = 50
          ;(window as any).gtag("event", "scroll_depth", {
            percent_scrolled: 50,
          })
        } else if (
          maxScroll >= 75 &&
          scrollDepth < 75 &&
          typeof window !== "undefined" &&
          (window as any).gtag
        ) {
          scrollDepth = 75
          ;(window as any).gtag("event", "scroll_depth", {
            percent_scrolled: 75,
          })
        } else if (
          maxScroll >= 90 &&
          scrollDepth < 90 &&
          typeof window !== "undefined" &&
          (window as any).gtag
        ) {
          scrollDepth = 90
          ;(window as any).gtag("event", "scroll_depth", {
            percent_scrolled: 90,
          })
        }
      }
    }

    const throttledHandleScroll = throttle(handleScroll, 500)
    window.addEventListener("scroll", throttledHandleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll)
    }
  }, [])

  return null
}

function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null
  let lastRan = 0

  return function (this: any, ...args: Parameters<T>) {
    const context = this

    if (!lastRan) {
      func.apply(context, args)
      lastRan = Date.now()
    } else {
      if (timeoutId) clearTimeout(timeoutId)

      timeoutId = setTimeout(
        () => {
          if (Date.now() - lastRan >= delay) {
            func.apply(context, args)
            lastRan = Date.now()
          }
        },
        delay - (Date.now() - lastRan)
      )
    }
  }
}
