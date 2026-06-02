import { useState } from 'react'
import { motion } from 'framer-motion'
import { MoreHorizontal, Pencil, Archive, Users, Clock, BarChart3, Copy, Trash2 } from 'lucide-react'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { DIFFICULTY_COLORS } from '@/lib/constants'
import { toast } from '@/hooks/use-toast'
import { useDeleteAssessment, useUpdateAssessment } from '@/hooks/useAssessments'
import type { Assessment } from '@/types'

interface Props {
  assessments: Assessment[]
  isLoading: boolean
}

export function AssessmentTable({ assessments, isLoading }: Props) {
  const deleteAssessment = useDeleteAssessment()
  const updateAssessment = useUpdateAssessment()

  const handleArchive = (a: Assessment) => {
    updateAssessment.mutate({ id: a.id, data: { status: 'archived' } })
    toast({ title: 'Archived', description: `"${a.title}" has been archived.` })
  }

  const handleDelete = (a: Assessment) => {
    deleteAssessment.mutate(a.id)
    toast({ title: 'Deleted', description: `"${a.title}" has been removed.` })
  }

  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-14 rounded-lg bg-muted animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/40">
            <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Assessment</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Category</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Difficulty</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Candidates</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Completion</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Avg Score</th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {assessments.map((a, i) => {
            const diffColor = DIFFICULTY_COLORS[a.difficulty]
            return (
              <motion.tr
                key={a.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="hover:bg-muted/30 transition-colors group"
              >
                <td className="px-4 py-3.5">
                  <div>
                    <p className="font-medium text-foreground line-clamp-1">{a.title}</p>
                    <div className="flex items-center gap-3 mt-0.5 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{a.duration}m</span>
                      <span className="flex items-center gap-1"><BarChart3 className="h-3 w-3" />{a.questions}q</span>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5 hidden lg:table-cell">
                  <span className="text-xs text-muted-foreground">{a.category}</span>
                </td>
                <td className="px-4 py-3.5 text-center">
                  <StatusBadge status={a.status} showDot />
                </td>
                <td className="px-4 py-3.5 text-center hidden md:table-cell">
                  <Badge variant={
                    diffColor === 'emerald' ? 'success' :
                    diffColor === 'blue' ? 'info' :
                    diffColor === 'violet' ? 'purple' : 'danger'
                  } className="text-[10px]">
                    {a.difficulty}
                  </Badge>
                </td>
                <td className="px-4 py-3.5 text-center hidden md:table-cell">
                  <span className="flex items-center justify-center gap-1 text-xs">
                    <Users className="h-3 w-3 text-muted-foreground" />
                    {a.candidates.toLocaleString()}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-center hidden lg:table-cell">
                  {a.candidates > 0 ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${a.completionRate}%` }} />
                      </div>
                      <span className="text-xs font-medium">{a.completionRate}%</span>
                    </div>
                  ) : <span className="text-xs text-muted-foreground">—</span>}
                </td>
                <td className="px-4 py-3.5 text-center hidden lg:table-cell">
                  {a.candidates > 0 ? (
                    <span className={cn('text-sm font-semibold',
                      a.avgScore >= 75 ? 'text-emerald-600 dark:text-emerald-400' :
                      a.avgScore >= 60 ? 'text-blue-600 dark:text-blue-400' : 'text-amber-600 dark:text-amber-400'
                    )}>
                      {a.avgScore}%
                    </span>
                  ) : <span className="text-xs text-muted-foreground">—</span>}
                </td>
                <td className="px-4 py-3.5 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon-sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem><Pencil className="mr-2 h-3.5 w-3.5" /> Edit</DropdownMenuItem>
                      <DropdownMenuItem><Copy className="mr-2 h-3.5 w-3.5" /> Duplicate</DropdownMenuItem>
                      <DropdownMenuItem><Users className="mr-2 h-3.5 w-3.5" /> View Candidates</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleArchive(a)}>
                        <Archive className="mr-2 h-3.5 w-3.5" /> Archive
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(a)} className="text-destructive focus:text-destructive">
                        <Trash2 className="mr-2 h-3.5 w-3.5" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </motion.tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
