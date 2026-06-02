import { mockDelay, applyFilters, paginatedResult } from './client'
import { mockCandidates } from './mock/data'
import type { Candidate, FilterParams, PaginatedResponse } from '@/types'

let _candidates = [...mockCandidates]

export async function fetchCandidates(params: FilterParams = {}): Promise<PaginatedResponse<Candidate>> {
  await mockDelay()
  const filtered = applyFilters(_candidates as unknown as Record<string, unknown>[], params) as unknown as Candidate[]
  return paginatedResult(filtered, params.page, params.pageSize)
}

export async function fetchCandidateById(id: string): Promise<Candidate> {
  await mockDelay()
  const item = _candidates.find((c) => c.id === id)
  if (!item) throw new Error(`Candidate ${id} not found`)
  return structuredClone(item)
}

export async function inviteCandidate(data: { name: string; email: string; assessmentId: string }): Promise<Candidate> {
  await mockDelay()
  const newCandidate: Candidate = {
    id: `cand-${String(_candidates.length + 1).padStart(3, '0')}`,
    name: data.name,
    email: data.email,
    avatar: null,
    phone: '',
    role: '',
    company: '',
    location: '',
    status: 'invited',
    assessmentsTaken: 0,
    avgScore: 0,
    skills: [],
    results: [],
    lastActivity: new Date().toISOString(),
    invitedAt: new Date().toISOString(),
    tags: [],
    linkedIn: null,
    experience: 0,
  }
  _candidates = [newCandidate, ..._candidates]
  return structuredClone(newCandidate)
}
