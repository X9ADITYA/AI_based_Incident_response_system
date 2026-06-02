import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { SkillScore } from '@/types'

const LEVEL_COLORS = {
  Beginner:     { bar: 'bg-gray-400', badge: 'gray' as const, text: 'text-gray-500' },
  Intermediate: { bar: 'bg-blue-500', badge: 'info' as const,  text: 'text-blue-600' },
  Advanced:     { bar: 'bg-violet-500', badge: 'purple' as const, text: 'text-violet-600' },
  Expert:       { bar: 'bg-amber-500', badge: 'warning' as const, text: 'text-amber-600' },
}

interface Props { skills: SkillScore[] }

export function SkillScoreCard({ skills }: Props) {
  if (skills.length === 0) return (
    <p className="text-sm text-muted-foreground py-4 text-center">No skill scores yet.</p>
  )

  return (
    <div className="space-y-4">
      {skills.map((skill) => {
        const config = LEVEL_COLORS[skill.level]
        return (
          <div key={skill.name} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{skill.name}</span>
                <Badge variant={config.badge} className="text-[10px] py-0">{skill.level}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">P{skill.percentile}</span>
                <span className={cn('text-sm font-bold', config.text)}>{skill.score}%</span>
              </div>
            </div>
            <Progress value={skill.score} indicatorClassName={config.bar} className="h-2" />
          </div>
        )
      })}
    </div>
  )
}
