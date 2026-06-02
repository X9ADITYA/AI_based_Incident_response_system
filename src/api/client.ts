import axios from 'axios'
import { sleep, paginate } from '@/lib/utils'
import { MOCK_DELAY_MIN, MOCK_DELAY_MAX, DEFAULT_PAGE_SIZE } from '@/lib/constants'
import type { FilterParams, PaginatedResponse } from '@/types'

export const apiClient = axios.create({
  baseURL: '/api/v1',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('auth_token')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

/** Simulate a network delay between min and max ms */
export async function mockDelay() {
  const ms = Math.random() * (MOCK_DELAY_MAX - MOCK_DELAY_MIN) + MOCK_DELAY_MIN
  await sleep(ms)
}

/** Apply search, status, category, difficulty filters to an array */
export function applyFilters<T extends Record<string, unknown>>(
  items: T[],
  params: FilterParams
): T[] {
  let result = [...items]
  if (params.search) {
    const q = params.search.toLowerCase()
    result = result.filter((item) =>
      Object.values(item).some((v) => String(v).toLowerCase().includes(q))
    )
  }
  if (params.status) result = result.filter((i) => i.status === params.status)
  if (params.category) result = result.filter((i) => i.category === params.category)
  if (params.difficulty) result = result.filter((i) => i.difficulty === params.difficulty)
  return result
}

/** Wrap filtered data in a paginated response envelope */
export function paginatedResult<T>(
  items: T[],
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE
): PaginatedResponse<T> {
  const total = items.length
  const totalPages = Math.ceil(total / pageSize)
  return {
    data: paginate(items, page, pageSize),
    total,
    page,
    pageSize,
    totalPages,
  }
}
