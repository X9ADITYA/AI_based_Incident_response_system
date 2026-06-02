import { ExternalLink, Mail, Phone, MapPin, Briefcase, Building2, Calendar, Award, CheckCircle, XCircle, Clock } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { StatusBadge } from '@/components/common/StatusBadge'
import { SkillScoreCard } from './SkillScoreCard'
import { cn, getInitials, generateAvatarColor, formatDate, formatRelativeTime } from '@/lib/utils'
import type { Candidate } from '@/types'

interface Props {
  candidate: Candidate | null
  open: boolean
  onClose: () => void
}

export function CandidateDrawer({ candidate, open, onClose }: Props) {
  if (!candidate) return null

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto p-0">
        {/* Header */}
        <div className="p-6 pb-4 bg-gradient-to-br from-primary/5 via-background to-background border-b border-border">
          <SheetHeader className="mb-4">
            <SheetTitle className="sr-only">{candidate.name}</SheetTitle>
            <SheetDescription className="sr-only">Candidate profile</SheetDescription>
          </SheetHeader>
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16 border-2 border-border shadow">
              <AvatarFallback className={cn('text-xl font-bold text-white', generateAvatarColor(candidate.name))}>
                {getInitials(candidate.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-foreground">{candidate.name}</h2>
              <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-0.5">
                <Briefcase className="h-3.5 w-3.5" /> {candidate.role}
              </p>
              {candidate.company && (
                <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                  <Building2 className="h-3.5 w-3.5" /> {candidate.company}
                </p>
              )}
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <StatusBadge status={candidate.status} showDot />
                {candidate.avgScore > 0 && (
                  <Badge variant={candidate.avgScore >= 80 ? 'success' : candidate.avgScore >= 65 ? 'info' : 'warning'}>
                    Avg: {candidate.avgScore}%
                  </Badge>
                )}
                {candidate.tags.map((t) => (
                  <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Contact info */}
          <div className="mt-4 space-y-1.5">
            <a href={`mailto:${candidate.email}`} className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <Mail className="h-3.5 w-3.5" /> {candidate.email}
            </a>
            {candidate.phone && (
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <Phone className="h-3.5 w-3.5" /> {candidate.phone}
              </p>
            )}
            {candidate.location && (
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" /> {candidate.location}
              </p>
            )}
            {candidate.linkedIn && (
              <a href={`https://${candidate.linkedIn}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-primary hover:underline">
                <ExternalLink className="h-3.5 w-3.5" /> LinkedIn Profile
              </a>
            )}
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 divide-x divide-border border-b border-border">
          {[
            { label: 'Assessments', value: candidate.assessmentsTaken },
            { label: 'Avg Score', value: candidate.avgScore > 0 ? `${candidate.avgScore}%` : '—' },
            { label: 'Experience', value: candidate.experience > 0 ? `${candidate.experience}y` : '—' },
          ].map((s) => (
            <div key={s.label} className="py-3 text-center">
              <p className="text-lg font-bold text-foreground">{s.value}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="skills" className="p-4">
          <TabsList className="w-full">
            <TabsTrigger value="skills" className="flex-1">Skills</TabsTrigger>
            <TabsTrigger value="results" className="flex-1">Results</TabsTrigger>
            <TabsTrigger value="info" className="flex-1">Info</TabsTrigger>
          </TabsList>

          <TabsContent value="skills" className="mt-4">
            {candidate.skills.length > 0
              ? <SkillScoreCard skills={candidate.skills} />
              : <p className="text-sm text-muted-foreground text-center py-8">No skill scores available yet.</p>
            }
          </TabsContent>

          <TabsContent value="results" className="mt-4 space-y-3">
            {candidate.results.length === 0
              ? <p className="text-sm text-muted-foreground text-center py-8">No assessment results yet.</p>
              : candidate.results.map((r) => (
                <div key={r.assessmentId} className="rounded-lg border border-border p-4 space-y-2">
                  <p className="text-sm font-medium">{r.assessmentTitle}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {r.passed
                        ? <CheckCircle className="h-4 w-4 text-emerald-500" />
                        : <XCircle className="h-4 w-4 text-red-500" />
                      }
                      <span className={cn('text-sm font-bold', r.passed ? 'text-emerald-600' : 'text-red-600')}>
                        {r.score}%
                      </span>
                      <span className="text-xs text-muted-foreground">/ {r.passingScore}% passing</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{r.duration}m</span>
                      <span className="flex items-center gap-1"><Award className="h-3 w-3" />#{r.rank}/{r.totalCandidates}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{formatDate(r.completedAt)}</p>
                </div>
              ))
            }
          </TabsContent>

          <TabsContent value="info" className="mt-4 space-y-3">
            {[
              { label: 'Invited', value: formatDate(candidate.invitedAt) },
              { label: 'Last Activity', value: formatRelativeTime(candidate.lastActivity) },
              { label: 'Company', value: candidate.company || '—' },
              { label: 'Experience', value: candidate.experience ? `${candidate.experience} years` : '—' },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <span className="text-sm text-muted-foreground">{label}</span>
                <span className="text-sm font-medium">{value}</span>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}
