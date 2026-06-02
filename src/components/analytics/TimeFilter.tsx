import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { TimeRange } from '@/types'

interface Props {
  value: TimeRange
  onChange: (v: TimeRange) => void
}

const OPTIONS: { label: string; value: TimeRange }[] = [
  { label: '7D',  value: '7d'  },
  { label: '30D', value: '30d' },
  { label: '90D', value: '90d' },
  { label: '1Y',  value: '1y'  },
]

export function TimeFilter({ value, onChange }: Props) {
  return (
    <div className="inline-flex rounded-lg border border-border bg-muted/40 p-0.5 gap-0.5">
      {OPTIONS.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={cn(
            'px-3 py-1.5 text-xs font-medium rounded-md transition-all',
            value === o.value
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
