"use client"

import { useEffect } from "react"

export function useTrackToolUsage(toolId: string) {
  useEffect(() => {
    if (typeof window !== "undefined" && toolId) {
      try {
        const data = localStorage.getItem("tulz-user-data")
        const userData = data ? JSON.parse(data) : { history: [] }

        const now = Date.now()
        const existingIndex = userData.history.findIndex((entry: any) => entry.toolId === toolId)

        if (existingIndex >= 0) {
          userData.history[existingIndex].timestamp = now
          userData.history[existingIndex].count += 1
        } else {
          userData.history.unshift({ toolId, timestamp: now, count: 1 })
        }

        userData.history = userData.history.slice(0, 20)
        localStorage.setItem("tulz-user-data", JSON.stringify(userData))
      } catch (error) {
        console.error("Failed to track tool usage:", error)
      }
    }
  }, [toolId])
}
