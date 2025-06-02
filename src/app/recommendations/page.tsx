'use client'

import React, { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, RefreshCw } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { RecommendationList } from '@/components/RecommendationList'
import { useRecommendations } from '@/hooks/useRecommendations'

export default function RecommendationsPage() {
  const searchParams = useSearchParams()
  const bookId = searchParams.get('bookId')
  const numRecs = parseInt(searchParams.get('num') || '5')

  const { 
    recommendations, 
    inputBook, 
    total, 
    loading, 
    error, 
    refetch 
  } = useRecommendations(bookId || undefined, numRecs)

  if (!bookId) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-4">No book selected</div>
        <p className="text-gray-400 mb-6">Please select a book to get recommendations</p>
        <Link href="/books">
          <Button>Browse Books</Button>
        </Link>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 text-lg mb-4">Failed to load recommendations</div>
        <p className="text-gray-400 mb-6">Please try again</p>
        <div className="space-x-4">
          <Button onClick={() => refetch()}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </Button>
          <Link href="/books">
            <Button variant="secondary">Back to Books</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link href="/books" className="inline-flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Books
        </Link>
        
        {inputBook && (
          <Link href={`/books/${inputBook.bookId}`}>
            <Button variant="ghost" size="sm">
              View Book Details
            </Button>
          </Link>
        )}
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Book Recommendations</h1>
              {total > 0 && (
                <p className="text-gray-600">Found {total} similar books</p>
              )}
            </div>
            <Button onClick={() => refetch()} variant="ghost" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <RecommendationList
            recommendations={recommendations}
            inputBook={inputBook}
            loading={loading}
          />
        </CardContent>
      </Card>

      {/* Get More Recommendations */}
      {recommendations.length > 0 && (
        <div className="text-center">
          <p className="text-gray-600 mb-4">Want more recommendations?</p>
          <Link href="/books">
            <Button variant="secondary">
              Explore More Books
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}