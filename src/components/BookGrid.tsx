import React from 'react'
import { BookCard } from './BookCard'
import type { Book } from '@/lib/types'

interface BookGridProps {
  books: Book[]
  loading?: boolean
  className?: string
}

// export function BookGrid({ books, loading, className }: BookGridProps) {
export function BookGrid({ books = [], loading, className }: BookGridProps) {
  if (loading) {
    return (
      <div className={`grid gap-4 ${className}`}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 rounded-lg h-48"></div>
          </div>
        ))}
      </div>
    )
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">No books found</div>
        <p className="text-gray-400 mt-2">Try adjusting your search or filters</p>
      </div>
    )
  }

  return (
    <div className={`grid gap-4 ${className}`}>
      {books.map((book) => (
        <BookCard key={book.bookId} book={book} />
      ))}
    </div>
  )
}
