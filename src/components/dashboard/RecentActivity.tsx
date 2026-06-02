import { motion } from 'framer-motion'
import { ClipboardList, UserPlus, PlusCircle, FileBarChart2, CheckCircle2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn, formatRelativeTime } from '@/lib/utils'
import type { ActivityItem } from '@/types'

const ACTIVITY_CONFIG: Record<string, { icon: typeof ClipboardList; label: string; color: string }> = {
  assessment_completed: { icon: CheckCircle2,   label: 'Completed',  color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30' },
  candidate_invited:    { icon: UserPlus,        label: 'Invited',    color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/30' },
  assessment_created:   { icon: PlusCircle,      label: 'Created',    color: 'text-violet-500 bg-violet-50 dark:bg-violet-950/30' },
  report_generated:     { icon: FileBarChart2,   label: 'Report',     color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/30' },
  candidate_passed:     { icon: CheckCircle2,    label: 'Passed',     color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30' },
}

interface Props { activities: ActivityItem[] }

export function RecentActivity({ activities }: Props) {
  return (
    <Card className="col-span-2">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {activities.map((item, i) => {
            const config = ACTIVITY_CONFIG[item.type]
            if (!config) return null
            const Icon = config.icon
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 px-6 py-3.5 hover:bg-muted/30 transition-colors"
              >
                <div className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-lg', config.color)}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    <span className="font-semibold">{item.actor}</span>
                    {' '}
                    <span className="text-muted-foreground font-normal">
                      {item.type === 'assessment_completed' && 'completed'}
                      {item.type === 'candidate_invited' && 'invited'}
                      {item.type === 'assessment_created' && 'created'}
                      {item.type === 'report_generated' && 'generated'}
                      {item.type === 'candidate_passed' && 'passed'}
                    </span>
                    {' '}
                    {item.target}
                  </p>
                  {item.meta?.score && (
                    <p className="text-xs text-muted-foreground">
                      Score: <span className="font-medium text-foreground">{item.meta.score}%</span>
                      {item.meta.rank && ` · Rank #${item.meta.rank}`}
                    </p>
                  )}
                </div>
                <time className="text-xs text-muted-foreground shrink-0">
                  {formatRelativeTime(item.timestamp)}
                </time>
              </motion.div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
