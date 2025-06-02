'use client'

import React, { useState, useEffect } from 'react'
import { SearchBar } from '@/components/SearchBar'
import { FilterPanel } from '@/components/FilterPanel'
import { BookGrid } from '@/components/BookGrid'
import { Button } from '@/components/ui/Button'
import { useBooks, useFilteredBooks } from '@/hooks/useBooks'
import { useSearch } from '@/hooks/useSearch'
import { api } from '@/lib/api'
import type { FilterOptions } from '@/lib/types'

export default function BooksPage() {
  const [currentPage, setCurrentPage] = useState(0)
  const [filters, setFilters] = useState<FilterOptions>({})
  const [genres, setGenres] = useState<string[]>([])
  const [searchMode, setSearchMode] = useState(false)

  const itemsPerPage = 20
  const skip = currentPage * itemsPerPage

  // Fetch genres for filter
  useEffect(() => {
    api.getGenres().then(setGenres).catch(console.error)
  }, [])

  // Use different hooks based on mode
  const { books: allBooks, loading: allLoading } = useBooks(skip, itemsPerPage)
  const { books: filteredBooks, loading: filteredLoading } = useFilteredBooks(filters, skip, itemsPerPage)
  const { query, setQuery, results: searchResults, loading: searchLoading } = useSearch()

  // Determine which books to show
  const books = searchMode ? searchResults : Object.keys(filters).length > 0 ? filteredBooks : allBooks
  const loading = searchMode ? searchLoading : Object.keys(filters).length > 0 ? filteredLoading : allLoading

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery)
    setSearchMode(!!searchQuery.trim())
    setCurrentPage(0)
  }

  const handleFilter = (newFilters: FilterOptions) => {
    setFilters(newFilters)
    setSearchMode(false)
    setCurrentPage(0)
  }

  const loadMore = () => {
    setCurrentPage(prev => prev + 1)
  }

  const hasFiltersApplied = Object.keys(filters).length > 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Books</h1>
        <p className="text-gray-600">Discover thousands of books and get personalized recommendations</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <SearchBar 
          onSearch={handleSearch}
          className="flex-1 max-w-md"
          placeholder="Search by title or author..."
        />
        <FilterPanel 
          onFilter={handleFilter}
          genres={genres}
          className="flex-shrink-0"
        />
      </div>

      {/* Results Info */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          {searchMode && query ? (
            `Search results for "${query}"`
          ) : hasFiltersApplied ? (
            'Filtered results'
          ) : (
            'All books'
          )}
        </div>
        {(searchMode || hasFiltersApplied) && (
          <Button 
            variant="ghost" 
            onClick={() => {
              setSearchMode(false)
              setFilters({})
              setQuery('')
              setCurrentPage(0)
            }}
          >
            Clear all
          </Button>
        )}
      </div>

      {/* Books Grid */}
      <BookGrid 
        books={books}
        loading={loading}
        className="grid-cols-1 lg:grid-cols-2"
      />

      {/* Load More */}
      {!searchMode && books.length >= itemsPerPage && (
        <div className="text-center">
          <Button onClick={loadMore} variant="secondary">
            Load More Books
          </Button>
        </div>
      )}
    </div>
  )
}