"use client"

import type React from "react"

import { useCallback, useState } from "react"
import Image from "next/image"
import { useDropzone } from "react-dropzone"
import { Upload, X } from "lucide-react"

import { Button } from "@/components/ui/button"

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  disabled?: boolean
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange, disabled }) => {
  const [isUploading, setIsUploading] = useState(false)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (!file) return

      setIsUploading(true)

      try {
        // In a real application, you would upload the file to your server or a storage service
        // For this example, we'll create a data URL to simulate the upload
        const reader = new FileReader()
        reader.onload = (event) => {
          if (event.target?.result) {
            onChange(event.target.result as string)
          }
        }
        reader.readAsDataURL(file)
      } catch (error) {
        console.error("Error uploading image:", error)
      } finally {
        setIsUploading(false)
      }
    },
    [onChange],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    maxFiles: 1,
    disabled: disabled || isUploading,
  })

  const handleRemove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      onChange("")
    },
    [onChange],
  )

  return (
    <div
      {...getRootProps()}
      className={`relative flex cursor-pointer flex-col items-center justify-center rounded-md border border-dashed p-6 transition hover:opacity-70 ${
        isDragActive ? "border-primary bg-primary/10" : "border-muted-foreground/25"
      } ${disabled || isUploading ? "cursor-not-allowed opacity-50" : ""}`}
    >
      <input {...getInputProps()} />

      {value ? (
        <div className="relative h-40 w-40">
          <Image src={value || "/placeholder.svg"} alt="Profile image" fill className="rounded-md object-cover" />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute -right-3 -top-3 h-6 w-6 rounded-full"
            onClick={handleRemove}
            disabled={disabled}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <div className="rounded-full bg-primary/10 p-2">
            <Upload className="h-6 w-6 text-primary" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">{isUploading ? "Uploading..." : "Upload an image"}</p>
            <p className="text-xs text-muted-foreground">Drag and drop or click to upload</p>
          </div>
        </div>
      )}
    </div>
  )
}
