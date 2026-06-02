import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { KPIMetric } from '@/types'

interface KPICardProps {
  metric: KPIMetric
  index: number
  icon: React.ReactNode
  colorClass: string
}

export function KPICard({ metric, index, icon, colorClass }: KPICardProps) {
  const isIncrease = metric.changeType === 'increase'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.35 }}
    >
      <Card className="relative overflow-hidden group hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{metric.label}</p>
              <p className="mt-2 text-3xl font-bold text-foreground tracking-tight">{metric.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{metric.description}</p>
            </div>
            <div className={cn('flex h-11 w-11 items-center justify-center rounded-xl shrink-0', colorClass)}>
              {icon}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-1.5">
            <span className={cn(
              'flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold',
              isIncrease
                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400'
                : 'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400'
            )}>
              {isIncrease ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {metric.change}%
            </span>
            <span className="text-xs text-muted-foreground">vs last month</span>
          </div>
        </CardContent>
        {/* Decorative gradient */}
        <div className={cn('absolute bottom-0 left-0 right-0 h-0.5 opacity-60', colorClass.replace('bg-', 'bg-gradient-to-r from-'))} />
      </Card>
    </motion.div>
  )
}
