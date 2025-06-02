'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Users, Calendar, BookOpen, ArrowLeft } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { RecommendationList } from '@/components/RecommendationList'
import { useRecommendations } from '@/hooks/useRecommendations'
import { api } from '@/lib/api'
import { formatRating, formatCount, getImageUrl } from '@/lib/utils'
import type { Book } from '@/lib/types'
import useSWR from 'swr'

export default function BookDetailPage() {
  const params = useParams()
  const bookId = params.id as string

  // Fetch book details
  const { data: book, error: bookError, isLoading: bookLoading } = useSWR(
    bookId ? ['book', bookId] : null,
    () => api.getBook(bookId)
  )

  // Fetch recommendations
  const { recommendations, inputBook, loading: recLoading } = useRecommendations(bookId, 5)

  if (bookLoading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="flex space-x-6">
          <div className="w-48 h-72 bg-gray-200 rounded"></div>
          <div className="flex-1 space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (bookError || !book) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 text-lg mb-4">Book not found</div>
        <Link href="/books">
          <Button>Back to Books</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Link href="/books" className="inline-flex items-center text-gray-600 hover:text-gray-900">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Books
      </Link>

      {/* Book Details */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8">
            {/* Book Cover */}
            <div className="flex-shrink-0 lg:w-64">
              <Image
                src={getImageUrl(book.coverImg)}
                alt={book.title}
                width={256}
                height={384}
                className="w-full rounded-lg shadow-lg"
                priority
              />
            </div>

            {/* Book Information */}
            <div className="flex-1 space-y-6">
              {/* Title and Author */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
                <p className="text-xl text-gray-600">by {book.author}</p>
              </div>

              {/* Rating and Stats */}
              <div className="flex flex-wrap gap-6 text-sm">
                {book.rating && (
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-lg">{formatRating(book.rating)}</span>
                    {book.ratingsCount && (
                      <span className="text-gray-500">({formatCount(book.ratingsCount)} ratings)</span>
                    )}
                  </div>
                )}
                
                {book.reviewsCount && (
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5 text-gray-400" />
                    <span>{formatCount(book.reviewsCount)} reviews</span>
                  </div>
                )}

                {book.publishedDate && (
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span>Published {new Date(book.publishedDate).getFullYear()}</span>
                  </div>
                )}
              </div>

              {/* Genres */}
              {book.genres && book.genres.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {book.genres.map((genre) => (
                      <span
                        key={genre}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              {book.description && (
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{book.description}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex space-x-4">
                <Link href={`/recommendations?bookId=${book.bookId}`}>
                  <Button size="lg">Get Recommendations</Button>
                </Link>
                <Button variant="secondary" size="lg">
                  Add to Reading List
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations Section */}
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold">Recommended Books</h2>
          <p className="text-gray-600">Books similar to "{book.title}"</p>
        </CardHeader>
        <CardContent>
          <RecommendationList
            recommendations={recommendations}
            loading={recLoading}
          />
        </CardContent>
      </Card>
    </div>
  )
}