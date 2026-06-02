import { ClipboardList, Users, TrendingUp, DollarSign } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { PageLoader } from '@/components/common/LoadingSpinner'
import { KPICard } from '@/components/dashboard/KPICard'
import { AssessmentBarChart } from '@/components/dashboard/AssessmentBarChart'
import { CompletionLineChart } from '@/components/dashboard/CompletionLineChart'
import { RecentActivity } from '@/components/dashboard/RecentActivity'
import { StatusWidget } from '@/components/dashboard/StatusWidget'
import { useDashboard } from '@/hooks/useDashboard'

const KPI_ICONS = [
  { icon: <ClipboardList className="h-5 w-5 text-indigo-600" />, color: 'bg-indigo-50 dark:bg-indigo-950/50' },
  { icon: <Users className="h-5 w-5 text-blue-600" />,          color: 'bg-blue-50 dark:bg-blue-950/50' },
  { icon: <TrendingUp className="h-5 w-5 text-emerald-600" />,  color: 'bg-emerald-50 dark:bg-emerald-950/50' },
  { icon: <DollarSign className="h-5 w-5 text-violet-600" />,   color: 'bg-violet-50 dark:bg-violet-950/50' },
]

export default function Dashboard() {
  const { data, isLoading } = useDashboard()

  if (isLoading || !data) return <PageLoader label="Loading dashboard..." />

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <PageHeader
        title="Dashboard"
        description={`Welcome back. Here's what's happening with your assessments.`}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {data.kpis.map((metric, i) => (
          <KPICard
            key={metric.label}
            metric={metric}
            index={i}
            icon={KPI_ICONS[i].icon}
            colorClass={KPI_ICONS[i].color}
          />
        ))}
      </div>

      {/* Charts — 3 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <AssessmentBarChart data={data.assessmentTrend} />
        <CompletionLineChart data={data.completionTrend} />
      </div>

      {/* Activity + Status — 3 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <RecentActivity activities={data.recentActivity} />
        <StatusWidget statuses={data.systemStatus} />
      </div>
    </div>
  )
}
