"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

const toolCategories = [
  { name: "AI Tools", href: "/tools/ai-tools" },
  { name: "Developer Tools", href: "/tools/developer-tools" },
  { name: "Image Tools", href: "/tools/image-tools" },
  { name: "Text Tools", href: "/tools/text-tools" },
  { name: "Productivity", href: "/tools/productivity" },
]

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [showToolsSubmenu, setShowToolsSubmenu] = useState(false)

  const closeMenu = () => {
    setIsOpen(false)
    setShowToolsSubmenu(false)
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {isOpen && (
        <div
          className="fixed inset-0 top-16 z-40 bg-background/95 backdrop-blur-lg md:hidden"
          onClick={closeMenu}
        >
          <nav
            className="container flex flex-col space-y-1 py-6 px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Link
              href="/"
              onClick={closeMenu}
              className="text-lg font-medium transition-colors hover:text-primary active:bg-accent rounded-lg px-4 py-3 min-h-[44px] flex items-center"
            >
              Home
            </Link>

            <div>
              <button
                onClick={() => setShowToolsSubmenu(!showToolsSubmenu)}
                className="flex w-full items-center justify-between text-lg font-medium transition-colors hover:text-primary active:bg-accent rounded-lg px-4 py-3 min-h-[44px]"
              >
                Tools
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${
                    showToolsSubmenu ? "rotate-180" : ""
                  }`}
                />
              </button>
              {showToolsSubmenu && (
                <div className="ml-2 mt-1 space-y-1">
                  {toolCategories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      onClick={closeMenu}
                      className="block px-4 py-3 min-h-[44px] text-base text-muted-foreground transition-colors hover:text-primary active:bg-accent rounded-lg flex items-center"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/blog"
              onClick={closeMenu}
              className="text-lg font-medium transition-colors hover:text-primary active:bg-accent rounded-lg px-4 py-3 min-h-[44px] flex items-center"
            >
              Blog
            </Link>

            <Link
              href="/about"
              onClick={closeMenu}
              className="text-lg font-medium transition-colors hover:text-primary active:bg-accent rounded-lg px-4 py-3 min-h-[44px] flex items-center"
            >
              About
            </Link>

            <Link
              href="/contact"
              onClick={closeMenu}
              className="text-lg font-medium transition-colors hover:text-primary active:bg-accent rounded-lg px-4 py-3 min-h-[44px] flex items-center"
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </>
  )
}
