import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer, LabelList } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useUIStore } from '@/store/uiStore'
import { CHART_COLORS } from '@/lib/constants'
import type { CategoryPerf } from '@/types'

interface Props { data: CategoryPerf[] }

export function PerformanceChart({ data }: Props) {
  const darkMode = useUIStore((s) => s.darkMode)
  const gridColor = darkMode ? CHART_COLORS.gridDark : CHART_COLORS.grid
  const textColor = darkMode ? '#94a3b8' : '#64748b'
  const sorted = [...data].sort((a, b) => b.avgScore - a.avgScore)

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-sm font-semibold">Performance by Category</CardTitle>
        <CardDescription className="text-xs">Average score and pass rate across assessment categories</CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={sorted} layout="vertical" barSize={16}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} horizontal={false} />
            <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: textColor }} axisLine={false} tickLine={false} unit="%" />
            <YAxis dataKey="category" type="category" width={120} tick={{ fontSize: 11, fill: textColor }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: darkMode ? '#1e293b' : '#fff', border: `1px solid ${gridColor}`, borderRadius: 8, fontSize: 12 }}
              formatter={(v: number, name: string) => [`${v}%`, name === 'avgScore' ? 'Avg Score' : 'Pass Rate']}
            />
            <Bar dataKey="avgScore" name="Avg Score" radius={[0, 4, 4, 0]} fill={CHART_COLORS.primary} />
            <Bar dataKey="passRate" name="Pass Rate" radius={[0, 4, 4, 0]} fill={CHART_COLORS.success} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
