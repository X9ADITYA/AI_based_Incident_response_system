import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useUIStore } from '@/store/uiStore'
import { CHART_COLORS } from '@/lib/constants'
import type { MonthlyData } from '@/types'

interface Props { data: MonthlyData[] }

export function AssessmentBarChart({ data }: Props) {
  const darkMode = useUIStore((s) => s.darkMode)
  const gridColor = darkMode ? CHART_COLORS.gridDark : CHART_COLORS.grid
  const textColor = darkMode ? '#94a3b8' : '#64748b'

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-sm font-semibold">Assessment Volume</CardTitle>
        <CardDescription className="text-xs">Monthly assessments taken vs completed</CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data} barSize={20} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: textColor }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: textColor }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: darkMode ? '#1e293b' : '#fff', border: `1px solid ${gridColor}`, borderRadius: 8, fontSize: 12 }}
              labelStyle={{ fontWeight: 600 }}
            />
            <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
            <Bar dataKey="value" name="Invitations" fill={CHART_COLORS.primary} radius={[4, 4, 0, 0]} />
            <Bar dataKey="secondary" name="Completed" fill={CHART_COLORS.success} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
