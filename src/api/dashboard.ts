import { mockDelay } from './client'
import { mockDashboardData } from './mock/data'
import type { DashboardData } from '@/types'

export async function fetchDashboardData(): Promise<DashboardData> {
  await mockDelay()
  return structuredClone(mockDashboardData)
}
