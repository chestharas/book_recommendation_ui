import { useState, useEffect, useMemo } from 'react'
import { api } from '@/lib/api'
import type { Book } from '@/lib/types'

export function useSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Book[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const debouncedQuery = useMemo(() => {
    const timeoutId = setTimeout(() => query, 300)
    return () => clearTimeout(timeoutId)
  }, [query])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setError(null)
      return
    }

    if (query.length < 2) return

    const searchBooks = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const books = await api.searchBooks(query, 20)
        setResults(books)
      } catch (err) {
        setError('Failed to search books')
        setResults([])
      } finally {
        setLoading(false)
      }
    }

    const timeoutId = setTimeout(searchBooks, 300)
    return () => clearTimeout(timeoutId)
  }, [query])

  const clearSearch = () => {
    setQuery('')
    setResults([])
    setError(null)
  }

  return {
    query,
    setQuery,
    results,
    loading,
    error,
    clearSearch,
    hasResults: results.length > 0,
  }
}