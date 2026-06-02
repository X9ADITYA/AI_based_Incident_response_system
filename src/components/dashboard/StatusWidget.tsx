import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { SystemStatus } from '@/types'

interface Props { statuses: SystemStatus[] }

export function StatusWidget({ statuses }: Props) {
  const allOperational = statuses.every((s) => s.status === 'operational')

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold">System Status</CardTitle>
          <span className={cn(
            'flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold',
            allOperational
              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400'
              : 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400'
          )}>
            <span className={cn(
              'h-1.5 w-1.5 rounded-full',
              allOperational ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
            )} />
            {allOperational ? 'All systems normal' : 'Partial degradation'}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {statuses.map((service) => (
          <div key={service.service} className="flex items-center justify-between py-1.5 rounded-lg px-3 hover:bg-muted/40 transition-colors">
            <div className="flex items-center gap-2">
              <StatusDot status={service.status} />
              <span className="text-xs font-medium">{service.service}</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>{service.uptime}%</span>
              <span className={cn('font-medium', service.latency > 500 ? 'text-amber-600' : 'text-muted-foreground')}>
                {service.latency}ms
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function StatusDot({ status }: { status: SystemStatus['status'] }) {
  return (
    <span className={cn(
      'h-2 w-2 rounded-full',
      status === 'operational' && 'bg-emerald-500',
      status === 'degraded'    && 'bg-amber-500',
      status === 'outage'      && 'bg-red-500',
    )} />
  )
}
