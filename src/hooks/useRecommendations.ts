import useSWR from 'swr'
import { api } from '@/lib/api'

export function useRecommendations(bookId?: string, numRecommendations = 5) {
  const { data, error, isLoading, mutate } = useSWR(
    bookId ? ['recommendations', bookId, numRecommendations] : null,
    () => bookId ? api.getRecommendations(bookId, numRecommendations) : null,
    {
      revalidateOnFocus: false,
      dedupingInterval: 300000, // 5 minutes
    }
  )

  return {
    recommendations: data?.recommendations || [],
    inputBook: data?.input_book,
    total: data?.total_recommendations || 0,
    loading: isLoading,
    error,
    refetch: mutate,
  }
}