import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

type Status = string

const STATUS_MAP: Record<string, { label: string; variant: 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'gray' | 'default' }> = {
  active:       { label: 'Active',       variant: 'success' },
  draft:        { label: 'Draft',        variant: 'warning' },
  archived:     { label: 'Archived',     variant: 'gray' },
  scheduled:    { label: 'Scheduled',    variant: 'info' },
  completed:    { label: 'Completed',    variant: 'success' },
  in_progress:  { label: 'In Progress',  variant: 'info' },
  invited:      { label: 'Invited',      variant: 'purple' },
  expired:      { label: 'Expired',      variant: 'warning' },
  disqualified: { label: 'Disqualified', variant: 'danger' },
  operational:  { label: 'Operational',  variant: 'success' },
  degraded:     { label: 'Degraded',     variant: 'warning' },
  outage:       { label: 'Outage',       variant: 'danger' },
  passed:       { label: 'Passed',       variant: 'success' },
  failed:       { label: 'Failed',       variant: 'danger' },
}

interface StatusBadgeProps {
  status: Status
  className?: string
  showDot?: boolean
}

export function StatusBadge({ status, className, showDot = false }: StatusBadgeProps) {
  const config = STATUS_MAP[status] ?? { label: status, variant: 'default' as const }
  return (
    <Badge variant={config.variant as Parameters<typeof Badge>[0]['variant']} className={cn('gap-1.5', className)}>
      {showDot && (
        <span className={cn(
          'inline-block h-1.5 w-1.5 rounded-full',
          config.variant === 'success' && 'bg-emerald-500',
          config.variant === 'warning' && 'bg-amber-500',
          config.variant === 'danger' && 'bg-red-500',
          config.variant === 'info' && 'bg-blue-500',
          config.variant === 'purple' && 'bg-violet-500',
          config.variant === 'gray' && 'bg-gray-500',
        )} />
      )}
      {config.label}
    </Badge>
  )
}
