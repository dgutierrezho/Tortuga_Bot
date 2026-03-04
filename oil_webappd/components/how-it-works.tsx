"use client"

import { useState } from "react"
import { ChevronDown, Upload, Cpu, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"

const steps = [
  {
    icon: Upload,
    title: "Upload",
    description:
      "Upload a satellite or aerial image of a water body. The system accepts JPG and PNG formats up to 10 MB.",
  },
  {
    icon: Cpu,
    title: "Analyze",
    description:
      "The image is sent to a machine learning model trained on labeled oil spill datasets. It classifies the presence of oil based on visual patterns.",
  },
  {
    icon: CheckCircle,
    title: "Result",
    description:
      "You receive a prediction label (Oil Spill or No Oil Spill) with a confidence score and optional class probabilities.",
  },
]

export function HowItWorks() {
  const [open, setOpen] = useState(false)

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-between gap-2 text-muted-foreground hover:text-foreground"
        >
          <span className="text-sm font-medium">How it works</span>
          <ChevronDown
            className={cn(
              "size-4 transition-transform duration-200",
              open && "rotate-180"
            )}
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="grid gap-4 px-2 pt-4 pb-2 sm:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="flex flex-col items-center gap-2 rounded-xl border border-border/60 bg-card p-5 text-center shadow-sm"
            >
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                <step.icon className="size-5 text-primary" />
              </div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {"Step " + (index + 1)}
              </p>
              <p className="text-sm font-semibold text-foreground">
                {step.title}
              </p>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
