import React from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: 'default' | 'outlined' | 'elevated'
}

export function Card({ 
  children, 
  className, 
  variant = 'default',
  ...props 
}: CardProps) {
  const variants = {
    default: 'bg-white border border-gray-200',
    outlined: 'bg-white border-2 border-gray-300',
    elevated: 'bg-white shadow-lg border border-gray-100',
  }

  return (
    <div
      className={cn(
        'rounded-lg overflow-hidden',
        variants[variant],
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
    <div className={cn('px-4 py-3 border-b border-gray-200', className)} {...props}>
      {children}
    </div>
  )
}

export function CardContent({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('px-4 py-3', className)} {...props}>
      {children}
    </div>
  )
}

export function CardFooter({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('px-4 py-3 border-t border-gray-200', className)} {...props}>
      {children}
    </div>
  )
}
