import useSWR from 'swr'
import { api } from '@/lib/api'
import type { Book, FilterOptions } from '@/lib/types'

export function useBooks(skip = 0, limit = 20) {
  const { data, error, isLoading, mutate } = useSWR(
    ['books', skip, limit],
    () => api.getBooks(skip, limit),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // 1 minute
    }
  )

  return {
    books: data || [],
    loading: isLoading,
    error,
    refetch: mutate,
  }
}

export function useFilteredBooks(filters: FilterOptions, skip = 0, limit = 20) {
  const { data, error, isLoading, mutate } = useSWR(
    ['books', 'filter', filters, skip, limit],
    () => api.filterBooks(filters, skip, limit),
    {
      revalidateOnFocus: false,
    }
  )

  return {
    books: data || [],
    loading: isLoading,
    error,
    refetch: mutate,
  }
}

export function useTopRatedBooks(minRatings = 10, limit = 20) {
  const { data, error, isLoading } = useSWR(
    ['books', 'top-rated', minRatings, limit],
    () => api.getTopRated(minRatings, limit),
    {
      revalidateOnFocus: false,
      dedupingInterval: 300000, // 5 minutes
    }
  )

  return {
    books: data || [],
    loading: isLoading,
    error,
  }
}