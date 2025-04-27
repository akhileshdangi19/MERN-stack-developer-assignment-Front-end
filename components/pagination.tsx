"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const generatePaginationItems = () => {
    const items = []
    const maxVisiblePages = 5

    // Always show first page
    items.push(1)

    // Calculate range of visible pages
    let startPage = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 3)

    // Adjust if we're near the end
    if (endPage - startPage < maxVisiblePages - 3) {
      startPage = Math.max(2, endPage - (maxVisiblePages - 3))
    }

    // Add ellipsis after first page if needed
    if (startPage > 2) {
      items.push("...")
    }

    // Add visible page numbers
    for (let i = startPage; i <= endPage; i++) {
      items.push(i)
    }

    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      items.push("...")
    }

    // Always show last page if there is more than one page
    if (totalPages > 1) {
      items.push(totalPages)
    }

    return items
  }

  if (totalPages <= 1) {
    return null
  }

  return (
    <div className="flex items-center justify-center space-x-2 py-4">
      <Button variant="outline" size="icon" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous page</span>
      </Button>

      {generatePaginationItems().map((item, index) => {
        if (item === "...") {
          return (
            <span key={`ellipsis-${index}`} className="px-2 text-muted-foreground">
              ...
            </span>
          )
        }

        return (
          <Button
            key={`page-${item}`}
            variant={currentPage === item ? "default" : "outline"}
            size="icon"
            onClick={() => onPageChange(Number(item))}
          >
            {item}
          </Button>
        )
      })}

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next page</span>
      </Button>
    </div>
  )
}
