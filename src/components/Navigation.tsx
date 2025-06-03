'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Book, Search, Star, Home, ThumbsUp, Menu, X } from 'lucide-react'
import { NAV_ITEMS, APP_META } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function Navigation() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Handle scroll effect for navigation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when pathname changes (navigation occurs)
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Map icon strings to actual Lucide icon components
  const iconMap: Record<string, React.ElementType> = {
    Home,
    BookOpen: Book,
    Search,
    Star,
    ThumbsUp
  }

  return (
    <header className={cn(
      "sticky top-0 z-40 w-full transition-all duration-200",
      isScrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-white"
    )}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center text-white group-hover:bg-primary-700 transition-colors">
                <Book className="w-5 h-5" />
              </div>
              <span className="font-heading font-bold text-xl text-gray-900 group-hover:text-primary-600 transition-colors">
                {APP_META.name}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {NAV_ITEMS.map((item) => {
              const Icon = iconMap[item.icon] || Book
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-1 px-4 py-2 rounded-md text-sm font-medium transition-all",
                    isActive
                      ? "text-primary-600 bg-primary-50 shadow-sm"
                      : "text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">{isMobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_ITEMS.map((item) => {
              const Icon = iconMap[item.icon] || Book
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-md text-base font-medium transition-colors",
                    isActive
                      ? "text-primary-600 bg-primary-50"
                      : "text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}