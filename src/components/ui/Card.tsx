import React from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: 'default' | 'outlined' | 'elevated' | 'hover' | 'interactive' | 'glass'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export function Card({ 
  children, 
  className, 
  variant = 'default',
  padding,
  ...props 
}: CardProps) {
  const variants = {
    default: 'bg-white border border-gray-200',
    outlined: 'bg-white border-2 border-gray-300',
    elevated: 'bg-white shadow-md border border-gray-100',
    hover: 'bg-white border border-gray-200 transition-all duration-200 hover:shadow-md hover:border-gray-300',
    interactive: 'bg-white border border-gray-200 transition-all duration-200 hover:shadow-md hover:border-primary-200 hover:translate-y-[-2px]',
    glass: 'bg-white/80 backdrop-blur-sm border border-white/20 shadow-sm'
  }
  
  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-7'
  }

  return (
    <div
      className={cn(
        'rounded-lg overflow-hidden',
        variants[variant],
        padding && paddings[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('px-5 py-4 border-b border-gray-200 flex items-center justify-between', className)} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn('text-lg font-semibold text-gray-900 font-heading', className)} {...props}>
      {children}
    </h3>
  )
}

export function CardDescription({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-sm text-gray-600 mt-1', className)} {...props}>
      {children}
    </p>
  )
}

export function CardContent({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('px-5 py-4', className)} {...props}>
      {children}
    </div>
  )
}

export function CardFooter({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('px-5 py-4 border-t border-gray-200 bg-gray-50/50', className)} {...props}>
      {children}
    </div>
  )
}
