// Theme constants
export const THEME = {
  colors: {
    primary: {
      50: '#f0f7ff',
      100: '#e0effe',
      200: '#bae0fd',
      300: '#7cc5fb',
      400: '#36a9f7',
      500: '#0c8ee7',
      600: '#0072c4',
      700: '#005b9e',
      800: '#064d81',
      900: '#0a416c',
      950: '#062a49',
    },
    secondary: {
      50: '#f8f8f8',
      100: '#f0f0f0',
      200: '#e4e4e4',
      300: '#d1d1d1',
      400: '#b4b4b4',
      500: '#9a9a9a',
      600: '#818181',
      700: '#6a6a6a',
      800: '#5a5a5a',
      900: '#4e4e4e',
      950: '#282828',
    },
  },
  fonts: {
    heading: 'var(--font-heading)',
    body: 'var(--font-body)',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
};

// Navigation items
export const NAV_ITEMS = [
  { href: '/', label: 'Home', icon: 'Home' },
  { href: '/books', label: 'Browse Books', icon: 'BookOpen' },
  { href: '/books/search', label: 'Search', icon: 'Search' },
  { href: '/top-rated', label: 'Top Rated', icon: 'Star' },
  { href: '/recommendations', label: 'Recommendations', icon: 'ThumbsUp' },
];

// Book categories/genres for filtering
export const BOOK_CATEGORIES = [
  'Fiction',
  'Non-Fiction',
  'Mystery',
  'Science Fiction',
  'Fantasy',
  'Romance',
  'Thriller',
  'Biography',
  'History',
  'Self-Help',
  'Business',
  'Science',
  'Technology',
  'Poetry',
  'Children',
];

// App metadata
export const APP_META = {
  name: 'BookRec',
  title: 'BookRec | AI-Powered Book Recommendations',
  description: 'Discover your next favorite book with AI-powered recommendations tailored to your reading preferences.',
  keywords: 'books, recommendations, reading, AI, machine learning, literature',
};