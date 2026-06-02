import { useState } from 'react'
import { PlusCircle, Download, ClipboardX } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { PageLoader } from '@/components/common/LoadingSpinner'
import { EmptyState } from '@/components/common/EmptyState'
import { AssessmentTable } from '@/components/assessments/AssessmentTable'
import { AssessmentFilters } from '@/components/assessments/AssessmentFilters'
import { CreateAssessmentModal } from '@/components/assessments/CreateAssessmentModal'
import { Button } from '@/components/ui/button'
import { useAssessments } from '@/hooks/useAssessments'
import type { FilterParams } from '@/types'

const DEFAULT_FILTERS: FilterParams = { page: 1, pageSize: 10 }

export default function Assessments() {
  const [filters, setFilters] = useState<FilterParams>(DEFAULT_FILTERS)
  const [createOpen, setCreateOpen] = useState(false)
  const { data, isLoading } = useAssessments(filters)

  const assessments = data?.data ?? []
  const total = data?.total ?? 0
  const totalPages = data?.totalPages ?? 1
  const page = filters.page ?? 1

  const updateFilters = (f: Partial<FilterParams>) =>
    setFilters((prev) => ({ ...prev, ...f }))

  const resetFilters = () => setFilters(DEFAULT_FILTERS)

  return (
    <div className="p-6 space-y-5 max-w-[1600px] mx-auto">
      <PageHeader
        title="Assessments"
        description={`${total} assessment${total !== 1 ? 's' : ''} in your library`}
      >
        <Button variant="outline" size="sm" className="gap-1.5">
          <Download className="h-3.5 w-3.5" /> Export
        </Button>
        <Button size="sm" className="gap-1.5" onClick={() => setCreateOpen(true)}>
          <PlusCircle className="h-3.5 w-3.5" /> New Assessment
        </Button>
      </PageHeader>

      <AssessmentFilters filters={filters} onChange={updateFilters} onReset={resetFilters} />

      {isLoading ? (
        <PageLoader label="Loading assessments..." />
      ) : assessments.length === 0 ? (
        <EmptyState
          icon={ClipboardX}
          title="No assessments found"
          description="Try adjusting your filters or create a new assessment."
          action={{ label: 'Create Assessment', onClick: () => setCreateOpen(true) }}
        />
      ) : (
        <div className="space-y-4">
          <AssessmentTable assessments={assessments} isLoading={false} />

          {/* Pagination */}
          <div className="flex items-center justify-between px-1">
            <p className="text-xs text-muted-foreground">
              Showing {((page - 1) * (filters.pageSize ?? 10)) + 1}–{Math.min(page * (filters.pageSize ?? 10), total)} of {total} assessments
            </p>
            <div className="flex gap-1">
              <Button
                variant="outline" size="sm" className="h-8 px-3"
                disabled={page <= 1}
                onClick={() => updateFilters({ page: page - 1 })}
              >← Prev</Button>
              {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                const p = i + 1
                return (
                  <Button
                    key={p} variant={p === page ? 'default' : 'outline'}
                    size="sm" className="h-8 w-8 p-0 text-xs"
                    onClick={() => updateFilters({ page: p })}
                  >{p}</Button>
                )
              })}
              {totalPages > 5 && <span className="flex items-center px-1 text-muted-foreground text-xs">...</span>}
              <Button
                variant="outline" size="sm" className="h-8 px-3"
                disabled={page >= totalPages}
                onClick={() => updateFilters({ page: page + 1 })}
              >Next →</Button>
            </div>
          </div>
        </div>
      )}

      <CreateAssessmentModal open={createOpen} onClose={() => setCreateOpen(false)} />
    </div>
  )
}
