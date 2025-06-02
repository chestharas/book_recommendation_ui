import React from 'react'
import { BookCard } from './BookCard'
import type { BookRecommendation } from '@/lib/types'

interface RecommendationListProps {
  recommendations: BookRecommendation[]
  inputBook?: {
    bookId: string
    title: string
    author: string
  }
  loading?: boolean
  className?: string
}

export function RecommendationList({ 
  recommendations, 
  inputBook, 
  loading, 
  className 
}: RecommendationListProps) {
  if (loading) {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="animate-pulse space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-lg h-32"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {inputBook && (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Recommendations for "{inputBook.title}"
          </h2>
          <p className="text-gray-600">by {inputBook.author}</p>
        </div>
      )}

      {recommendations.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No recommendations available</div>
          <p className="text-gray-400 mt-2">Try selecting a different book</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {recommendations.map((book, index) => (
            <div key={book.bookId} className="relative">
              <div className="absolute -left-8 top-4 bg-primary-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                {index + 1}
              </div>
              <BookCard book={book} showRecommendations={false} />
              <div className="mt-2 text-center">
                <span className="text-sm text-gray-500">
                  {Math.round(book.score * 100)}% match
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}