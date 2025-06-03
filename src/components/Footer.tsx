'use client'

import React from 'react'
import Link from 'next/link'
import { Book, Mail, Github, Twitter, Instagram } from 'lucide-react'
import { APP_META } from '@/lib/constants'

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <Book className="w-8 h-8 text-primary-600" />
              <span className="font-heading font-bold text-xl text-gray-900">{APP_META.name}</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600 max-w-xs">
              Discover your next favorite book with AI-powered recommendations tailored to your reading preferences.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">GitHub</span>
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wider">Explore</h3>
            <ul className="mt-4 space-y-3">
              {['Home', 'Browse Books', 'Top Rated', 'Search', 'Recommendations'].map((item) => (
                <li key={item}>
                  <Link href={`/${item === 'Home' ? '' : item.toLowerCase().replace(' ', '-')}`} className="text-gray-600 hover:text-primary-600 text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wider">Resources</h3>
            <ul className="mt-4 space-y-3">
              {['About Us', 'Blog', 'FAQ', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-600 hover:text-primary-600 text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wider">Stay Updated</h3>
            <p className="mt-4 text-sm text-gray-600">
              Subscribe to our newsletter for the latest book recommendations.
            </p>
            <form className="mt-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="min-w-0 w-full bg-white border border-gray-300 rounded-md py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter your email"
                />
                <div className="mt-2 sm:mt-0 rounded-md sm:ml-3 sm:flex-shrink-0">
                  <button
                    type="submit"
                    className="w-full bg-primary-600 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            &copy; {currentYear} {APP_META.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
