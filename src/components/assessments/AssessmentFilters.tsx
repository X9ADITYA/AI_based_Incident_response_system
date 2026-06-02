import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { FilterParams } from '@/types'

interface Props {
  filters: FilterParams
  onChange: (f: Partial<FilterParams>) => void
  onReset: () => void
}

const CATEGORIES = ['Frontend Development','Backend Development','Full Stack','DevOps & Cloud','Data Science','Mobile Development','Cybersecurity','Database','Soft Skills','Project Management']
const DIFFICULTIES = ['Beginner','Intermediate','Advanced','Expert']
const STATUSES = ['active','draft','archived','scheduled']

export function AssessmentFilters({ filters, onChange, onReset }: Props) {
  const hasFilters = !!(filters.search || filters.status || filters.category || filters.difficulty)

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Input
        leftIcon={<Search className="h-3.5 w-3.5" />}
        placeholder="Search assessments..."
        value={filters.search ?? ''}
        onChange={(e) => onChange({ search: e.target.value, page: 1 })}
        className="h-9 w-56"
      />

      <Select value={filters.status ?? 'all'} onValueChange={(v) => onChange({ status: v === 'all' ? undefined : v, page: 1 })}>
        <SelectTrigger className="h-9 w-36">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          {STATUSES.map((s) => <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>)}
        </SelectContent>
      </Select>

      <Select value={filters.category ?? 'all'} onValueChange={(v) => onChange({ category: v === 'all' ? undefined : v, page: 1 })}>
        <SelectTrigger className="h-9 w-44">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
        </SelectContent>
      </Select>

      <Select value={filters.difficulty ?? 'all'} onValueChange={(v) => onChange({ difficulty: v === 'all' ? undefined : v, page: 1 })}>
        <SelectTrigger className="h-9 w-36">
          <SelectValue placeholder="Difficulty" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Levels</SelectItem>
          {DIFFICULTIES.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
        </SelectContent>
      </Select>

      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={onReset} className="h-9 gap-1 text-muted-foreground">
          <X className="h-3.5 w-3.5" /> Clear
        </Button>
      )}
    </div>
  )
}
