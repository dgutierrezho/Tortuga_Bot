"use client"

import { useState, useCallback } from "react"
import { Turtle } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { UploadDropzone } from "@/components/upload-dropzone"
import { TurtlePredictionCard } from "@/components/turtle-prediction-card"

interface TurtlePredictionResult {
  label: "turtle" | "no_turtle"
  confidence: number
  probs?: Record<string, number>
  inference_ms?: number
}

export default function TurtleDetector() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<TurtlePredictionResult | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [predictionError, setPredictionError] = useState<string | null>(null)

  const handleFileSelect = useCallback((file: File, url: string) => {
    setSelectedFile(file)
    setPreviewUrl(url)
    setResult(null)
    setPredictionError(null)
  }, [])

  const handleClear = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setSelectedFile(null)
    setPreviewUrl(null)
    setResult(null)
    setUploadError(null)
    setPredictionError(null)
  }, [previewUrl])

  const handleRunDetection = useCallback(async () => {
    if (!selectedFile) {
      setUploadError("Please select an image before running detection.")
      return
    }

    setIsLoading(true)
    setPredictionError(null)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append("file", selectedFile)

      const response = await fetch("/api/predict-turtle", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorBody = await response.text()
        throw new Error(
          errorBody || `Server responded with status ${response.status}`
        )
      }

      const data: TurtlePredictionResult = await response.json()
      setResult(data)
    } catch (err) {
      setPredictionError(
        err instanceof Error ? err.message : "An unexpected error occurred."
      )
    } finally {
      setIsLoading(false)
    }
  }, [selectedFile])

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60 bg-card/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-5 sm:px-6">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
            <Turtle className="size-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-foreground text-balance">
              Turtle Classifier
            </h1>
            <p className="text-sm text-muted-foreground">
              ML-powered turtle detection in images
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <UploadDropzone
            selectedFile={selectedFile}
            previewUrl={previewUrl}
            onFileSelect={handleFileSelect}
            onClear={handleClear}
            error={uploadError}
            onError={setUploadError}
            description="Drag and drop an image of a turtle or marine life, or click to browse"
            previewAlt="Uploaded image preview"
          />
          <TurtlePredictionCard
            isLoading={isLoading}
            result={result}
            error={predictionError}
            hasFile={!!selectedFile}
            onRunDetection={handleRunDetection}
          />
        </div>

        <Separator className="my-8" />

        <div className="rounded-2xl border border-border/60 bg-card/50 p-6">
          <h2 className="text-base font-semibold text-foreground mb-2">
            How it works
          </h2>
          <p className="text-sm text-muted-foreground">
            Upload an image and run the turtle detection model. The classifier
            will analyze your image and predict whether it contains a turtle
            with a confidence score.
          </p>
        </div>
      </main>

      <footer className="border-t border-border/60 bg-card/50">
        <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6">
          <p className="text-xs text-muted-foreground text-center">
            Predictions are indicative only. For marine conservation verification,
            consult domain experts.
          </p>
        </div>
      </footer>
    </div>
  )
}
