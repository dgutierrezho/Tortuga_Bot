"use client"

import { CheckCircle, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ResultBadgeProps {
  label: "oil_spill" | "no_oil_spill"
}

export function ResultBadge({ label }: ResultBadgeProps) {
  const isSpill = label === "oil_spill"

  return (
    <Badge
      className={cn(
        "gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-lg border-0",
        isSpill
          ? "bg-destructive/10 text-destructive"
          : "bg-success/10 text-success"
      )}
      variant="outline"
    >
      {isSpill ? (
        <XCircle className="size-4" />
      ) : (
        <CheckCircle className="size-4" />
      )}
      {isSpill ? "Oil Spill Detected" : "No Oil Spill"}
    </Badge>
  )
}
