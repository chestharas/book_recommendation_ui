'use client'

import React, { useState } from 'react'
import { Star, Trophy } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { BookGrid } from '@/components/BookGrid'
import { useTopRatedBooks } from '@/hooks/useBooks'

export default function TopRatedPage() {
  const [minRatings, setMinRatings] = useState(50)
  const [limit, setLimit] = useState(20)
  
  const { books, loading, error } = useTopRatedBooks(minRatings, limit)

  const ratingThresholds = [
    { value: 10, label: '10+ ratings' },
    { value: 50, label: '50+ ratings' },
    { value: 100, label: '100+ ratings' },
    { value: 500, label: '500+ ratings' },
    { value: 1000, label: '1000+ ratings' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Trophy className="w-8 h-8 text-yellow-500" />
          <h1 className="text-3xl font-bold text-gray-900">Top Rated Books</h1>
        </div>
        <p className="text-gray-600">Discover the highest-rated books in our collection</p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Filter by Rating Count</h2>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {ratingThresholds.map((threshold) => (
              <Button
                key={threshold.value}
                variant={minRatings === threshold.value ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setMinRatings(threshold.value)}
              >
                {threshold.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Results Info */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Books with {minRatings}+ ratings, sorted by rating
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Show:</span>
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value={10}>10 books</option>
            <option value={20}>20 books</option>
            <option value={50}>50 books</option>
            <option value={100}>100 books</option>
          </select>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="text-center py-8">
          <div className="text-red-600 mb-2">Failed to load top-rated books</div>
          <p className="text-gray-500">Please try again later</p>
        </div>
      )}

      {/* Books Grid */}
      <BookGrid 
        books={books}
        loading={loading}
        className="grid-cols-1 lg:grid-cols-2"
      />

      {/* Load More */}
      {books.length === limit && (
        <div className="text-center">
          <Button 
            onClick={() => setLimit(prev => prev + 20)}
            variant="secondary"
          >
            Load More Books
          </Button>
        </div>
      )}
    </div>
  )
}