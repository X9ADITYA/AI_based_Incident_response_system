import { mockDelay, applyFilters, paginatedResult } from './client'
import { mockAssessments } from './mock/data'
import type { Assessment, FilterParams, PaginatedResponse } from '@/types'

let _assessments = [...mockAssessments]

export async function fetchAssessments(params: FilterParams = {}): Promise<PaginatedResponse<Assessment>> {
  await mockDelay()
  const filtered = applyFilters(_assessments as unknown as Record<string, unknown>[], params) as unknown as Assessment[]
  return paginatedResult(filtered, params.page, params.pageSize)
}

export async function fetchAssessmentById(id: string): Promise<Assessment> {
  await mockDelay()
  const item = _assessments.find((a) => a.id === id)
  if (!item) throw new Error(`Assessment ${id} not found`)
  return structuredClone(item)
}

export async function createAssessment(data: Partial<Assessment>): Promise<Assessment> {
  await mockDelay()
  const newItem: Assessment = {
    id: `asmt-${String(_assessments.length + 1).padStart(3, '0')}`,
    title: data.title ?? 'Untitled Assessment',
    category: data.category ?? 'Frontend Development',
    difficulty: data.difficulty ?? 'Intermediate',
    duration: data.duration ?? 60,
    questions: data.questions ?? 30,
    status: 'draft',
    candidates: 0,
    completionRate: 0,
    avgScore: 0,
    passingScore: data.passingScore ?? 65,
    tags: data.tags ?? [],
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0],
    createdBy: 'Alex Morgan',
    isPublic: data.isPublic ?? false,
    proctored: data.proctored ?? false,
  }
  _assessments = [newItem, ..._assessments]
  return structuredClone(newItem)
}

export async function updateAssessment(id: string, data: Partial<Assessment>): Promise<Assessment> {
  await mockDelay()
  const idx = _assessments.findIndex((a) => a.id === id)
  if (idx === -1) throw new Error(`Assessment ${id} not found`)
  _assessments[idx] = { ..._assessments[idx], ...data, updatedAt: new Date().toISOString().split('T')[0] }
  return structuredClone(_assessments[idx])
}

export async function deleteAssessment(id: string): Promise<void> {
  await mockDelay()
  _assessments = _assessments.filter((a) => a.id !== id)
}
