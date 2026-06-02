import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  label?: string
}

export function LoadingSpinner({ size = 'md', className, label }: LoadingSpinnerProps) {
  const sizes = { sm: 'h-4 w-4', md: 'h-8 w-8', lg: 'h-12 w-12' }
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
      <div className={cn('animate-spin rounded-full border-2 border-muted border-t-primary', sizes[size])} />
      {label && <p className="text-sm text-muted-foreground">{label}</p>}
    </div>
  )
}

export function PageLoader({ label = 'Loading...' }: { label?: string }) {
  return (
    <div className="flex h-64 w-full items-center justify-center">
      <LoadingSpinner size="lg" label={label} />
    </div>
  )
}

export function SkeletonCard() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 space-y-3">
      <div className="h-4 bg-muted rounded animate-pulse w-1/3" />
      <div className="h-8 bg-muted rounded animate-pulse w-1/2" />
      <div className="h-3 bg-muted rounded animate-pulse w-2/3" />
    </div>
  )
}
