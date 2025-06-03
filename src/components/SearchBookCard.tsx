import React from 'react'
import Link from 'next/link'
import { Star, Users, BookOpen, Calendar } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'

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

interface SearchBookCardProps {
  book: BookInfo
  searchQuery?: string
}

function highlightText(text: string, query?: string): string {
  if (!query) return text
  
  const regex = new RegExp(`(${query})`, 'gi')
  return text.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>')
}

export function SearchBookCard({ book, searchQuery }: SearchBookCardProps) {
  const truncateDescription = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex space-x-4">
          {/* Book Cover */}
          <div className="flex-shrink-0">
            <Link href={`/books/${book.bookId}`}>
              <div className="w-20 h-28 bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                {book.coverImg ? (
                  <img 
                    src={book.coverImg} 
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>
            </Link>
          </div>

          {/* Book Details */}
          <div className="flex-1 min-w-0">
            {/* Title and Author */}
            <div className="mb-2">
              <Link href={`/books/${book.bookId}`}>
                <h3 
                  className="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors cursor-pointer line-clamp-2"
                  dangerouslySetInnerHTML={{ 
                    __html: highlightText(book.title, searchQuery) 
                  }}
                />
              </Link>
              <p 
                className="text-gray-600 mt-1"
                dangerouslySetInnerHTML={{ 
                  __html: highlightText(book.author, searchQuery) 
                }}
              />
            </div>

            {/* Rating and Stats */}
            <div className="flex items-center space-x-4 mb-3">
              {book.rating && (
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-700">
                    {book.rating.toFixed(1)}
                  </span>
                </div>
              )}
              
              {book.ratingsCount && (
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {book.ratingsCount.toLocaleString()} ratings
                  </span>
                </div>
              )}

              {book.publishedDate && (
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {new Date(book.publishedDate).getFullYear()}
                  </span>
                </div>
              )}
            </div>

            {/* Genres */}
            {book.genres && book.genres.length > 0 && (
              <div className="mb-3">
                <div className="flex flex-wrap gap-1">
                  {book.genres.slice(0, 3).map((genre, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                    >
                      {genre}
                    </span>
                  ))}
                  {book.genres.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{book.genres.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Description */}
            {book.description && (
              <p className="text-sm text-gray-600 line-clamp-3">
                {truncateDescription(book.description)}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}