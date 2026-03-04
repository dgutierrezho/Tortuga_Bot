"use client"

import { useCallback, useRef, useState } from "react"
import { Upload, Trash2, ImageIcon } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png"]

interface UploadDropzoneProps {
  selectedFile: File | null
  previewUrl: string | null
  onFileSelect: (file: File, previewUrl: string) => void
  onClear: () => void
  error: string | null
  onError: (error: string | null) => void
  /** Optional description for the upload area (default: satellite/aerial) */
  description?: string
  /** Optional alt text for the preview image */
  previewAlt?: string
}

export function UploadDropzone({
  selectedFile,
  previewUrl,
  onFileSelect,
  onClear,
  error,
  onError,
  description = "Drag and drop a satellite or aerial image, or click to browse",
  previewAlt = "Uploaded satellite image preview",
}: UploadDropzoneProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const validateAndSetFile = useCallback(
    (file: File) => {
      onError(null)

      if (!ACCEPTED_TYPES.includes(file.type)) {
        onError("Invalid file type. Please upload a JPG or PNG image.")
        return
      }

      if (file.size > MAX_FILE_SIZE) {
        onError("File is too large. Maximum size is 10 MB.")
        return
      }

      const url = URL.createObjectURL(file)
      onFileSelect(file, url)
    },
    [onFileSelect, onError]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragOver(false)
      const file = e.dataTransfer.files?.[0]
      if (file) validateAndSetFile(file)
    },
    [validateAndSetFile]
  )

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) validateAndSetFile(file)
    },
    [validateAndSetFile]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        inputRef.current?.click()
      }
    },
    []
  )

  return (
    <Card className="rounded-2xl shadow-md border-border/60">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <ImageIcon className="size-5 text-primary" />
          Upload Image
        </CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {!previewUrl ? (
          <div
            role="button"
            tabIndex={0}
            aria-label="Upload image file"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => inputRef.current?.click()}
            onKeyDown={handleKeyDown}
            className={cn(
              "flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-10 transition-colors cursor-pointer",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              isDragOver
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50 hover:bg-muted/50"
            )}
          >
            <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
              <Upload className="size-6 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">
                Drop your image here, or{" "}
                <span className="text-primary underline underline-offset-2">
                  browse
                </span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Supports JPG and PNG up to 10 MB
              </p>
            </div>
          </div>
        ) : (
          <div className="relative overflow-hidden rounded-xl border border-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt={previewAlt}
              className="w-full max-h-72 object-contain bg-muted/30"
            />
            <div className="flex items-center justify-between border-t border-border bg-muted/30 px-4 py-3">
              <div className="flex flex-col min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {selectedFile?.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {selectedFile
                    ? `${(selectedFile.size / 1024).toFixed(1)} KB`
                    : ""}
                </p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={onClear}
                aria-label="Remove uploaded image"
              >
                <Trash2 className="size-4 mr-1.5" />
                Clear
              </Button>
            </div>
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
          >
            <span className="mt-0.5 shrink-0">&#9888;</span>
            <span>{error}</span>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept=".jpg,.jpeg,.png"
          className="sr-only"
          onChange={handleInputChange}
          aria-label="Select image file"
          tabIndex={-1}
        />
      </CardContent>
    </Card>
  )
}
