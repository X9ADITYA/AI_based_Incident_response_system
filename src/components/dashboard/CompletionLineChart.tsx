import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer, Area, AreaChart } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useUIStore } from '@/store/uiStore'
import { CHART_COLORS } from '@/lib/constants'
import type { MonthlyData } from '@/types'

interface Props { data: MonthlyData[] }

export function CompletionLineChart({ data }: Props) {
  const darkMode = useUIStore((s) => s.darkMode)
  const gridColor = darkMode ? CHART_COLORS.gridDark : CHART_COLORS.grid
  const textColor = darkMode ? '#94a3b8' : '#64748b'

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-semibold">Completion Rate Trend</CardTitle>
        <CardDescription className="text-xs">Average completion rate over 6 months</CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={CHART_COLORS.primary} stopOpacity={0.15} />
                <stop offset="95%" stopColor={CHART_COLORS.primary} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: textColor }} axisLine={false} tickLine={false} />
            <YAxis domain={[60, 90]} tick={{ fontSize: 11, fill: textColor }} axisLine={false} tickLine={false} unit="%" />
            <Tooltip
              contentStyle={{ backgroundColor: darkMode ? '#1e293b' : '#fff', border: `1px solid ${gridColor}`, borderRadius: 8, fontSize: 12 }}
              formatter={(v: number) => [`${v}%`, 'Completion Rate']}
            />
            <ReferenceLine y={75} stroke={CHART_COLORS.warning} strokeDasharray="4 4" label={{ value: 'Target', fontSize: 10, fill: CHART_COLORS.warning }} />
            <Area type="monotone" dataKey="value" stroke={CHART_COLORS.primary} strokeWidth={2.5} fill="url(#colorRate)" dot={{ r: 4, fill: CHART_COLORS.primary }} activeDot={{ r: 6 }} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
