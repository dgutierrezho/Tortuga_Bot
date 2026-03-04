"use client"

import { useState, useCallback } from "react"
import { Droplets } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { UploadDropzone } from "@/components/upload-dropzone"
import { PredictionCard } from "@/components/prediction-card"
import { HowItWorks } from "@/components/how-it-works"

interface PredictionResult {
  label: "oil_spill" | "no_oil_spill"
  confidence: number
  probs?: Record<string, number>
  inference_ms?: number
}

export default function OilSpillDetector() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<PredictionResult | null>(null)
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

      const response = await fetch("/api/predict", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorBody = await response.text()
        throw new Error(
          errorBody || `Server responded with status ${response.status}`
        )
      }

      const data: PredictionResult = await response.json()
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
            <Droplets className="size-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-foreground text-balance">
              Oil Spill Detector
            </h1>
            <p className="text-sm text-muted-foreground">
              ML-powered satellite image classification
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
          />
          <PredictionCard
            isLoading={isLoading}
            result={result}
            error={predictionError}
            hasFile={!!selectedFile}
            onRunDetection={handleRunDetection}
          />
        </div>

        <Separator className="my-8" />

        <HowItWorks />
      </main>

      <footer className="border-t border-border/60 bg-card/50">
        <div className="mx-auto flex max-w-5xl items-center justify-center px-4 py-4 sm:px-6">
          <p className="text-xs text-muted-foreground">
            Predictions are indicative only. Always verify with domain experts.
          </p>
        </div>
      </footer>
    </div>
  )
}
