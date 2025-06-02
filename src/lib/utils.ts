import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatRating(rating?: number): string {
  if (!rating) return 'No rating'
  return rating.toFixed(1)
}

export function formatCount(count?: number): string {
  if (!count) return '0'
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
  return count.toString()
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

export function getImageUrl(coverImg?: string): string {
  if (!coverImg) return '/book-placeholder.jpg'
  if (coverImg.startsWith('http')) return coverImg
  return `/books/${coverImg}`
}

export function generateStars(rating?: number): string {
  if (!rating) return '☆☆☆☆☆'
  const fullStars = Math.floor(rating)
  const halfStar = rating % 1 >= 0.5 ? 1 : 0
  const emptyStars = 5 - fullStars - halfStar
  
  return '★'.repeat(fullStars) + 
         (halfStar ? '⭐' : '') + 
         '☆'.repeat(emptyStars)
}