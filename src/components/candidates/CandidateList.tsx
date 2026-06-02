import { motion } from 'framer-motion'
import { MapPin, Briefcase, Star, ChevronRight } from 'lucide-react'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn, getInitials, generateAvatarColor, formatRelativeTime } from '@/lib/utils'
import type { Candidate } from '@/types'

interface Props {
  candidates: Candidate[]
  selectedId?: string
  onSelect: (c: Candidate) => void
}

export function CandidateList({ candidates, selectedId, onSelect }: Props) {
  return (
    <div className="divide-y divide-border">
      {candidates.map((c, i) => (
        <motion.div
          key={c.id}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.04 }}
          onClick={() => onSelect(c)}
          className={cn(
            'flex items-center gap-4 px-4 py-4 cursor-pointer transition-colors group',
            selectedId === c.id ? 'bg-primary/5 border-l-2 border-primary' : 'hover:bg-muted/40'
          )}
        >
          <Avatar className="h-10 w-10 shrink-0">
            <AvatarFallback className={cn('text-sm font-bold text-white', generateAvatarColor(c.name))}>
              {getInitials(c.name)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-foreground truncate">{c.name}</p>
              {c.avgScore >= 85 && <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500 shrink-0" />}
            </div>
            <div className="flex items-center gap-3 mt-0.5">
              <span className="flex items-center gap-1 text-xs text-muted-foreground truncate">
                <Briefcase className="h-3 w-3 shrink-0" /> {c.role}
              </span>
              {c.location && (
                <span className="flex items-center gap-1 text-xs text-muted-foreground hidden sm:flex shrink-0">
                  <MapPin className="h-3 w-3" /> {c.location.split(',')[0]}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <StatusBadge status={c.status} />
            {c.avgScore > 0 && (
              <span className={cn('text-xs font-bold',
                c.avgScore >= 85 ? 'text-emerald-600 dark:text-emerald-400' :
                c.avgScore >= 70 ? 'text-blue-600 dark:text-blue-400' :
                'text-amber-600 dark:text-amber-400'
              )}>
                {c.avgScore}%
              </span>
            )}
          </div>

          <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors" />
        </motion.div>
      ))}
    </div>
  )
}
