import { useState } from 'react'
import { Search, UserPlus, Users } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { PageLoader } from '@/components/common/LoadingSpinner'
import { EmptyState } from '@/components/common/EmptyState'
import { CandidateList } from '@/components/candidates/CandidateList'
import { CandidateDrawer } from '@/components/candidates/CandidateDrawer'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useCandidates } from '@/hooks/useCandidates'
import type { Candidate, FilterParams } from '@/types'

const STATUS_OPTIONS = ['invited', 'in_progress', 'completed', 'expired', 'disqualified']

export default function Candidates() {
  const [filters, setFilters] = useState<FilterParams>({ page: 1, pageSize: 20 })
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { data, isLoading } = useCandidates(filters)

  const candidates = data?.data ?? []
  const total = data?.total ?? 0

  const handleSelect = (c: Candidate) => {
    setSelectedCandidate(c)
    setDrawerOpen(true)
  }

  return (
    <div className="p-6 space-y-5 max-w-[1600px] mx-auto">
      <PageHeader
        title="Candidates"
        description={`${total} candidate${total !== 1 ? 's' : ''} in your pipeline`}
      >
        <Button size="sm" className="gap-1.5">
          <UserPlus className="h-3.5 w-3.5" /> Invite Candidate
        </Button>
      </PageHeader>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <Input
          leftIcon={<Search className="h-3.5 w-3.5" />}
          placeholder="Search candidates..."
          value={filters.search ?? ''}
          onChange={(e) => setFilters((p) => ({ ...p, search: e.target.value, page: 1 }))}
          className="h-9 w-56"
        />
        <Select
          value={filters.status ?? 'all'}
          onValueChange={(v) => setFilters((p) => ({ ...p, status: v === 'all' ? undefined : v, page: 1 }))}
        >
          <SelectTrigger className="h-9 w-36">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {STATUS_OPTIONS.map((s) => (
              <SelectItem key={s} value={s} className="capitalize">{s.replace('_', ' ')}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total', value: total, color: 'text-foreground' },
          { label: 'Completed', value: candidates.filter(c => c.status === 'completed').length, color: 'text-emerald-600 dark:text-emerald-400' },
          { label: 'In Progress', value: candidates.filter(c => c.status === 'in_progress').length, color: 'text-blue-600 dark:text-blue-400' },
          { label: 'Invited', value: candidates.filter(c => c.status === 'invited').length, color: 'text-violet-600 dark:text-violet-400' },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card px-4 py-3">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* List */}
      {isLoading ? (
        <PageLoader label="Loading candidates..." />
      ) : candidates.length === 0 ? (
        <EmptyState icon={Users} title="No candidates found" description="Try adjusting your search filters." />
      ) : (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <CandidateList
            candidates={candidates}
            selectedId={selectedCandidate?.id}
            onSelect={handleSelect}
          />
        </div>
      )}

      <CandidateDrawer
        candidate={selectedCandidate}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  )
}
