'use client'

import React from 'react'
import Link from 'next/link'
import { Search, Star, Book, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { BookGrid } from '@/components/BookGrid'
import { useTopRatedBooks } from '@/hooks/useBooks'

export default function HomePage() {
  const { books: topBooks, loading } = useTopRatedBooks(50, 6)

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12 bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Discover Your Next
            <span className="text-primary-600"> Favorite Book</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Get personalized book recommendations powered by AI. Find books you'll love based on your reading preferences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/books">
              <Button size="lg" className="w-full sm:w-auto">
                Browse Books
              </Button>
            </Link>
            <Link href="/search">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Search Books
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Find Books</h3>
              <p className="text-gray-600">
                Search through thousands of books by title, author, or genre to find something that interests you.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Recommendations</h3>
              <p className="text-gray-600">
                Our AI analyzes book descriptions and finds similar books you might enjoy based on your selections.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Book className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Discover & Read</h3>
              <p className="text-gray-600">
                Explore detailed information about each book including ratings, reviews, and publication details.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Top Rated Books */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Top Rated Books</h2>
          <Link href="/top-rated">
            <Button variant="ghost">View All</Button>
          </Link>
        </div>
        <BookGrid 
          books={topBooks} 
          loading={loading}
          className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        />
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 rounded-2xl p-8 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Find Your Next Read?</h2>
        <p className="text-xl mb-6 opacity-90">
          Join thousands of readers discovering new books every day
        </p>
        <Link href="/books">
          <Button variant="secondary" size="lg">
            Start Exploring
          </Button>
        </Link>
      </section>
    </div>
  )
}