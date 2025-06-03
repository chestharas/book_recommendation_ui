import React from 'react'
import { Button } from '@/components/ui/Button'

interface Filter {
  id: string
  label: string
  value: string
}

interface FilterPanelProps {
  filters: {
    genres?: Filter[]
    authors?: Filter[]
    years?: Filter[]
  }
  selectedFilters: {
    genres: string[]
    authors: string[]
    years: string[]
  }
  onFilterChange: (filterType: string, values: string[]) => void
  onClearFilters: () => void
}

export function FilterPanel({ 
  filters, 
  selectedFilters, 
  onFilterChange, 
  onClearFilters 
}: FilterPanelProps) {
  const handleFilterToggle = (filterType: string, value: string) => {
    const currentValues = selectedFilters[filterType as keyof typeof selectedFilters] || []
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value]
    
    onFilterChange(filterType, newValues)
  }

  const hasActiveFilters = Object.values(selectedFilters).some(values => values.length > 0)

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Filters</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Clear all
          </Button>
        )}
      </div>

      {/* Genres */}
      {filters.genres && filters.genres.length > 0 && (
        <div className="mb-6">
          <h4 className="font-medium text-gray-700 mb-3">Genre</h4>
          <div className="space-y-2">
            {filters.genres.map((genre) => (
              <label key={genre.id} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFilters.genres.includes(genre.value)}
                  onChange={() => handleFilterToggle('genres', genre.value)}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-600">{genre.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Authors */}
      {filters.authors && filters.authors.length > 0 && (
        <div className="mb-6">
          <h4 className="font-medium text-gray-700 mb-3">Author</h4>
          <div className="space-y-2">
            {filters.authors.map((author) => (
              <label key={author.id} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFilters.authors.includes(author.value)}
                  onChange={() => handleFilterToggle('authors', author.value)}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-600">{author.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Years */}
      {filters.years && filters.years.length > 0 && (
        <div className="mb-6">
          <h4 className="font-medium text-gray-700 mb-3">Publication Year</h4>
          <div className="space-y-2">
            {filters.years.map((year) => (
              <label key={year.id} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFilters.years.includes(year.value)}
                  onChange={() => handleFilterToggle('years', year.value)}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-600">{year.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}