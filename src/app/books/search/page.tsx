'use client'

import React, { useState } from 'react'
import { SearchBar } from '@/components/SearchBar'
import { BookGrid } from '@/components/BookGrid'
import { FilterPanel } from '@/components/FilterPanel'
import { useSearch } from '@/hooks/useSearch'
import { api } from '@/lib/api'
import type { FilterOptions } from '@/lib/types'

export default function SearchPage() {
  const [genres, setGenres] = useState<string[]>([])
  const [filters, setFilters] = useState<FilterOptions>({})
  
  const { 
    query, 
    setQuery, 
    results, 
    loading, 
    error, 
    hasResults,
    clearSearch 
  } = useSearch()

  // Load genres for filter
  React.useEffect(() => {
    api.getGenres().then(setGenres).catch(console.error)
  }, [])

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery)
  }

  const handleFilter = (newFilters: FilterOptions) => {
    setFilters(newFilters)
    // Apply filters to search results if needed
    // This would require additional API endpoint or client-side filtering
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Books</h1>
        <p className="text-gray-600">Find your next great read by searching our extensive collection</p>
      </div>

      {/* Search Interface */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <SearchBar 
          onSearch={handleSearch}
          className="w-full max-w-2xl"
          placeholder="Search by title, author, or keywords..."
        />
        <FilterPanel 
          onFilter={handleFilter}
          genres={genres}
        />
      </div>

      {/* Search Results */}
      <div className="space-y-4">
        {/* Results Header */}
        {query && (
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {loading ? (
                'Searching...'
              ) : hasResults ? (
                `Found ${results.length} results for "${query}"`
              ) : (
                `No results found for "${query}"`
              )}
            </div>
            {hasResults && (
              <button 
                onClick={clearSearch}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Clear search
              </button>
            )}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-8">
            <div className="text-red-600 mb-2">Search failed</div>
            <p className="text-gray-500">{error}</p>
          </div>
        )}

        {/* Results Grid */}
        <BookGrid 
          books={results}
          loading={loading}
          className="grid-cols-1 lg:grid-cols-2"
        />

        {/* Empty State */}
        {!query && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-2">Start typing to search</div>
            <p className="text-gray-400">Enter a book title, author name, or keywords</p>
          </div>
        )}
      </div>
    </div>
  )
}
