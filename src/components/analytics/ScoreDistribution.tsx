import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useUIStore } from '@/store/uiStore'
import { CHART_COLORS } from '@/lib/constants'
import type { ScoreBucket } from '@/types'

interface Props { data: ScoreBucket[] }

const BUCKET_COLORS = ['#ef4444', '#f97316', '#f59e0b', '#84cc16', '#22c55e', '#10b981', '#059669']

export function ScoreDistribution({ data }: Props) {
  const darkMode = useUIStore((s) => s.darkMode)
  const gridColor = darkMode ? CHART_COLORS.gridDark : CHART_COLORS.grid
  const textColor = darkMode ? '#94a3b8' : '#64748b'

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-semibold">Score Distribution</CardTitle>
        <CardDescription className="text-xs">Number of candidates per score range</CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data} barSize={32}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            <XAxis dataKey="range" tick={{ fontSize: 10, fill: textColor }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: textColor }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: darkMode ? '#1e293b' : '#fff', border: `1px solid ${gridColor}`, borderRadius: 8, fontSize: 12 }}
              formatter={(v: number) => [`${v} candidates`, 'Count']}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {data.map((_, i) => (
                <Cell key={i} fill={BUCKET_COLORS[i] ?? CHART_COLORS.primary} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
