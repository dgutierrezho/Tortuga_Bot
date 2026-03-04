"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Droplets, Turtle } from "lucide-react"
import { cn } from "@/lib/utils"

export function AppNav() {
  const pathname = usePathname()

  return (
    <nav className="border-b border-border/60 bg-card/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center gap-1 px-4 py-2 sm:px-6">
        <Link
          href="/"
          className={cn(
            "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            pathname === "/"
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
          )}
        >
          <Droplets className="size-4" />
          Oil Spill
        </Link>
        <Link
          href="/turtle"
          className={cn(
            "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            pathname === "/turtle"
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
          )}
        >
          <Turtle className="size-4" />
          Turtle
        </Link>
      </div>
    </nav>
  )
}
