import { useQuery } from '@tanstack/react-query'
import { fetchAnalytics } from '@/api/analytics'
import type { TimeRange } from '@/types'

export function useAnalytics(timeRange: TimeRange = '30d') {
  return useQuery({
    queryKey: ['analytics', timeRange],
    queryFn: () => fetchAnalytics(timeRange),
    staleTime: 1000 * 60 * 5,
  })
}
