import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Users, Calendar } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import type { Book } from '@/lib/types'
import { formatRating, formatCount, truncateText, getImageUrl } from '@/lib/utils'

interface BookCardProps {
  book: Book
  showRecommendations?: boolean
  className?: string
}

export function BookCard({ book, showRecommendations = true, className }: BookCardProps) {
  return (
    <Card className={`group hover:shadow-md transition-shadow duration-200 ${className}`}>
      <CardContent className="p-4">
        <div className="flex space-x-4">
          {/* Book Cover */}
          <div className="flex-shrink-0">
            <Link href={`/books/${book.bookId}`}>
              <Image
                src={getImageUrl(book.coverImg)}
                alt={book.title}
                width={80}
                height={120}
                className="rounded-md object-cover shadow-sm group-hover:shadow-md transition-shadow"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyziY="
              />
            </Link>
          </div>

          {/* Book Details */}
          <div className="flex-1 min-w-0">
            <div className="space-y-2">
              {/* Title and Author */}
              <div>
                <Link href={`/books/${book.bookId}`}>
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {book.title}
                  </h3>
                </Link>
                <p className="text-sm text-gray-600 mt-1">by {book.author}</p>
              </div>

              {/* Rating and Stats */}
              {book.rating && (
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{formatRating(book.rating)}</span>
                  </div>
                  {book.ratingsCount && (
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{formatCount(book.ratingsCount)}</span>
                    </div>
                  )}
                  {book.publishedDate && (
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(book.publishedDate).getFullYear()}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Genres */}
              {book.genres && book.genres.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {book.genres.slice(0, 3).map((genre) => (
                    <span
                      key={genre}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary-100 text-primary-800"
                    >
                      {genre}
                    </span>
                  ))}
                  {book.genres.length > 3 && (
                    <span className="text-xs text-gray-500">+{book.genres.length - 3} more</span>
                  )}
                </div>
              )}

              {/* Description */}
              {book.description && (
                <p className="text-sm text-gray-600 line-clamp-2">
                  {truncateText(book.description, 120)}
                </p>
              )}

              {/* Actions */}
              <div className="flex space-x-2 pt-2">
                <Link href={`/books/${book.bookId}`}>
                  <Button variant="primary" size="sm">
                    View Details
                  </Button>
                </Link>
                {showRecommendations && (
                  <Link href={`/recommendations?bookId=${book.bookId}`}>
                    <Button variant="secondary" size="sm">
                      Get Recommendations
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}