import { mockDelay } from './client'
import { mockAnalyticsData } from './mock/data'
import type { AnalyticsData, TimeRange } from '@/types'

export async function fetchAnalytics(_timeRange: TimeRange = '30d'): Promise<AnalyticsData> {
  await mockDelay()
  // In a real app, pass timeRange to the server; here we return static mock data
  return structuredClone(mockAnalyticsData)
}
