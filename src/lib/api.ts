import axios from 'axios'
import type { Book, RecommendationResponse, FilterOptions } from './types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

class BookAPI {
  private client = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  constructor() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`)
        return config
      },
      (error) => Promise.reject(error)
    )

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API Error:', error.response?.data || error.message)
        return Promise.reject(error)
      }
    )
  }

  // Health check
  async healthCheck() {
    const response = await this.client.get('/health')
    return response.data
  }

  // Get recommendations
  async getRecommendations(bookId: string, numRecommendations = 5): Promise<RecommendationResponse> {
    const response = await this.client.get(`/recommendations/${bookId}`, {
      params: { num_recommendations: numRecommendations }
    })
    return response.data
  }

  // Get book details
  async getBook(bookId: string): Promise<Book> {
    const response = await this.client.get(`/books/${bookId}`)
    return response.data
  }

  // Get books with pagination
  async getBooks(skip = 0, limit = 20): Promise<Book[]> {
    const response = await this.client.get('/books', {
      params: { skip, limit }
    })
    return response.data
  }

  // Filter books
  async filterBooks(filters: FilterOptions, skip = 0, limit = 20): Promise<Book[]> {
    const response = await this.client.get('/books/filter', {
      params: { ...filters, skip, limit }
    })
    return response.data
  }

  // Search books
  async searchBooks(query: string, limit = 20): Promise<Book[]> {
    const response = await this.client.get('/search/books', {
      params: { q: query, limit }
    })
    return response.data
  }

  // Get top-rated books
  async getTopRated(minRatings = 10, limit = 20): Promise<Book[]> {
    const response = await this.client.get('/books/top-rated', {
      params: { min_ratings: minRatings, limit }
    })
    return response.data
  }

  // Get all genres
  async getGenres(): Promise<string[]> {
    const response = await this.client.get('/books/genres')
    return response.data
  }

  // Get all authors
  async getAuthors(limit = 100): Promise<string[]> {
    const response = await this.client.get('/books/authors', {
      params: { limit }
    })
    return response.data
  }

  // Get statistics
  async getStats() {
    const response = await this.client.get('/books/stats')
    return response.data
  }
}

export const api = new BookAPI()