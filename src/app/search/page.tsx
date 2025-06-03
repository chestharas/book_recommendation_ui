'use client'

import React, { useState, useEffect } from 'react'
import { Search, Filter, X, BookOpen, Star, User } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { BookGrid } from '@/components/BookGrid'
import { useSearch } from '@/hooks/useSearch'

interface SearchFilters {
  minRating?: number
  maxRating?: number
  genre?: string
  author?: string
  minRatingsCount?: number
}

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState<SearchFilters>({})
  const [showFilters, setShowFilters] = useState(false)
  const [activeTab, setActiveTab] = useState<'search' | 'filter'>('search')
  
  const { 
    books, 
    loading, 
    error, 
    searchBooks, 
    filterBooks, 
    clearResults 
  } = useSearch()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      searchBooks(query)
    }
  }

  const handleFilterSearch = () => {
    filterBooks(filters)
  }

  const clearSearch = () => {
    setQuery('')
    clearResults()
  }

  const clearFilters = () => {
    setFilters({})
    clearResults()
  }
  const hasActiveFilters = Object.values(filters ?? {}).some(value =>
//   const hasActiveFilters = Object.values(filters).some(value =>
    value !== undefined && value !== null && value !== ''
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Find Your Perfect Book
        </h1>
        <p className="text-xl text-gray-600">
          Search through thousands of books or use filters to discover something new
        </p>
      </div>

      {/* Search Tabs */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg max-w-md mx-auto">
          <button
            onClick={() => setActiveTab('search')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'search'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Search className="w-4 h-4 inline mr-2" />
            Search
          </button>
          <button
            onClick={() => setActiveTab('filter')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'filter'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Filter className="w-4 h-4 inline mr-2" />
            Filter
          </button>
        </div>
      </div>

      {/* Search Section */}
      {activeTab === 'search' && (
        <Card className="mb-8">
          <CardContent className="p-6">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by title, author, or keywords..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
                />
                {query && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              <div className="flex gap-3">
                <Button type="submit" disabled={loading || !query.trim()} className="flex-1">
                  {loading ? 'Searching...' : 'Search Books'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Filter Section */}
      {activeTab === 'filter' && (
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Rating Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating Range
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min (0-5)"
                    min="0"
                    max="5"
                    step="0.1"
                    value={filters.minRating || ''}
                    onChange={(e) => setFilters(f => ({ 
                      ...f, 
                      minRating: e.target.value ? parseFloat(e.target.value) : undefined 
                    }))}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    placeholder="Max (0-5)"
                    min="0"
                    max="5"
                    step="0.1"
                    value={filters.maxRating || ''}
                    onChange={(e) => setFilters(f => ({ 
                      ...f, 
                      maxRating: e.target.value ? parseFloat(e.target.value) : undefined 
                    }))}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Genre */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Genre
                </label>
                <input
                  type="text"
                  placeholder="e.g., Fiction, Mystery, Romance"
                  value={filters.genre || ''}
                  onChange={(e) => setFilters(f => ({ ...f, genre: e.target.value || undefined }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Author */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author
                </label>
                <input
                  type="text"
                  placeholder="Author name"
                  value={filters.author || ''}
                  onChange={(e) => setFilters(f => ({ ...f, author: e.target.value || undefined }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Minimum Ratings Count */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Reviews
                </label>
                <input
                  type="number"
                  placeholder="e.g., 100"
                  min="0"
                  value={filters.minRatingsCount || ''}
                  onChange={(e) => setFilters(f => ({ 
                    ...f, 
                    minRatingsCount: e.target.value ? parseInt(e.target.value) : undefined 
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button 
                onClick={handleFilterSearch} 
                disabled={loading || !hasActiveFilters}
                className="flex-1"
              >
                {loading ? 'Filtering...' : 'Apply Filters'}
              </Button>
              <Button 
                variant="secondary" 
                onClick={clearFilters}
                disabled={!hasActiveFilters}
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error Display */}
      {error && (
        <Card className="mb-6 border-red-200 bg-red-50">
          <CardContent className="p-4">
            <p className="text-red-600">Error: {error}</p>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {books.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Search Results ({books.length} books found)
          </h2>
          <BookGrid 
            books={books} 
            loading={loading}
            className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          />
        </div>
      )}

      {/* Empty State */}
      {!loading && books.length === 0 && (query || hasActiveFilters) && (
        <Card className="text-center py-12">
          <CardContent>
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No books found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or filters to find more results.
            </p>
            <Button 
              variant="secondary" 
              onClick={() => {
                clearSearch()
                clearFilters()
                setActiveTab('search')
              }}
            >
              Clear Search
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Initial State */}
      {!loading && books.length === 0 && !query && !hasActiveFilters && (
        <Card className="text-center py-12">
          <CardContent>
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Ready to search
            </h3>
            <p className="text-gray-600">
              Use the search bar above or apply filters to discover amazing books.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}