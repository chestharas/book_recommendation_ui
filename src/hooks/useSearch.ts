import { useState, useCallback } from 'react'

interface BookInfo {
  bookId: string
  title: string
  author: string
  rating?: number
  ratingsCount?: number
  reviewsCount?: number
  description?: string
  genres?: string[]
  coverImg?: string
  publishedDate?: string
}

interface SearchFilters {
  minRating?: number
  maxRating?: number
  genre?: string
  author?: string
  minRatingsCount?: number
}

interface UseSearchReturn {
  books: BookInfo[]
  loading: boolean
  error: string | null
  searchBooks: (query: string, limit?: number) => Promise<void>
  filterBooks: (filters: SearchFilters, skip?: number, limit?: number) => Promise<void>
  clearResults: () => void
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export function useSearch(): UseSearchReturn {
  const [books, setBooks] = useState<BookInfo[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchBooks = useCallback(async (query: string, limit: number = 20) => {
    if (!query.trim()) return

    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams({
        q: query.trim(),
        limit: limit.toString()
      })

      const response = await fetch(`${API_BASE_URL}/search/books?${params}`)
      
      if (!response.ok) {
        throw new Error(`Search failed: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      setBooks(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to search books'
      setError(errorMessage)
      setBooks([])
    } finally {
      setLoading(false)
    }
  }, [])

  const filterBooks = useCallback(async (
    filters: SearchFilters, 
    skip: number = 0, 
    limit: number = 50
  ) => {
    const hasFilters = Object.values(filters).some(value => 
      value !== undefined && value !== null && value !== ''
    )

    if (!hasFilters) return

    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams({
        skip: skip.toString(),
        limit: limit.toString()
      })

      // Add filters to params if they exist
      if (filters.minRating !== undefined) {
        params.append('min_rating', filters.minRating.toString())
      }
      if (filters.maxRating !== undefined) {
        params.append('max_rating', filters.maxRating.toString())
      }
      if (filters.genre) {
        params.append('genre', filters.genre)
      }
      if (filters.author) {
        params.append('author', filters.author)
      }
      if (filters.minRatingsCount !== undefined) {
        params.append('min_ratings_count', filters.minRatingsCount.toString())
      }

      const response = await fetch(`${API_BASE_URL}/books/filter?${params}`)
      
      if (!response.ok) {
        throw new Error(`Filter failed: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      setBooks(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to filter books'
      setError(errorMessage)
      setBooks([])
    } finally {
      setLoading(false)
    }
  }, [])

  const clearResults = useCallback(() => {
    setBooks([])
    setError(null)
  }, [])

  return {
    books,
    loading,
    error,
    searchBooks,
    filterBooks,
    clearResults
  }
}