export interface Book {
  bookId: string
  title: string
  author: string
  rating?: number
  ratingsCount?: number
  reviewsCount?: number
  description?: string
  genres?: string[]
  coverImg?: string
  publishedDate?: string
}

export interface BookRecommendation extends Book {
  score: number
}

export interface RecommendationResponse {
  input_book: {
    bookId: string
    title: string
    author: string
  }
  recommendations: BookRecommendation[]
  total_recommendations: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  skip: number
  limit: number
}

export interface FilterOptions {
  min_rating?: number
  max_rating?: number
  genre?: string
  author?: string
  min_ratings_count?: number
  published_year?: number
}