import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend, PieChart, Pie, Cell,
} from 'recharts'
import { TrendingUp, Users, Award, BarChart2, Download } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { PageLoader } from '@/components/common/LoadingSpinner'
import { PerformanceChart } from '@/components/analytics/PerformanceChart'
import { ScoreDistribution } from '@/components/analytics/ScoreDistribution'
import { TimeFilter } from '@/components/analytics/TimeFilter'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAnalytics } from '@/hooks/useAnalytics'
import { useUIStore } from '@/store/uiStore'
import { CHART_COLORS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import type { TimeRange } from '@/types'

const PIE_COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#3b82f6', '#ec4899', '#14b8a6']

export default function Analytics() {
  const [timeRange, setTimeRange] = useState<TimeRange>('30d')
  const { data, isLoading } = useAnalytics(timeRange)
  const darkMode = useUIStore((s) => s.darkMode)
  const gridColor = darkMode ? CHART_COLORS.gridDark : CHART_COLORS.grid
  const textColor = darkMode ? '#94a3b8' : '#64748b'

  if (isLoading || !data) return <PageLoader label="Loading analytics..." />

  const overallPassRate = Math.round(data.categoryPerformance.reduce((a, c) => a + c.passRate, 0) / data.categoryPerformance.length)
  const totalCandidates = data.candidateGrowth[data.candidateGrowth.length - 1]?.value ?? 0
  const avgScore = Math.round(data.categoryPerformance.reduce((a, c) => a + c.avgScore, 0) / data.categoryPerformance.length)

  // Radar data for top skills
  const radarData = data.topSkills.slice(0, 6).map((s) => ({ skill: s.skill, score: s.avgScore }))

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <PageHeader
        title="Analytics & Reports"
        description="Comprehensive insights into assessment performance and candidate progress."
      >
        <TimeFilter value={timeRange} onChange={setTimeRange} />
        <Button variant="outline" size="sm" className="gap-1.5">
          <Download className="h-3.5 w-3.5" /> Export Report
        </Button>
      </PageHeader>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Candidates', value: totalCandidates.toLocaleString(), icon: Users, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-950/40' },
          { label: 'Avg Score', value: `${avgScore}%`, icon: BarChart2, color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-950/40' },
          { label: 'Overall Pass Rate', value: `${overallPassRate}%`, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/40' },
          { label: 'Top Skill', value: data.topSkills[0]?.skill ?? '—', icon: Award, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-950/40' },
        ].map((item, i) => {
          const Icon = item.icon
          return (
            <motion.div key={item.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <Card>
                <CardContent className="p-5 flex items-center gap-4">
                  <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-lg', item.bg)}>
                    <Icon className={cn('h-5 w-5', item.color)} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">{item.label}</p>
                    <p className="text-xl font-bold text-foreground">{item.value}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Row: Candidate Growth + Pass Rate Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">Candidate Growth</CardTitle>
            <CardDescription className="text-xs">New vs returning candidates over time</CardDescription>
          </CardHeader>
          <CardContent className="pb-4">
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={data.candidateGrowth}>
                <defs>
                  <linearGradient id="gNew" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={CHART_COLORS.primary} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={CHART_COLORS.primary} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gReturn" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={CHART_COLORS.success} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={CHART_COLORS.success} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: textColor }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: textColor }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: darkMode ? '#1e293b' : '#fff', border: `1px solid ${gridColor}`, borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Area type="monotone" dataKey="value" name="Total" stroke={CHART_COLORS.primary} strokeWidth={2} fill="url(#gNew)" />
                <Area type="monotone" dataKey="secondary" name="Completed" stroke={CHART_COLORS.success} strokeWidth={2} fill="url(#gReturn)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">Pass Rate Trend</CardTitle>
            <CardDescription className="text-xs">Monthly overall pass rate</CardDescription>
          </CardHeader>
          <CardContent className="pb-4">
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={data.passRateTrend}>
                <defs>
                  <linearGradient id="gPass" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={CHART_COLORS.success} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={CHART_COLORS.success} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: textColor }} axisLine={false} tickLine={false} />
                <YAxis domain={[60, 85]} tick={{ fontSize: 11, fill: textColor }} axisLine={false} tickLine={false} unit="%" />
                <Tooltip contentStyle={{ backgroundColor: darkMode ? '#1e293b' : '#fff', border: `1px solid ${gridColor}`, borderRadius: 8, fontSize: 12 }} formatter={(v: number) => [`${v}%`, 'Pass Rate']} />
                <Area type="monotone" dataKey="value" name="Pass Rate" stroke={CHART_COLORS.success} strokeWidth={2.5} fill="url(#gPass)" dot={{ r: 4, fill: CHART_COLORS.success }} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Row: Category Performance + Score Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <PerformanceChart data={data.categoryPerformance} />
        <ScoreDistribution data={data.scoreDistribution} />
      </div>

      {/* Row: Skill Radar + Completion Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">Top Skill Performance Radar</CardTitle>
            <CardDescription className="text-xs">Average score across top skill categories</CardDescription>
          </CardHeader>
          <CardContent className="pb-4">
            <ResponsiveContainer width="100%" height={260}>
              <RadarChart data={radarData}>
                <PolarGrid stroke={gridColor} />
                <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11, fill: textColor }} />
                <Radar name="Avg Score" dataKey="score" stroke={CHART_COLORS.primary} fill={CHART_COLORS.primary} fillOpacity={0.15} strokeWidth={2} />
                <Tooltip contentStyle={{ backgroundColor: darkMode ? '#1e293b' : '#fff', border: `1px solid ${gridColor}`, borderRadius: 8, fontSize: 12 }} formatter={(v: number) => [`${v}%`, 'Avg Score']} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">Completion by Category</CardTitle>
            <CardDescription className="text-xs">Assessment completion rates across all categories</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.assessmentCompletion.map((s, i) => (
              <div key={s.category} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-foreground">{s.category}</span>
                  <span className="text-muted-foreground">{s.completed.toLocaleString()} / {s.total.toLocaleString()} ({s.rate}%)</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${s.rate}%` }}
                    transition={{ delay: i * 0.05, duration: 0.6 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
