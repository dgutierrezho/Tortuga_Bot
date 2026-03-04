"use client"

import { Play, Loader2, Clock, BarChart3 } from "lucide-react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { TurtleResultBadge } from "@/components/turtle-result-badge"

interface TurtlePredictionResult {
  label: "turtle" | "no_turtle"
  confidence: number
  probs?: Record<string, number>
  inference_ms?: number
}

interface TurtlePredictionCardProps {
  isLoading: boolean
  result: TurtlePredictionResult | null
  error: string | null
  hasFile: boolean
  onRunDetection: () => void
}

export function TurtlePredictionCard({
  isLoading,
  result,
  error,
  hasFile,
  onRunDetection,
}: TurtlePredictionCardProps) {
  const confidencePercent = result ? Math.round(result.confidence * 100) : 0

  return (
    <Card className="rounded-2xl shadow-md border-border/60">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <BarChart3 className="size-5 text-primary" />
          Prediction
        </CardTitle>
        <CardDescription>
          Run the turtle detection model on your uploaded image
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <Button
          size="lg"
          disabled={!hasFile || isLoading}
          onClick={onRunDetection}
          className="w-full gap-2 rounded-xl font-semibold"
        >
          {isLoading ? (
            <>
              <Loader2 className="size-5 animate-spin" />
              Analyzing image...
            </>
          ) : (
            <>
              <Play className="size-5" />
              Run Detection
            </>
          )}
        </Button>

        {!hasFile && !result && !error && !isLoading && (
          <p className="text-center text-sm text-muted-foreground py-6">
            Upload an image first to run the turtle detection model.
          </p>
        )}

        {isLoading && (
          <div className="flex flex-col items-center gap-3 py-6">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
              <Loader2 className="size-5 animate-spin text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">
              Processing your image through the turtle detection model...
            </p>
          </div>
        )}

        {error && !isLoading && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
          >
            <span className="mt-0.5 shrink-0">&#9888;</span>
            <span>{error}</span>
          </div>
        )}

        {result && !isLoading && (
          <div className="flex flex-col gap-5 animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Classification
              </p>
              <TurtleResultBadge label={result.label} />
            </div>

            <Separator />

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Confidence
                </p>
                <p className="text-sm font-semibold tabular-nums text-foreground">
                  {confidencePercent}%
                </p>
              </div>
              <Progress value={confidencePercent} className="h-2.5" />
            </div>

            {result.probs && Object.keys(result.probs).length > 0 && (
              <>
                <Separator />
                <div className="flex flex-col gap-3">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Class Probabilities
                  </p>
                  <div className="flex flex-col gap-2.5">
                    {Object.entries(result.probs)
                      .sort(([, a], [, b]) => b - a)
                      .map(([className, prob]) => (
                        <div key={className} className="flex flex-col gap-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-foreground capitalize">
                              {className.replace(/_/g, " ")}
                            </p>
                            <p className="text-xs font-medium tabular-nums text-muted-foreground">
                              {(prob * 100).toFixed(1)}%
                            </p>
                          </div>
                          <Progress
                            value={prob * 100}
                            className="h-1.5"
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </>
            )}

            {result.inference_ms !== undefined && (
              <>
                <Separator />
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="size-3.5" />
                  <span>
                    Inference time:{" "}
                    <span className="font-medium tabular-nums text-foreground">
                      {result.inference_ms.toFixed(0)} ms
                    </span>
                  </span>
                </div>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
