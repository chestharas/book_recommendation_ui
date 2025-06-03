import React from 'react'
import { SearchBookCard } from './SearchBookCard'

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

interface SearchResultsGridProps {
  books: BookInfo[]
  searchQuery?: string
  loading?: boolean
  className?: string
}

export function SearchResultsGrid({ 
  books, 
  searchQuery, 
  loading = false,
  className = ''
}: SearchResultsGridProps) {
  if (loading) {
    return (
      <div className={`space-y-4 ${className}`}>
        {[...Array(6)].map((_, index) => (
          <div 
            key={index}
            className="border rounded-lg p-6 animate-pulse"
          >
            <div className="flex space-x-4">
              <div className="w-20 h-28 bg-gray-200 rounded-lg"></div>
              <div className="flex-1 space-y-2">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="flex space-x-2">
                  <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                  <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {books.map((book) => (
        <SearchBookCard 
          key={book.bookId} 
          book={book} 
          searchQuery={searchQuery}
        />
      ))}
    </div>
  )
}