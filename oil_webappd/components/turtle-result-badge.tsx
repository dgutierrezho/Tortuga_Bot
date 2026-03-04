"use client"

import { CheckCircle, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface TurtleResultBadgeProps {
  label: "turtle" | "no_turtle"
}

export function TurtleResultBadge({ label }: TurtleResultBadgeProps) {
  const isTurtle = label === "turtle"

  return (
    <Badge
      className={cn(
        "gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-lg border-0",
        isTurtle
          ? "bg-primary/10 text-primary"
          : "bg-muted text-muted-foreground"
      )}
      variant="outline"
    >
      {isTurtle ? (
        <CheckCircle className="size-4" />
      ) : (
        <XCircle className="size-4" />
      )}
      {isTurtle ? "Turtle Detected" : "No Turtle"}
    </Badge>
  )
}
