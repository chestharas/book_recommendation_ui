import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Users, Calendar, BookOpen, ThumbsUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import type { Book } from '@/lib/types'
import { formatRating, formatCount, truncateText, getImageUrl, cn } from '@/lib/utils'

interface BookCardProps {
  book: Book
  showRecommendations?: boolean
  className?: string
}

export function BookCard({ book, showRecommendations = true, className }: BookCardProps) {
  return (
    <Card className={cn(
      "group overflow-hidden hover:shadow-lg transition-all duration-300 border-gray-200",
      className
    )}>
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          {/* Book Cover */}
          <div className="relative w-full sm:w-auto sm:flex-shrink-0">
            <Link href={`/books/${book.bookId}`} className="block">
              <div className="relative aspect-[2/3] sm:w-32 md:w-40 overflow-hidden">
                <Image
                  src={getImageUrl(book.coverImg)}
                  alt={book.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 160px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyziY="
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </Link>
          </div>

          {/* Book Details */}
          <div className="flex-1 p-5">
            <div className="space-y-3">
              {/* Title and Author */}
              <div>
                <Link href={`/books/${book.bookId}`} className="group-hover:underline decoration-primary-300 decoration-2 underline-offset-2">
                  <h3 className="font-heading font-semibold text-lg text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {book.title}
                  </h3>
                </Link>
                <p className="text-sm text-gray-600 mt-1 italic">by {book.author}</p>
              </div>

              {/* Rating and Stats */}
              {book.rating && (
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1.5 bg-amber-50 px-2 py-1 rounded-md">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-medium">{formatRating(book.rating)}</span>
                  </div>
                  {book.ratingsCount && (
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span>{formatCount(book.ratingsCount)}</span>
                    </div>
                  )}
                  {book.publishedDate && (
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span>{new Date(book.publishedDate).getFullYear()}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Genres */}
              {book.genres && book.genres.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {book.genres.slice(0, 3).map((genre) => (
                    <span
                      key={genre}
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary-700 border border-primary-100"
                    >
                      {genre}
                    </span>
                  ))}
                  {book.genres.length > 3 && (
                    <span className="text-xs text-gray-500 flex items-center">+{book.genres.length - 3} more</span>
                  )}
                </div>
              )}

              {/* Description */}
              {book.description && (
                <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                  {truncateText(book.description, 150)}
                </p>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-2">
                <Link href={`/books/${book.bookId}`}>
                  <Button variant="primary" size="sm" className="flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" />
                    <span>View Details</span>
                  </Button>
                </Link>
                {showRecommendations && (
                  <Link href={`/recommendations?bookId=${book.bookId}`}>
                    <Button variant="secondary" size="sm" className="flex items-center gap-1.5">
                      <ThumbsUp className="w-4 h-4" />
                      <span>Get Similar Books</span>
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